import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from './user';

export async function findServiceById(db, id) {
  const specialists = await db
    .collection('services')
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

export async function findServiceBySlug(db, slug) {
  const serviceSlug = await db
    .collection('services')
    .aggregate([
      { $match: { slug: String(slug) } },
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
  if (!serviceSlug[0]) return null;
  return serviceSlug[0];
}

export async function findServices(db, before, by, limit = 10) {
  return db
    .collection('services')
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

export async function insertService(
  db,
  { name, category_name, category_slug, description, creatorId }
) {
  const service = {
    name,
    category_name,
    category_slug,
    description,
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection('services').insertOne(service);
  service._id = insertedId;
  return service;
}