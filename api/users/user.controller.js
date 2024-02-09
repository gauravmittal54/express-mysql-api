const { create, getUserByUID, getAllUsers, updateUserByUID, getTop200Users, getTop200UsersByCountryAndLastWeek } = require('./user.service');

module.exports = {
    create: (req, res) => {
        const body = req.body;
        create(body, (err, results) => {
            if (err) {
                console.log(err);

                // Check if it's a duplicate entry error
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({
                        success: 0,
                        message: 'Advised user id is already in use.Please choose any other user id',
                    });
                }

                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error',
                });
            }

            // Check if results.message is empty
            let successMessage = 'Data inserted successfully';
            if (results && results.message && results.message.trim() !== '') {
                successMessage = results.message;
            }

            return res.status(200).json({
                success: 1,
                results: {
                    ...results,
                    message: successMessage,
                },
            });
        });
    },
    
    getUserByUID: (req, res) => {
        const uid = req.params.uid;
        getUserByUID(uid, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                });
            }
    
            if (!results || results.length === 0) {
                return res.status(404).json({
                    success: 0,
                    message: 'User ID not found'
                });
            }
    
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    

    getAllUsers: (req, res) => {
        getAllUsers((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                });
            }

            if (!results || results.length === 0) {
                return res.status(404).json({
                    success: 0,
                    message: 'No user created yet!'
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getTop200Users: (req, res) => {
        getTop200Users((err, results) => {
            console.log("fdf")
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                });
            }

            if (!results || results.length === 0) {
                return res.status(404).json({
                    success: 0,
                    message: 'No user created yet!'
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getLastWeekLeaderboardByCountry: (req, res) => {
        const country = req.params.country;
        getTop200UsersByCountryAndLastWeek(country, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: 'Database connection error',
            });
          }
    
          if (!results || results.length === 0) {
            return res.status(404).json({
              success: 0,
              message: 'No leaderboard data available for the specified country and last week.',
            });
          }
    
          return res.status(200).json({
            success: 1,
            data: results,
          });
        });
      },

    updateUserByUID: (req, res) => {
        const uid = req.params.uid;
        const body = req.body;
    
        updateUserByUID(uid, body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error',
                });
            }
    
            // Check if 'Rows matched: 0' is present in the message
            if (results && results.message && results.message.includes('Rows matched: 0')) {
                return res.status(404).json({
                    success: 0,
                    message: 'User ID not found',
                });
            }
    
            let successMessage = 'User details updated successfully';
            return res.status(200).json({
                success: 1,
                results: {
                    ...results,
                    message: successMessage,
                },
            });
        });
    },
    
};
