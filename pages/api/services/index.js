import { ValidateProps } from '@/api-lib/constants';
import {
  deleteService,
  findServices,
  insertService,
  patchService,
} from '@/api-lib/db/service';
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
  cloudinary.config({
    cloud_name: 'dv3q1dxpi',
    api_key: '664497938628891',
    api_secret: 's-T0UNfzEnXRt8THXuGxM6vHHnU',
  });
}

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
      category: ValidateProps.service.category,
      description: ValidateProps.service.description,
      price: ValidateProps.service.price,
    },
    required: ['slug', 'name', 'description', 'category'],
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

    const service = await insertService(db, {
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

/* handler.delete(async (req, res) => {
  console.log('reached handler delete function');
  console.log(req.body._id);
  const deleteResult = await deleteService(req.db, req.body._id);
  return res.json({ deleteResult });
}); */

handler.delete(bodyParser.json(), async (req, res) => {
  if (!req.body) {
    console.log('Отсутствует тело запроса.');
  }
  const db = await getMongoDb();

  const del = await deleteService(db, {
    serviceId: req.body.serviceId,
  });
  console.log('Услуга удалена.');
  return res.json({ del });
});

handler.patch(
  upload.single('servicepreview'),

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

    const service = await patchService(db, {
      id: req.body.serviceId,
      slug: req.body.slug,
      name: req.body.name,
      category: req.body.category,
      description: req.body.description || '',
      price: req.body.price || '',
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
