import React from "react";
import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  Icon,
  IconButton,
} from "@mui/material";
import { bgcolor, Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Blog = ({ title, description, image, user, isUser, id }) => {
  console.log(title, isUser);
  const navigate = useNavigate();

  const handleEdit = (e) => {
    navigate(`/myBlogs/${id}`);
  };
  const deleteRequest = async () => {
    const deleteBlog = await axios
      .delete(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await deleteBlog.data;
    return data;
  };
  const handleDelete = (e) => {
    deleteRequest()
      .then(() => alert("Blog deleted successfully"))
      .then(() => navigate("/blogs"));
  };
  return (
    <>
      <div>
        <Card
          sx={{
            width: "40%",
            marginX: "auto",
            marginTop: 5,
            padding: 2,
            boxShadow: "5px 5px 10px #ccc",
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          {isUser && (
            <Box display="flex">
              <IconButton
                onClick={handleEdit}
                sx={{ marginLeft: "auto", color: "red" }}
              >
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDelete} sx={{ color: "red" }}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}

          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                {user}
              </Avatar>
            }
            title={title}
            subheader="September 14, 2016"
          />
          <CardMedia component="img" height="194" image={image} alt={user} />
          <CardContent>
            <hr></hr>
            <Typography variant="body2" color="text.secondary">
              <b>{user}</b> {description}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Blog;
