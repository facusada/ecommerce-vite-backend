import admin from 'firebase-admin';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await admin.auth().getUserByEmail(email);

    const token = jwt.sign({ uid: user.uid, email: user.email }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    res.json({ success: true, token });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Authentication failed', error: error.message });
  }
};