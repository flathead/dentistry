import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from './user';

export async function findPromoById(db, id) {
  const specialists = await db
    .collection('promos')
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
  if (!specialists[0]) return null;
  return specialists[0];
}

export async function findPromos(db, before, by, limit = 10) {
  return db
    .collection('promos')
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

export async function insertPromo(
  db,
  { title, subtitle, date, time, preview, creatorId }
) {
  const promo = {
    title,
    subtitle,
    date,
    time,
    preview,
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection('promos').insertOne(promo);
  promo._id = insertedId;
  return promo;
}

export async function deletePromo(db, { itemId }) {
  return db
    .collection('promos')
    .deleteOne({
      _id: ObjectId(itemId),
    })
    .then(({ value }) => value);
}

export async function patchPromo(
  db,
  { id, title, subtitle, date, time, preview }
) {
  const promo = {
    title,
    subtitle,
    date,
    time,
    preview,
  };
  return db
    .collection('promos')
    .updateOne({ _id: ObjectId(id) }, { $set: promo }, { upsert: false });
}
