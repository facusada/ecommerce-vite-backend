import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};
console.log(options);

export default (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        console.log('JEW_TOKEN', jwt_payload);
        const invalidTokensRef = admin.firestore().collection('invalidTokens');
        const snapshot = await invalidTokensRef.where('token', '==', jwt_payload.token).get();
        
        if (!snapshot.empty) {
          return done(null, false, { message: 'Token inválido' });
        }

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