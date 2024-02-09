const { create, getUserByUID, getAllUsers, updateUserByUID, getTop200Users, getLastWeekLeaderboardByCountry } = require('./user.controller');
const router = require('express').Router();

router.post('/', create);
router.get('/', getAllUsers);
router.get('/currentWeekLeaderboard', getTop200Users);
router.get('/lastWeekLeaderboard/:country', getLastWeekLeaderboardByCountry);
router.get('/:uid', getUserByUID);
router.put('/:uid', updateUserByUID);

module.exports = router;
