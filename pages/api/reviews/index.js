import { ValidateProps } from '@/api-lib/constants';
import { findReviews, insertReview } from '@/api-lib/db/review';
import { auths, validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const reviews = await findReviews(
    db,
    req.query.before ? new Date(req.query.before) : undefined,
    //req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  res.json({ reviews });
});

handler.post(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      name: ValidateProps.review.name,
      phone: ValidateProps.review.phone,
      rating: ValidateProps.review.rating,
      content: ValidateProps.review.content,
    },
    required: ['content'],
    additionalProperties: true,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const db = await getMongoDb();

    const review = await insertReview(db, {
      name: req.body.name,
      phone: req.body.phone,
      rating: req.body.rating,
      content: req.body.content,
      creatorId: req.user._id || Math.random() * (9000000 - 1) + 1,
    });

    return res.json({ review });
  }
);

export default handler;
