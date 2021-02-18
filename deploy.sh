#!/bin/bash
cd backend 
git add * 
git commit -am "feat/deploy" 
echo "deploy backend to heroku"
git push heroku main 
cd ../frontend
echo "deploy frontend to vercel"
vc --prod 
echo "deploy finished"

