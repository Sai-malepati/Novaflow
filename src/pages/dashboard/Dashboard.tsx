// import React from 'react';
// import {  Box , Typography } from '@mui/material';
// import DataTable from '../../components/DataTable';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import MainLayout from '../../components/MainLayout';
// import { UserInfoHeader } from '../user-info-header/UserInfoHeader';
 
// const Dashboard: React.FC = () => {
//   const columns = [
//     { id: 'ESLID', label: 'ESL ID', sortable: true, minWidth: 150 },
//     { id: 'Severity', label: 'Severity' },
//     { id: 'AssignedDate', label: 'Assigned Date' },
//     { id: 'BusinessTeam', label: 'Business Team', sortable: true, minWidth: 200 },
//     { id: 'DueInDays', label: 'Due in Days' },
//     { id: 'Unit', label: 'Unit' },
//     { id: 'EquipmentType', label: 'Equipment Type' },
//     { id: 'Status', label: 'Status' },
//     { id: 'ProcessDescription', label: 'Process Description', minWidth: 300 },
//   ];
 
//   const rows = [
//     {
//       ESLID: '107011',
//       Severity: 'Critical',
//       AssignedDate: '30/07/2025',
//       BusinessTeam: 'CDCC',
//       DueInDays: '2 days',
//       Unit: 'PS3',
//       EquipmentType: 'Piping',
//       Status: 'Inprogress',
//       ProcessDescription: 'Product Manifold System',
//     },
//     {
//       ESLID: '107012',
//       Severity: 'High',
//       AssignedDate: '30/07/2025',
//       BusinessTeam: 'CLEU5',
//       DueInDays: '2 days',
//       Unit: 'WLFS',
//       EquipmentType: 'Piping',
//       Status: 'Under MSP review',
//       ProcessDescription: 'SOUR Water System',
//     },
//   ];
 
//   // Chart data
//   const chartData = [
//     { name: 'Week 1', value: 10 },
//     { name: 'Week 2', value: 15 },
//     { name: 'Week 3', value: 20 },
//     { name: 'Week 4', value: 30 },
//   ];
 
 
//   return (
//     <MainLayout>
//       <Box sx={{ p: 3, paddingTop: '5rem' }}>
//         <UserInfoHeader />
//         <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
//           {/* Data Table */}
//           <DataTable
//             title="Recent ESL Task"
//             columns={columns}
//             rows={rows}
//             showActions={{ view: true }}
//           />
 
//           {/* Chart */}
//           <Box
//             sx={{
//               mt: 4,
//               width: '100%',
//               maxWidth: 800,
//               borderRadius: '10px',
//               boxShadow: 3,
//             }}
//           >
//             <Typography
//               variant="subtitle1"
//               sx={{ backgroundColor: '#FDF3F3', padding: 1, mb: 2, fontWeight: 600 }}
//             >
//               Work Report
//             </Typography>
//             <ResponsiveContainer width="100%" height={120}>
//               <LineChart  data={chartData}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="value"
//                   stroke="#1976d2"
//                   strokeWidth={2}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </Box>
//         </Box>
//       </Box>
//     </MainLayout>
//   );
// };
 
// export default Dashboard;
 
//  import React, { memo } from 'react';
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Divider,
//   Link as MUILink,
// } from '@mui/material';
// import DataTable from '../../components/DataTable';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import MainLayout from '../../components/MainLayout';
// import { UserInfoHeader } from '.././user-info-header/UserInfoHeader';
// import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
// import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
// import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
// import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
// import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
// import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';

// type TableRow = {
//   TaskID: string;
//   Severity: string;
//   AssignedDate: string;
//   DueInDays: string;
//   DocumentStatus: string;
// };
// type Column = { id: keyof TableRow | 'Actions'; label: string; sortable?: boolean; minWidth?: number };
// const tileCardSx = {
//   borderRadius: 2,
//   border: '1px solid #eee',
//   background: '#fff',
// };
// const tileContentSx = {
//   p: 2,
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   gap: 1,
//   bgcolor: '#fff',
//   borderRadius: 2,
//   minHeight: 110,
//   textAlign: 'center' as const,
// };
// const linkSx = { color: 'primary.main', textDecoration: 'none', fontSize: 14 };
// const COLUMNS: Column[] = [
//   { id: 'TaskID', label: 'Task ID', sortable: true, minWidth: 120 },
//   { id: 'Severity', label: 'Severity' },
//   { id: 'AssignedDate', label: 'Assigned Date' },
//   { id: 'DueInDays', label: 'Due In Days' },
//   { id: 'DocumentStatus', label: 'Document Status' },
// ];

// const ROWS: TableRow[] = [
//   {
//     TaskID: '107011',
//     Severity: 'Critical',
//     AssignedDate: '30/07/2025',
//     DueInDays: '2 days',
//     DocumentStatus: 'Insufficient Data',
//   },
//   {
//     TaskID: '107012',
//     Severity: 'High',
//     AssignedDate: '30/07/2025',
//     DueInDays: '2 days',
//     DocumentStatus: 'Sufficient Data',
//   },
// ];

// const CHART_DATA = [
//   { name: 'Week 1', value: 10 },
//   { name: 'Week 2', value: 15 },
//   { name: 'Week 3', value: 20 },
//   { name: 'Week 4', value: 30 },
// ];

// const REPORT_LINKS = [
//   'Manufacturer Record Book (MRB)',
//   'General arrangement',
//   'Datasheet',
//   'U1A form',
//   'Nameplate details',
// ];

// const TOOLS = [
//   { label: 'Probability of Failure', icon: <InsightsOutlinedIcon fontSize="large" /> },
//   { label: 'Corrosion Rate Calculator', icon: <ScienceOutlinedIcon fontSize="large" /> },
//   { label: 'Standard Deviation Generator', icon: <QueryStatsOutlinedIcon fontSize="large" /> },
//   { label: 'Inspection Report Scrapper', icon: <DescriptionOutlinedIcon fontSize="large" /> },
//   { label: 'Tool 5', icon: <BuildOutlinedIcon fontSize="large" /> },
//   { label: 'Tool 6', icon: <ExtensionOutlinedIcon fontSize="large" /> },
// ];
// const ReportCard = memo(function ReportCard({ title }: { title: 'Weekly Report' | 'Monthly Report' }) {
//   return (
//     <Card elevation={2} sx={{ borderRadius: 2 }}>
//       <CardContent sx={{ p: 2 }}>
//         <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.2, color: '#333' }}>
//           {title}
//         </Typography>
//         <Divider sx={{ mb: 1.5 }} />
//         <Box component="ul" sx={{ m: 0, pl: 2.5, '& li + li': { mt: 0.5 } }}>
//           {REPORT_LINKS.map((text) => (
//             <li key={text}>
//               <MUILink href="#" sx={linkSx}>
//                 {text}
//               </MUILink>
//             </li>
//           ))}
//         </Box>
//       </CardContent>
//     </Card>
//   );
// });

// const ToolsGrid = memo(function ToolsGrid() {
//   return (
//     <Card elevation={0} sx={{ borderRadius: 2, background: '#fff5f5', border: '1px solid #f3d6d6' }}>
//       <CardContent sx={{ p: 2 }}>
//         <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, color: '#333' }}>
//           Tools Connected
//         </Typography>

//         <Box
//           sx={{
//             display: 'grid',
//             gridTemplateColumns: {
//               xs: '1fr',
//               sm: 'repeat(2, 1fr)',
//               md: 'repeat(3, 1fr)',
//               lg: 'repeat(6, 1fr)',
//             },
//             gap: 2,
//           }}
//         >
//           {TOOLS.map((t) => (
//             <Card key={t.label} elevation={1} sx={tileCardSx}>
//               <CardContent sx={tileContentSx}>
//                 <Box sx={{ color: '#000' }}>{t.icon}</Box>
//                 <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2, color: 'error.main', textAlign: 'center' }}>
//                   {t.label}
//                 </Typography>
//               </CardContent>
//             </Card>
//           ))}
//         </Box>
//       </CardContent>
//     </Card>
//   );
// });
// const Dashboard: React.FC = () => {
//   return (
//     <MainLayout>
//       <Box sx={{ p: 3, pt: '5rem' }}>
//         <UserInfoHeader />
//         <Box
//           sx={{
//             mb: 2,
//             display: 'grid',
//             gridTemplateColumns: { xs: '1fr', lg: '1fr 800px' },
//             gap: 2,
//             alignItems: 'start',
//           }}
//         >
//           <DataTable
//             title="Recent ESL Task"
//             columns={COLUMNS}
//             rows={ROWS}
//             showActions={{ view: true }} 
//           />

//           <Box sx={{ mt: 4, width: '100%', borderRadius: '10px', boxShadow: 3, bgcolor: '#fff' }}>
//             <Typography variant="subtitle1" sx={{ backgroundColor: '#FDF3F3', p: 1, mb: 2, fontWeight: 600 }}>
//               Work Report
//             </Typography>
//             <ResponsiveContainer width="100%" height={120}>
//               <LineChart data={CHART_DATA}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="value" stroke="#1976d2" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//             <Box
//               sx={{
//                 mt: 2,
//                 px: 2,
//                 pb: 2,
//                 display: 'grid',
//                 gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
//                 gap: 2,
//               }}
//             >
//               <ReportCard title="Weekly Report" />
//               <ReportCard title="Monthly Report" />
//             </Box>
//           </Box>
//         </Box>
//         <ToolsGrid />
//       </Box>
//     </MainLayout>
//   );
// };

// export default Dashboard;

import React, { memo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Link as MUILink,
} from '@mui/material';
import DataTable from '../../components/DataTable';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import MainLayout from '../../components/MainLayout';
import { UserInfoHeader } from '.././user-info-header/UserInfoHeader';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import { useNavigate } from 'react-router-dom'; // ✅ NEW
import { ProbabilityIcon, CorrosionIcon, DeviationIcon, InspectionIcon, ToolIcon } from "icons"

// --- Types
type BaseRow = {
  TaskID: string;
  Severity: string;
  AssignedDate: string;
  DueInDays: string;
  DocumentStatus: string;
};

type Column = {
  id: keyof BaseRow | 'Actions';
  label: string;
  sortable?: boolean;
  minWidth?: number;
};

// --- Styles
const tileCardSx = { borderRadius: 2, border: 'none', backgroundColor: 'transparent', boxShadow: 'none', overflow: 'visible' };
const tileContentSx = {
  p: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 1,
  bgcolor: '#fff',
  borderRadius: 2,
  minHeight: 121,
  textAlign: 'center' as const,
  boxShadow: '0px 3px 6px #00000029',
  justifyContent: 'space-between'
};
const linkSx = {
  color: "#6D6E71",
  textDecorationColor: "#6D6E71",
  fontSize: 14,
  width: "100%",
  display: "block",
  padding: "4px 0",
  "&:hover": { textDecorationColor: "#28A5DD", color: "#28A5DD" },
}

// --- Table columns
const COLUMNS: Column[] = [
  { id: 'TaskID', label: 'Task ID', minWidth: 120 },
  { id: 'Severity', label: 'Severity' },
  { id: 'AssignedDate', label: 'Assigned Date' },
  { id: 'DueInDays', label: 'Due In Days' },
  { id: 'DocumentStatus', label: 'Document Status' },
];

// --- Raw rows (plain strings)
const ROWS: BaseRow[] = [
  {
    TaskID: '107011',
    Severity: 'Critical',
    AssignedDate: '30/07/2025',
    DueInDays: '2 days',
    DocumentStatus: 'Insufficient Data',
  },
  {
    TaskID: '107012',
    Severity: 'High',
    AssignedDate: '30/07/2025',
    DueInDays: '2 days',
    DocumentStatus: 'Sufficient Data',
  },
  {
    TaskID: '107013',
    Severity: 'High',
    AssignedDate: '30/07/2025',
    DueInDays: '3 days',
      DocumentStatus: 'Sufficient Data',
   },
   {
    TaskID: '107014',
    Severity: 'Critical',
    AssignedDate: '30/07/2025',
    DueInDays: '3 days',
      DocumentStatus: 'Sufficient Data',
   },
   {
    TaskID: '107015',
    Severity: 'Low',
    AssignedDate: '30/07/2025',
    DueInDays: '3 days',
      DocumentStatus: 'Sufficient Data',
   },
];

// --- Chart, Links, Tools (unchanged)
const CHART_DATA = [
  { name: 'Week 1', value: 10 },
  { name: 'Week 2', value: 15 },
  { name: 'Week 3', value: 20 },
  { name: 'Week 4', value: 30 },
];

const REPORT_LINKS = [
  'Manufacturer Record Book (MRB)',
  'General arrangement',
  'Datasheet',
  'U1A form',
  'Nameplate details',
];

const TOOLS = [
  { label: "Probability of Failure", icon: <ProbabilityIcon /> },
  { label: "Corrosion Rate Calculator", icon: <CorrosionIcon /> },
  { label: "Standard Deviation Generator", icon: <DeviationIcon /> },
  { label: "Inspection Report Scrapper", icon: <InspectionIcon /> },
  { label: "Tool 5", icon: <ToolIcon /> },
  { label: "Tool 6", icon: <ToolIcon /> },
]

export const ReportCard = memo(function ReportCard({
  title,
  links,
}: {
  title: string;
  links: string[]
}) {
  return (
    <Card elevation={2} sx={{ borderRadius: 2 }}>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.2, color: "#333" }}>
          {title}
        </Typography>
        <Divider sx={{ mb: 1.5 }} />
        {/* <Box component="ul" sx={{ m: 0, pl: 2.5, '& li + li': { mt: 0.5 } }}> */}
        {links.map((text) => (
          // <li key={text}>
          <MUILink href="#" sx={linkSx}>
            {text}
          </MUILink>
          // </li>
        ))}
        {/* </Box> */}
      </CardContent>
    </Card>
  )
})

const ToolsGrid = memo(function ToolsGrid() {
  return (
    <Card elevation={0} sx={{ borderRadius: 2, background: '#fff5f5', border: '1px solid #f3d6d6' }}>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, color: '#333' }}>
          Tools Connected
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(6, 1fr)' },
            gap: 2,
          }}
        >
          {TOOLS.map((t) => (
            <Card key={t.label} elevation={1} sx={tileCardSx}>
              <CardContent sx={tileContentSx}>
                <Box sx={{ color: '#000', border: '1px solid #6D6E71', borderRadius: 1, p: 1 }}>{t.icon}</Box>
                <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2, color: 'error.main', textAlign: 'center' }}>
                  {t.label}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
});

const Dashboard: React.FC = () => {
  const navigate = useNavigate(); // ✅ used below

  // ✅ Enhance rows just before passing to DataTable (TaskID becomes a clickable Link component)
  type UiRow = Omit<BaseRow, 'TaskID'> & { TaskID: React.ReactNode };
  const enhancedRows: UiRow[] = ROWS.map((r) => ({
    ...r,
    TaskID: (
      <MUILink
        sx={{ cursor: 'pointer', color: 'primary.main', fontWeight: 600 }}
        onClick={() => navigate('/tmin', { state: { taskId: r.TaskID } })}
      >
        {r.TaskID}
      </MUILink>
    ),
  }));

  return (
    <MainLayout>
      <Box sx={{ p: 3, pt: "5rem" }}>
        <UserInfoHeader />
        <Box
          sx={{
            mb: 2,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: 2,
            alignItems: "start",
          }}
        >
          <DataTable
            title="Recent ESL Task"
            columns={COLUMNS}
            rows={ROWS} // ✅ use enhanced rows
            showActions={{ view: true }} // unchanged
            navigateTo="/tmin-review"
            sourceLink="TaskID"
          />

          <Box sx={{ mt: 4, width: "100%", borderRadius: "10px", boxShadow: 3, bgcolor: "#fff" }}>
            <Typography
              variant="subtitle1"
              sx={{ backgroundColor: "#FDF3F3", p: 1, mb: 2, fontWeight: 600 }}
            >
              Work Report
            </Typography>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={CHART_DATA}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#1976d2" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <Box
              sx={{
                mt: 2,
                px: 2,
                pb: 2,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 2,
              }}
            >
              <ReportCard title="Weekly Report" links={REPORT_LINKS} />
              <ReportCard title="Monthly Report" links={REPORT_LINKS} />
            </Box>
          </Box>
        </Box>
        <ToolsGrid />
      </Box>
    </MainLayout>
  )
};

export default Dashboard;
