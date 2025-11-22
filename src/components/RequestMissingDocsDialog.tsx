import React, { useEffect, useRef, useState } from "react"
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Paper,
  Typography,
  Divider,
  Tooltip,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material"
import InputBase from "@mui/material/InputBase"
import CloseIcon from "@mui/icons-material/Close"
import RemoveIcon from "@mui/icons-material/Remove"
import CropSquareIcon from "@mui/icons-material/CropSquare"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import InsertLinkIcon from "@mui/icons-material/InsertLink"
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon"
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined"
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined"
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined"
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined"
import { useCreateItemMutation, useGetItemsQuery } from "store/api"
import { useLocation } from "react-router-dom"

export type Attachment = {
  name: string
  type: string
  size: number
  bytes: number[]
}

export type MailDoc = {
  documentCollectionId: string | number
  documentName: string
  toolName: "CREDO" | "Vault" | "Open-Text"
  documentQualityName?: "Good" | "Average" | "Bad"
  documentMandatory: "Yes" | "No" | "YES" | "NO"
  availableStatusName: "Yes" | "No" | "YES" | "NO"
}

type Props = {
  open: boolean
  eslId: string
  selectedDocs: MailDoc[]
  onClose: () => void
   onMailSent?: () => void
}

const RED = "#EF002B"
const BAR_BG = "#F2F2F2"
const LABEL_COLOR = "#6A6A6A"

const BarRow: React.FC<{ label: string; right: React.ReactNode }> = ({ label, right }) => {
  const isSubject = label?.trim().toLowerCase().startsWith("subject") ?? false
  const isCC = label?.trim().toLowerCase().startsWith("cc") ?? false
  return (
    <Box
      sx={{
        height: 44,
        display: "flex",
        alignItems: "center",
        px: 1,
        mb: 1,
        ...(isSubject ? { bgcolor: "transparent" } : { bgcolor: BAR_BG }),
      }}
    >
      <Typography
        sx={{
          pl: 1,
          fontWeight: 700,
          fontSize: 14,
          color: LABEL_COLOR,
          bgcolor: `${isCC ? "#fff" : ""}`,
          p: `${isCC ? "0.3rem 1rem" : 0}`,
          borderRadius: 2,
        }}
      >
        {label}
      </Typography>
      <Box sx={{ pr: 1, display: "flex", alignItems: "center", gap: 1, flex: 1 }}>{right}</Box>
    </Box>
  )
}

const BarInput: React.FC<{
  value: string
  onChange: (v: string) => void
  defaultValue?: string
}> = ({ value, onChange, defaultValue }) => (
  <Box sx={{ flex: 1, height: 32, display: "flex", alignItems: "center", px: 1 }}>
    <InputBase
      defaultValue={defaultValue}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        width: "100%",
        fontSize: 14,
        lineHeight: "22px",
        bgcolor: "transparent !important",
        "& input": { bgcolor: "transparent !important" },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px transparent inset",
          WebkitTextFillColor: "#222",
          caretColor: "#222",
        },
      }}
    />
  </Box>
)

const splitEmails = (v: string) =>
  v
    .split(/[;,]/)
    .map((s) => s.trim())
    .filter(Boolean)

const textToHtml = (t: string) =>
  t
    .split("\n")
    .map((line) =>
      line === ""
        ? "<br/>"
        : line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"),
    )
    .join("<br/>")

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
const QUEST_DOMAIN = "quest-global.com"
const EARLY_DOMAIN = QUEST_DOMAIN.toLowerCase()
const isQuestEmail = (s: string) => /^[A-Za-z0-9._%+-]+@quest-global\.com$/i.test(s)

const validateEmailList = (raw: string) => {
  const list = splitEmails(raw)
  const invalidFormat = list.filter((e) => !emailRegex.test(e))
  const wrongDomain = list.filter((e) => emailRegex.test(e) && !isQuestEmail(e))
  return { list, invalidFormat, wrongDomain }
}

const buildErrorMessage = (invalidFormat: string[], wrongDomain: string[]) => {
  if (invalidFormat.length > 0) {
    return `please enter valid Email address`
  }
  if (wrongDomain.length > 0) {
    return `Email domain must be ${QUEST_DOMAIN}`
  }
  return ""
}

const getEarlyDomainError = (raw: string) => {
  const tokens = raw.split(/[;,]/)
  const current = tokens[tokens.length - 1].trim()
  const atIdx = current.indexOf("@")
  if (atIdx < 0) return ""
  const domainPart = current.slice(atIdx + 1).toLowerCase()
  if (domainPart.length === 0) return ""
  if (!EARLY_DOMAIN.startsWith(domainPart)) {
    return `Email domain must be ${QUEST_DOMAIN}`
  }
  return ""
}

const buildDefaultBody = (esl: string | number) =>
  [
    "Hi,",
    "",
    `We are analyzing the ESL # ${esl} and we would require the following documents to proceed further.`,
    "Kindly share the same at the earliest.",
    "",
    "1. U1A form Open-Text - Document missing/ Not readable.",
    "",
    "Thank you",
  ].join("\n")

const RequestMissingDocsDialog: React.FC<Props> = ({ open, eslId, selectedDocs, onClose, onMailSent}) => {
  const { state } = useLocation()
  const ESLId = state?.eslId || eslId

  const [to, setTo] = useState("Vijayendra.Joshi@quest-global.com")
  const [cc, setCc] = useState("")
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")

  const [toError, setToError] = useState<string>("")
  const [ccError, setCcError] = useState<string>("")

  const [createItem] = useCreateItemMutation()
  const { data: emailMessageBody } = useGetItemsQuery(`Email/GenerateDefaultMessage?toEmail=${to}&docId=${eslId}/${selectedDocs?.[0]?.documentName}&flowType=Tmin_Flow`)
  const { data: emailSubjectText } = useGetItemsQuery(`/Email/GenerateDefaultSubject?flowType=Tmin_Flow&id=${eslId}`)

  useEffect(() => {
    if (open) {
      setCc("")
      setSubject(emailSubjectText)
      setBody(emailMessageBody)
      setAttachments([])
      setToError("")
      setCcError("")
    }
  }, [open, ESLId, emailMessageBody])

  const [busy, setBusy] = useState(false)
  const [snack, setSnack] = useState<{ open: boolean; msg: string; sev: "success" | "error" }>({
    open: false,
    msg: "",
    sev: "success",
  })

  const [attachments, setAttachments] = useState<Attachment[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)


  const disabled =
    busy ||
    !to.trim() ||
    !!toError ||
    (!!cc.trim() && !!ccError) ||
    !subject.trim() ||
    !body

  const onFilesChosen = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const promises = Array.from(files).map(async (file) => {
      const buffer = await file.arrayBuffer()
      const bytes = Array.from(new Uint8Array(buffer))
      const att: Attachment = {
        name: file.name,
        type: file.type || "application/octet-stream",
        size: file.size,
        bytes,
      }
      return att
    })
    const newOnes = await Promise.all(promises)
    setAttachments((prev) => [...prev, ...newOnes])
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const removeAttachment = (index: number) =>
    setAttachments((prev) => prev.filter((_, i) => i !== index))

  const handleSend = async () => {
    try {
      setBusy(true)


      const t = validateEmailList(to)
      const tErr = buildErrorMessage(t.invalidFormat, t.wrongDomain)
      setToError(tErr)


      let cList: string[] = []
      if (cc.trim()) {
        const c = validateEmailList(cc)
        const cErr = buildErrorMessage(c.invalidFormat, c.wrongDomain)
        setCcError(cErr)
        if (cErr) {
          setBusy(false)
          return
        }
        cList = c.list
      }

      if (!to.trim() || tErr) {
        setBusy(false)
        return
      }

      const toList = t.list
      console.log("cList", cList)
      const form = new FormData()
      form.append("ToEmail", toList.join(";"))
      cList.length > 0 && form.append("CcEmail", cList.join(";"))
      form.append("Subject", subject)
      form.append("HtmlContent", textToHtml(body))
      form.append("ProviderType", "1")

      for (const a of attachments) {
        const blob = new Blob([new Uint8Array(a.bytes)], {
          type: a.type || "application/octet-stream",
        })
        const file = new File([blob], a.name, {
          type: a.type || "application/octet-stream",
        })
        form.append("Attachments", file)
      }

      await createItem({ endpoint: "Email/send", body: form })

      setSnack({ open: true, msg: "Email sent successfully.", sev: "success"  })
      onMailSent?.()
      onClose()
    } catch (err: any) {
      setSnack({
        open: true,
        msg: err?.message || "Failed to send email.",
        sev: "error",
      })
    } finally {
      setBusy(false)
    }
  }
  console.log('body', body);
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            overflow: "hidden",
            boxShadow: "0px 10px 24px rgba(0,0,0,0.12), 0px 2px 6px rgba(0,0,0,0.06)",
          },
        }}
      >

        <Box
          sx={{
            height: 54,
            bgcolor: "#FFECEE",
            borderBottom: "1px solid #FDF3F3",
            px: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#5A5A5A" }}>
            Request Message
          </Typography>
          <Box sx={{ position: "absolute", right: 8, top: 10 }}>
            <Tooltip title="Minimize">
              <IconButton size="small" sx={{ color: RED }}>
                <RemoveIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Maximize">
              <IconButton size="small" sx={{ color: RED }}>
                <CropSquareIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close">
              <IconButton onClick={onClose} size="small" sx={{ color: RED }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <DialogContent
          sx={{
            p: 0,
            bgcolor: "#FFF",
            "& input:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px transparent inset",
              WebkitTextFillColor: "#222",
            },
          }}
        >

          <Box sx={{ px: 3.5, py: 1.5 }}>
            <Box>

              <BarRow
                label="To :"
                right={
                  <BarInput
                    value={to}
                    onChange={(v) => {
                      setTo(v)
                      const early = getEarlyDomainError(v)
                      const { invalidFormat, wrongDomain } = validateEmailList(v)
                      setTimeout(() => {
                        if (early) {
                          setToError(early)
                          return
                        }
                        setToError(buildErrorMessage(invalidFormat, wrongDomain))
                      }, 3000)
                    }}
                  />
                }
              />
              {toError && (
                <Box sx={{ px: 2.5, mt: -1, mb: 1 }}>
                  <Typography variant="caption" color="error">
                    {toError}
                  </Typography>
                </Box>
              )}


              <BarRow
                label="CC :"
                right={
                  <BarInput
                    value={cc}
                    onChange={(v) => {
                      setCc(v)

                      if (!v.trim()) {
                        setCcError("")
                        return
                      }
                      const early = getEarlyDomainError(v)
                      const { invalidFormat, wrongDomain } = validateEmailList(v)
                      setTimeout(() => {
                        if (early) {
                          setCcError(early)
                          return
                        }
                        setCcError(buildErrorMessage(invalidFormat, wrongDomain))
                      }, 3000)
                    }}
                  />
                }
              />
              {ccError && (
                <Box sx={{ px: 2.5, mt: -1, mb: 1 }}>
                  <Typography variant="caption" color="error">
                    {ccError}
                  </Typography>
                </Box>
              )}
            </Box>
            <BarRow
              label="Subject :"
              right={<BarInput value={subject} onChange={setSubject} defaultValue={subject} />}
            />
            <Divider sx={{ my: 1, backgroundColor: "#D1D1D3", height: "1px" }} />


            <Box sx={{ px: 2, py: 1.25 }}>
              <Paper sx={{ p: 1.5, boxShadow: "none" }}>
                <InputBase
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  multiline
                  sx={{
                    width: "100%",
                    fontSize: 14,
                    whiteSpace: "pre-wrap",
                    bgcolor: "#FFF",
                  }}
                />
              </Paper>
            </Box>



            {attachments.length > 0 && (
              <Box sx={{ px: 2, pb: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
                {attachments.map((a, idx) => (
                  <Chip
                    key={`${a.name}-${idx}`}
                    label={`${a.name} • ${(a.size / 1024).toFixed(1)} KB`}
                    onDelete={() => removeAttachment(idx)}
                    sx={{ bgcolor: "#F4F4F4" }}
                  />
                ))}
              </Box>
            )}
          </Box>

          <Divider />

          <Box
            sx={{
              px: 3,
              py: 2,
              bgcolor: "#F2F2F2",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "center",
              columnGap: 2,
            }}
          >
            <Box
              sx={{
                bgcolor: "#FFFFFF",
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
                justifyContent: "space-between",
              }}
            >
              <Box>
                <IconButton sx={{ color: RED, width: 36, height: 36, p: 0.75 }}>
                  <DeleteOutlineIcon />
                </IconButton>
                <IconButton sx={{ color: RED, width: 36, height: 36, p: 0.75 }}>
                  <MoreVertIcon />
                </IconButton>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box>
                  <Tooltip title="Add attachments">
                    <IconButton
                      onClick={() => fileInputRef.current?.click()}
                      sx={{ color: RED, width: 36, height: 36, p: 0.75 }}
                    >
                      <InsertLinkIcon />
                    </IconButton>
                  </Tooltip>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={onFilesChosen}
                    style={{ display: "none" }}
                  />

                  <IconButton sx={{ color: RED, width: 36, height: 36, p: 0.75 }}>
                    <InsertEmoticonIcon />
                  </IconButton>
                  <IconButton sx={{ color: RED, width: 36, height: 36, p: 0.75 }}>
                    <ImageOutlinedIcon />
                  </IconButton>
                  <IconButton sx={{ color: RED, width: 36, height: 36, p: 0.75 }}>
                    <MusicNoteOutlinedIcon />
                  </IconButton>
                  <IconButton sx={{ color: RED, width: 36, height: 36, p: 0.75 }}>
                    <TextFieldsOutlinedIcon />
                  </IconButton>
                  <IconButton sx={{ color: RED, width: 36, height: 36, p: 0.75 }}>
                    <DescriptionOutlinedIcon />
                  </IconButton>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Button
                    variant="contained"
                    disabled={disabled}
                    onClick={handleSend}
                    sx={{
                      textTransform: "none",
                      height: 36,
                      width: 112,
                      bgcolor: RED,
                      "&:hover": { bgcolor: "#D60026" },
                    }}
                  >
                    {busy ? "Sending..." : "Send Now"}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snack.sev} onClose={() => setSnack((s) => ({ ...s, open: false }))}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </>
  )
}

export default RequestMissingDocsDialog



