const authMiddleware = require('../middleware/authMiddleware');
const {
    getAllSchools,
    createSchool
} = require('../controllers/schoolController');


const router = require('express').Router();

router.get('/getschools', authMiddleware, getAllSchools);
router.post('/create', authMiddleware, createSchool);

module.exports = router;