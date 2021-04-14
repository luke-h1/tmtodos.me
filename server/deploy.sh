#!/bin/bash


echo What should the version be ? 
read VERSION 

echo "Deploying to production 🚀 🔥"

docker build -t lhowsam/tmtodosme:$VERSION
docker push lhowsam/tmtodosme:$VERSION
ssh root@DevVPS "docker pull lhowsam/tmtodosme:$VERSION && docker tag lhowsam/tmtodosme:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"
