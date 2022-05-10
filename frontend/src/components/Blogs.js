import React, { useEffect, useState } from "react";

import axios from "axios";
import Blog from "./Blog";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const SendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/blog")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    SendRequest().then((data) => setBlogs(data.blogs));
  }, []);

  return (
    <>
      <div>
        {blogs &&
          blogs.map((blog, i) => {
            return (
              <div key={i}>
                <Blog
                  id={blog._id}
                  isUser={localStorage.getItem("userId") === blog.user._id}
                  title={blog.title}
                  description={blog.description}
                  image={blog.image}
                  user={blog.user.name}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Blogs;
