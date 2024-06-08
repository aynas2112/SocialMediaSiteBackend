import pool from "../models/db.js";
const client = await pool.connect();

// use JWT to increase 'following' of the request sender

export const getUser = async (req, res) => {
  const { id } = req.params;
  const userId = String(id);
  try {
    // Update the number of followers for the user with the provided ID
    const result = await client.query(`SELECT * FROM user_details WHERE id = $1`, [
      userId,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const followUser = async (req, res) => {
  const { id } = req.params;
  const userId = String(id);
  try {
    // Update the number of followers for the user with the provided ID
    const result = await client.query(
      `UPDATE user_details SET followers = followers + 1 WHERE id = $1`,
      [userId]
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

export const testUser = async (req, res) => {
  console.log("yahan aagya");
};

export const signin = async (req, res) => {
  console.log("in backend");
  // console.log(req.body);
  const { user, token } = req.body;
  const { uid, email, displayName, photoURL } = user;
  const userInfo = {
    uid,
    email,
    displayName,
    photoURL,
    token,
  };
  const [first_name, last_name] = displayName.split(' ');
  const insertQuery = `
  INSERT INTO user_details (user_id, username, email, password, f_name, l_name, bio, profile_picture_url, website_url, location, birth_date, posts, followers, following)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
  RETURNING *;`;

  const values = [
    uid, // user_id
    uid, // username
    email, // email
    "google_authenticated", // password
    first_name, // f_name
    last_name, // l_name
    `Hi, I am ${first_name}`, // bio
    null, // profile_picture_url
    null, // website_url
    null, // location
    null, // birth_date
    null, // followers
    null, // following
  ];

  const result = await pool.query(
    insertQuery,values
  );
  res.status(200).json(userInfo);
};
