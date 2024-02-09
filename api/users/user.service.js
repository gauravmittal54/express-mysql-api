const pool = require("../../config/database");
const sqlqueries = require("../sql/sqlqueries");

module.exports = {
  create: (data, callback) => {
    const getTableStructureQuery = sqlqueries.getTableStructureQuery;
    const createTableQuery = sqlqueries.createTableQuery;
    const insertDataQuery = sqlqueries.insertDataQuery;

    pool.query(getTableStructureQuery, (error, results, fields) => {
      if (error) {
        return callback(error);
      }

      const isTableStructureMatch = results.every(
        (column) =>
          column.Field === "UID" ||
          column.Field === "name" ||
          column.Field === "score" ||
          column.Field === "country" ||
          column.Field === "timestamp"
      );

      if (!isTableStructureMatch) {
        pool.query(sqlqueries.dropTableQuery, (error, results, fields) => {
          if (error) {
            return callback(error);
          }

          pool.query(createTableQuery, (error, results, fields) => {
            if (error) {
              return callback(error);
            }

            pool.query(
              insertDataQuery,
              [data.UID, data.name, data.score, data.country, new Date()],
              (error, results, fields) => {
                if (error) {
                  return callback(error);
                }

                return callback(null, results);
              }
            );
          });
        });
      } else {
        pool.query(
          insertDataQuery,
          [data.UID, data.name, data.score, data.country, new Date()],
          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            return callback(null, results);
          }
        );
      }
    });
  },

  getUserByUID: (uid, callback) => {
    const getUserQuery = sqlqueries.getUserQuery;
    pool.query(getUserQuery, [uid], (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },

  getAllUsers: (callback) => {
    const getAllUsersQuery = sqlqueries.getAllUsersQuery;
    pool.query(getAllUsersQuery, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },

  getTop200Users: (callback) => {
    const getAllUsersQuery = sqlqueries.getTop200UsersQuery;
    pool.query(getAllUsersQuery, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },

  getTop200UsersByCountryAndLastWeek: (country, callback) => {
    const getLastWeekLeaderboardQuery = sqlqueries.getLastWeekLeaderboardQuery;

    pool.query(
      getLastWeekLeaderboardQuery,
      [country],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  updateUserByUID: (uid, data, callback) => {
    const updateUserQuery = sqlqueries.updateUserQuery;
    pool.query(
      updateUserQuery,
      [data.name, data.score, data.country, uid],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        console.log(results);
        return callback(null, results);
      }
    );
  },
};
