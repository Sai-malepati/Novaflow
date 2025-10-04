import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { Box, Typography, Button } from "@mui/material"
import Layout from "../../components/MainLayout"
import landingImage from "../../static/images/getstarted_bg_img.png" // replace with actual path

const Landing: React.FC = () => {
  return (
    <Layout hideSidebar>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        height={"100vh"}
        px={4}
      >
        {/* Left Content */}
        <Box maxWidth={500}>
          <Typography variant="h4" fontWeight={300} color="error.main" fontSize="3rem" gutterBottom>
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
              borderRadius: "50px",
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

        {/* Right Illustration */}
        <Box mt={{ xs: 4, md: 0 }}>
          <img src={landingImage} alt="NovaFlow" width="600px" />
        </Box>
      </Box>
    </Layout>
  )
}

export default Landing
