import { ValidateProps } from '@/api-lib/constants';
import {
  deletePortfolio,
  findPortfolios,
  insertPortfolio,
} from '@/api-lib/db/portfolio';

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

  const works = await findPortfolios(
    db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  res.json({ works });
});

handler.post(
  ...auths,
  upload.fields([
    {
      name: 'workbefore',
      maxCount: 1,
    },
    {
      name: 'workafter',
      maxCount: 1,
    },
  ]),
  validateBody({
    type: 'object',
    properties: {
      title: ValidateProps.portfolio.title,
    },
    required: ['title'],
    additionalProperties: true,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const db = await getMongoDb();

    let before;
    let after;

    if (req.files) {
      const tempBefore = await cloudinary.uploader.upload(
        req.files.workbefore[0].path
      );
      const tempAfter = await cloudinary.uploader.upload(
        req.files.workafter[0].path
      );
      before = tempBefore.secure_url;
      after = tempAfter.secure_url;
    }

    const work = await insertPortfolio(db, {
      creatorId: req.user._id,
      title: req.body.title,
      after: after,
      before: before,
    });

    return res.json({ work });
  }
);

handler.delete(bodyParser.json(), async (req, res) => {
  if (!req.body) {
    console.log('Отсутствует тело запроса.');
  }
  const db = await getMongoDb();

  const del = await deletePortfolio(db, {
    itemId: req.body.itemId,
  });
  return res.json({ del });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
