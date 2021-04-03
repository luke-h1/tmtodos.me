#!/bin/bash


echo What should the version be ? 
read VERSION 

echo "Deploying to production 🚀"

docker build -t lhowsam/takemynotes:$VERSION
docker push lhowsam/takemynotes:$VERSION
ssh root@VPS "docker pull lhowsam/takemynotes:$VERSION && docker tag lhowsam/takemynotes:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"
