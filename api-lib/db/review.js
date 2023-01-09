import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from './user';

export async function findReviewById(db, id) {
  const reviews = await db
    .collection('reviews')
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      { $limit: 1 },
      {
        $lookup: {
          from: 'users',
          localField: 'creatorId',
          foreignField: '_id',
          as: 'creator',
        },
      },
      { $unwind: '$creator' },
      { $project: dbProjectionUsers('creator.') },
    ])
    .toArray();
  if (!reviews[0]) return null;
  return reviews[0];
}

export async function findReviews(db, before, by, limit = 10) {
  return db
    .collection('reveiws')
    .aggregate([
      {
        $match: {
          ...(by && { creatorId: new ObjectId(by) }),
          ...(before && { createdAt: { $lt: before } }),
        },
      },
      { $sort: { _id: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'creatorId',
          foreignField: '_id',
          as: 'creator',
        },
      },
      { $unwind: '$creator' },
      { $project: dbProjectionUsers('creator.') },
    ])
    .toArray();
}

export async function insertReview(
  db,
  { name, phone, rating, content, creatorId }
) {
  const review = {
    name,
    phone,
    rating,
    content,
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection('reveiws').insertOne(review);
  review._id = insertedId;
  return review;
}
