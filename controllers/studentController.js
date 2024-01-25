const db = require('../models/index');
const User = db.User;
const School = db.School;
const Student = db.Student;
const ClassStudent = db.ClassStudent


const createstudent = async (req, res) => {
  try {
    const { name, photo, school_id } = req.body;
    const newStudent = await Student.create({
      name,
      photo,
      school_id,
    });

    res.json({ message: 'Student created successfully', student: newStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getstudents = async (req, res) => {
  try {
    const { school_id, class_id } = req.query;
    if (!school_id && !class_id) {
      return res.status(400).json({ error: 'Either school_id or class_id must be provided' });
    }
    let students;
    if (school_id) {
      students = await Student.findAll({
        where: { school_id },
      });
    } else {
      students = await Student.findAll({
        include: {
          model: Class,
          where: { id: class_id },
        },
      });
    }
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createstudent,
  getstudents
}

