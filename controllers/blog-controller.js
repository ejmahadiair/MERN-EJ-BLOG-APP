//internal imports
import mongoose from "mongoose";
import Blog from "../models/Blog";
import User from "../models/User";

//View All blog
export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find().populate("user");
  } catch (e) {
    return console.log(e);
  }

  if (!blogs) {
    return res.status(404).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ blogs });
};

//Post a new Blog
export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (e) {
    console.error(e);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "Unable to find User By this Id" });
  }
  const blog = new Blog({
    title,
    description,
    image,
    user,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e });
  }

  return res.status(200).json({ blog });
};

//Update Blog information
export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;

  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (e) {
    return console.error(e);
  }

  if (!blog) {
    return res.status(500).json({ message: "Unable to Update The blog" });
  }
  return res.status(200).json({ blog });
};

//View spacific blog
export const getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;

  try {
    blog = await Blog.findById(id);
  } catch (e) {
    return console.error(e);
  }

  if (!blog) {
    return res.status(404).json({ message: "No blog found " });
  }
  return res.status(200).json({ blog });
};

//Delete a blog
export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;

  try {
    blog = await Blog.findByIdAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (e) {
    return console.error(e);
  }

  if (!blog) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Blog deleted successfully" });
};

//View/get exect users bologs
export const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userBlogs;

  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (e) {
    return console.error(e);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No blogs found" });
  }
  return res.status(200).json({ user: userBlogs });
};
