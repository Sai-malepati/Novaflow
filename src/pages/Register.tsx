import React, { useState } from "react"
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import Layout from "../components/MainLayout"
import PopupDialog from "../components/PopupDialog"
import landingImage from "../static/images/getstarted_bg_img1.png"

const WORKFLOWS = ["TMin", "PRV Optimization", "Hit & Leak Rate Analysis"] as const
type Workflow = (typeof WORKFLOWS)[number]


const NAME_REGEX = /^[A-Za-z]+$/
const VALID_DOMAINS = ["quest-global.com", "exxonmobil.com"]

const LIMITS = {
  firstName: { min: 2, max: 30 },
  lastName: { min: 1, max: 30 },
  email: { min: 5, max: 120 },
}

const fieldSx = {
  mb: 2.25,
  "& .MuiInputBase-root": { height: 52 },
  "& .MuiOutlinedInput-input": { py: 0 },
}

const Register: React.FC = () => {
  const navigate = useNavigate()

  const [values, setValues] = useState({ firstName: "", lastName: "", email: "" })
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; email?: string }>({})
  const [openSuccess, setOpenSuccess] = useState(false)

  // ----- validation -----
  const validateName = (key: "firstName" | "lastName", val: string): string | undefined => {
    const v = val.trim()
    const { min, max } = LIMITS[key]
    if (!v) return `${key === "firstName" ? "First" : "Last"} name is required`
    if (!NAME_REGEX.test(v)) return "Name must contain only alphabets"
    if (v.length < min || v.length > max)
      return `${key === "firstName" ? "First" : "Last"} name must be ${min}–${max} characters long`
    return undefined
  }

  const validateEmail = (email: string): string | undefined => {
    const e = email.trim()
    const { min, max } = LIMITS.email
    if (!e) return "Email address is required"
    if (e.includes(" ")) return "Email must not contain spaces"
    if (!e.includes("@")) return "Email must contain '@' symbol"
    if (e.length < min || e.length > max)
      return `Email address must be ${min}–${max} characters long`

    const parts = e.split("@")
    if (parts.length !== 2) return "Email must follow the format username@domain.extension"

    const [username, domain] = parts
    if (!username || username.startsWith(".") || username.endsWith("."))
      return "Email must not start or end with special characters"

    if (!domain.includes(".")) return "Email must contain a valid domain name"
    const ext = domain.split(".").pop() || ""
    if (ext.length < 2 || ext.length > 6) return "Email extension must be 2–6 characters"

    const ok = VALID_DOMAINS.some((d) => domain.toLowerCase().endsWith(d))
    if (!ok) return "Domain must be Quest Global or ExxonMobil"
    return undefined
  }

  const handleChange =
    (field: "firstName" | "lastName" | "email") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setValues((prev) => ({ ...prev, [field]: value }))
      setErrors((prev) => ({
        ...prev,
        [field]: field === "email" ? validateEmail(value) : validateName(field as any, value),
      }))
    }

  const handleBlur = (field: "firstName" | "lastName" | "email") => () => {
    setErrors((prev) => ({
      ...prev,
      [field]:
        field === "email" ? validateEmail(values.email) : validateName(field as any, values[field]),
    }))
  }

  const validateForm = () => {
    const e1 = validateName("firstName", values.firstName)
    const e2 = validateName("lastName", values.lastName)
    const e3 = validateEmail(values.email)
    setErrors({ firstName: e1, lastName: e2, email: e3 })
    return !e1 && !e2 && !e3
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setOpenSuccess(true)
  }

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
          maxWidth={680}
          sx={{
            backgroundColor: "rgb(244 244 244 / 80%)",
            height: "100vh",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: 4,
          }}
        >
          <Paper
            elevation={6}
            component="form"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            sx={{
              width: "100%",
              borderRadius: 2.5,
              px: { xs: 3, md: 5 },
              py: { xs: 3, md: 4 },
              bgcolor: "rgba(255,255,255,0.94)",
              boxShadow: "0 14px 36px rgba(0,0,0,0.22)",
            }}
          >
            <Typography
              component="h1"
              sx={{
                textAlign: "center",
                fontSize: { xs: 26, md: 28 },
                fontWeight: 500,
                mb: 1,
                lineHeight: 1.2,
              }}
            >
              <Box
                component="span"
                sx={{
                  color: "text.primary",
                  textTransform: "uppercase",
                  letterSpacing: ".14em",
                  mr: 1,
                  fontWeight: 600,
                  opacity: 0.9,
                }}
              >
                Welcome to
              </Box>
              <Box
                component="span"
                sx={{
                  color: "error.main",
                  textTransform: "uppercase",
                  fontWeight: 800,
                  letterSpacing: ".06em",
                }}
              >
                TMIN Workflow
              </Box>
            </Typography>

            <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
              Enter Your Details To Register
            </Typography>


            <TextField
              fullWidth
              required
              label="First Name"
              value={values.firstName}
              onChange={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
              sx={fieldSx}
              inputProps={{ maxLength: LIMITS.firstName.max }}
            />

            <TextField
              fullWidth
              required
              label="Last Name"
              value={values.lastName}
              onChange={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
              sx={fieldSx}
              inputProps={{ maxLength: LIMITS.lastName.max }}
            />

            <TextField
              fullWidth
              required
              type="email"
              label="Email Address"
              value={values.email}
              onChange={handleChange("email")}
              onBlur={handleBlur("email")}
              error={Boolean(errors.email)}
              helperText={errors.email}
              sx={fieldSx}
              inputProps={{ maxLength: LIMITS.email.max }}
            />

            <FormControl fullWidth sx={{ ...fieldSx, mb: 3 }}>
              <InputLabel id="workflow-label">Select Workflow</InputLabel>
              <Select
                labelId="workflow-label"
                multiple
                value={workflows}
                onChange={(e) => {
                  const v = e.target.value
                  const next = Array.isArray(v) ? v : typeof v === "string" ? v.split(",") : []
                  setWorkflows(next as Workflow[])
                }}
                renderValue={(selected) => {
                  if (Array.isArray(selected)) return selected.join(", ")
                  if (typeof selected === "string") return selected
                  return ""
                }}
                input={
                  <OutlinedInput
                    label="Select Workflow"
                    inputProps={{ autoComplete: "off" }}
                  />
                }
              >
                {WORKFLOWS.map((wf) => (
                  <MenuItem key={wf} value={wf}>
                    <Checkbox checked={workflows.indexOf(wf) > -1} />
                    <ListItemText primary={wf} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                height: 50,
                textTransform: "none",
                fontWeight: 700,
                backgroundColor: "error.main",
                boxShadow: "0 8px 18px rgba(239,0,43,0.35)",
                "&:hover": { backgroundColor: "#b71c1c" },
              }}
            >
              REGISTER
            </Button>

            <PopupDialog
              open={openSuccess}
              onOk={() => {
                setOpenSuccess(false)
                navigate("/")
              }}
              message="T-Min Registration done successfully."
            />
          </Paper>
        </Box>
      </Box>
    </Layout>
  )
}

export default Register


