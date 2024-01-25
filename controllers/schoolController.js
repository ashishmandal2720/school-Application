const db = require('../models/index');
const User = db.User;
const School = db.School;
const jwt = require('jsonwebtoken');

const getAllSchools = async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.headers.authorization && req.headers.authorization.split(' ')[1], 'apple');
    const user_id = decodedToken.userId;
    const user = await User.findOne({
      where: { id: user_id },
      include: [
        {
          model: School,
          attributes: ['id', 'name', 'inviteCode'],
          through: {
            attributes: ['role'],
            where: { User_id: user_id },
          },
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const schoolsWithRoles = user.Schools.map((school) => {
      const userRole = school.UserSchool.role;
      return {
        id: school.id,
        name: school.name,
        inviteCode: school.inviteCode,
        userRole,
      };
    });
    res.status(200).json({ schools: schoolsWithRoles });
  } catch (error) {
    console.error('Error in getMySchools:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};


const createSchool = async (req, res) => {
  try {
    const { name, photo } = req.body;
    const inviteCode = generateInviteCode();
    const newSchool = await School.create({
      name,
      photo,
      inviteCode,
    });
    const decodedToken = jwt.verify(req.headers.authorization && req.headers.authorization.split(' ')[1], 'apple');
    const user_id = decodedToken.userId;
    await newSchool.addUser(user_id, { through: { role: 'admin' } });
    res.status(201).json({ school: newSchool });
  } catch (error) {
    console.error('Error in createSchool:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

function generateInviteCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const codeLength = 8;
  let inviteCode = '';
  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    inviteCode += characters.charAt(randomIndex);
  }
  return inviteCode;
}


module.exports = {
  getAllSchools,
  createSchool
}

