import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from './user';

export async function findAnyById(db, collection, id, before, limit = 10) {
  let postType;
  if (!collection === 'services') {
    postType = await db
      .collection(collection)
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
    if (!postType[0]) return null;
    return postType[0];
  } else {
    return db
      .collection('services')
      .aggregate([
        {
          $match: {
            categoryId: new ObjectId(id),
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
}

export async function findAny(db, collection, before, by, limit = 10) {
  return db
    .collection(collection)
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

// SECTION Find Data
// ANCHOR Category (find)
export async function findCategories(db, before, by, limit = 100) {
  return db
    .collection('categories')
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

export async function findCategoryById(db, id) {
  const categories = await db
    .collection('categories')
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
  if (!categories[0]) return null;
  return categories[0];
}

export async function findCategoryBySlug(db, slug) {
  const categorySlug = await db
    .collection('categories')
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
  if (!categorySlug[0]) return null;
  return categorySlug[0];
}

// ANCHOR Service (find)
export async function findServiceById(db, id) {
  const services = await db
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
  if (!services[0]) return null;
  return services[0];
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

export async function findServiceByCategorySlug(db, categorySlug) {
  const serviceSlug = await db
    .collection('services')
    .aggregate([
      { $match: { categorySlug: String(categorySlug) } },
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

export async function findServices(db, before, limit = 100) {
  return db
    .collection('services')
    .aggregate([
      {
        $match: {
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

// SECTION Insert Data
// ANCHOR Category (insert)
export async function insertCategory(
  db,
  { slug, title, short, description, preview, price, creatorId }
) {
  const category = {
    slug,
    title,
    short,
    description,
    preview,
    price,
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection('categories').insertOne(category);
  category._id = insertedId;
  return category;
}

// ANCHOR Service (insert)
export async function insertService(
  db,
  categoryId,
  { slug, name, description, price, preview, creatorId }
) {
  const category = await findCategoryById(db, categoryId);
  const service = {
    slug,
    name,
    description,
    price,
    preview,
    categoryId: new ObjectId(categoryId),
    categorySlug: category.slug,
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection('services').insertOne(service);
  service._id = insertedId;
  return service;
}

// SECTION Delete
// ANCHOR Category (delete)
export async function deleteCategory(db, { itemId }) {
  return db
    .collection('categories')
    .deleteOne({
      _id: ObjectId(itemId),
    })
    .then(({ value }) => value);
}

// SECTION Patch
// ANCHOR Category (patch)
export async function patchCategory(
  db,
  { id, title, short, slug, description, price, preview }
) {
  const category = {
    slug,
    title,
    short,
    description,
    price,
    preview,
  };
  return db
    .collection('categories')
    .updateOne({ _id: ObjectId(id) }, { $set: category }, { upsert: false });
}