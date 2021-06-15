#!/bin/bash
cd ../src/tm-web
npm run format 
npm run lint 
npm run tsc 
npm run build 
vc --prod -f