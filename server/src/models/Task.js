const { runQuery, getRow, getAllRows } = require('./database');

class Task {
  static async create(taskData) {
    const { user_id, title, description } = taskData;
    
    try {
      const result = await runQuery(
        'INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)',
        [user_id, title, description || '']
      );
      
      // Fetch the created task
      const task = await getRow(
        'SELECT * FROM tasks WHERE id = ?',
        [result.id]
      );
      
      return task;
    } catch (error) {
      throw error;
    }
  }

  static async findByUserId(userId) {
    try {
      const tasks = await getAllRows(
        'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
      );
      
      return tasks;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id, userId) {
    try {
      const task = await getRow(
        'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
        [id, userId]
      );
      
      return task;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, userId, updateData) {
    const { title, description, completed } = updateData;
    
    try {
      const result = await runQuery(
        'UPDATE tasks SET title = ?, description = ?, completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
        [title, description, completed ? 1 : 0, id, userId]
      );
      
      if (result.changes === 0) {
        return null;
      }
      
      // Fetch the updated task
      const task = await getRow(
        'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
        [id, userId]
      );
      
      return task;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id, userId) {
    try {
      const result = await runQuery(
        'DELETE FROM tasks WHERE id = ? AND user_id = ?',
        [id, userId]
      );
      
      return result.changes > 0;
    } catch (error) {
      throw error;
    }
  }

  static async getStats(userId) {
    try {
      const stats = await getRow(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN completed = 1 THEN 1 ELSE 0 END) as completed,
          SUM(CASE WHEN completed = 0 THEN 1 ELSE 0 END) as pending
        FROM tasks 
        WHERE user_id = ?
      `, [userId]);
      
      return {
        total: stats.total || 0,
        completed: stats.completed || 0,
        pending: stats.pending || 0
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Task;