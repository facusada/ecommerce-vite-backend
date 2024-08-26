import express from 'express';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import passport from 'passport';
import passportConfig from './config/passport.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(express.json());
app.use(passport.initialize());

passportConfig(passport);

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});