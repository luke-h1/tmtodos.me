#!/bin/bash


echo What should the version be ? 
read VERSION 

echo "Deploying to production 🚀 🔥"

docker build -t lhowsam/todos:$VERSION
docker push lhowsam/todos:$VERSION
ssh root@DevVPS "docker pull lhowsam/todos:$VERSION && docker tag lhowsam/todos:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"
