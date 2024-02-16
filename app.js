const express = require("express");
const mongoose = require("mongoose");
const uploadutils = require("./models/uploadfile");
const Post = require("./models/post");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const Like = require("./models/like");
const Comment = require("./models/comment");
const uploadmiddleware = uploadutils.middleware;
const imageCompressor = require("./models/compression");
const MainTopic = require("./models/mainTopic");
const SubTopic = require("./models/subTopic");
dotenv.config();

const app = express();

app.use(cors());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT, () => {
  console.log(`Server is running at Port ${process.env.PORT}`);
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.post("/upload", uploadmiddleware, async function (req, res) {
  const fileNumbers = req.files ? req.files.length : 0;
  const inputFiles = [];
  let postAnonymous = false;
  if (req.body.postAnonymous === "true") {
    postAnonymous = true;
  }
  const outputFolderPath = path.join(process.cwd(), "/public/");
  const outputFolderPath1 = path.join(process.cwd(), "/uploads/");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    group: req.body.group,
    username: req.body.username,
    postAnonymous: postAnonymous,
    pictures: fileNumbers,
    pictureUrl: [],
  });

  if (req.files && req.files.length >= 1) {
    req.files.forEach(function (file) {
      post.pictureUrl.push({
        filename: file.filename,
        originalname: file.originalname,
        path: file.path,
        size: file.size,
      });
      inputFiles.push(outputFolderPath1 + file.filename);
    });
  }
  imageCompressor.compressImages(inputFiles, outputFolderPath);

  await post.save().then(() => {
    Like.create({
      postId: post._id,
      username: req.body.username,
      forum: req.body.group,
      category: "post",
      number: 0,
      postingtime: post.postingtime,
    });
  });

  console.log("Post saved");
  res.status(201).send("Post saved");
});

app.post("/uploadComment", uploadmiddleware, async function (req, res) {
  const fileNumbers = req.files ? req.files.length : 0;
  const inputFiles = [];
  let anonymous = false;
  if (req.body.anonymous === "true") {
    anonymous = true;
  }
  const outputFolderPath = path.join(process.cwd(), "/public/");
  const outputFolderPath1 = path.join(process.cwd(), "/uploads/");
  const comment = new Comment({
    postId: req.body.postId,
    content: req.body.content,
    group: req.body.group,
    username: req.body.username,
    anonymous: anonymous,
    pictures: fileNumbers,
    pictureUrl: [],
  });

  if (req.files && req.files.length >= 1) {
    req.files.forEach(function (file) {
      comment.pictureUrl.push({
        filename: file.filename,
        originalname: file.originalname,
        path: file.path,
        size: file.size,
      });
      inputFiles.push(outputFolderPath1 + file.filename);
    });
  }
  imageCompressor.compressImages(inputFiles, outputFolderPath);

  await comment.save().then(() => {
    Like.create({
      postId: comment._id,
      username: req.body.username,
      forum: req.body.group,
      category: "comment",
      number: 0,
      postingtime: comment.postingtime,
    });
  });

  console.log("Comment saved");
  res.status(201).send("Comment saved");
});

app.post("/uploadTopic", uploadmiddleware, async function (req, res) {
  const fileNumbers = req.files ? req.files.length : 0;
  var ind = null;
  const inputFiles = [];
  let postAnonymous = false;
  if (req.body.anonymous === "true") {
    postAnonymous = true;
  }
  const outputFolderPath = path.join(process.cwd(), "/public/");
  const outputFolderPath1 = path.join(process.cwd(), "/uploads/");
  let topic;

  if (
    req.body.postId === "" ||
    req.body.postId === null ||
    req.body.postId === undefined
  ) {
    topic = new MainTopic({
      title: req.body.title,
      notes: req.body.notes,
      category: req.body.category,
      username: req.body.username,
      anonymous: postAnonymous,
      pictures: fileNumbers,
      pictureUrl: [],
    });
  } else {
    topic = new SubTopic({
      postId: req.body.postId,
      title: req.body.title,
      notes: req.body.notes,
      category: req.body.category,
      username: req.body.username,
      anonymous: postAnonymous,
      pictures: fileNumbers,
      pictureUrl: [],
    });
    ind = "main";
  }

  if (req.files && req.files.length >= 1) {
    req.files.forEach(function (file) {
      topic.pictureUrl.push({
        filename: file.filename,
        originalname: file.originalname,
        path: file.path,
        size: file.size,
      });
      inputFiles.push(outputFolderPath1 + file.filename);
    });
  }
  imageCompressor.compressImages(inputFiles, outputFolderPath);

  await topic.save().then(() => {
    Like.create({
      postId: topic._id,
      username: req.body.username,
      category: req.body.category,
      number: 0,
      postingtime: topic.postingtime,
    });
  });

  console.log("Topic saved");
  res.status(201).send("Topic saved");
});

// test