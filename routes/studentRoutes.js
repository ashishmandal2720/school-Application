const authMiddleware = require('../middleware/authMiddleware');

const {
    createstudent,
    getstudents,
} = require('../controllers/studentController');

const router = require('express').Router();

router.post('/create',authMiddleware, createstudent);
router.get('/getStudent', authMiddleware,getstudents);

module.exports = router;