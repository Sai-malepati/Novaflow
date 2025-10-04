import React from "react"
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box } from "@mui/material"
import DashboardIcon from "@mui/icons-material/Dashboard"
import AssignmentIcon from "@mui/icons-material/Assignment"
import ReportIcon from "@mui/icons-material/Report"
import NotificationsIcon from "@mui/icons-material/Notifications"
import PersonIcon from "@mui/icons-material/Person"
import SettingsIcon from "@mui/icons-material/Settings"
import { useNavigate } from "react-router-dom"
import logo from "../static/images/logo.png"

const drawerWidth = 240

type MenuItemProp = {
  text: string
  icon: React.ReactNode
  navigateTo: string | string[]
  defaultLink?: string
}

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, navigateTo: "/dashboard" },
    {
      text: "T-Min",
      icon: <AssignmentIcon />,
      navigateTo: ["/tmin", "/tmin-review", "/tmin-model", "/tmin-docs", "/tmin-report"],
      defaultLink: "/tmin",
    },
    { text: "Trainings", icon: <ReportIcon /> },
    { text: "Reports", icon: <ReportIcon /> },
    { text: "Tickets Status", icon: <NotificationsIcon /> },
    { text: "Profile", icon: <PersonIcon /> },
    { text: "Setting", icon: <SettingsIcon /> },
  ]
  const currentPath = window.location.pathname

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        ["& .MuiDrawer-paper"]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#f0d0d2",
          paddingTop: "46px", // space for header
          color: "#5A5A5A",
        },
      }}
    >
      <Box
        sx={{
          height: "45px",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-14px",
            left: "50%",
            right: 0,
            width: "80px",
            height: "40px",
            backgroundColor: "#fff",
            transform: "translateX(-50%) rotate(180deg)",
            borderTopLeftRadius: "50% 40px",
            borderTopRightRadius: "50% 40px",
          },
        }}
      >
        {/* Replace with your logo */}
        <img
          src={logo}
          alt="Logo"
          style={{ width: "30px", height: "30px", zIndex: 1, position: "relative", top: "0.8rem" }}
        />
      </Box>
      <Box sx={{ overflow: "auto" }}>
        <List sx={{ paddingTop: 4 }}>
          {menuItems.map((item) => {
            const isSelected = Array.isArray(item.navigateTo)
              ? item.navigateTo.includes(currentPath)
              : currentPath === item.navigateTo

            const pathToNavigate = Array.isArray(item.navigateTo)
              ? item?.defaultLink || item.navigateTo[0]
              : item.navigateTo

            return (
              <ListItemButton
                key={item.text}
                onClick={() => navigate(pathToNavigate || "")}
                selected={isSelected}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#D5010B",
                    color: "white",
                    "& .MuiListItemIcon-root": { color: "white" },
                  },
                  "&:hover": {
                    backgroundColor: "#D5010B",
                    color: "white",
                    "& .MuiListItemIcon-root": { color: "white" },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            )
          })}
        </List>
      </Box>
    </Drawer>
  )
}

export default Sidebar
