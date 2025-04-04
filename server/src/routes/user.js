const express = require('express');
const { updateProfile, updateProgress } = require('../controllers/user');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.put('/profile', protect, updateProfile);
router.put('/progress', protect, updateProgress);

module.exports = router;