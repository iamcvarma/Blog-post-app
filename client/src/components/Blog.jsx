import BlogCard from "./BlogCard";

const Blog = ({ blogList, setBlogList }) => {
  return (
    <div className="m-2" role="list">
      {blogList.map((blog) => (
        <BlogCard
          key={blog._id}
          {...blog}
          setBlogList={setBlogList}
          role="listitem"
          aria-label={blog.title}
        />
      ))}
    </div>
  );
};

export default Blog;
