import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from './user';

export async function findSpecialistById(db, id) {
  const specialists = await db
    .collection('specialists')
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

export async function findSpecialistBySlug(db, slug) {
  const specialistSlug = await db
    .collection('specialists')
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
  if (!specialistSlug[0]) return null;
  return specialistSlug[0];
}

export async function findSpecialists(db, before, by, limit = 10) {
  return db
    .collection('specialists')
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

export async function insertSpecialist(
  db,
  { slug, name, speciality, experience, photo, education, creatorId }
) {
  const specialist = {
    slug,
    name,
    speciality,
    experience,
    photo,
    education,
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db
    .collection('specialists')
    .insertOne(specialist);
  specialist._id = insertedId;
  return specialist;
}
