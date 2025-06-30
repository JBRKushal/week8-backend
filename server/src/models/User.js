const bcrypt = require('bcryptjs');
const { runQuery, getRow } = require('./database');

class User {
  static async create(userData) {
    const { name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 12);
    
    try {
      const result = await runQuery(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
      );
      
      return {
        id: result.id,
        name,
        email
      };
    } catch (error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        throw new Error('Email already exists');
      }
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const user = await getRow('SELECT * FROM users WHERE email = ?', [email]);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const user = await getRow('SELECT id, name, email, created_at FROM users WHERE id = ?', [id]);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async setResetToken(userId, token, expiry) {
    try {
      await runQuery(
        'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?',
        [token, expiry, userId]
      );
    } catch (error) {
      throw error;
    }
  }

  static async findByResetToken(token) {
    try {
      const user = await getRow(
        'SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > datetime("now")',
        [token]
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async resetPassword(userId, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    try {
      await runQuery(
        'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?',
        [hashedPassword, userId]
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;