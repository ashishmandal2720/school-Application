const authMiddleware = require('../middleware/authMiddleware');

const { 
    createClass,
    getClassBySchoolId,
    assignstudenttoclass,
    getstudentsinallclasses,
    getclassmates
} = require('../controllers/classController');

const router = require('express').Router();

router.post('/create',authMiddleware, createClass);
router.get('/getclassbyschool/:school_id',authMiddleware, getClassBySchoolId);
router.get('/getstudentsinallclasses',authMiddleware, getstudentsinallclasses);
router.post('/assignstudenttoclass',authMiddleware, assignstudenttoclass);
router.get('/getclassmates',authMiddleware, getclassmates);

module.exports = router;