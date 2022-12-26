import { findSpecialistById } from '@/api-lib/db/specialist';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();
  const user = await findSpecialistById(db, req.query.userId);
  res.json({ user });
});

export default handler;
