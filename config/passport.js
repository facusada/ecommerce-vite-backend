import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

export default (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        const user = await admin.auth().getUser(jwt_payload.uid);
 
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );
};