const db = require("../config/db");



// ADD STORE
const addStore = (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body;

    const sql =
      "INSERT INTO stores(name,email,address,owner_id) VALUES(?,?,?,?)";

    db.query(
      sql,
      [name, email, address, owner_id],
      (err, result) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Store creation failed",
          });
        }

        res.status(201).json({
          message: "Store added successfully",
        });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};



// GET ALL STORES
const getStores = (req, res) => {
  try {
    const sql = `
      SELECT 
      stores.*,
      AVG(ratings.rating) AS average_rating
      FROM stores
      LEFT JOIN ratings
      ON stores.id = ratings.store_id
      GROUP BY stores.id
    `;

    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to fetch stores",
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
// GET SINGLE STORE
const getSingleStore = (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const sql =
      "SELECT * FROM stores WHERE id=?";

    db.query(
      sql,
      [id],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({
              message:
                "Failed to fetch store",
            });
        }

        res
          .status(200)
          .json(result[0]);
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Server Error",
    });
  }
};



// UPDATE STORE
const updateStore = (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      address,
    } = req.body;

    const sql =
      "UPDATE stores SET name=?, email=?, address=? WHERE id=?";

    db.query(
      sql,
      [
        name,
        email,
        address,
        id,
      ],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({
              message:
                "Update Failed",
            });
        }

        res
          .status(200)
          .json({
            message:
              "Store Updated Successfully",
          });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Server Error",
    });
  }
};



// DELETE STORE
const deleteStore = (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const sql =
      "DELETE FROM stores WHERE id=?";

    db.query(
      sql,
      [id],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({
              message:
                "Delete Failed",
            });
        }

        res
          .status(200)
          .json({
            message:
              "Store Deleted Successfully",
          });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Server Error",
    });
  }
};
module.exports = {
  addStore,
  getStores,
  getSingleStore,
  updateStore,
  deleteStore,
};