import React from "react"
import { Box, Typography } from "@mui/material"
import { TMinStep } from "./TMinScaffold"

type StepState = "done" | "active" | "idle"

type Step = {
//   title: string
//   state: StepState
//   helper?: string
activeStep: number
}

type StepNodeProps = {
  title: string
  state: StepState
  index: number
  helper?: string
}

const steps: TMinStep[] = [
  { title: "Gathering Details", helper: "Complete", state: "done" },
  { title: "Gathering Documents", helper: "In Progress", state: "active" },
  { title: "Data Collection (OCR)", state: "idle" },
  { title: "Review Data", state: "idle" },
  { title: "T-Min Review", state: "idle" },
  { title: "Report Generation", state: "idle" },
];

const StepNode: React.FC<StepNodeProps> = ({ title, state, index, helper }) => {
  let circle
  let labelColor = "#999"
  let helperText = helper || `Step ${index}`

  if (state === "done") {
    circle = (
      <Box
        sx={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          backgroundColor: "#28a745",
          zIndex: 1,
        }}
      />
    )
    labelColor = "#28a745"
    helperText = "done"
  } else if (state === "active") {
    circle = (
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "4px solid #ff9800",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: "#ff9800",
          }}
        />
      </Box>
    )
    labelColor = "#ff9800"
    helperText = "In Progress"
  } else {
    circle = (
      <Box
        sx={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          border: "2px solid #ccc",
          zIndex: 1,
          backgroundColor: "#fff",
        }}
      />
    )
  }

  return (
    <Box textAlign="center" width="100%">
      <Typography variant="body2" fontWeight="bold">
        {title}
      </Typography>
      <Box display="flex" justifyContent="center" mb={1}>
        {circle}
      </Box>

      <Typography variant="caption" sx={{ color: labelColor, fontWeight: 500 }}>
        {helperText}
      </Typography>
    </Box>
  )
}

const Connector: React.FC<{ active?: boolean }> = ({ active }) => (
  <Box flex={1} height={3} bgcolor={active ? "#28a745" : "#ccc"} mx={1} alignSelf="center" />
)

export const Stepper: React.FC<Step> = ({ activeStep }) => {
  //     const totalTrackWidth = 41 // rem

  //     // find the current active step index
  //     const currentIndex =
  //       steps.findIndex((s) => s.state === "active") !== -1
  //         ? steps.findIndex((s) => s.state === "active")
  //         : (steps.findLastIndex?.((s) => s.state === "done") ?? 0)

  //     // progress width in rem
  //     const progressWidth = (currentIndex / (steps.length - 1)) * totalTrackWidth
  //   return (
  //     <Box
  //       display="flex"
  //       alignItems="center"
  //       width="100%"
  //       sx={{
  //         position: "relative",
  //         "&:before": {
  //           content: '""',
  //           flex: 1,
  //           height: 10,
  //           backgroundColor: "#E8E8E8",
  //           width: "calc(100% - 7rem)",
  //           top: 10,
  //           left: "3.5rem",
  //           position: "absolute",
  //         },
  //         "&:after": {
  //           content: '""',
  //           position: "absolute",
  //           top: 10,
  //           left: "4.5rem",
  //           height: 10,
  //           width: `${progressWidth}rem`,
  //           backgroundColor: "#28a745", // green
  //           borderRadius: "2px",
  //           transition: "width 0.3s ease",
  //         },
  //       }}
  //     >
  //       {steps.map((s, i) => {
  //         const isActive = s.state === "done" || s.state === "active"

  //         return (
  //           <React.Fragment key={s.title}>
  //             <StepNode title={s.title} state={s.state} index={i + 1} helper={s.helper} />
  //             {/* {i < steps.length - 1 && (
  //               <Connector
  //                 active={
  //                   isActive ||
  //                   steps[i + 1].state === "done" ||
  //                   steps[i + 1].state === "active"
  //                 }
  //               />
  //             )} */}
  //           </React.Fragment>
  //         )
  //       })}
  //     </Box>
  //   )
  return (
    <Box sx={{ width: "100%", p: 4 }}>
      {/* Progress bar background */}
      <Box
        sx={{
          position: "relative",
          height: 8,
          backgroundColor: "#e0e0e0",
          borderRadius: 5,
        }}
      >
        {/* Progress indicator */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: `${(activeStep / (steps.length - 1)) * 100}%`,
            backgroundColor: "#1976d2",
            borderRadius: 5,
            transition: "width 0.3s ease",
          }}
        />
      </Box>

      {/* Circles with text */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
          mt: -3,
        }}
      >
        {steps.map((step, index) => {
          const isActive = index <= activeStep

          // Bottom text rules
          let bottomText = `Step ${index + 1}`
          if (index < activeStep) bottomText = "Completed"
          else if (index === activeStep) bottomText = "In Progress"

          return (
            <Box key={index} textAlign="center" sx={{ flex: 1 }}>
              {/* Top title (from array) */}
              <Typography variant="body2" mb={1}>
                {step.title}
              </Typography>

              {/* Circle */}
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  mx: "auto",
                  backgroundColor: isActive ? "#1976d2" : "#e0e0e0",
                  border: "3px solid white",
                  boxShadow: "0 0 4px rgba(0,0,0,0.3)",
                }}
              />

              {/* Bottom status text */}
              <Typography variant="body2" mt={1}>
                {bottomText}
              </Typography>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
