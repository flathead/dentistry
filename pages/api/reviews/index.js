import { ValidateProps } from '@/api-lib/constants';
import { deleteReview, findReviews, insertReview } from '@/api-lib/db/review';
import { validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import { ObjectId } from 'mongodb';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const reviews = await findReviews(
    db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  res.json({ reviews });
});

handler.post(
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
    const db = await getMongoDb();

    const review = await insertReview(db, {
      name: req.body.name,
      phone: req.body.phone,
      rating: req.body.rating,
      content: req.body.content,
      creatorId: ObjectId('63617b02f1fc6116e58b0068'),
    });

    return res.json({ review });
  }
);

handler.delete(async (req, res) => {
  if (!req.body) {
    console.log('Отсутствует тело запроса.');
  }
  const db = await getMongoDb();

  const del = await deleteReview(db, {
    itemId: req.body.itemId,
  });
  return res.json({ del });
});

export default handler;
