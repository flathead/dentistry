export const ValidateProps = {
  user: {
    username: { type: 'string', minLength: 4, maxLength: 20 },
    name: { type: 'string', minLength: 1, maxLength: 50 },
    password: { type: 'string', minLength: 8 },
    email: { type: 'string', minLength: 1 },
    bio: { type: 'string', minLength: 0, maxLength: 1200 },
    role: { type: 'string', minLength: 4 },
  },
  post: {
    content: { type: 'string', minLength: 1, maxLength: 280 },
  },
  specialist: {
    slug: { type: 'string' },
    name: { type: 'string', minLength: 2, maxLength: 100 },
    speciality: { type: 'string', minLength: 2, maxLength: 100 },
    experience: { type: 'string', minLength: 2, maxLength: 100 },
    education: { type: 'string' },
  },
  review: {
    name: { type: 'string' },
    phone: { type: 'string', maxLength: 14 },
    rating: { type: 'string', maxLength: 1 },
    content: { type: 'string', maxLength: 400 },
  },
  service: {
    slug: { type: 'string' },
    name: { type: 'string' },
    category: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'string' },
  },
  promo: {
    title: { type: 'string' },
    subtitle: { type: 'string' },
    date: { type: 'string' },
    time: { type: 'string' },
  },
  portfolio: {
    title: { type: 'string' },
  },
  comment: {
    content: { type: 'string', minLength: 1, maxLength: 280 },
  },
};
