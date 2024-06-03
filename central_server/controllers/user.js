import pool from "../models/db.js";
const client = await pool.connect()

// use JWT to increase 'following' of the request sender

export const getUser = async (req, res) =>{
    const {id} = req.params;
    const userId = String(id);
  try {
    // Update the number of followers for the user with the provided ID
    const result = await client.query(
      `SELECT * FROM user_info WHERE id = $1`,[userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).send("Internal Server Error");
  }
}

export const followUser = async (req, res) => {
  const {id} = req.params;
    const userId = String(id);
  try {
    // Update the number of followers for the user with the provided ID
    const result = await client.query(
      `UPDATE user_info SET followers = followers + 1 WHERE id = $1`,[userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating followers:", error);
    res.status(500).send("Internal Server Error");
  }
};
