import React from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { EditNoteIcon } from "../../icons/EditNoteIcon";
import userImg from '../../static/images/user.png';
import userBgImg from '../../static/images/user_bg.png';
import { status } from "../../helper/common";
 
export const UserInfoHeader = () => {
    const StatCard = ({
        title,
        value,
        color,
      }: {
        title: string;
        value: number;
        color: string;
      }) => {
        return (
          <Card
            sx={{
              borderTop: `4px solid ${color}`,
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              minWidth: 180,
            }}
          >
            <CardContent
              sx={{
                textAlign: 'center',
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1,
                paddingBottom: '16px !important',
              }}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}
              >
                <EditNoteIcon iconColor={color} width="25px" height="25px" />
                <Typography variant="body1" sx={{ fontWeight: 500, color: color }}>
                  {title}
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: color }}>
                {value}
              </Typography>
            </CardContent>
          </Card>
        );
      };
   
return (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
    {/* Profile Section */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Avatar
        src={userImg}
        alt="Profile"
        sx={{
          width: 100,
          height: 100,
          padding: '5px',
          backgroundImage: `url(${userBgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
          borderRadius: '50%',
        }}
      />
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'red' }}>
          Welcome, Steven
        </Typography>
        <Typography variant="body2" sx={{ color: 'gray' }}>
          EXXON MSP ENGINEER
        </Typography>
      </Box>
    </Box>
 
    {/* Stats */}
    <Grid container spacing={2}>
      {status.map((stat, i) => (
        <Box sx={{ display: 'flex', gap: 2 }} key={i}>
          <StatCard title={stat.label} value={27} color={stat.color} />
        </Box>
      ))}
    </Grid>
  </Box>
);
}
 