#!/bin/bash
cd ../src/tm-web
npm run format
npm run lint 
npm run tsc

echo "About to run Cypress UI tests. This will require the backend & frontend dev servers to be up & running. Are they running ?"
read -r response
if [[ $response =~ ^([yY][eE][sS]|[yY])$ ]]; then
    CONTINUE=true
fi

if ! $CONTINUE; then
    echo "Please start the frontend & backend before running the deploy script"
    exit 5
fi

npm run cy:run 
npm run build
echo "CHECKS PASSED"
vc -f 
echo "Deployed to development ✅"
echo "deploying to production"
vc --prod -f 
echo "SUCCESFULLY DEPLOYED TO PRODUCTION ✅"
