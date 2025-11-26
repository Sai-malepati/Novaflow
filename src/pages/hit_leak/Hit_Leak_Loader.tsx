import React, { useEffect, useState } from "react"
import { Modal, Box, Typography, CircularProgress, styled } from "@mui/material"
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress"
import uploadLoaderImg from "../../static/images/uploadLoaderImg.png"
import { useNavigate } from "react-router-dom"

interface HitLeakModalLoaderProps {
  open: boolean
  onClose?: () => void
  frameInterval?: number // milliseconds
}
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#4FA7FF",
    ...theme.applyStyles("dark", {
      backgroundColor: "#4FA7FF",
    }),
  },
}))

const HitLeakModalLoader: React.FC<HitLeakModalLoaderProps> = ({
  open,
  onClose,
  frameInterval = 300,
}) => {
  const [progress, setProgress] = React.useState(10)
  const [dots, setDots] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length < 3) {
          return prevDots + "."
        } else {
          return ""
        }
      })
    }, frameInterval)

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [open])

  useEffect(() => {
    if (!open) return

    const timer = setInterval(() => {
     setProgress((prev) => {
       if (prev >= 100) {
         clearInterval(timer) // stop interval immediately
         navigate("/create-task-list") // navigate after finish
         return 100
       }
       return prev + 10
     })
    }, frameInterval)
    // Close after 5.5 seconds
    return () => clearInterval(timer)
  }, [open, frameInterval])

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          textAlign: "center",
          width: 450,
          height: 420,
        }}
      >
        <Box
          sx={{
            mt: 2,
            width: "100%",
            height: 250,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={uploadLoaderImg}
            alt={`upload loader img`}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
        <Box
          sx={{
            mb: 2,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 600 }}>
            Loading
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 600 }}>
            {dots}
          </Typography>
        </Box>
        <BorderLinearProgress variant="determinate" value={progress} />
        <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 600 }}>
          Loading the input file, please wait…
        </Typography>
      </Box>
    </Modal>
  )
}

export default HitLeakModalLoader
