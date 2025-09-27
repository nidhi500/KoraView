const express = require('express');
const {
  getAllMonasteries,
  createMonastery,
  approveMonastery
} = require('../controllers/monasteryController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/rbacMiddleware');

const router = express.Router();

router.get('/', getAllMonasteries);
router.post('/', protect, authorize('admin', 'contributor'), createMonastery);
router.put('/approve/:id', protect, authorize('admin'), approveMonastery);

module.exports = router;
