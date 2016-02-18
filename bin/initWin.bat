@echo off

SET env=development

CD ..
IF NOT EXIST ./tests MKDIR tests
CD ./tests
IF NOT EXIST ./test-db MKDIR test-db
CD ..

CALL npm install

START cmd.exe /k mongod --dbpath ./tests/test-db

TIMEOUT 1
START cmd.exe /k mongo

SET NODE_ENV=%env%
TIMEOUT 2 && CLS
nodemon index