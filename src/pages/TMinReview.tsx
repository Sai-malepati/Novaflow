// import React, { useState } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Divider,
//   IconButton,
//   Stack,
//   Typography,
//   Button,
//   Paper,
//   TextField,
// } from '@mui/material';
// import MainLayout from '../components/MainLayout';
// import { useLocation, useNavigate } from 'react-router-dom';

// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

// import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined';
// import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
// import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
// import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
// import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
// import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';

// /* ------------------------------------------------------------------ */
// /* Small helper components                                             */
// /* ------------------------------------------------------------------ */

// const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
//   <Box
//     sx={{
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       gap: 1,
//       py: 0.35,
//       minHeight: 28,
//     }}
//   >
//     <Typography
//       sx={{
//         color: 'text.secondary',
//         fontSize: 13.5,
//         fontWeight: 700,
//         lineHeight: 1.1,
//       }}
//     >
//       {label}
//     </Typography>
//     <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>{children}</Box>
//   </Box>
// );

// const StatusRows = () => {
//   const [editing, setEditing] = useState(false);
//   const [sapId, setSapId] = useState('10819961');
//   const [draft, setDraft] = useState(sapId);

//   const start = () => {
//     setDraft(sapId);
//     setEditing(true);
//   };
//   const save = () => {
//     setSapId(draft.trim() || sapId);
//     setEditing(false);
//   };
//   const cancel = () => setEditing(false);

//   return (
//     <>
//       <Row label="SAP ID :">
//         {!editing ? (
//           <>
//             <Typography
//               sx={{ fontSize: 13.5, fontWeight: 800, mr: 0.25, lineHeight: 1.1 }}
//             >
//               {sapId}
//             </Typography>
//             <IconButton
//               size="small"
//               onClick={start}
//               sx={{
//                 p: 0.25,
//                 color: 'primary.main',
//                 '& .MuiSvgIcon-root': { fontSize: 16 },
//               }}
//               aria-label="Edit SAP ID"
//             >
//               <EditOutlinedIcon />
//             </IconButton>
//           </>
//         ) : (
//           <>
//             <TextField
//               size="small"
//               value={draft}
//               onChange={(e) => setDraft(e.target.value)}
//               sx={{ width: 130 }}
//               inputProps={{ style: { padding: '6px 8px', fontSize: 13.5 } }}
//             />
//             <IconButton color="success" size="small" onClick={save} sx={{ p: 0.25 }}>
//               <CheckOutlinedIcon sx={{ fontSize: 16 }} />
//             </IconButton>
//             <IconButton color="error" size="small" onClick={cancel} sx={{ p: 0.25 }}>
//               <CloseOutlinedIcon sx={{ fontSize: 16 }} />
//             </IconButton>
//           </>
//         )}
//       </Row>

//       <Row label="Assigned Date :">
//         <Typography sx={{ fontSize: 13.5, lineHeight: 1.1 }}>30/07/2025</Typography>
//       </Row>
//       <Row label="Time Remaining :">
//         <Typography sx={{ fontSize: 13.5, lineHeight: 1.1 }}>2 Days</Typography>
//       </Row>
//       <Row label="Site :">
//         <Typography sx={{ fontSize: 13.5, lineHeight: 1.1 }}>Baytown</Typography>
//       </Row>
//     </>
//   );
// };

// /* ---- Stepper pieces (kept compact to ensure all 6 fit) ------------- */

// type StepState = 'done' | 'active' | 'idle';

// const StepNode = ({
//   title,
//   state,
//   index,
//   helperBelow, // optional "Complete", "In Progress" under the rail like in the mock
// }: {
//   title: string;
//   state: StepState;
//   index: number;
//   helperBelow?: string | null;
// }) => {
//   const bg =
//     state === 'done'
//       ? 'success.main'
//       : state === 'active'
//         ? 'warning.main'
//         : 'grey.400';

//   return (
//     <Box
//       sx={{
//         flex: '0 1 110px', // compact step; never grows too wide
//         minWidth: 100,
//         textAlign: 'center',
//       }}
//     >
//       <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
//         {title}
//       </Typography>
//       <Box sx={{ display: 'grid', placeItems: 'center' }}>
//         <Box
//           sx={{
//             width: 34,
//             height: 34,
//             borderRadius: '50%',
//             bgcolor: bg,
//             color: '#fff',
//             fontWeight: 700,
//             display: 'grid',
//             placeItems: 'center',
//           }}
//         >
//           ✓
//         </Box>
//       </Box>
//       <Typography
//         variant="caption"
//         sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}
//       >
//         Step {index}
//       </Typography>
//       {helperBelow ? (
//         <Typography
//           variant="body2"
//           sx={{
//             fontWeight: 700,
//             color: state === 'done' ? 'success.main' : 'warning.main',
//             mt: 0.5,
//           }}
//         >
//           {helperBelow}
//         </Typography>
//       ) : null}
//     </Box>
//   );
// };

// const Connector = () => (
//   <Box sx={{ flex: 1, height: 8, borderRadius: 4, bgcolor: '#D9D9D9' }} />
// );

// /* ---- Figma-styled info tile --------------------------------------- */

// const InfoTile = ({
//   icon,
//   label,
//   value,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
// }) => (
//   <Paper
//     variant="outlined"
//     sx={{
//       p: 1.5,
//       borderRadius: 2,
//       borderColor: '#EFEFEF',
//       boxShadow: 'none',
//       display: 'flex',
//       alignItems: 'center',
//       gap: 1.25,
//       minHeight: 66,
//     }}
//   >
//     <Box sx={{ color: 'error.main', display: 'grid', placeItems: 'center' }}>
//       {icon}
//     </Box>
//     <Box sx={{ minWidth: 0 }}>
//       <Typography
//         variant="caption"
//         sx={{ fontWeight: 800, color: 'text.secondary' }}
//       >
//         {label}
//       </Typography>
//       <Typography
//         variant="body2"
//         sx={{
//           fontWeight: 600,
//           color: 'text.secondary',
//           lineHeight: 1.2,
//           mt: 0.25,
//           whiteSpace: 'nowrap',
//           overflow: 'hidden',
//           textOverflow: 'ellipsis',
//         }}
//         title={value}
//       >
//         {value}
//       </Typography>
//     </Box>
//   </Paper>
// );

// /* ---- Hollow card (Prompts / Attachments / etc.) -------------------- */

// const HollowCard = ({
//   title,
//   action,
//   minH = 260,
//   children,
// }: {
//   title: string;
//   action?: React.ReactNode;
//   minH?: number;
//   children?: React.ReactNode;
// }) => (
//   <Card variant="outlined" sx={{ borderRadius: 2 }}>
//     <Box
//       sx={{
//         px: 1.5,
//         py: 1,
//         bgcolor: '#F2F2F2',
//         borderRadius: '10px 10px 0 0',
//         borderBottom: '1px solid #e5e5e5',
//       }}
//     >
//       <Stack direction="row" alignItems="center" justifyContent="space-between">
//         <Typography
//           variant="subtitle2"
//           sx={{ fontWeight: 700, color: 'text.secondary' }}
//         >
//           {title}
//         </Typography>
//         {action}
//       </Stack>
//     </Box>
//     <CardContent sx={{ minHeight: minH, p: 2.25 }}>
//       {children ?? (
//         <Box
//           sx={{
//             height: minH - 40,
//             border: '1px dashed #DBDBDB',
//             borderRadius: 1,
//             bgcolor: '#FAFAFA',
//           }}
//         />
//       )}
//     </CardContent>
//   </Card>
// );

// /* ------------------------------------------------------------------ */
// /* Page                                                                */
// /* ------------------------------------------------------------------ */

// const TMinReview: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const eslId = (location.state as any)?.eslId || '107011';

//   return (
//     <MainLayout>
//       <Box sx={{ p: 2.25, pt: '4.75rem' }}>
//         {/* =================== TOP: STATUS (left) + STEPPER (right) =================== */}
//         <Card
//           elevation={0}
//           sx={{ borderRadius: 2, border: '1px solid #ededed', mb: 2 }}
//         >
//           <CardContent sx={{ p: 1.5 }}>
//             <Box
//               sx={{
//                 display: 'flex',
//                 gap: 2,
//                 alignItems: 'stretch',
//               }}
//             >
//               {/* LEFT STATUS PANEL (fixed 280px) */}
//               <Box
//                 sx={{
//                   flex: '0 0 280px',
//                   bgcolor: '#FFF7F7',
//                   borderRadius: 2,
//                   border: '1px solid #EFEFEF',
//                   boxShadow: 'none',
//                   p: 1.5,
//                 }}
//               >
//                 {/* header */}
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'baseline',
//                     gap: 1,
//                     mb: 0.25,
//                   }}
//                 >
//                   <Typography
//                     variant="subtitle2"
//                     sx={{ fontWeight: 800, letterSpacing: 0.4, lineHeight: 1 }}
//                   >
//                     STATUS
//                   </Typography>
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       fontWeight: 800,
//                       color: 'error.main',
//                       ml: 'auto',
//                       lineHeight: 1,
//                     }}
//                   >
//                     ESL ID : {eslId}
//                   </Typography>
//                 </Box>

//                 <Divider sx={{ my: 1 }} />
//                 <StatusRows />
//               </Box>

//               {/* RIGHT STEPPER */}
//               <Box
//                 sx={{
//                   flex: 1,
//                   px: 1,
//                   py: 0.25,
//                   minWidth: 0,
//                 }}
//               >
//                 {/* Row: steps + connectors evenly spaced.
//                     - steps shrink a bit due to minWidth:100
//                     - if still too small, horizontal scroll appears */}
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: 1.5,
//                     overflowX: 'auto',
//                     pb: 0.5,
//                   }}
//                 >
//                   <StepNode
//                     title="Gathering Details"
//                     state="done"
//                     index={1}
//                     helperBelow="Complete"
//                   />
//                   <Connector />
//                   <StepNode
//                     title="Gathering Documents"
//                     state="active"
//                     index={2}
//                     helperBelow="In Progress"
//                   />
//                   <Connector />
//                   <StepNode title="Data Collection (OCR)" state="idle" index={3} />
//                   <Connector />
//                   <StepNode title="3D Model Generating" state="idle" index={4} />
//                   <Connector />
//                   <StepNode title="T-Min Review" state="idle" index={5} />
//                   <Connector />
//                   <StepNode title="Generating Report" state="idle" index={6} />
//                   {/* illustration spot (optional) */}
//                   {/* <Box sx={{ flex: '0 0 auto' }}><img alt="" src="/illustration.png" height={80}/></Box> */}
//                 </Box>
//               </Box>
//             </Box>
//           </CardContent>
//         </Card>

//         {/* =================== Inspection Notification Details =================== */}
//         <Card
//           elevation={0}
//           sx={{ borderRadius: 2, border: '1px solid #ededed', mb: 2 }}
//         >
//           <CardContent sx={{ p: 2 }}>
//             <Typography
//               variant="subtitle2"
//               sx={{ color: 'error.main', fontWeight: 700, mb: 1 }}
//             >
//               Inspection Notification Details
//             </Typography>

//             <Box
//               sx={{
//                 display: 'grid',
//                 gridTemplateColumns: {
//                   xs: '1fr',
//                   sm: 'repeat(2, 1fr)',
//                   md: 'repeat(3, 1fr)',
//                   lg: 'repeat(6, 1fr)',
//                 },
//                 gap: 1.25,
//               }}
//             >
//               <InfoTile
//                 icon={<Inventory2OutlinedIcon sx={{ fontSize: 22 }} />}
//                 label="Equipment Tag"
//                 value="CLE3L3-T0302"
//               />
//               <InfoTile
//                 icon={<PrecisionManufacturingOutlinedIcon sx={{ fontSize: 22 }} />}
//                 label="Equipment Type"
//                 value="Pressure Vessel"
//               />
//               <InfoTile
//                 icon={<AssessmentOutlinedIcon sx={{ fontSize: 22 }} />}
//                 label="Thickness Status"
//                 value="Vessel - Above IDM RL"
//               />
//               <InfoTile
//                 icon={<Groups2OutlinedIcon sx={{ fontSize: 22 }} />}
//                 label="Business Team"
//                 value="CLEUS"
//               />
//               <InfoTile
//                 icon={<BadgeOutlinedIcon sx={{ fontSize: 22 }} />}
//                 label="Site Inspector"
//                 value="Akshay Mahto"
//               />
//               <InfoTile
//                 icon={<ApartmentOutlinedIcon sx={{ fontSize: 22 }} />}
//                 label="Unit"
//                 value="CLEU3"
//               />
//             </Box>
//           </CardContent>
//         </Card>

//         {/* =================== Four cards row =================== */}
//         <Box
//           sx={{
//             display: 'grid',
//             gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' },
//             gap: 1.5,
//           }}
//         >
//           <HollowCard title="Prompts" minH={280} />
//           <HollowCard title="Inspection Recommendations/Descriptions" minH={280} />
//           <HollowCard
//             title="Attachments"
//             minH={280}
//             action={
//               <IconButton size="small" color="error">
//                 <NoteAddOutlinedIcon />
//               </IconButton>
//             }
//           />
//           <HollowCard title="MSP Engineer Note Pad" minH={280}>
//             <Box
//               sx={{
//                 height: 240,
//                 border: '1px dashed #DBDBDB',
//                 borderRadius: 1,
//                 background:
//                   'repeating-linear-gradient(white, white 28px, #ECECEC 29px, #ECECEC 30px)',
//               }}
//             />
//           </HollowCard>
//         </Box>

//         {/* =================== Bottom row =================== */}
//         {/* <Stack
//           direction={{ xs: 'column', md: 'row' }}
//           alignItems={{ xs: 'flex-start', md: 'center' }}
//           justifyContent="space-between"
//           sx={{ mt: 2 }}
//           spacing={1.25}
//         >
//           <Box>
//             <Typography
//               variant="caption"
//               sx={{ color: 'error.main', fontWeight: 700 }}
//             >
//               Inspection Files Location:
//             </Typography>
//             <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
//               K:\BTAREA\BTES\FIXEDEQUIP\Inspection\FS\CLEU\CLEUs\Inspection Planner’s
//               Folder\EOR Folder CLE3L3-T0302
//             </Typography>
//           </Box>

//           <Stack direction="row" spacing={1.5}>
//             <Button
//               variant="outlined"
//               color="inherit"
//               startIcon={<ArrowBackIcon />}
//               onClick={() => navigate('/tmin')}
//               sx={{ textTransform: 'none' }}
//             >
//               Back to List
//             </Button>
//             <Button
//               variant="contained"
//               color="error"
//               sx={{ px: 4, borderRadius: 2, textTransform: 'none' }}
//             >
//               Next
//             </Button>
//           </Stack>
//         </Stack> */}
//         <Box sx={{ mt: 2 }}>
//           {/* Line 1: Location */}
//           <Box>
//             <Typography
//               variant="caption"
//               sx={{ color: 'error.main', fontWeight: 700 }}
//             >
//               Inspection Files Location:
//             </Typography>
//             <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
//               K:\BTAREA\BTES\FIXEDEQUIP\Inspection\FS\CLEU\CLEUs\Inspection Planner’s
//               Folder\EOR Folder CLE3L3-T0302
//             </Typography>
//           </Box>

//           {/* Line 2: Buttons (Back left, Next right) */}
//           <Box
//             sx={{
//               mt: 1.5,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//             }}
//           >
//             <Button
//               variant="outlined"
//               color="error" // 🔴 outlined red, like Figma
//               startIcon={<ArrowBackIcon />}
//               onClick={() => navigate('/tmin')}
//               sx={{ textTransform: 'none' }}
//             >
//               BACK TO LIST
//             </Button>

//             <Button
//               variant="contained"
//               sx={{
//                 textTransform: 'none',
//                 px: 4,
//                 borderRadius: 2,
//                 bgcolor: '#FF4D4D', // 🔴 lighter red
//                 '&:hover': { bgcolor: '#E53935' },
//               }}
//             >
//               Next
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </MainLayout>
//   );
// };

// export default TMinReview;


import React, { useRef, useState } from 'react';
import {
  Alert, Box, Button, Card, CardContent, Divider, IconButton,
  Paper, Snackbar, Stack, TextField, Tooltip, Typography
} from '@mui/material';
import MainLayout from '../components/MainLayout';
import { useLocation, useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';

/* ---------- light helpers ---------- */
const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Box sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:1, py:0.35, minHeight:28 }}>
    <Typography sx={{ color:'text.secondary', fontSize:13.5, fontWeight:700, lineHeight:1.1 }}>{label}</Typography>
    <Box sx={{ display:'flex', alignItems:'center', gap:0.25 }}>{children}</Box>
  </Box>
);

const HollowCard = ({ title, action, minH=260, children }: { title:string; action?:React.ReactNode; minH?:number; children?:React.ReactNode }) => (
  <Card variant="outlined" sx={{ borderRadius:2 }}>
    <Box sx={{ px:1.5, py:1, bgcolor:'#F2F2F2', borderRadius:'10px 10px 0 0', borderBottom:'1px solid #e5e5e5' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle2" sx={{ fontWeight:700, color:'text.secondary' }}>{title}</Typography>
        {action}
      </Stack>
    </Box>
    <CardContent sx={{ minHeight:minH, p:2.25 }}>
      {children ?? <Box sx={{ height:minH-40, border:'1px dashed #DBDBDB', borderRadius:1, bgcolor:'#FAFAFA' }} />}
    </CardContent>
  </Card>
);

const InfoTile = ({ icon, label, value }: { icon:React.ReactNode; label:string; value:string }) => (
  <Paper variant="outlined" sx={{ p:1.5, borderRadius:2, borderColor:'#EFEFEF', boxShadow:'none', display:'flex', alignItems:'center', gap:1.25, minHeight:66 }}>
    <Box sx={{ color:'error.main', display:'grid', placeItems:'center' }}>{icon}</Box>
    <Box sx={{ minWidth:0 }}>
      <Typography variant="caption" sx={{ fontWeight:800, color:'text.secondary' }}>{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight:600, color:'text.secondary', lineHeight:1.2, mt:0.25, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }} title={value}>{value}</Typography>
    </Box>
  </Paper>
);

/* ---------- data ---------- */
const STEPS = [
  { title:'Gathering Details', helper:'Complete', state:'done' as const },
  { title:'Gathering Documents', helper:'In Progress', state:'active' as const },
  { title:'Data Collection (OCR)', state:'idle' as const },
  { title:'3D Model Generating', state:'idle' as const },
  { title:'T-Min Review', state:'idle' as const },
  { title:'Generating Report', state:'idle' as const },
];

const TILES = [
  { icon:<Inventory2OutlinedIcon sx={{ fontSize:22 }} />, label:'Equipment Tag', value:'CLE3L3-T0302' },
  { icon:<PrecisionManufacturingOutlinedIcon sx={{ fontSize:22 }} />, label:'Equipment Type', value:'Pressure Vessel' },
  { icon:<AssessmentOutlinedIcon sx={{ fontSize:22 }} />, label:'Thickness Status', value:'Vessel - Above IDM RL' },
  { icon:<Groups2OutlinedIcon sx={{ fontSize:22 }} />, label:'Business Team', value:'CLEUS' },
  { icon:<BadgeOutlinedIcon sx={{ fontSize:22 }} />, label:'Site Inspector', value:'Akshay Mahto' },
  { icon:<ApartmentOutlinedIcon sx={{ fontSize:22 }} />, label:'Unit', value:'CLEU3' },
];

/* ---------- composables ---------- */
const StatusRows = () => {
  const [editing, setEditing] = useState(false);
  const [sapId, setSapId] = useState('10819961');
  const [draft, setDraft] = useState(sapId);
  return (
    <>
      <Row label="SAP ID :">
        {!editing ? (
          <>
            <Typography sx={{ fontSize:13.5, fontWeight:800, mr:0.25, lineHeight:1.1 }}>{sapId}</Typography>
            <IconButton size="small" onClick={() => { setDraft(sapId); setEditing(true); }} sx={{ p:0.25, color:'primary.main', '& .MuiSvgIcon-root':{ fontSize:16 } }} aria-label="Edit SAP ID"><EditOutlinedIcon /></IconButton>
          </>
        ) : (
          <>
            <TextField size="small" value={draft} onChange={(e)=>setDraft(e.target.value)} sx={{ width:130 }} inputProps={{ style:{ padding:'6px 8px', fontSize:13.5 } }} />
            <IconButton color="success" size="small" onClick={()=>{ setSapId(draft.trim()||sapId); setEditing(false); }} sx={{ p:0.25 }}><CheckOutlinedIcon sx={{ fontSize:16 }} /></IconButton>
            <IconButton color="error" size="small" onClick={()=>setEditing(false)} sx={{ p:0.25 }}><CloseOutlinedIcon sx={{ fontSize:16 }} /></IconButton>
          </>
        )}
      </Row>
      <Row label="Assigned Date :"><Typography sx={{ fontSize:13.5, lineHeight:1.1 }}>30/07/2025</Typography></Row>
      <Row label="Time Remaining :"><Typography sx={{ fontSize:13.5, lineHeight:1.1 }}>2 Days</Typography></Row>
      <Row label="Site :"><Typography sx={{ fontSize:13.5, lineHeight:1.1 }}>Baytown</Typography></Row>
    </>
  );
};

const StepNode = ({ title, state, index, helper }: { title:string; state:'done'|'active'|'idle'; index:number; helper?:string }) => {
  const bg = state==='done' ? 'success.main' : state==='active' ? 'warning.main' : 'grey.400';
  return (
    <Box sx={{ flex:'0 1 110px', minWidth:100, textAlign:'center' }}>
      <Typography variant="body2" sx={{ fontWeight:700, mb:0.5 }}>{title}</Typography>
      <Box sx={{ display:'grid', placeItems:'center' }}>
        <Box sx={{ width:34, height:34, borderRadius:'50%', bgcolor:bg, color:'#fff', fontWeight:700, display:'grid', placeItems:'center' }}>✓</Box>
      </Box>
      <Typography variant="caption" sx={{ color:'text.secondary', mt:0.5, display:'block' }}>Step {index}</Typography>
      {helper && <Typography variant="body2" sx={{ fontWeight:700, color: state==='done'?'success.main':'warning.main', mt:0.5 }}>{helper}</Typography>}
    </Box>
  );
};

const Connector = () => <Box sx={{ flex:1, height:8, borderRadius:4, bgcolor:'#D9D9D9' }} />;

/* ---------- page ---------- */
const TMinReview: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { eslId?: string } };
  const eslId = state?.eslId || '107011';

  const [note, setNote] = useState('');
  const [savedOpen, setSavedOpen] = useState(false);
  const [hoveringNotePad, setHoveringNotePad] = useState(false);
  const noteRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSaveNote = () => {
    if (!note.trim()) return;
    const content = note.replace(/\n/g, '\r\n');
    const blob = new Blob([content], { type:'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `MSP_Note_ESL_${eslId||'unknown'}.txt`;
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    setSavedOpen(true);
  };
  const handleClearNote = () => { setNote(''); requestAnimationFrame(()=>noteRef.current?.focus()); };

  return (
    <MainLayout>
      <Box sx={{ p:2.25, pt:'4.75rem' }}>
        {/* status + steps */}
        <Card elevation={0} sx={{ borderRadius:2, border:'1px solid #ededed', mb:2 }}>
          <CardContent sx={{ p:1.5 }}>
            <Box sx={{ display:'flex', gap:2, alignItems:'stretch' }}>
              <Box sx={{ flex:'0 0 280px', bgcolor:'#FFF7F7', borderRadius:2, border:'1px solid #EFEFEF', boxShadow:'none', p:1.5 }}>
                <Box sx={{ display:'flex', alignItems:'baseline', gap:1, mb:0.25 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight:800, letterSpacing:0.4, lineHeight:1 }}>STATUS</Typography>
                  <Typography variant="caption" sx={{ fontWeight:800, color:'error.main', ml:'auto', lineHeight:1 }}>ESL ID : {eslId}</Typography>
                </Box>
                <Divider sx={{ my:1 }} />
                <StatusRows />
              </Box>
              <Box sx={{ flex:1, px:1, py:0.25, minWidth:0 }}>
                <Box sx={{ display:'flex', alignItems:'center', gap:1.5, overflowX:'auto', pb:0.5 }}>
                  {STEPS.map((s,i)=>(
                    <React.Fragment key={s.title}>
                      <StepNode title={s.title} state={s.state} index={i+1} helper={s.helper} />
                      {i<STEPS.length-1 && <Connector/>}
                    </React.Fragment>
                  ))}
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* tiles */}
        <Card elevation={0} sx={{ borderRadius:2, border:'1px solid #ededed', mb:2 }}>
          <CardContent sx={{ p:2 }}>
            <Typography variant="subtitle2" sx={{ color:'error.main', fontWeight:700, mb:1 }}>Inspection Notification Details</Typography>
            <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', sm:'repeat(2,1fr)', md:'repeat(3,1fr)', lg:'repeat(6,1fr)' }, gap:1.25 }}>
              {TILES.map(t=><InfoTile key={t.label} icon={t.icon} label={t.label} value={t.value} />)}
            </Box>
          </CardContent>
        </Card>

        {/* four cards */}
        <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'1fr 1fr', lg:'repeat(4,1fr)' }, gap:1.5 }}>
          <HollowCard title="Prompts" minH={280} />
          <HollowCard title="Inspection Recommendations/Descriptions" minH={280} />
          <HollowCard title="Attachments" minH={280} action={<IconButton size="small" color="error"><NoteAddOutlinedIcon/></IconButton>} />
          <HollowCard
            title="MSP Engineer Note Pad"
            minH={280}
            action={
              <Box sx={{ display:'flex', alignItems:'center', gap:0.5 }}>
                <Tooltip title="Save To Record (download)">
                  <span><IconButton size="small" color="error" aria-label="Save to record" onClick={handleSaveNote} disabled={!note.trim()}><SaveAltOutlinedIcon/></IconButton></span>
                </Tooltip>
                <Tooltip title="Clear">
                  <span><IconButton size="small" color="inherit" aria-label="Clear note" onClick={handleClearNote} disabled={!note.trim()}><ClearOutlinedIcon/></IconButton></span>
                </Tooltip>
              </Box>
            }
          >
            <Box
              sx={{
                position:'relative', height:240, border:'1px dashed #DBDBDB', borderRadius:1,
                background:'repeating-linear-gradient(white, white 28px, #ECECEC 29px, #ECECEC 30px)'
              }}
              onMouseEnter={()=>setHoveringNotePad(true)}
              onMouseLeave={()=>setHoveringNotePad(false)}
            >
              {hoveringNotePad && !note.trim() && (
                <Typography sx={{ position:'absolute', inset:0, display:'grid', placeItems:'center', color:'text.disabled', fontStyle:'italic', pointerEvents:'none', userSelect:'none' }}>
                  Please enter the text
                </Typography>
              )}
              <textarea
                ref={noteRef}
                value={note}
                onChange={(e)=>setNote(e.target.value)}
                placeholder="Write your note here..."
                style={{
                  width:'100%', height:'100%', border:'none', outline:'none', resize:'none', background:'transparent',
                  padding:'8px', fontFamily:'inherit', fontSize:'14px', lineHeight:'28px', color:'#333', position:'relative', zIndex:1
                }}
                aria-label="MSP Engineer notes"
              />
          </Box>
          </HollowCard>
        </Box>

        {/* bottom bar */}
        <Box sx={{ mt:2 }}>
          <Box>
            <Typography variant="caption" sx={{ color:'error.main', fontWeight:700 }}>Inspection Files Location:</Typography>
            <Typography variant="caption" sx={{ ml:1, color:'text.secondary' }}>
              K:\BTAREA\BTES\FIXEDEQUIP\Inspection\FS\CLEU\CLEUs\Inspection Planner’s Folder\EOR Folder CLE3L3-T0302
            </Typography>
          </Box>
          <Box sx={{ mt:1.5, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <Button variant="outlined" color="error" startIcon={<ArrowBackIcon/>} onClick={()=>navigate('/tmin')} sx={{ textTransform:'none' }}>BACK TO LIST</Button>
            <Button variant="contained" sx={{ textTransform:'none', px:4, borderRadius:2, bgcolor:'#FF4D4D', '&:hover':{ bgcolor:'#E53935' } }}>Next</Button>
          </Box>
        </Box>

        <Snackbar open={savedOpen} autoHideDuration={1800} onClose={()=>setSavedOpen(false)} anchorOrigin={{ vertical:'bottom', horizontal:'right' }}>
          <Alert onClose={()=>setSavedOpen(false)} severity="success" variant="filled" sx={{ fontSize:13 }}>Note downloaded.</Alert>
        </Snackbar>
      </Box>
    </MainLayout>
  );
};

export default TMinReview;
