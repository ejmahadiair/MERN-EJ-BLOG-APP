import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import Header from "./components/Header";
import UserBlogs from "./components/UserBlogs";
import BlogDetails from "./components/BlogDetails";
import AddBlog from "./components/AddBlog";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";

function App() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <Route path="/auth" exect element={<Auth />} />
          ) : (
            <>
              <Route path="/blogs" exect element={<Blogs />} />
              <Route path="/blogs/add" exect element={<AddBlog />} />
              <Route path="/myBlogs" exect element={<UserBlogs />} />
              <Route path="/myBlogs/:id" exect element={<BlogDetails />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;
