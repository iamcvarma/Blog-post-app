import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Modal from "./components/Modal";
import NavBar from "./components/NavBar";
import NewBlog from "./components/NewBlog";

const BASE_SERVER_URL = import.meta.env.VITE_BASE_URL;

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [blogList, setBlogList] = useState([]);
  useEffect(() => {
    async function getBlogList() {
      const res = await fetch(`${BASE_SERVER_URL}/blog/`);
      const blogs = await res.json();
      setBlogList(blogs);
      console.log(blogs);
    }
    getBlogList();
  }, []);

  const handleSubmit = async (blog) => {
    const res = await fetch(`${BASE_SERVER_URL}/blog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });
    const newBlogs = await res.json();
    setBlogList(newBlogs);
    setIsOpen(false);
  };
  return (
    <div className="w-full h-full">
      <NavBar
        onBlog={() => setIsOpen(true)}
        role="navigation"
        aria-label="Main navigation"
      />
      <Blog
        blogList={blogList}
        setBlogList={setBlogList}
        role="region"
        aria-label="Blog section"
      />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        role="dialog"
        aria-modal="true"
        aria-label="Create new blog modal"
      >
        <div
          className="h-full w-full bg-slate-200 backdrop-blur-lg border-2 rounded-lg border-gray-400 p-3"
          role="document"
        >
          <NewBlog
            onSubmit={handleSubmit}
            role="form"
            aria-label="Create new blog form"
          />
        </div>
      </Modal>
    </div>
  );
}

export default App; 
