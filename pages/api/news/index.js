import { ValidateProps } from '@/api-lib/constants';
import { deleteNews, findNews, insertNews, patchNews } from '@/api-lib/db/any';
import { auths, validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import bodyParser from 'body-parser';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const categories = await findNews(
    db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  res.json({ categories });
});

handler.post(
  ...auths,
  bodyParser.json(),
  validateBody({
    type: 'object',
    properties: {
      slug: ValidateProps.news.slug,
      title: ValidateProps.news.title,
      content: ValidateProps.news.content,
    },
    required: ['title', 'content'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const db = await getMongoDb();

    const news = await insertNews(db, {
      creatorId: req.user._id,
      slug: req.body.slug,
      title: req.body.title,
      content: req.body.content,
    });

    return res.json({ news });
  }
);

handler.delete(bodyParser.json(), async (req, res) => {
  if (!req.body) {
    console.log('Отсутствует тело запроса.');
  }
  const db = await getMongoDb();

  const del = await deleteNews(db, {
    itemId: req.body.itemId,
  });
  console.log('Новость удалена.');
  return res.json({ del });
});

handler.patch(async (req, res) => {
  if (!req.body) {
    console.log('Отсутствует тело запроса.');
    res.status(500);
    return;
  }
  const db = await getMongoDb();

  const news = await patchNews(db, {
    id: req.body.itemId,
    slug: req.body.slug,
    title: req.body.title || req.body.oldtitle,
    content: req.body.content || req.body.oldcontent,
  });

  return res.json({ news });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
