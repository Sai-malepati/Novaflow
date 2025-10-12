import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { Box, Typography, Button } from "@mui/material"
import Layout from "../../components/MainLayout"
import landingImage from "../../static/images/getstarted_bg_img.png" // replace with actual path

const Landing: React.FC = () => {
  return (
    <Layout hideSidebar>
      <Box
        height={"100vh"}
        sx={{
          backgroundImage: `url(${landingImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Left Content */}
        <Box
          maxWidth={650}
          sx={{
            backgroundColor: "rgb(244 244 244 / 80%)",
            height: "100vh",
            position: "relative",
          }}
        >
          <Box sx={{position: "absolute", top: "50%", transform: 'translatey(-50%)', right: 0, px: 6}}>
            <Typography
              variant="h4"
              fontWeight={300}
              color="error.main"
              fontSize="3rem"
              gutterBottom
            >
              Welcome to{" "}
              <Box component="span" fontWeight="bold" fontSize="3rem" color="error.main">
                NOVAFLOW
              </Box>
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.8 }}>
              NovaFlow is a powerful workflow automation platform that unifies workflows, boosts
              engineer productivity, and simplifies data tasks like cleansing, enrichment, data
              reporting and anomaly detection.
            </Typography>
            <Button
              component={RouterLink}
              variant="contained"
              to="/dashboard"
              sx={{
                lineHeight: 1,
                backgroundColor: "error.main",
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#b71c1c" },
              }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

export default Landing
