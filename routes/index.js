const express = require('express');
const router = express.Router();
const auth = require('./auth');
const user_game = require('./user_game');
const user_game_biodata = require('./user_game_biodata');
const user_game_history = require('./user_game_history');

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Sekar' });
// });

router.use('/auth', auth);
router.use('/user-games', user_game);
router.use('/user-game-biodata', user_game_biodata);
router.use('/user-game-histories', user_game_history);

module.exports = router;