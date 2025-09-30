import React, { useEffect, useMemo, useState } from 'react';
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
} from '@mui/material';
import InputBase from '@mui/material/InputBase';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

export type MailDoc = {
  id: string;
  name: string;
  tool: 'CREDO' | 'Vault' | 'Open-Text';
  quality: 'Good' | 'Average' | 'Bad';
  available: 'Yes' | 'No';
};

type Props = {
  open: boolean;
  eslId: string;
  selectedDocs: MailDoc[];
  onClose: () => void;
  onSend: (payload: {
    to: string[];
    cc: string[];
    bcc: string[];
    subject: string;
    body: string;
  }) => void;
};

const RED = '#EF002B';
const BAR_BG = '#F3F3F3';
const BAR_BORDER = '#E5E5E5';
const LABEL_COLOR = '#6F6F6F';

/* ---------- Pills ---------- */
const PillBtn: React.FC<React.PropsWithChildren<{ onClick?: () => void }>> = ({ children, onClick }) => (
  <Button
    onClick={onClick}
    size="small"
    variant="outlined"
    disableElevation
    sx={{
      height: 28,
      minWidth: 60,
      px: 1.25,
      borderRadius: '14px',
      borderColor: '#E1E1E1',
      bgcolor: '#F3F3F3',
      color: '#444',
      textTransform: 'none',
      fontWeight: 700,
      fontSize: 12,
      lineHeight: '14px',
      '&:hover': { bgcolor: '#ECECEC', borderColor: '#DCDCDC' },
    }}
  >
    {children}
  </Button>
);

/* ---------- Flat bar row (label left, content right) ---------- */
const BarRow: React.FC<{ label: string; right: React.ReactNode }> = ({ label, right }) => (
  <Box
    sx={{
      height: 40,
      display: 'grid',
      gridTemplateColumns: '92px 1fr',
      alignItems: 'center',
      borderRadius: 1,
      bgcolor: BAR_BG,
      border: `1px solid ${BAR_BORDER}`,
      px: 1,
      mb: 1,
    }}
  >
    <Typography sx={{ pl: 1, fontWeight: 700, fontSize: 14, color: LABEL_COLOR }}>
      {label}
    </Typography>
    <Box sx={{ pr: 1, display: 'flex', alignItems: 'center', gap: 1 }}>{right}</Box>
  </Box>
);

/* ---------- INPUT: truly transparent (no inner bg, no border) ---------- */
const BarInput: React.FC<{
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}> = ({ value, onChange, placeholder }) => (
  <Box sx={{ flex: 1, height: 32, display: 'flex', alignItems: 'center', px: 1 }}>
    <InputBase
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      sx={{
        width: '100%',
        fontSize: 14,
        lineHeight: '22px',
        bgcolor: 'transparent !important',
        '& input': { bgcolor: 'transparent !important' },
        '& input:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 1000px transparent inset',
          WebkitTextFillColor: '#222',
          caretColor: '#222',
        },
      }}
    />
  </Box>
);

const splitEmails = (v: string) =>
  v.split(/[;,]/).map((s) => s.trim()).filter(Boolean);

const RequestMissingDocsDialog: React.FC<Props> = ({
  open,
  eslId,
  selectedDocs,
  onClose,
  onSend,
}) => {
  const [to, setTo] = useState('');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [subject, setSubject] = useState(
    `FW: Regarding : Task ID ${eslId} - Missing Files`
  );

  const defaultBody = useMemo(() => {
    const lines = selectedDocs.map(
      (d, i) => `${i + 1}. ${d.name}${d.tool ? ` - ${d.tool}` : ''}${d.quality ? ` (${d.quality})` : ''}`
    );
    return [
      'Dear MSP Reviewer,',
      '',
      `In Task ID ${eslId}, there are a few missing documents / need better quality. Kindly upload them in the respective tools as listed below.`,
      'So that we can be able to do the process',
      '',
      ...lines,
      '',
      'Thank you',
      'MSP Engineer',
    ].join('\n');
  }, [eslId, selectedDocs]);

  const [body, setBody] = useState(defaultBody);
  useEffect(() => setBody(defaultBody), [defaultBody]);

  const disabled = !to.trim() || selectedDocs.length === 0;

  const handleSend = () =>
    onSend({
      to: splitEmails(to),
      cc: splitEmails(cc),
      bcc: splitEmails(bcc),
      subject,
      body,
    });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 10,
          overflow: 'hidden',
          boxShadow: '0px 10px 24px rgba(0,0,0,0.12), 0px 2px 6px rgba(0,0,0,0.06)',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          height: 54,
          bgcolor: '#FFECEE',
          borderBottom: '1px solid #F1D7D9',
          px: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 700, color: '#333' }}>
          Request Message
        </Typography>
        <Box sx={{ position: 'absolute', right: 8, top: 10 }}>
          <Tooltip title="Minimize"><IconButton size="small" sx={{ color: RED }}><RemoveIcon fontSize="small" /></IconButton></Tooltip>
          <Tooltip title="Maximize"><IconButton size="small" sx={{ color: RED }}><CropSquareIcon fontSize="small" /></IconButton></Tooltip>
          <Tooltip title="Close"><IconButton onClick={onClose} size="small" sx={{ color: RED }}><CloseIcon fontSize="small" /></IconButton></Tooltip>
        </Box>
      </Box>

      <DialogContent
        sx={{
          p: 0,
          bgcolor: '#FFF',
          '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px transparent inset',
            WebkitTextFillColor: '#222',
          },
        }}
      >
        {/* Bars */}
        <Box sx={{ px: 2, py: 1.25, borderBottom: '1px solid #ECECEC' }}>
          <BarRow
            label="To :"
            right={<BarInput value={to} onChange={setTo} placeholder="name1@company.com; name2@company.com" />}
          />
          <BarRow
            label="Subject :"
            right={
              <>
                <BarInput value={subject} onChange={setSubject} />
                <PillBtn onClick={() => setShowCc(s => !s)}>CC :</PillBtn>
                <PillBtn onClick={() => setShowBcc(s => !s)}>bcc :</PillBtn>
              </>
            }
          />
          {showCc && (
            <BarRow
              label="cc :"
              right={<BarInput value={cc} onChange={setCc} placeholder="optional; comma/semicolon separated" />}
            />
          )}
          {showBcc && (
            <BarRow
              label="bcc :"
              right={<BarInput value={bcc} onChange={setBcc} placeholder="optional" />}
            />
          )}
        </Box>

        {/* Body */}
        <Box sx={{ px: 2, py: 1.25 }}>
          <Paper variant="outlined" sx={{ borderColor: '#E2E2E2', borderRadius: '6px', p: 1.5 }}>
            <InputBase
              value={body}
              onChange={(e) => setBody(e.target.value)}
              multiline
              sx={{
                width: '100%',
                fontSize: 14,
                whiteSpace: 'pre-wrap',
                bgcolor: '#FFF',
              }}
            />
          </Paper>
        </Box>

        {/* Footer */}
        <Divider />
        <Box
          sx={{
            height: 64,
            px: 2,
            py: 1,
            bgcolor: '#F7F7F7',
            borderTop: '1px solid #E9E9E9',
            display: 'grid',
            gridTemplateColumns: '1fr auto', // left icons | right actions
            alignItems: 'center',
            columnGap: 2,
          }}
        >
          {/* LEFT ICON CLUSTER */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton sx={{ color: RED, width: 36, height: 36, p: 0.75 }}>
              <DeleteOutlineIcon />
            </IconButton>
            <IconButton sx={{ color: RED, width: 36, height: 36, p: 0.75 }}>
              <MoreVertIcon />
            </IconButton>

            {/* thin vertical divider to match figma */}
            <Box sx={{ width: 1, height: 24, bgcolor: '#E0E0E0', mx: 0.5 }} />

            <IconButton sx={{ color: RED, width: 36, height: 36, p: 0.75 }}>
              <InsertLinkIcon />
            </IconButton>
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

          {/* RIGHT BUTTONS */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{ textTransform: 'none', height: 36, px: 2 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={disabled}
              onClick={handleSend}
              sx={{
                textTransform: 'none',
                height: 36,
                width: 112,
                bgcolor: RED,
                '&:hover': { bgcolor: '#D60026' },
              }}
            >
              Send Now
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RequestMissingDocsDialog;
