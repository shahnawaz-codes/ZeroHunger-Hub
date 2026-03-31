const { Router } = require('express');
const { protect } = require('../../middleware/auth.middleware');
const { getMe, updateMe } = require('./user.controller');

const router = Router();

// All user routes are protected
router.use(protect);

router.route('/me').get(getMe).patch(updateMe);

module.exports = router;
