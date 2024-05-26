import { useState } from "react";
import {
  AppBar,
  Drawer,
  Stack,
  Toolbar,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import {
  Menu,
  Dashboard,
  Filter3,
  EmojiObjects,
  Group,
  Settings,
  AssessmentOutlined,
} from "@mui/icons-material";

const nav = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const lists = [
    {
      name: "Dashboard",
      icon: <Dashboard />,
      route: "/",
    },
    {
      name: "Agents",
      icon: <Group />,
      route: "/agents",
    },
    {
      name: "Latest Bets",
      icon: <Filter3 />,
      route: "/latestbets",
    },
    {
      name: "Winning Numbers",
      icon: <EmojiObjects />,
      route: "/winningnumbers",
    },
    {
      name: "Winner Lists",
      icon: <Group />,
      route: "/winnerlists",
    },
    {
      name: "Ban Numbers",
      icon: <Settings />,
      route: "/bannumbers",
    },
    {
      name: "Limit Numbers",
      icon: <Settings />,
      route: "/limitnumbers",
    },
    {
      name: "Manage Odds",
      icon: <Settings />,
      route: "/manageodds",
    },
    {
      name: "Reports",
      icon: <AssessmentOutlined />,
      route: "/reports",
    },
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {lists.map((list) => (
          <ListItem disablePadding key={list.name}>
            <NavLink to={list.route}>
              <ListItemButton>
                <ListItemIcon>{list.icon}</ListItemIcon>
                <ListItemText primary={list.name} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed" style={{ backgroundColor: "#E72929" }}>
      <Toolbar>
        <Stack
          justifyContent="space-between"
          alignItems={"center"}
          direction="row"
          width="100%"
        >
          <h2 className="text-2xl font-bold">Lottery</h2>
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <Menu />
          </IconButton>
        </Stack>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <h2 className="text-2xl font-bold p-3">Lottery</h2>
          <Divider />
          {DrawerList}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default nav;
