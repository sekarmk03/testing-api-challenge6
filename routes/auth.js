const express = require('express');
const router = express.Router();
const c = require('../controllers');
const m = require('../helpers/middleware');

router.post('/register', c.auth.register);
router.post('/login', c.auth.login);
router.get('/whoami', m.mustLogin, c.auth.whoami);

module.exports = router;