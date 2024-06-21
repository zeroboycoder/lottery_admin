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
  AssessmentOutlined,
  Looks3,
  Block,
  KeyboardDoubleArrowUp,
  Receipt,
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
      route: "/admin/",
    },
    {
      name: "Agents",
      icon: <Group />,
      route: "/admin/agents",
    },
    {
      name: "Agent Transaction",
      icon: <Receipt />,
      route: "/admin/agenttransactions",
    },
    {
      name: "Latest Bets",
      icon: <Filter3 />,
      route: "/admin/latestbets",
    },
    {
      name: "Winning Numbers",
      icon: <EmojiObjects />,
      route: "/admin/winningnumbers",
    },
    {
      name: "Winner Lists",
      icon: <Group />,
      route: "/admin/winnerlists",
    },
    {
      name: "Ban Numbers",
      icon: <Block />,
      route: "/admin/bannumbers",
    },
    {
      name: "Limit Numbers",
      icon: <Looks3 />,
      route: "/admin/limitnumbers",
    },
    {
      name: "Manage Odds",
      icon: <KeyboardDoubleArrowUp />,
      route: "/admin/manageodds",
    },
    {
      name: "Reports",
      icon: <AssessmentOutlined />,
      route: "/admin/reports",
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
    <AppBar position="fixed" style={{ backgroundColor: "#D32F2E" }}>
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
