#!/bin/bash

pwd=`pwd`
osascript -e "tell application \"Terminal\" to do script \"cd $pwd; cd ./../; clear; mongod --dbpath ./tests/test-db; \""
osascript -e "tell application \"Terminal\" to do script \"cd $pwd; cd ./../; clear; mongo \""
osascript -e "tell application \"Terminal\" to do script \"cd $pwd; cd ./../; clear; nodemon index \""