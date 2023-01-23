import { ValidateProps } from '@/api-lib/constants';
import {
  deletePromo,
  findPromos,
  insertPromo,
  patchPromo,
} from '@/api-lib/db/promo';
import { auths, validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import bodyParser from 'body-parser';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import nc from 'next-connect';

const upload = multer({ dest: '/tmp' });
const handler = nc(ncOpts);

if (process.env.CLOUDINARY_URL) {
  const {
    hostname: cloud_name,
    username: api_key,
    password: api_secret,
  } = new URL(process.env.CLOUDINARY_URL);

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });
}

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const promos = await findPromos(
    db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  res.json({ promos });
});

handler.post(
  ...auths,
  upload.single('preview'),
  validateBody({
    type: 'object',
    properties: {
      title: ValidateProps.promo.title,
      subtitle: ValidateProps.promo.subtitle,
      date: ValidateProps.promo.date,
      time: ValidateProps.promo.time,
    },
    required: ['title', 'subtitle', 'date', 'time'],
    additionalProperties: true,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const db = await getMongoDb();

    let photo;
    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path);
      photo = image.secure_url;
    }

    const promo = await insertPromo(db, {
      creatorId: req.user._id,
      title: req.body.title,
      subtitle: req.body.subtitle,
      date: req.body.date,
      time: req.body.time,
      preview:
        photo ||
        'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670793409/empty_user_vbttq2.jpg',
    });

    return res.json({ promo });
  }
);

handler.delete(bodyParser.json(), async (req, res) => {
  if (!req.body) {
    console.log('Отсутствует тело запроса.');
  }
  const db = await getMongoDb();

  const del = await deletePromo(db, {
    itemId: req.body.itemId,
  });
  return res.json({ del });
});

handler.patch(
  upload.single('promopreview'),

  async (req, res) => {
    if (!req.body) {
      console.log('Отсутствует тело запроса.');
      res.status(500);
      return;
    }
    const db = await getMongoDb();

    let photo;
    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path);
      photo = image.secure_url;
    }

    const promo = await patchPromo(db, {
      id: req.body.itemId,
      title: req.body.title,
      subtitle: req.body.subtitle,
      date: req.body.date,
      time: req.body.time,
      preview: photo || req.body.oldimage,
    });

    return res.json({ promo });
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
