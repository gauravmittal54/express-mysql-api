require('dotenv').config();
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');
const userRouter = require('./api/users/user.router');

const port = process.env.APP_PORT || 3000;
global.serverUrl = process.env.SERVER_URL || `http://localhost:${port}`;

app.use(express.json());

app.use('/api/users' , userRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the User API!',
      redirects: {
        'Swagger documentation':'/api-docs',
        'Check current week leaderboard': '/api/users/currentWeekLeaderboard',
        'Check lastweekleaderboard for India': '/api/users/lastWeekLeaderboard/IN',
      },
    });
  });

app.listen(process.env.APP_PORT,() =>{
    console.log(`server running at port ${process.env.APP_PORT}`)
})
