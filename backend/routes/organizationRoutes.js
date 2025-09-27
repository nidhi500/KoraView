const express = require('express');
const { createOrganization, getAllOrganizations } = require('../controllers/organizationController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/rbacMiddleware');

const router = express.Router();

router.get('/', getAllOrganizations);
router.post('/', protect, authorize('admin'), createOrganization);

module.exports = router;
