import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { authActions } from "../store";

const Header = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const logout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("userId");
  };
  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background:
            "linear-gradient(90deg, rgba(0,9,36,1) 0%, rgba(9,57,121,1) 35%, rgba(0,185,255,1) 100%)",
        }}
      >
        <Toolbar>
          <Typography variant="h4">Blog EJ</Typography>
          {isLoggedIn && (
            <Box display="flex" marginX="auto">
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
                <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
                <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />
              </Tabs>
            </Box>
          )}

          <Box display="flex" marginLeft="auto">
            {!isLoggedIn && (
              <>
                <Button
                  LinkComponent={Link}
                  to="/auth"
                  variant="contained"
                  sx={{ margin: 1, borderRadius: 10 }}
                  color="warning"
                >
                  Login
                </Button>
                <Button
                  LinkComponent={Link}
                  to="/auth"
                  variant="contained"
                  sx={{ margin: 1, borderRadius: 10 }}
                  color="warning"
                >
                  Signup
                </Button>
              </>
            )}
            {isLoggedIn && (
              <Button
                onClick={logout}
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
