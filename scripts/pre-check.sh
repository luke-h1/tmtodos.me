#!/bin/bash
cd .. 
npm run clean 
npm ci 
npm run bootstrap
npm run bootstrap:prod
npm run lint 
npm run format
npm run tsc
npm run cy:frontend 
npm run build 
