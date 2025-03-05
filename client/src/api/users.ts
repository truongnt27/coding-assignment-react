import { baseFetch } from './base-fetch';

export const UsersApi = {
  fetchUsers: async function () {
    return await baseFetch('/api/users');
  },
  fetchUserById: async function (id: number) {
    return await baseFetch('/api/users/' + id);
  },
};
