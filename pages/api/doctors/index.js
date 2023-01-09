import { ValidateProps } from '@/api-lib/constants';
import {
  deleteSpecialist,
  findSpecialists,
  insertSpecialist,
  patchSpecialist,
} from '@/api-lib/db/specialist';
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

  const specialists = await findSpecialists(
    db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  res.json({ specialists });
});

handler.post(
  ...auths,
  upload.single('photo'),
  validateBody({
    type: 'object',
    properties: {
      slug: ValidateProps.specialist.slug,
      name: ValidateProps.specialist.name,
      speciality: ValidateProps.specialist.speciality,
      experience: ValidateProps.specialist.experience,
      education: ValidateProps.specialist.education,
    },
    required: ['slug', 'name'],
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

    const specialist = await insertSpecialist(db, {
      creatorId: req.user._id,
      slug: req.body.slug,
      name: req.body.name,
      speciality: req.body.speciality,
      education: req.body.education || '',
      experience: req.body.experience || '',
      photo:
        photo ||
        'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670793409/empty_user_vbttq2.jpg',
    });

    return res.json({ specialist });
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

  const del = await deleteSpecialist(db, {
    itemId: req.body.itemId,
  });
  console.log('Врач удален.');
  return res.json({ del });
});

handler.patch(
  upload.single('photo'),

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

    const service = await patchSpecialist(db, {
      id: req.body.itemId,
      slug: req.body.slug,
      name: req.body.name,
      speciality: req.body.speciality,
      education: req.body.education || '',
      experience: req.body.experience || '',
      photo: photo || req.body.oldimage,
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
