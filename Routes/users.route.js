import { Router } from 'express';
import { getAllUsersController, getUserByIdController, createUserController, updateUserController, deleteUserController, getUserByNameController } from '../Controllers/users.controller.js';

const router = Router();

router.get('/', getAllUsersController);
router.get('/:id', getUserByIdController);
router.get('/name/:first_name', getUserByNameController);
router.post('/', createUserController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);

export default router;
