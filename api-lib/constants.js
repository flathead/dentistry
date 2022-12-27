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
    message: { type: 'string' },
  },
  service: {
    name: { type: 'string' },
    category_name: { type: 'string' },
    category_slug: { type: 'string' },
    description: { type: 'string' },
  },
  price: {
    name: { type: 'string' },
    cost: { type: 'string' },
  },
  comment: {
    content: { type: 'string', minLength: 1, maxLength: 280 },
  },
};
