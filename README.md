## Description
A simple API made using nodejs/expressjs and mysql for creating and managing users.
Hosted url : [Link](https://scoreboardapi-kqb1.onrender.com/api-docs)

Source code : [Link](https://github.com/gauravmittal54/express-mysql-api/tree/master)

## Table of Contents

- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)
- [Contributing](#contributing)


## Features
- Create a user
- Get a user from database
- Update existing user data
- get specific user based on userid
- get current week leader board based on scores of users displaying top 200 users data
- get last week leader board based on scores of users and country given in params


## Setup Instructions
- Clone the repository.
- set up .env file in root directory with all below required values :
  
  # The port on which your application will run
  APP_PORT=3000
  
  # The maximum number of connections to create at once (for MySQL)
  CONNECTION_LIMIT=10
  # The name of your MySQL database
  DATABASE=your_database_name
  # The host where your MySQL server is running
  HOST=your_mysql_host
  # The port on which your MySQL server is running
  MYSQL_PORT=3306
  # The password for your MySQL user
  PASSWORD=your_mysql_password
  # The username for your MySQL database
  USER=your_mysql_username

- Install the dependencies using npm install.
- run swagger.js using npm swagger.js command to generate swagger_output.json
- Start the server using npm start.


## API Endpoints

| HTTP Verb | Endpoint                               | Action                                              |
| --------- | -------------------------------------- | --------------------------------------------------- |
| POST      | /api/users                             | Create a new user                                  |
| GET       | /api/users                             | Get all users                                      |
| GET       | /api/users/currentWeekLeaderboard      | Delete a question                                  |
| GET       | /api/users/lastWeekLeaderboard/:country| Delete an option                                   |
| GET       | /api/users/:uid                        | Increase the count of votes for an option          |
| PUT       | /api/users/:uid                        | Update user details by UID                         |


## Dependencies
- "dotenv": "^16.4.1"
- "express": "^4.18.2"
- "mysql": "^2.18.1"
- "nodemon": "^3.0.3"
- "swagger-autogen": "^2.23.7"
- "swagger-ui-express": "^5.0.0"

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.


