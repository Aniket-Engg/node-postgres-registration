@echo off

CD ..
IF NOT EXIST ./tests MKDIR tests
CD ./tests
IF NOT EXIST ./test-db MKDIR test-db
CD ..

CALL npm install

START cmd.exe /k mongod --port 27017 --dbpath ./tests/test-db
TIMEOUT 1

START cmd.exe /k mongo --port 27017
TIMEOUT 1 && CLS

nodemon index