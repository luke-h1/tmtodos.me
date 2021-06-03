#!/bin/bash
cd ../src/tm-web
npm run format
npm run lint 
npm run tsc
npm run cy:ci 
npm run build 
echo "CHECKS PASSED"
vc -f 
echo "Deployed to development ✅"
echo "deploying to production"
vc -f --prod
echo "SUCCESFULLY DEPLOYED TO PRODUCTION ✅"