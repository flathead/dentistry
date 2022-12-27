import { ValidateProps } from '@/api-lib/constants';
import { findServices, insertService } from '@/api-lib/db';
import { auths, validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

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
  validateBody({
    type: 'object',
    properties: {
      name: ValidateProps.service.name,
    },
    required: ['name'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const db = await getMongoDb();

    const service = await insertService(db, {
      name: req.body.name,
      creatorId: req.user._id,
    });

    return res.json({ service });
  }
);

export default handler;
