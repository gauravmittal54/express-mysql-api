module.exports = {
    getTableStructureQuery: `SHOW COLUMNS FROM registration`,
  
    createTableQuery: `
      CREATE TABLE IF NOT EXISTS registration (
        UID VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        score INT NOT NULL,
        country VARCHAR(2) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `,

    dropTableQuery : `DROP TABLE IF EXISTS registration`,
  
    insertDataQuery: `
      INSERT INTO registration (UID, name, score, country, timestamp)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP);
    `,
  
    getUserQuery: `SELECT * FROM registration WHERE UID = ?`,
  
    getAllUsersQuery: `SELECT * FROM registration`,
  
    getTop200UsersQuery: `
      SELECT *
      FROM registration
      WHERE YEARWEEK(timestamp, 1) = YEARWEEK(CURDATE(), 1)
      ORDER BY score DESC
      LIMIT 200;
    `,
  
    getLastWeekLeaderboardQuery: `
      SELECT *
      FROM registration
      WHERE YEARWEEK(timestamp, 1) = YEARWEEK(CURDATE() - INTERVAL 1 WEEK, 1)
        AND country = ?
      ORDER BY score DESC
      LIMIT 200;
    `,
  
    updateUserQuery: `
      UPDATE registration
      SET name = ?, score = ?, country = ?
      WHERE UID = ?;
    `,
  };
  