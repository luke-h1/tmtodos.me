#!/bin/bash
echo What should the version be ? 
read VERSION 
cd ../src/tm-server
echo "Deploying to production 🚀 🔥"

docker build -t lhowsam/tmtodos:$VERSION . 
docker push lhowsam/tmtodos:$VERSION
ssh root@VPS_ADDR "docker pull lhowsam/tmtodos:$VERSION && docker tag lhowsam/tmtodos:$VERSION dokku/tm-api:$VERSION && dokku deploy tm-api $VERSION"
