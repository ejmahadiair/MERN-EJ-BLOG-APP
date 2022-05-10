import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "blod" };

const BlogDetails = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState();

  const handleChange = (e) => {
    setInputs((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  }, [id]);

  const SendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  console.log(blog);

  const handleSubmit = (e) => {
    e.preventDefault();
    SendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBlogs"));
  };

  return (
    <>
      <div>
        {inputs && (
          <form onSubmit={handleSubmit}>
            <Box
              border={3}
              borderColor="linear-gradient(90deg, rgba(0,9,36,1) 0%, rgba(9,57,121,1) 35%, rgba(0,185,255,1) 100%)"
              borderRadius={10}
              boxShadow="10px 10px 20px #ccc"
              padding={3}
              marginX={"auto"}
              marginY={3}
              display="flex"
              flexDirection={"column"}
              width={"80%"}
            >
              <Typography
                fontWeight={"blod"}
                padding={3}
                color="gray"
                variant="h2"
                textAlign={"center"}
              >
                Edit your Blog
              </Typography>
              <InputLabel sx={labelStyles}>Title</InputLabel>
              <TextField
                name="title"
                onChange={handleChange}
                value={inputs.title}
                margin="auto"
                variant="outlined"
              />
              <InputLabel sx={labelStyles}>Description</InputLabel>
              <TextField
                name="description"
                onChange={handleChange}
                value={inputs.description}
                margin="auto"
                variant="outlined"
              />
              <InputLabel sx={labelStyles}>ImageURL</InputLabel>
              <Button
                sx={{ mt: 2, borderRadius: 4 }}
                variant="contained"
                color="warning"
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </form>
        )}
      </div>
    </>
  );
};

export default BlogDetails;
