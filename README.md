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

### Development
- [x] Restructure the routes to provide a RESTful API backend
- [x] Implement a basic browser client in Angular
- [ ] Make the UI look decent :)

### Setup Instructions
1. To use the API subdomain, include "127.0.0.1 api.localhost.com" in your OS hosts file.
2. Make sure you have Node with npm and MongoDB up and running in the default port.
3. At the project root folder run "npm start".
4. You should be able to access the server at 'localhost:port' and the API at 'api.localhost.com:port/v1/' or 'localhost:port/api/v1/'