@echo off

cd ..
start cmd.exe /k mongod --dbpath ./tests/test-db
timeout 1
start cmd.exe /k mongo
set NODE_ENV=development&& timeout 2 && cls && nodemon index