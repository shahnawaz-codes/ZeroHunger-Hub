
const { Router } = require('express');
const { protect, requireVerified } = require('../../middleware/auth.middleware');
const { getMe, updateMe } = require('./user.controller');

const router = Router();

// All user routes are protected
router.use(protect,requireVerified);

router.route('/me').get(getMe).patch(updateMe);

module.exports = router;
