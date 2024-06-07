// import pool from "../models/db.js";
// const client = await pool.connect()
import dotenv from "dotenv";
dotenv.config();
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import {Readable} from "stream";
import {Upload} from "@aws-sdk/lib-storage";

// use JWT to increase 'following' of the request sender

const s3Client = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.ACCESS_KEY_SECRET,
  },
});

export const createPost = async (req, res) => {
  console.log(req.body);
  const { title, content } = req.body;
  // const userId = req.user.uid; // Assuming you have middleware that sets req.user

  // File upload logic
  if (!req.file) {
    return res.status(400).send('File is required');
  }
  const fileStream = Readable.from(req.file.buffer);

  const params = {
    Bucket: 'postsbucket1',
    Key: req.file.originalname,
    Body: fileStream,
  };

  try {
    // Upload the file to S3
    const upload = new Upload({
      client: s3Client,
      params: params,
    });

    await upload.done();
    console.log('File uploaded successfully');

    // ------------------ MAKE META DATA ------------------

    // Insert post data into the database
    // const result = await pool.query(
    //   'INSERT INTO posts (user_id, title, content, file_url) VALUES ($1, $2, $3, $4) RETURNING *',
    //   [userId, title, content, `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`]
    // );

    res.status(200).send('Post created successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to create post');
  }
};