import Blog from "../model/Blog.js";

export const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({});
  res.status(200).json(blogs);
};

export const createBlog = async (req, res) => {
  try {
    const { author, title, content } = req.body;
    if (!author || !title || !content)
      return res.status(400).json({ error: "missing fields" });

    const newBlog = new Blog({ author, title, content });

    await newBlog.save();
    return res.status(201).json(await Blog.find({}));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id: blogId } = req.params;

    if (!blogId) {
      return res.status(400).json({ error: "blogId is missing" });
    }

    const { author, title, content } = req.body;

    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    blog.content = content;
    blog.title = title;
    blog.author = author;
    await blog.save();

    const allBlogs = await Blog.find({});
    res.status(201).json(allBlogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const upvoteBlog = async (req, res) => {
  try {
    const { id: blogId } = req.params;

    if (!blogId) {
      return res.status(400).json({ error: "blogId is missing" });
    }

    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    blog.upvotes += 1;
    await blog.save();

    const allBlogs = await Blog.find({});
    res.status(201).json(allBlogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const downvoteBlog = async (req, res) => {
  try {
    const { id: blogId } = req.params;

    if (!blogId) {
      return res.status(400).json({ error: "blogId is missing" });
    }

    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    blog.upvotes -= 1;
    await blog.save();

    const allBlogs = await Blog.find({});
    res.status(201).json(allBlogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBlog = async (req, res) => {
    try {
      const { id: blogId } = req.params;
  
      if (!blogId) {
        return res.status(400).json({ error: "blogId is missing" });
      }
  
      const blog = await Blog.findOne({ _id: blogId });
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
  
      await Blog.deleteOne({ _id: blogId });
  
      const allBlogs = await Blog.find({});
      res.status(200).json(allBlogs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
