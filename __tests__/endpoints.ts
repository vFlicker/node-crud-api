export const userRoutes = {
  create: '/api/users',
  getAll: '/api/users',
  getOneById: (id: string) => `/api/users/${id}`,
  update: (id: string) => `/api/users/${id}`,
  delete: (id: string) => `/api/users/${id}`,
};
