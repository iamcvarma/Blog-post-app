import { useState } from 'react';

export default function NewBlog({ onSubmit, initContent="",initAuthor="",initTitle=""}) {
  const [title, setTitle] = useState(initTitle);
  const [author, setAuthor] = useState(initAuthor);
  const [content, setContent] = useState(initContent);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, author, content });
    setTitle('');
    setAuthor('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Blog Post Form">
    <div className="mb-4 ">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
        Title
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
        aria-required="true"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="author">
        Author
      </label>
      <input
        className="shadow appearance-none border rounded w-[50%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="author"
        type="text"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
        required
        aria-required="true"
      />
    </div>
    <div className="mb-6">
      <label
        className="block text-gray-700 font-bold mb-2"
        htmlFor="content"
      >
        Content
      </label>
      <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[100px]"
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}