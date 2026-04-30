import { Router } from 'express';
import UserController from '../controllers/UserController.js';

const router = Router();
const controller = new UserController();

/**
 * Home endpoint
 */
router.get('/', (req, res) => controller.getHome(req, res));

/**
 * User endpoints
 */
router.get('/users', (req, res, next) => controller.getAllUsers(req, res, next));
router.post('/users', (req, res, next) => controller.createUser(req, res, next));

/**
 * Single user endpoints
 */
router.get('/users/:id', (req, res, next) => controller.getUserById(req, res, next));
router.put('/users/:id', (req, res, next) => controller.updateUser(req, res, next));
router.delete('/users/:id', (req, res, next) => controller.deleteUser(req, res, next));

export default router;
