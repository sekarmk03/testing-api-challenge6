const express = require('express');
const router = express.Router();
const c = require('../controllers');
const m = require('../helpers/middleware');

router.get('/', m.mustLogin, c.userGameHistory.index);
router.get('/:historyId', m.mustLogin, c.userGameHistory.show);
router.post('/', m.mustLogin, c.userGameHistory.create);
router.put('/:historyId', m.mustLogin, c.userGameHistory.update);
router.delete('/:historyId', m.mustLogin, c.userGameHistory.delete);

module.exports = router;