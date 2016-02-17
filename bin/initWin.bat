@echo off

cd ..
start cmd.exe /k npm install
start cmd.exe /k mongod --dbpath ./tests/test-db
timeout 1
start cmd.exe /k mongo
set NODE_ENV=production&& timeout 2 && cls && nodemon index