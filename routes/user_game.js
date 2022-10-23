const express = require('express');
const router = express.Router();
const c = require('../controllers');

router.get('/', c.userGame.index);
router.get('/:userGameId', c.userGame.show);
router.post('/', c.userGame.create);
router.put('/:userGameId', c.userGame.update);
router.delete('/:userGameId', c.userGame.delete);

module.exports = router;