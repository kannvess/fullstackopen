import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "./reducers/notificationReducer";
import { setBlogs, newBlog, updateBlog, removeBlog } from "./reducers/blogReducer";
import { setUser, login } from "./reducers/userReducer";
import loginService from './services/login'
import UserList from "./components/UserList";
import userService from './services/users'
import { Route, Routes } from "react-router-dom";

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => (
  <div>
    <form onSubmit={handleLogin}>
      <div>
        username{" "}
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password{" "}
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
);

const Notification = ({ message, messageCategory }) => {
  if (message === null) {
    return null;
  }

  return <div className={messageCategory}>{message}</div>;
};

const UserCredential = ({ user, handleLogout }) => (
  <p>
    {user.name} logged in <button onClick={handleLogout}>logout</button>
  </p>
);

const BlogList = ({ blogs, updateBlog, removeBlog }) => {
  return (
    <div id="blog-list">
      {blogs.slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
          />
        ))}
    </div>
  );
};

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)
  const [users, setUsers] = useState([])

  useEffect(() => {
    dispatch(setBlogs())
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  useEffect(() => {
    userService
      .getAll()
      .then(response => {
        setUsers(response)
      })
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      dispatch(setUser(user))
      dispatch(setMessage(null, ""))
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setMessage("wrong username or password", "error"))
      setUsername("");
      setPassword("");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setMessage(null, ""))
    dispatch(setUser(null));
  };

  const handleNewBlog = (blog) => {
    formRef.current.toggleVisibility();
    dispatch(setMessage(`added ${blog.title}`, "success"))
    dispatch(newBlog(blog));
  };

  const handleUpdate = (likedBlog) => {
    dispatch(updateBlog(likedBlog))
  };

  const handleRemove = (blogId) => {
    dispatch(removeBlog(blogId))
  };

  const formRef = useRef();

  return (
    <div>
      {user === null ? (
        <div>
          <h2>log in to application</h2>
          <Notification message={notification.message} messageCategory={notification.messageCategory} />
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification message={notification.message} messageCategory={notification.messageCategory} />
          <UserCredential user={user} handleLogout={handleLogout} />
          <Routes>
            <Route path="/users" element={<UserList users={users} />} />
            <Route path="/" element={
              <div>
                <Togglable buttonLabel="new blog" ref={formRef}>
                  <BlogForm createBlog={handleNewBlog} />
                </Togglable>
                <BlogList
                  blogs={blogs}
                  updateBlog={handleUpdate}
                  removeBlog={handleRemove}
                />
              </div>
            } />
            </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
