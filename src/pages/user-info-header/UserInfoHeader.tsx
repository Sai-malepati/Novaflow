import React from "react"
import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material"
import { EditNoteIcon } from "../../icons/EditNoteIcon"
import userImg from "../../static/images/user.png"
import userBgImg from "../../static/images/user_bg.png"
import { status } from "../../helper/common"
import Cookies from "js-cookie"
import hitUserBg from "../../static/images/hit_user_bg.png"

export const UserInfoHeader = () => {
  const workflow = Cookies.get("workflow")
  const workflowTypes = workflow ? JSON.parse(workflow) : {}
  const StatCard = ({ title, value, color }: { title: string; value: string; color: string }) => {
    return (
      <Card
        sx={{
          borderTop: `4px solid ${color}`,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          minWidth: 180,
          padding: 1,
        }}
      >
        <CardContent
          sx={{
            textAlign: "center",
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            padding: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              mb: 0.5,
            }}
          >
            <EditNoteIcon iconColor={color} width="35px" height="35px" />
            <Typography variant="body1" sx={{ fontWeight: 500, color: color }}>
              {title}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, color: color }}>
              {value}
            </Typography>
          </Box>
        </CardContent>
        <Typography
          variant="subtitle2"
          sx={{ color: "gray", alignSelf: "center", fontWeight: 500, fontSize: "0.7rem" }}
        >
          Half-yearly Report
        </Typography>
      </Card>
    )
  }

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4, justifyContent: "space-between" }}
    >
      {/* Profile Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          src={!workflowTypes?.tmin ? hitUserBg : userImg}
          alt="Profile"
          sx={{
            width: workflowTypes?.tmin ? "100px" : "70px",
            height: workflowTypes?.tmin ? "100px" : "70px",
            padding: workflowTypes?.tmin ? "5px" : "10px",
            backgroundImage: `url(${workflowTypes?.tmin && userBgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
            borderRadius: workflowTypes?.tmin && "50%",
            backgroundColor: workflowTypes?.tmin ? "#fff" : "#FDF3F3",
          }}
        />
        <Box sx={{ borderLeft: "3px solid #D5010B", paddingLeft: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "red" }}>
            Welcome, Steven
          </Typography>
          <Typography variant="body2" sx={{ color: "gray" }}>
            EXXON MSP ENGINEER
          </Typography>
        </Box>
      </Box>

      {/* Stats */}
      <Grid container spacing={2}>
        {status.map((stat, i) => (
          <Box sx={{ display: "flex", gap: 2 }} key={i}>
            <StatCard title={stat.label} value={stat.value} color={stat.color} />
          </Box>
        ))}
      </Grid>
    </Box>
  )
}
