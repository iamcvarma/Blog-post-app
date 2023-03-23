const NavBar = ({ onBlog }) => {
  return (
    <nav className="w-full z-10 min-h-[10%] flex gap-2 justify-between bg-black text-white items-center p-2">
      <h1 className="text-5xl">Blogger</h1>
      <button
        className="bg-green-700 rounded-lg p-2"
        onClick={onBlog}
        aria-label="Add New Comment"
      >
        Add New Comment
      </button>
    </nav>
  );
};

export default NavBar;
