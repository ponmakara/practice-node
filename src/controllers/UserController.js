import BaseController, { ClientError } from './baseController.js';
import UserModel from '../models/users/UserModel.js';

class UserController extends BaseController {
  /**
   * Get API home endpoint
   */
  getHome(req, res) {
    return this.success(res, 'Welcome to User API', {
      version: '1.0.0',
      endpoints: {
        users: 'GET /api/users',
        createUser: 'POST /api/users',
        getUser: 'GET /api/users/:id',
        updateUser: 'PUT /api/users/:id',
        deleteUser: 'DELETE /api/users/:id'
      }
    });
  }

  /**
   * Get all users
   */
  async getAllUsers(req, res, next) {
    try {
      const users = await UserModel.findAll();
      return this.success(res, 'Users retrieved successfully', {
        users,
        count: users.length
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      next(error);
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(req, res, next) {
    try {
      const id = this.validateId(req.params.id);
      const user = await UserModel.findById(id);

      if (!user) {
        return this.notFound(res, 'User');
      }

      return this.success(res, 'User retrieved successfully', user);
    } catch (error) {
      console.error(`Error fetching user ${req.params.id}:`, error);
      next(error);
    }
  }

  /**
   * Create new user
   */
  async createUser(req, res, next) {
    try {
      const name = this.validateName(req.body.name);
      const createdUser = await UserModel.create({ name });
      return this.success(res, 'User created successfully', createdUser, 201);
    } catch (error) {
      if (error instanceof ClientError) {
        return this.error(res, error.message, error.statusCode);
      }
      console.error('Error creating user:', error);
      next(error);
    }
  }

  /**
   * Update user by ID
   */
  async updateUser(req, res, next) {
    try {
      const id = this.validateId(req.params.id);
      const name = this.validateName(req.body.name);
      const updatedUser = await UserModel.updateById(id, { name });

      if (!updatedUser) {
        return this.notFound(res, 'User');
      }

      return this.success(res, 'User updated successfully', updatedUser);
    } catch (error) {
      if (error instanceof ClientError) {
        return this.error(res, error.message, error.statusCode);
      }
      console.error(`Error updating user ${req.params.id}:`, error);
      next(error);
    }
  }

  /**
   * Delete user by ID
   */
  async deleteUser(req, res, next) {
    try {
      const id = this.validateId(req.params.id);
      const isDeleted = await UserModel.deleteById(id);

      if (!isDeleted) {
        return this.notFound(res, 'User');
      }

      return this.success(res, 'User deleted successfully');
    } catch (error) {
      if (error instanceof ClientError) {
        return this.error(res, error.message, error.statusCode);
      }
      console.error(`Error deleting user ${req.params.id}:`, error);
      next(error);
    }
  }
}

export default UserController;
