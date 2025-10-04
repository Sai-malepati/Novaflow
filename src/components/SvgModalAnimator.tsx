import React, { useEffect, useState } from "react"
import { Modal, Box, Typography, CircularProgress } from "@mui/material"
import svg1 from "../../public/svgs/Group_1.svg"
import svg2 from "../../public/svgs/Group_2.svg"
import svg3 from "../../public/svgs/Group_3.svg"
import svg4 from "../../public/svgs/Group_4.svg"
import svg5 from "../../public/svgs/Group_5.svg"
import svg6 from "../../public/svgs/Group_6.svg"
import svg7 from "../../public/svgs/Group_7.svg"
import svg8 from "../../public/svgs/Group_8.svg"
import svg9 from "../../public/svgs/Group_9.svg"
import svg10 from "../../public/svgs/Group_10.svg"

interface SvgModalAnimatorProps {
  open: boolean
  onClose: () => void
  selectedEslId: string | null
  frameInterval?: number // milliseconds
}

const svgFrames: string[] = [svg1, svg2, svg3, svg4, svg5, svg6, svg7, svg8, svg9, svg10]
const toolsText = ["CREDO", "Autodesk Vault", "OpenText"]

const SvgModalAnimator: React.FC<SvgModalAnimatorProps> = ({
  open,
  onClose,
  selectedEslId,
  frameInterval = 500,
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [currentToolIndex, setCurrentToolIndex] = useState(0)
  const [displayText, setDisplayText] = useState(toolsText[0]);
  const [doneText, setDoneText] = useState("")

  useEffect(() => {
    if (!open) return

    const timer = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % svgFrames.length)
    }, frameInterval)

    return () => clearInterval(timer)
  }, [open, frameInterval]);

  useEffect(() => {
    if (!open) return

    // Rotate tool texts
    let index = 0
    setDisplayText(toolsText[index])

    const textTimer = setInterval(() => {
      index++
      if (index < toolsText.length) {
        setDisplayText(toolsText[index])
      } else {
        clearInterval(textTimer)
        setDoneText("All Done! Ready To Go Novaflow....")
      }
    }, 1500) // change interval per tool here

    return () => clearInterval(textTimer)
  }, [open])

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
          width: 600,
          height: 400,
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
            src={svgFrames[currentFrame]}
            alt={`Frame ${currentFrame}`}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
        <Typography
          variant="body1"
          sx={{
            mt: 2,
            transition: "opacity 0.4s ease",
            minHeight: "1.5em",
          }}
        >
          {doneText ? (
            doneText
          ) : (
            <>
              Fetching Documents from <strong>{displayText}</strong>, Please Wait...
            </>
          )}
        </Typography>
        {/* <CircularProgress sx={{ mt: 2 }} /> */}
      </Box>
    </Modal>
  )
}

export default SvgModalAnimator
