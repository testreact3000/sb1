#!/bin/bash
. ~/.nvm/nvm.sh use v8.9.1
npm i --prefix ./ create-react-app
node node_modules/create-react-app/index.js app

