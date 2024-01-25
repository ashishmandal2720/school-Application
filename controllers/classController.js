const db = require('../models/index');
const { Op } = require('sequelize');
const User = db.User;
const School = db.School;
const Student = db.Student;
const Class = db.Class;
const ClassStudent = db.ClassStudent

const createClass = async (req, res) => {
    try {
        const { name, school_id } = req.body;
        const newClass = await Class.create({
            name,
            school_id,
        });

        res.json({ message: 'Class created successfully', class: newClass });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getClassBySchoolId = async (req, res) => {
    try {
        const schoolId = req.params.school_id;
        const classes = await Class.findAll({
            where: { school_id: schoolId },
        });

        res.json(classes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const assignstudenttoclass = async (req, res) => {
    try {
        const { classId, studentId } = req.body;
        const classStudentAssociation = await ClassStudent.create({
            classId: classId,
            studentId: studentId,
        });

        res.json({ message: 'Student assigned to class successfully', association: classStudentAssociation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getstudentsinallclasses = async (req, res) => {
    try {
        const allClasses = await Class.findAll();
        if (allClasses.length === 0) {
            return res.status(404).json({ error: "Class not found" });
        }
        const classIds = allClasses.map(cls => cls.id);
        const studentsInAllClasses = await Student.findAll({
            include: {
                model: Class,
                where: {
                    id: classIds,
                },
            },
        });
        if (!studentsInAllClasses || studentsInAllClasses.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        } else {
            res.json(studentsInAllClasses);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getclassmates = async (req, res) => {
    try {
        const { student_id } = req.query;
        const selectedStudent = await Student.findByPk(student_id, {
            include: Class,
        });

        if (!selectedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const studentClassIds = selectedStudent.Classes.map(cls => cls.id);
        const classmates = await Student.findAll({
            include: Class,
            where: {
                [Op.and]: [
                    {
                        '$Classes.id$': {
                            [Op.in]: studentClassIds,
                        },
                    },
                    {
                        id: {
                            [Op.ne]: student_id,
                        },
                    },
                ],
            },
        });

        if (classmates.length > 0) {
            res.json(classmates);
        } else {
            res.json({ message: 'No classmates found' });
        }    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createClass,
    getClassBySchoolId,
    assignstudenttoclass,
    getstudentsinallclasses,
    getclassmates

}

