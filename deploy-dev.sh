#!/bin/bash
echo "deploying backend API to heroku"
cd backend 
git add * 
git commit -am "feat/api-deploy"
git push heroku main 
echo "deploying frontend to vercel"
cd ../frontend && vc && vc --prod 
echo "deploy finished ✅"

