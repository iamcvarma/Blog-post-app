import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";
import NewBlog from "./NewBlog";
import { ImArrowUp2, ImArrowDown2 } from "react-icons/im";
import {MdDeleteOutline} from 'react-icons/md'
import { TbEdit } from "react-icons/tb";
const BASE_SERVER_URL = import.meta.env.VITE_BASE_URL;
export default function BlogCard({
  _id,
  title,
  author,
  updatedAt,
  content,
  upvotes,
  setBlogList,
}) {
  const [expanded, setExpanded] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);

  const handleSubmit = async (blog) => {
    const res = await fetch(`${BASE_SERVER_URL}/blog/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });
    const newBlogs = await res.json();
    setBlogList(newBlogs);
    setIsEdit(false);
  };

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const handleUpvote = async () => {
    if (isDownvoted) {
      await fetch(
        `${BASE_SERVER_URL}/blog/${_id}/${isUpvoted ? "downvote" : "upvote"}`,
        {
          method: "PATCH",
        }
      );
    }
    const res = await fetch(
      `${BASE_SERVER_URL}/blog/${_id}/${isUpvoted ? "downvote" : "upvote"}`,
      {
        method: "PATCH",
      }
    );
    const data = await res.json();
    setBlogList(data);
    setIsUpvoted((pre) => !pre);
    setIsDownvoted(false);
  };

  const handleDownvote = async () => {
    if (isUpvoted) {
      await fetch(
        `${BASE_SERVER_URL}/blog/${_id}/${isDownvoted ? "upvote" : "downvote"}`,
        {
          method: "PATCH",
        }
      );
    }
    const res = await fetch(
      `${BASE_SERVER_URL}/blog/${_id}/${isDownvoted ? "upvote" : "downvote"}`,
      {
        method: "PATCH",
      }
    );
    const data = await res.json();
    setBlogList(data);
    setIsDownvoted((pre) => !pre);
    setIsUpvoted(false);
  };

  const handleDelete = async()=>{
    const res = await fetch(`${BASE_SERVER_URL}/blog/${_id}`,{method:"DELETE"})
    const allBlog = await res.json()
    setBlogList(allBlog)
  }

  const variants = {
    closed: { height: "auto" },
    open: { height: "auto" },
  };

  const transition = {
    duration: 0.3,
    ease: "easeInOut",
  };

  return (
    <div className="border border-gray-400 rounded-lg overflow-hidden m-2 flex hover:bg-slate-200">
      <div className="w-full">
        <motion.div
          className="px-4 py-2 cursor-pointer"
          onClick={handleClick}
          initial="closed"
          animate={expanded ? "open" : "closed"}
          variants={variants}
          transition={transition}
          aria-expanded={expanded}
        >
          <div className="flex justify-between">
            <h2 className="text-lg font-bold">{title}</h2>
            <div className="flex gap-1">
              <button
                className="text-emerald-600 hover:bg-amber-100 hover:text-emerald-900 p-2 rounded-md"
                onClick={() => setIsEdit((pre) => !pre)}
                aria-label="Edit button"
              >
                <TbEdit />
              </button>
              <button
                className="text-red-600 hover:bg-amber-100 hover:text-emerald-900 p-2 rounded-md"
                onClick={handleDelete}
                aria-label="Delete button"
              >
                <MdDeleteOutline />
              </button>
            </div>
          </div>
          <div className="flex gap-2 justify-start items-center">
            <p className="text-gray-600">{author}</p>
            <p className="text-xs text-gray-400" aria-label={`Last updated ${new Date(updatedAt).toLocaleString()}`}>
              {new Date(updatedAt).toLocaleString()}
            </p>
          </div>
        </motion.div>
        <motion.div
          className="px-4 mt-4"
          initial={{ height: 0 }}
          animate={{ height: expanded ? "auto" : 0 }}
          transition={transition}
          aria-hidden={!expanded}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {content}
          </motion.div>
        </motion.div>
      </div>
      <div className="w-[50px]  flex flex-col justify-start items-center pt-1">
        <button
          className="rounded-md p-2 hover:bg-orange-200"
          onClick={handleUpvote}
          aria-label="Upvote button"
        >
          <ImArrowUp2 color={isUpvoted ? "red" : ""} />
        </button>
        <p>{upvotes}</p>
        <button
          className="rounded-md p-2 hover:bg-orange-200"
          onClick={handleDownvote}
          aria-label="Downvote button"
        >
          <ImArrowDown2 color={isDownvoted ? "blue" : ""} />
        </button>
      </div>
      <Modal isOpen={isEdit} onClose={() => setIsEdit(false)}>
        <div className="h-full w-full bg-slate-200 backdrop-blur-lg border-2 rounded-lg border-gray-400 p-3">
          <NewBlog
            onSubmit={handleSubmit}
            initContent={content}
            initAuthor={author}
            initTitle={title}
          />
        </div>
      </Modal>
    </div>

  );
}
