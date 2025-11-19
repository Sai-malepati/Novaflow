import * as React from "react"
import { Dialog, Button, Box, Typography } from "@mui/material"
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded"
import { useEffect, useState } from "react"

interface AdobeSuccessDialogProps {
  open: boolean
  onOk?: () => void
  message?: string
}


const PopupDialog: React.FC<AdobeSuccessDialogProps> = ({
  open,
  onOk,
  message = "T-Min Registration done successfully.",
}) => {

  const [openModal, setOpenModal] = useState(false)
  const handleOkClick = () => {
    onOk?.()
    setOpenModal(false)
  }

  useEffect(() => {
    setOpenModal(open)

  }, [open])
  return (
    <Dialog
      open={openModal}
      onClose={() => setOpenModal(false)}
      maxWidth={false}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0,0,0,0.55)",
          },
        },
        paper: {
          sx: {
            width: 350,
            borderRadius: 2,
            p: 2,
            boxShadow: "0 12px 28px rgba(0,0,0,.25)",
          },
        },
      }}
    >
      {/* Icon */}
      <Box display="flex" justifyContent="center" mt={1} mb={1.5}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            bgcolor: "#EAF7ED",
            color: "#22C55E",
          }}
        >
          <CheckCircleRoundedIcon sx={{ fontSize: 40 }} />
        </Box>
      </Box>


      <Typography align="center" sx={{ fontSize: 14, color: "text.secondary", mb: 2 }}>
        {message}
      </Typography>


      <Box display="flex" justifyContent="center">
        <Button
          onClick={handleOkClick}
          variant="contained"
          sx={{
            px: 6,
            py: 1,
            textTransform: "none",
            fontWeight: 700,
            bgcolor: "error.main",
            "&:hover": { bgcolor: "#b71c1c" },
          }}
        >
          OK
        </Button>
      </Box>
    </Dialog>
  )
}

export default PopupDialog