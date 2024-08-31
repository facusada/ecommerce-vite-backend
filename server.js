import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import passport from 'passport';
import passportConfig from './config/passport.js';

dotenv.config();

const app = express();
app.use(express.json());

passportConfig(passport);
app.use(passport.initialize());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});