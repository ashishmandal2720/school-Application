const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models/index');
const User = db.User;
const School = db.School;
const { json } = require('body-parser');

const signup = async (req, res) => {
    try {
      const { name, email, password, photo, inviteCode } = req.body;
      let userRole = 'parent'; 
      if (inviteCode) {
        const school = await School.findOne({ where: { inviteCode } });
        if (!school) {
          return res.status(404).json({ error: 'Invalid invite code' });
        }
        userRole = 'teacher';
      } else {
        const newInviteCode = generateInviteCode();
        const newSchool = await School.create({
          name: `${name}'s School`,
          inviteCode: newInviteCode,
        });
        userRole = 'admin';
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        photo,
        role: userRole,
      });
      res.status(201).json({ user });
    } catch (error) {
      console.error('Error in signup:', error);
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
  
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const authToken = jwt.sign({ userId: user.id }, "apple", { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', authToken });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};


module.exports = {
    signup,
    login
}
