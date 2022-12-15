import { findUserForAuth, findUserWithEmailAndPassword } from '@/api-lib/db';
import { sendMsg } from '@/lib/telegram';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { useEffect, useState } from 'react';
import { getMongoDb } from '../mongodb';

passport.serializeUser((req, user, done) => {
  done(null, user._id);
});

passport.deserializeUser((req, id, done) => {
  getMongoDb().then((db) => {
    findUserForAuth(db, id).then(
      (user) => done(null, user),
      (err) => done(err)
    );
  });
});

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email, password, done) => {
      const time = new Date();
      const hours = time.getHours();
      const minutes = time.getMinutes();

      const db = await getMongoDb();
      const user = await findUserWithEmailAndPassword(db, email, password);
      if (user) {
        done(null, user);
        sendMsg(
          `<b>Успешная авторизация!</b>%0A%0AПользователь ${user.email} авторизовался на сайте в <b>${hours}:${minutes} по МСК</b> в качестве администратора.%0AЕсли это не Вы - <b>срочно</b> смените пароль от аккаунта.`
        );
      } else {
        done(null, false, { message: 'Неправильный логин или пароль' });
        sendMsg(
          `<b>Неудачная попытка авторизации</b>%0A%0AКто-то пытается получить доступ к <i>панели администратора</i>, время попытки - <b>${hours}:${minutes} по МСК</b>.`
        );
      }
    }
  )
);

export default passport;
