const { poolPromise } = require('../config/db');

exports.getUsers = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('SELECT * FROM Person3');
    console.log(result);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.setUser = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`
        insert into Person3 (FirstName, LastName, Age)
        values ('Hadi', 'ja', 24)

        `);
    console.log(result);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

