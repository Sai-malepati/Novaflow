import React from "react"
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box } from "@mui/material"
import AssignmentIcon from "@mui/icons-material/Assignment"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

import logo from "../static/images/logo.png"
import LaunchPad from "./LaunchPad"

// Icons
import { DashboardIcon } from "icons/DashboardIcon"
import { TminIcon } from "icons/TminIcon"
import { TrainingIcon } from "icons/TrainingIcon"
import { ReportIcon } from "icons/ReportIcon"
import { TicketStatusIcon } from "icons/TicketStatusIcon"
import { AlertIcon } from "icons/AlertIcon"
import { ProfileIcon } from "icons/ProfileIcon"
import { SettingsIcon } from "icons/SettingsIcon"

const drawerWidth = 200

const Sidebar: React.FC = () => {
  const navigate = useNavigate()

  // Read workflow cookie
  const workflow = Cookies.get("workflow")
  const workflowTypes = workflow ? JSON.parse(workflow) : {}

  const currentPath = window.location.pathname

  // FINAL MENU LIST (CONDITION ADDED HERE)
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, navigateTo: "/dashboard", isAuthenticated: true },

    {
      text: "T-Min",
      isAuthenticated: workflowTypes?.tmin,
      icon: <TminIcon />,
      navigateTo: ["/tmin", "/tmin-review", "/tmin-model", "/tmin-docs", "/tmin-report"],
      defaultLink: "/tmin",
    },

    {
      text: "Hit & Leak",
      isAuthenticated: workflowTypes?.hitLeak,
      icon: <AssignmentIcon />,
      navigateTo: ["/upload-file", "/create-task-list"], // ✅ include both pages
      defaultLink: "/upload-file", // default click action
    },

    { text: "Trainings", icon: <TrainingIcon />, navigateTo: "/trainings", isAuthenticated: true },

    // ****************************************************
    // ⭐ CONDITION: HIT & LEAK → "Create Task List"
    // ⭐ OTHER WORKFLOWS → "Reports"
    // ****************************************************
    {
      text: workflowTypes?.hitLeak ? "Create Task List" : "Reports",
      icon: <ReportIcon />,
      navigateTo: workflowTypes?.hitLeak ? "/upload-file" : "/reports",
      isAuthenticated: true,
    },

    {
      text: "Ticket Status",
      icon: <TicketStatusIcon />,
      navigateTo: "/ticket-status",
      isAuthenticated: true,
    },

    { text: "Alert", icon: <AlertIcon />, navigateTo: "/alert", isAuthenticated: true },
    { text: "Profile", icon: <ProfileIcon />, navigateTo: "/profile", isAuthenticated: true },
    { text: "Settings", icon: <SettingsIcon />, navigateTo: "/settings", isAuthenticated: true },
  ]

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#f0d0d2",
          color: "#5A5A5A",
          paddingTop: "46px",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
        },
      }}
    >
      {/* === Logo === */}
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
            width: "80px",
            height: "40px",
            backgroundColor: "#fff",
            transform: "translateX(-50%) rotate(180deg)",
            borderTopLeftRadius: "50% 40px",
            borderTopRightRadius: "50% 40px",
          },
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "30px",
            height: "30px",
            zIndex: 1,
            position: "relative",
            top: "0.8rem",
          }}
        />
      </Box>

      {/* === Menu Section === */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          overflowX: "hidden",
          pr: 0,
          mt: 1,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <List sx={{ paddingTop: 4 }}>
          {menuItems.map((item) => {
            if (!item.isAuthenticated) return null

            const isSelected = Array.isArray(item.navigateTo)
              ? item.navigateTo.includes(currentPath)
              : currentPath === item.navigateTo

            const pathToNavigate = Array.isArray(item.navigateTo)
              ? item.defaultLink || item.navigateTo[0]
              : item.navigateTo

            return (
              <ListItemButton
                key={item.text}
                onClick={() => navigate(pathToNavigate)}
                selected={isSelected}
                sx={{
                  py: 0.5,
                  minHeight: 36,
                  pl: 2,
                  pr: 0,
                  "& .MuiListItemIcon-root": {
                    minWidth: 32,
                    marginRight: 0.5,
                  },
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
                <ListItemIcon sx={{ minWidth: 50, mr: 0.5 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            )
          })}
        </List>
      </Box>

      {/* === Sticky LaunchPad === */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "#f0d0d2",
          zIndex: 1,
          width: "100%",
          "& > div": {
            width: "100%",
            paddingLeft: 0,
            paddingRight: 0,
          },
        }}
      >
        <LaunchPad />
      </Box>
    </Drawer>
  )
}

export default Sidebar
