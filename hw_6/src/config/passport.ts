import { PassportStatic } from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { UsersRepository } from "../repositories/UsersRepository"; 
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

export const configurePassport = (passport: PassportStatic) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY,
  };

  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        // Вместо User.query().findById() используем репозиторий
        const user = UsersRepository.getById(jwt_payload.id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
