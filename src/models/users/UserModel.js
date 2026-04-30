import pool from '../../config/db.js';

class UserModel {
  /**
   * Get all users
   * @returns {Promise<Array>} Array of users
   */
  static async findAll() {
    try {
      const [users] = await pool.query(
        'SELECT id, name FROM users ORDER BY id ASC'
      );
      return users;
    } catch (error) {
      console.error('Error finding all users:', error);
      throw error;
    }
  }

  /**
   * Find user by ID
   * @param {number} id - User ID
   * @returns {Promise<Object|null>} User object or null
   */
  static async findById(id) {
    try {
      const [rows] = await pool.query(
        'SELECT id, name FROM users WHERE id = ?',
        [id]
      );
      return rows[0] ?? null;
    } catch (error) {
      console.error(`Error finding user ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create new user
   * @param {Object} userData - User data { name }
   * @returns {Promise<Object>} Created user object
   */
  static async create(userData) {
    try {
      const { name } = userData;
      const [result] = await pool.query(
        'INSERT INTO users (name) VALUES (?)',
        [name]
      );
      return this.findById(result.insertId);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  /**
   * Update user by ID
   * @param {number} id - User ID
   * @param {Object} userData - User data { name }
   * @returns {Promise<Object|null>} Updated user object or null if not found
   */
  static async updateById(id, userData) {
    try {
      const { name } = userData;
      const [result] = await pool.query(
        'UPDATE users SET name = ? WHERE id = ?',
        [name, id]
      );

      if (result.affectedRows === 0) {
        return null;
      }

      return this.findById(id);
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete user by ID
   * @param {number} id - User ID
   * @returns {Promise<boolean>} True if deleted, false otherwise
   */
  static async deleteById(id) {
    try {
      const [result] = await pool.query(
        'DELETE FROM users WHERE id = ?',
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  }
}

export default UserModel;
