import { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUserByName } from '../Services/users.services.js';

// GetAllUsers
export const getAllUsersController = (req, res) => {
  const users = getAllUsers();
  res.json(users);
};
// GetUserById
export const getUserByIdController = (req, res) => {
  const user = getUserById(req.params.id);
  res.json(user);
};
//GetUserByName
export const getUserByNameController = (req, res) => {
  const user = getUserByName(req.params.first_name);
  res.json(user);
};
// CreateUser
export const createUserController = (req, res) => {
  const newUser = createUser(req.body);
  res.json(newUser);
};
// UpdateUser
export const updateUserController = (req, res) => {
  const updatedUser = updateUser(req.params.id, req.body);
  res.json(updatedUser);
};
// DeleteUser
export const deleteUserController = (req, res) => {
  const deletedUser = deleteUser(req.params.id);
  res.json(deletedUser);
};
