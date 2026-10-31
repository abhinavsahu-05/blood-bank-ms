const express = require('express');
const router = express.Router();
const { createBloodRequest, getUserRequests } = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');

router.post('/request', protect, createBloodRequest);
router.get('/my-requests', protect, getUserRequests);

module.exports = router;