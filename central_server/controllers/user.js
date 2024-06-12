import pool from "../models/db.js";
const client = await pool.connect();
import dotenv from "dotenv";
dotenv.config();
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { Upload } from "@aws-sdk/lib-storage";
import jwt from "jsonwebtoken";
import fs from "fs";
import util from "util";
import { fileURLToPath } from "url";
import path from "path";

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const readFile = util.promisify(fs.readFile);

// use JWT to increase 'following' of the request sender

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.ACCESS_KEY_SECRET,
  },
});
// use JWT to increase 'following' of the request sender

export const getUser = async (req, res) => {
  const { id } = req.params;
  const userId = String(id);
  try {
    // Update the number of followers for the user with the provided ID
    const result = await client.query(
      `SELECT * FROM user_details WHERE id = $1`,
      [userId]
    );

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
  const targetUserId = String(id);
  console.log(req.body);
  const { user_id } = req.user;
  try {
    // Update the number of followers for the user with the provided ID
    const followersResult = await client.query(
      `UPDATE user_details SET followers = array_append(followers, $1) WHERE user_id = $2`,
      [user_id, targetUserId]
    );
    const followingResult = await client.query(
      `UPDATE user_details SET following = array_append(following, $1) WHERE user_id = $2`,
      [targetUserId, user_id]
    );
    if (followingResult.rowCount === 0 || followersResult.rowCount === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "Follow operation successful" });
    }
  } catch (error) {
    console.error("Error updating followers:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const testUser = async (req, res) => {
  console.log("yahan aagya");
};

export const signin = async (req, res) => {
  // console.log("in backend");
  // console.log(req.body);
  const user_id = req.user.user_id;

  const result = await pool.query(
    "SELECT 1 FROM user_details WHERE user_id = $1 LIMIT 1",
    [user_id]
  );
  if (result.rowCount > 0) {
    console.log("already exists:");
    res.status(200).json({ message: "Logged in", token: req.body.token });
  } else {
    const { user, token } = req.body;
    console.log(user);
    const { uid, email, displayName, photoURL } = user;
    const userInfo = {
      uid,
      email,
      displayName,
      photoURL,
      token,
    };
    const [first_name, last_name] = displayName.split(" ");
    const insertQuery = `
  INSERT INTO user_details (user_id, username, email, password, f_name, l_name, bio, profile_picture_url, website_url, location, birth_date, followers, following)
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
      photoURL, // profile_picture_url
      null, // website_url
      null, // location
      null, // birth_date
      null, // followers
      null, // following
    ];

    const result = await pool.query(insertQuery, values);
    res.status(200).json(userInfo);
  }
};

export const updateProfile = async (req, res) => {
  const user_id = req.user.user_id;
  const { username, name, bio } = req.body;
  const [first_name, last_name] = name.split(" ");
  try {
    const result = await pool.query(
      "UPDATE user_details SET username = $1, f_name = $2, l_name = $3, bio = $4 WHERE user_id = $5 RETURNING *",
      [username, first_name, last_name, bio, user_id]
    );
    if (result.rowCount > 0) {
      console.log("update successful");
    } else {
      console.log("update failed");
    }
    res.status(200).json({ message: "Profike updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("some fucking error");
  }
};

export const updateProfilePic = async (req, res) => {
  console.log("started");
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send("Authorization header is missing");
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("JWT is missing");
  }
  let userId;
  try {
    const decoded = jwt.decode(token);
    userId = decoded.user_id; // Adjust this according to your JWT payload structure
  } catch (err) {
    return res.status(403).send("Invalid JWT");
  }

  if (!req.file) {
    console.log("NO FILES");
    return res.status(400).send("File is required");
  }
  console.log("req.file.filename:\t", req.file.filename);
  const filePath = path.join(
    __dirname,
    "..",
    "public",
    "images",
    "uploads",
    req.file.filename
  );
  const fileBuffer = await readFile(filePath);
  const fileStream = Readable.from(fileBuffer);
  const params = {
    Bucket: "postsbucket1",
    Key: `${userId}/profile/${req.file.originalname}`,
    Body: fileStream,
  };
  try {
    // Upload the file to S3
    const upload = new Upload({
      client: s3Client,
      params: params,
    });

    await upload.done();
    console.log("File uploaded successfully");

    // ------------------ MAKE META DATA ------------------

    // Insert post data into the database
    const result = await pool.query(
      "UPDATE user_details SET profile_picture_url = $1 WHERE user_id = $2 RETURNING *",
      [`https://${params.Bucket}.s3.amazonaws.com/${params.Key}`, userId]
    );

    res.status(200).json({ message: "PFP updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update profile picture");
  }
};

export const getFeed = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  let userId;
  try {
    const decoded = jwt.decode(token);
    userId = decoded.user_id; // Adjust this according to your JWT payload structure
  } catch (err) {
    return res.status(403).send("Invalid JWT");
  }
  const result = await pool.query(
    "SELECT following FROM user_details WHERE user_id = $1",
    [userId]
  );
  if (result.rows.length === 0) {
    res.status(404).json({ message: "User not found" });
  }

  const followingIds = result.rows[0].following;
  const combinedResult = await pool.query(
    `
    SELECT 
      u.user_id,
      u.f_name,
      u.profile_picture_url,
      p.id,
      p.content,
      p.created_at
    FROM 
      user_details u
    LEFT JOIN 
      posts_metadata p 
    ON 
      u.user_id = p.user_id
    WHERE 
      u.user_id = ANY($1::text[])
  `,
    [followingIds]
  );

  const userMap = {};

  combinedResult.rows.forEach((row) => {
    if (!userMap[row.user_id]) {
      userMap[row.user_id] = {
        user_id: row.user_id,
        f_name: row.f_name,
        profile_picture_url: row.profile_picture_url,
        posts: [],
      };
    }

    if (row.id) {
      userMap[row.user_id].posts.push({
        post_id: row.id,
        content: row.content,
        created_at: row.created_at,
      });
    }
  });

  const data = Object.values(userMap);

  res.status(200).json({ data });
  // console.log(result);
};
