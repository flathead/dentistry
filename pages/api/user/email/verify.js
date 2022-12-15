import { createToken } from '@/api-lib/db';
import { CONFIG as MAIL_CONFIG, sendMail } from '@/api-lib/mail';
import { auths } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(...auths);

handler.post(async (req, res) => {
  if (!req.user) {
    res.json(401).end();
    return;
  }

  const db = await getMongoDb();

  const token = await createToken(db, {
    creatorId: req.user._id,
    type: 'emailVerify',
    expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });

  await sendMail({
    to: req.user.email,
    from: MAIL_CONFIG.from,
    subject: `Подтверждение Email на сайте "${process.env.NEXT_PUBLIC_SITE_NAME}"`,
    html: `
      <div>
        <h2>Привет, ${req.user.name}! 👋</h2>
		<p>Вы запросили подтверждение Email Вашего аккаунта.</p>
		<br>
        <p>Пожалуйста, пройдите по <a href="${process.env.NEXT_PUBLIC_WEB_URI}/verify-email/${token._id}">этой ссылке</a> чтобы подтвердить свою почту.</p>
      </div>
      `,
  });

  res.status(204).end();
});

export default handler;
