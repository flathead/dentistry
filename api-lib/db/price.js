import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from '.';

export async function findPrices(db, serviceId, before, limit = 10) {
  return db
    .collection('prices')
    .aggregate([
      {
        $match: {
          serviceId: new ObjectId(serviceId),
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

export async function insertPrice(db, serviceId, { name, cost, creatorId }) {
  const price = {
    name,
    cost,
    serviceId: new ObjectId(serviceId),
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection('prices').insertOne(price);
  price._id = insertedId;
  return price;
}

export async function deletePrice(db, serviceId, { name, cost, creatorId }) {
  const price = {
    name,
    cost,
    serviceId: new ObjectId(serviceId),
    creatorId,
    createdAt: new Date(),
  };
  await db.collection('prices').deleteOne(price);
  return price;
}
