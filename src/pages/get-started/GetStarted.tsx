import React, { useEffect } from "react"
import { Link as RouterLink } from "react-router-dom"
import { Box, Typography, Button, Link } from "@mui/material"
import Layout from "../../components/MainLayout"
import landingImage from "../../static/images/getstarted_bg_img1.png"
import Cookies from "js-cookie"

const GetStarted: React.FC = () => {
  useEffect(() => {
    Cookies.set("workflow", JSON.stringify({ tmin: false, prv: false, hitLeak: true }))
  }, [])
  return (
    <Layout hideSidebar>
      <Box
        height="100vh"
        sx={{
          backgroundImage: `url(${landingImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <Box
          maxWidth={650}
          sx={{
            backgroundColor: "rgb(244 244 244 / 80%)",
            height: "100vh",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Center hero */}
          <Box sx={{ position: "relative", top: "50%", transform: "translateY(-50%)", px: 6 }}>
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
          <Box sx={{ textAlign: "right", px: 12, py: 5 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              New User?{" "}
              <Box component="span" fontWeight="bold">
                Register here
              </Box>
            </Typography>

            <Button
              component={RouterLink}
              to="register"
              variant="outlined"
              color="error"
              sx={{
                mb: 2,
                px: 4,
                py: 0.8,
                textTransform: "none",
                borderWidth: 1.5,
                "&:hover": { borderWidth: 1.5, backgroundColor: "rgba(239,0,43,0.08)" },
              }}
            >
              Register
            </Button>

            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem" }}>
              Having trouble in logging in?{" "}
              <Link
                component={RouterLink}
                to="/raise-ticket"
                sx={{
                  color: "error.main",
                  fontWeight: 500,
                  textDecoration: "underline",
                  "&:hover": { color: "#b71c1c" },
                }}
              >
                Raise a ticket
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

export default GetStarted
