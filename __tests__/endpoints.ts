export const userRoutes = {
  create: '/api/users',
  getAll: '/api/users',
  getOneById: (id: string) => `/api/users/${id}`,
};
