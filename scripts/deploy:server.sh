#!/bin/bash
echo What should the version be ?
read VERSION
echo Enter IP address
read TARGET
echo Enter user 
read USER 
cd ../src/tm-server
echo "Deploying to production 🚀 🔥"
docker build -t lhowsam/tmtodos:$VERSION .
docker push lhowsam/tmtodos:$VERSION
ssh ${USER}@${TARGET} -i /Users/lukehowsam/aws/*.cer "sudo docker pull lhowsam/tmtodos:$VERSION && sudo docker tag lhowsam/tmtodos:$VERSION dokku/tm-api:$VERSION && dokku deploy tm-api $VERSION"