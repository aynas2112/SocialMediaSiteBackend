import pool from "../models/db.js";
const client = await pool.connect()
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import dotenv from "dotenv";
// dotenv.config();

improt {Readable} from "stream";
// use JWT to increase 'following' of the request sender

const s3Client = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.ACCESS_KEY_SECRET,
  },
});

export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id; // Assuming you have middleware that sets req.user

  // File upload logic
  const fileStream = Readable.from(req.file.buffer);

  const params = {
    Bucket: 'YOUR_S3_BUCKET_NAME',
    Key: req.file.originalname,
    Body: fileStream,
  };

  try {
    // Upload the file to S3
    await s3Client.send(new PutObjectCommand(params));
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