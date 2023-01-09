import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from './user';

export async function findPortfolioById(db, id) {
  const portfolios = await db
    .collection('portfolios')
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
  if (!portfolios[0]) return null;
  return portfolios[0];
}

export async function findPortfolios(db, before, by, limit = 10) {
  return db
    .collection('portfolios')
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

export async function insertPortfolio(db, { title, after, before, creatorId }) {
  const portfolio = {
    title,
    after,
    before,
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection('portfolios').insertOne(portfolio);
  portfolio._id = insertedId;
  return portfolio;
}

export async function deletePortfolio(db, { itemId }) {
  return db
    .collection('portfolios')
    .deleteOne({
      _id: ObjectId(itemId),
    })
    .then(({ value }) => value);
}
