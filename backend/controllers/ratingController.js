const db = require("../config/db");



// =============================
// ADD OR UPDATE RATING
// =============================
const addRating = (req, res) => {
  try {
    const { store_id, rating } = req.body;

    const user_id = req.user.id;

    // CHECK IF USER ALREADY RATED
    const checkSql =
      "SELECT * FROM ratings WHERE user_id=? AND store_id=?";

    db.query(
      checkSql,
      [user_id, store_id],
      (err, result) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Database Error",
          });
        }

        // =============================
        // UPDATE EXISTING RATING
        // =============================
        if (result.length > 0) {
          const updateSql =
            "UPDATE ratings SET rating=? WHERE user_id=? AND store_id=?";

          db.query(
            updateSql,
            [rating, user_id, store_id],
            (err2) => {
              if (err2) {
                console.log(err2);

                return res.status(500).json({
                  message:
                    "Rating update failed",
                });
              }

              return res.status(200).json({
                message:
                  "Rating updated successfully",
              });
            }
          );
        }

        // =============================
        // ADD NEW RATING
        // =============================
        else {
          const insertSql =
            "INSERT INTO ratings(user_id, store_id, rating) VALUES(?,?,?)";

          db.query(
            insertSql,
            [user_id, store_id, rating],
            (err3) => {
              if (err3) {
                console.log(err3);

                return res.status(500).json({
                  message: "Rating failed",
                });
              }

              return res.status(201).json({
                message:
                  "Rating added successfully",
              });
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};



// =============================
// GET ALL RATINGS
// =============================
const getRatings = (req, res) => {
  try {
    const sql = `
      SELECT
        ratings.id,
        ratings.rating,

        users.name AS user_name,
        users.email AS user_email,

        stores.name AS store_name,
        stores.address AS store_address

      FROM ratings

      LEFT JOIN users
      ON ratings.user_id = users.id

      LEFT JOIN stores
      ON ratings.store_id = stores.id

      ORDER BY ratings.id DESC
    `;

    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message:
            "Failed to fetch ratings",
        });
      }

      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};



// =============================
// DELETE RATING
// =============================
const deleteRating = (req, res) => {
  try {
    const { id } = req.params;

    const sql =
      "DELETE FROM ratings WHERE id=?";

    db.query(sql, [id], (err) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message:
            "Failed to delete rating",
        });
      }

      res.status(200).json({
        message:
          "Rating deleted successfully",
      });
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};




module.exports = {
  addRating,
  getRatings,
  deleteRating,
};