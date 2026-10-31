const express = require('express');
const router = express.Router();
const { getAllRequests, updateRequestStatus } = require('../controllers/requestController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/requests', protect, adminOnly, getAllRequests);
router.patch('/requests/:id', protect, adminOnly, updateRequestStatus);

module.exports = router;