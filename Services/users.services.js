import users from '../Data/mock.json' with { type: 'json' };
let data = [...users];
// Service:::GET
export const getAllUsers = () => data;
export const getUserById = (id) => data.find(user => user.id === Number(id));
export const getUserByName = (first_name) => data.find(user => user.first_name === first_name);
// Service:::POST
export const createUser = (user) => {
  const newUser = {
    ...user,
    id: Date.now()
  };
  data.push(newUser);
  return newUser;
};
// Service:::PUT
export const updateUser = (id, user) => {
  const updatedUser = { ...user, id: Number(id) };
  data = data.map(u => u.id === Number(id) ? updatedUser : u);
  return updatedUser;
};
// Service:::DELETE
export const deleteUser = (id) => {
  const deletedUser = data.find(user => user.id === Number(id));
  data = data.filter(user => user.id !== Number(id));
  return deletedUser;
};
// Service:::PUT
