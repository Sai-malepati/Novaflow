import React from "react"
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box } from "@mui/material"
import AssignmentIcon from "@mui/icons-material/Assignment"
import { useNavigate } from "react-router-dom"
import logo from "../static/images/logo.png"
import Cookies from "js-cookie"
import LaunchPad from "./LaunchPad"
import { DashboardIcon } from "icons/DashboardIcon"
import { TminIcon } from "icons/TminIcon"
import { TrainingIcon } from "icons/TrainingIcon"
import { ReportIcon } from "icons/ReportIcon"
import { TicketStatusIcon } from "icons/TicketStatusIcon"
import { AlertIcon } from "icons/AlertIcon"
import { ProfileIcon } from "icons/ProfileIcon"
import { SettingsIcon } from "icons/SettingsIcon"

const drawerWidth = 200

type MenuItemProp = {
  text: string
  icon: React.ReactNode
  navigateTo: string | string[]
  defaultLink?: string
}

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const workflow = Cookies.get('workflow')
  const workflowTypes = workflow ? JSON.parse(workflow) : {}

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
      navigateTo: ["/upload-file"],
      defaultLink: "/upload-file",
      // navigateTo: ["/tmin", "/tmin-review", "/tmin-model", "/tmin-docs", "/tmin-report"],
      // defaultLink: "/tmin",
    },
    { text: "Trainings", icon: <TrainingIcon />, isAuthenticated: true },
    { text: "Reports", icon: <ReportIcon />, isAuthenticated: true },
    { text: "Ticket Status", icon: <TicketStatusIcon />, isAuthenticated: true },
    { text: "Alert", icon: <AlertIcon />, isAuthenticated: true },
    { text: "Profile", icon: <ProfileIcon />, isAuthenticated: true },
    { text: "Settings", icon: <SettingsIcon />, isAuthenticated: true },
  ]
  const currentPath = window.location.pathname

  return (
    //   <Drawer
    //     variant="permanent"
    //     sx={{
    //       width: drawerWidth,
    //       flexShrink: 0,
    //       ["& .MuiDrawer-paper"]: {
    //         width: drawerWidth,
    //         boxSizing: "border-box",
    //         backgroundColor: "#f0d0d2",
    //         paddingTop: "46px", // space for header
    //         color: "#5A5A5A",
    //       },
    //     }}
    //   >
    //     <Box
    //       sx={{
    //         height: "45px",
    //         backgroundColor: "#fff",
    //         display: "flex",
    //         alignItems: "center",
    //         justifyContent: "center",
    //         position: "relative",
    //         "&::after": {
    //           content: '""',
    //           position: "absolute",
    //           bottom: "-14px",
    //           left: "50%",
    //           right: 0,
    //           width: "80px",
    //           height: "40px",
    //           backgroundColor: "#fff",
    //           transform: "translateX(-50%) rotate(180deg)",
    //           borderTopLeftRadius: "50% 40px",
    //           borderTopRightRadius: "50% 40px",
    //         },
    //       }}
    //     >
    //       {/* Replace with your logo */}
    //       <img
    //         src={logo}
    //         alt="Logo"
    //         style={{ width: "30px", height: "30px", zIndex: 1, position: "relative", top: "0.8rem" }}
    //       />
    //     </Box>
    //     <Box sx={{ overflow: "auto" }}>
    //       <List sx={{ paddingTop: 4 }}>
    //         {menuItems.map((item) => {
    //           const isSelected = Array.isArray(item.navigateTo)
    //             ? item.navigateTo.includes(currentPath)
    //             : currentPath === item.navigateTo

    //           const pathToNavigate = Array.isArray(item.navigateTo)
    //             ? item?.defaultLink || item.navigateTo[0]
    //             : item.navigateTo

    //           return (
    //             item.isAuthenticated ? <ListItemButton
    //               key={item.text}
    //               onClick={() => navigate(pathToNavigate || "")}
    //               selected={isSelected}
    //               sx={{
    //                 py: 0.5,
    //                 minHeight: 36, 
    //                 pl: 2,
    //                 "& .MuiListItemIcon-root": {
    //                   minWidth: 32,    // 👈 reduces reserved space
    //                   marginRight: 0.5, // 👈 fine-tunes distance
    //                 },
    //                 "&.Mui-selected": {
    //                   backgroundColor: "#D5010B",
    //                   color: "white",
    //                   "& .MuiListItemIcon-root": { color: "white" },
    //                 },
    //                 "&:hover": {
    //                   backgroundColor: "#D5010B",
    //                   color: "white",
    //                   "& .MuiListItemIcon-root": { color: "white" },
    //                 },
    //               }}
    //             >
    //               <ListItemIcon sx={{ minWidth: 50 , mr: .5}}>{item.icon}</ListItemIcon>
    //               <ListItemText primary={item.text} />
    //             </ListItemButton> : null
    //           )
    //         })}
    //       </List>
    //     </Box>
    //     <Box
    //   sx={{
    //     position: "sticky",
    //     justifyContent: "space-between",
    //     bottom: 0,
    //     backgroundColor: "#f0d0d2",
    //     zIndex: 1,
    //     boxShadow: "0 -2px 4px rgba(0,0,0,0.1)",
    //   }}
    // >
    //   <LaunchPad />
    // </Box>
    //   </Drawer>
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
      paddingTop: "46px", // space for header
      display: "flex",
      flexDirection: "column",
      height: "100vh",          // full height
      overflow: "hidden",       // prevent outer scrollbars
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
      pr: 0,   // No right padding
      mt: 1,
      scrollbarWidth: "none",             // Firefox
      "&::-webkit-scrollbar": {
        display: "none",                  // Chrome, Safari, Edge
      },
    }}
  >
    <List sx={{ paddingTop: 4 }}>
      {menuItems.map((item) => {
        const isSelected = Array.isArray(item.navigateTo)
          ? item.navigateTo.includes(currentPath)
          : currentPath === item.navigateTo

        const pathToNavigate = Array.isArray(item.navigateTo)
          ? item.defaultLink || item.navigateTo[0]
          : item.navigateTo

        return (
          item.isAuthenticated && (
            <ListItemButton
              key={item.text}
              onClick={() => navigate(pathToNavigate || "")}
              selected={isSelected}
              sx={{
                py: 0.5,
                minHeight: 36,
                pl: 2,
                pr: 0,  // No right padding
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
              <ListItemIcon sx={{ minWidth: 50, mr: 0.5 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          )
        )
      })}
    </List>
  </Box>

  {/* === Sticky Bottom LaunchPad === */}
  <Box
    sx={{
      position: "sticky",
      bottom: 0,
      backgroundColor: "#f0d0d2",
      zIndex: 1,
      pb: 0,         // No bottom padding
      mb: 0,         // No margin bottom
      width: "100%", // Ensures LaunchPad uses full width
      "& > div": {
        transform: "scale(1)",  // Remove shrink effect to use full space
        transformOrigin: "bottom center",
        width: "100%",          // Ensures LaunchPad icon section takes full width
        paddingLeft: 0,         // Remove left padding
        paddingRight: 0,        // Remove right padding
      },
    }}
  >
    <LaunchPad />
  </Box>
</Drawer>

  )
}

export default Sidebar
