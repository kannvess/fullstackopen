import { useState } from "react";
import { Button, Form } from "react-bootstrap";

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
      <Form onSubmit={handleNewBlog}>
        <div>
          title:{" "}
          <Form.Control
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
          <Form.Control
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
          <Form.Control
            id="url"
            type="text"
            placeholder="insert blog url here"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button variant="success" id="submit-button" type="submit">
          create
        </Button>
      </Form>
    </div>
  );
};

export default BlogForm;
