import { auth } from '../config/firebase.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await auth.createUser({ email, password });
    res.status(201).json({ message: 'User registered successfully', user: userRecord });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await auth.getUserByEmail(email);
    
    const token = jwt.sign({ uid: user.uid }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  register,
  login
}