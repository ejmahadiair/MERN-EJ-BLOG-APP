import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "../components/Blog";
const UserBlogs = () => {
  const [user, setUser] = useState([]);
  const id = localStorage.getItem("userId");
  const SendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    SendRequest().then((data) => setUser(data.user));
  }, []);
  console.log(user);
  return (
    <>
      <div>
        {user &&
          user.blogs &&
          user.blogs.map((blog, i) => {
            return (
              <div key={i}>
                <Blog
                  id={blog._id}
                  isUser={true}
                  title={blog.title}
                  description={blog.description}
                  image={blog.image}
                  user={user.name}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default UserBlogs;
