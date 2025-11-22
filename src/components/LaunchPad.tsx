import React from "react";
import { Box, Typography, Card } from "@mui/material";
import { CogniteIcon } from "icons/CogniteIcon";
import { CredoIcon } from "icons/CredoIcon";
import { OpentextIcon } from "icons/OpentextIcon";
import { TruqcIcon } from "icons/TruqcIcon";
import { AutoDeskVaultIcon } from "icons/AutoDeskVaultIcon";
import { DownArrowIcon } from "icons/DownArrowIcon";
import { RocketLaunchIcon } from "icons/RocketLaunchIcon";

const apps = [
  { name: "Cognite", icon: <CogniteIcon /> },
  { name: "Credo", icon: <CredoIcon /> },
  { name: "OpenText", icon: <OpentextIcon /> },
  { name: "TruQC", icon: <TruqcIcon /> },
  { name: "AutoDesk", icon: <AutoDeskVaultIcon /> },
];

const LaunchPad: React.FC = () => {
  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      {/* Down Arrow Floating Outside the Card */}
      <Box
        sx={{
          position: "absolute",
          top: -3,
          right: 8,
          backgroundColor: "#fff",
          borderRadius: "50%",
          width: 18,
          height: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#d32f2f",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          cursor: "pointer",
        }}
      >
        <DownArrowIcon />
      </Box>

      {/* Launch Pad Card */}
      <Card
        sx={{
          width: 199,
          height: 205,
          backgroundColor: "#d32f2f",
          color: "#fff",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          p: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            mb: 1,
          }}
        >
          {/* Left-aligned icon */}
          <RocketLaunchIcon sx={{ fontSize: 18, color: "#fff", ml: 0.5 }} />

          {/* Centered text absolutely positioned */}
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)", // centers horizontally
            }}
          >
            Launch Pad
          </Typography>
        </Box>

        {/* App Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1.5,
            flexGrow: 1,
            pb: 1,
          }}
        >
          {apps.map((app) => (
            <Box
              key={app.name}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              {typeof app.icon === "string" ? (
                <img src={app.icon} alt={app.name} width={40} height={40} />
              ) : (
                app.icon
              )}
              <Typography variant="caption">{app.name}</Typography>
            </Box>
          ))}
        </Box>
      </Card>
    </Box>
  );
};

export default LaunchPad;
