import { ValidateProps } from '@/api-lib/constants';
import {
  createToken,
  findAndDeleteTokenByIdAndType,
  findUserByEmail,
  UNSAFE_updateUserPassword,
} from '@/api-lib/db';
import { CONFIG as MAIL_CONFIG, sendMail } from '@/api-lib/mail';
import { validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import normalizeEmail from 'validator/lib/normalizeEmail';

const handler = nc(ncOpts);

handler.post(
  validateBody({
    type: 'object',
    properties: {
      email: ValidateProps.user.email,
    },
    required: ['email'],
    additionalProperties: false,
  }),
  async (req, res) => {
    const db = await getMongoDb();

    const email = normalizeEmail(req.body.email);
    const user = await findUserByEmail(db, email);
    if (!user) {
      res.status(400).json({
        error: {
          message: 'мы не нашли это письмо. Пожалуйста, попробуйте снова.',
        },
      });
      return;
    }

    const token = await createToken(db, {
      creatorId: user._id,
      type: 'passwordReset',
      expireAt: new Date(Date.now() + 1000 * 60 * 20),
    });

    await sendMail({
      to: email,
      from: MAIL_CONFIG.from,
      subject: `${process.env.NEXT_PUBLIC_SITE_NAME} Сброс пароля.`,
      html: `
      <div>
        <h2>Привет, ${user.name}! 👋</h2>
		<p>Только что с вашего аккаунта был запрошен сброс пароля аккаунта. Если это были не вы, срочно самостоятельно сбросьте пароль.</p>
		<br>
        <p>Нажмите на <a href="${process.env.WEB_URI}/forget-password/${token._id}">эту ссылку</a> для сброса Вашего пароля.</p>
      </div>
      `,
    });

    res.status(204).end();
  }
);

handler.put(
  validateBody({
    type: 'object',
    properties: {
      password: ValidateProps.user.password,
      token: { type: 'string', minLength: 0 },
    },
    required: ['password', 'token'],
    additionalProperties: false,
  }),
  async (req, res) => {
    const db = await getMongoDb();

    const deletedToken = await findAndDeleteTokenByIdAndType(
      db,
      req.body.token,
      'passwordReset'
    );
    if (!deletedToken) {
      res.status(403).end();
      return;
    }
    await UNSAFE_updateUserPassword(
      db,
      deletedToken.creatorId,
      req.body.password
    );
    res.status(204).end();
  }
);

export default handler;
