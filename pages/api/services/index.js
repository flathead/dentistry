import { ValidateProps } from '@/api-lib/constants';
import {
  findCategoryById,
  findServices,
  insertService,
} from '@/api-lib/db/any';
import { auths, validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

const handler = nc(ncOpts);
const upload = multer({ dest: '/tmp' });

cloudinary.config({
  cloud_name: 'dv3q1dxpi',
  api_key: '664497938628891',
  api_secret: 's-T0UNfzEnXRt8THXuGxM6vHHnU',
});

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const services = await findServices(
    db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  res.json({ services });
});

handler.post(
  ...auths,
  upload.single('preview'),
  validateBody({
    type: 'object',
    properties: {
      slug: ValidateProps.service.slug,
      name: ValidateProps.service.name,
      description: ValidateProps.service.description,
      price: ValidateProps.service.price,
    },
    required: ['slug', 'name', 'description'],
    additionalProperties: true,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const db = await getMongoDb();

    const category = await findCategoryById(db, req.body.categoryId);

    if (!category) {
      return res.status(404).json({
        error: { message: 'Категория не найдена, задайте услуге категорию.' },
      });
    }

    let photo;
    if (req.file) {
      console.log('Изображение найдено!');
      const image = await cloudinary.uploader.upload(req.file.path);
      photo = image.secure_url;
    }

    const service = await insertService(db, category._id, {
      creatorId: req.user._id,
      slug: req.body.slug,
      name: req.body.name,
      category: req.body.category,
      description: req.body.description || '',
      price: req.body.price || '',
      preview:
        photo ||
        'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670793409/empty_user_vbttq2.jpg',
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
