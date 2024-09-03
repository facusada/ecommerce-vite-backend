import { auth } from '../config/firebase.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { saveToken } from '../models/tokenModel.js';

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
  if (!req.body.idToken) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    const { idToken } = req.body;
    
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const token = jwt.sign({ uid: uid }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    saveToken(token, uid);

    let userData = {
      token,
      'user': {
        uid: uid,
        email: decodedToken.email,
      }
    }
    
    res.status(200).json({ message: 'Login successful', userData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  register,
  login
}