import { ValidateProps } from '@/api-lib/constants';
import {
  deleteCategory,
  findCategories,
  insertCategory,
  patchCategory,
} from '@/api-lib/db/any';
import { auths, validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import bodyParser from 'body-parser';
import { v2 as cloudinary } from 'cloudinary';
import { ObjectId } from 'mongodb';
import multer from 'multer';
import nc from 'next-connect';

const upload = multer({ dest: '/temp' });
const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const categories = await findCategories(
    db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 100) : undefined
  );

  res.json({ categories });
});

handler.post(
  ...auths,
  upload.single('preview'),
  validateBody({
    type: 'object',
    properties: {
      slug: ValidateProps.category.slug,
      title: ValidateProps.category.title,
      short: ValidateProps.category.short,
      description: ValidateProps.category.description,
      preview: ValidateProps.category.preview,
      price: ValidateProps.category.price,
    },
    required: ['title'],
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

    const category = await insertCategory(db, {
      creatorId: req.user._id,
      slug: req.body.slug,
      title: req.body.title,
      short: req.body.short,
      description: req.body.description,
      price: req.body.price,
      preview:
        photo ||
        'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670793409/empty_user_vbttq2.jpg',
    });

    return res.json({ category });
  }
);

handler.delete(bodyParser.json(), async (req, res) => {
  if (!req.body) {
    console.log('Отсутствует тело запроса.');
  }
  const db = await getMongoDb();

  const del = await deleteCategory(db, {
    itemId: req.body.itemId,
  });
  console.log('Категория удалена.');
  return res.json({ del });
});

handler.patch(
  upload.single('preview'),

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
      console.log(photo);
    }

    const service = await patchCategory(db, {
      id: req.body.itemId,
      slug: req.body.slug,
      title: req.body.title || req.body.oldtitle,
      short: req.body.short || req.body.oldshort,
      categoryId:
        ObjectId(req.body.categoryId) || ObjectId(req.body.oldcategoryID),
      description: req.body.description || req.body.olddescription,
      price: req.body.price || req.body.oldprice,
      preview: photo || req.body.oldimage,
    });

    return res.json({ service });
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
