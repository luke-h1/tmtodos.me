#!/bin/bash
echo "starting deploy 🤠"
npm run format && npm run lint && npx jest && npm run type-check && vc -f && vc --prod -f 