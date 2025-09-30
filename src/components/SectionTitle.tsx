import { Typography, Box } from "@mui/material";
import React from "react";

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Box
    sx={{
      bgcolor: "#F5F5F5",
      px: 2,
      py: 1,
      borderRadius: 1,
      border: "1px solid #e0e0e0",
      mb: 2,
    }}
  >
    <Typography
      variant="subtitle2"
      sx={{ fontWeight: 700, color: "text.secondary" }}
    >
      {children}
    </Typography>
  </Box>
);

export default SectionTitle;
