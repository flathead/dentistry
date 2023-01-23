import { ValidateProps } from '@/api-lib/constants';
import { findSpecialists, insertSpecialist } from '@/api-lib/db/specialist';
import { auths, validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
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
    required: ['slug', 'name', 'speciality'],
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
      slug: req.body.slug,
      name: req.body.name,
      speciality: req.body.speciality,
      experience: req.body.experience,
      education: req.body.education || '',
      photo:
        photo ||
        'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670793409/empty_user_vbttq2.jpg',
      creatorId: req.user._id,
    });

    return res.json({ specialist });
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
