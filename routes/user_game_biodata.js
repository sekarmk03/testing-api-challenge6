const express = require('express');
const router = express.Router();
const c = require('../controllers');
const m = require('../helpers/middleware');

router.get('/', m.mustLogin, c.userGameBiodata.index);
router.get('/:userBiodataId', m.mustLogin, c.userGameBiodata.show);
router.post('/', m.mustLogin, c.userGameBiodata.create);
router.put('/:userBiodataId', m.mustLogin, c.userGameBiodata.update);
router.delete('/:userBiodataId', m.mustLogin, c.userGameBiodata.delete);

module.exports = router;