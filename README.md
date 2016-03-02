# nodejs-login-registration
Simple login/registration using Node, Express and MongoDB.

## TODO
### Features
- [x] Register with name (optional), email and password.
- [x] Login with email and password.
- [x] Change name.
- [x] Basic way to change password using old one.
- [x] Basic way to change email validating with password.
- [x] Delete account, confirming the action with password.
- [ ] See warning/success messages on browser client.

### Development
- [x] Restructure the routes to provide a RESTful API backend
- [x] Implement a basic browser client in Angular
- [ ] Make the UI look decent :)

### Setup Instructions
1. To use the API subdomain, include "127.0.0.1 api.localhost.com" in your OS hosts file.
2. Make sure you have Node and MongoDB with npm and bower installed.
3. Run npm install and bower install to get all dependencies.
4. Get MongoDB up and running on the default port.
3. At the project root folder run "npm start".
4. At this point you should be able to access the server at 'localhost:port' and the API at 'api.localhost.com:port/v1/' or 'localhost:port/api/v1/'