import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleNewBlog = (event) => {
    event.preventDefault();
    createBlog({
      title,
      author,
      url
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title:{" "}
          <input
            id="title"
            type="text"
            placeholder="insert blog title here"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{" "}
          <input
            id="author"
            type="text"
            placeholder="insert blog author here"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{" "}
          <input
            id="url"
            type="text"
            placeholder="insert blog url here"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="submit-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
