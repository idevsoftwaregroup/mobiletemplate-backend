import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByName,
  getUserByEmail,
} from "../Services/users.services.js";

// GetAllUsers
export const getAllUsersController = async (req, res) => {
  const users = await getAllUsers();

  res.json(users);
};

// GetUserById
export const getUserByIdController = async (req, res) => {
  const user = await getUserById(req.params.id);

  res.json(user);
};

// GetUserByName
export const getUserByNameController = async (req, res) => {
  const user = await getUserByName(req.params.first_name);

  res.json(user);
};

// GetUserByEmail
export const getUserByEmailController = async (req, res) => {
  const user = await getUserByEmail(req.params.email);

  res.json(user);
}

// CreateUser
export const createUserController = async (req, res) => {
  const newUser = await createUser(req.body);

  res.json(newUser);
};

// UpdateUser
export const updateUserController = async (req, res) => {
  const updatedUser = await updateUser(req.params.id, req.body);

  res.json(updatedUser);
};

// DeleteUser
export const deleteUserController = async (req, res) => {
  const deletedUser = await deleteUser(req.params.id);

  res.json(deletedUser);
};
