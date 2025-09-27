// import React from 'react';
// import { Box, Typography } from '@mui/material';
// import DataTable from '../components/DataTable';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import MainLayout from '../components/MainLayout';
// import { UserInfoHeader } from './user-info-header/UserInfoHeader';
 
// const Tmin: React.FC = () => {
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
 
// export default Tmin;
 
//  import React from 'react';
// import { Box } from '@mui/material';
// import MainLayout from '../components/MainLayout';
// import { UserInfoHeader } from './user-info-header/UserInfoHeader';
// import DataTable from '../components/DataTable';

// const COLUMNS = [
//   { id: 'ESLID', label: 'ESL ID', sortable: true, minWidth: 120 },
//   { id: 'Severity', label: 'Severity' },
//   { id: 'AssignedDate', label: 'Assigned Date' },
//   { id: 'BusinessTeam', label: 'Business Team' },
//   { id: 'DueInDays', label: 'Due In Days' },
//   { id: 'Unit', label: 'Unit' },
//   { id: 'EquipmentType', label: 'Equipment Type' },
//   { id: 'Status', label: 'Status' },
//   { id: 'ProcessDescription', label: 'Process Description', minWidth: 260 },
// ];

// const ROWS = [
//   {
//     ESLID: '107011',
//     Severity: 'Critical',
//     AssignedDate: '30/07/2025',
//     BusinessTeam: 'CDCC',
//     DueInDays: '2 days',
//     Unit: 'PS3',
//     EquipmentType: 'Piping',
//     Status: 'Inprogress',
//     ProcessDescription:
//       'Product Manifold System // Number Product Manifold (PS3-PI25F)',
//   },
//   {
//     ESLID: '107012',
//     Severity: 'High',
//     AssignedDate: '30/07/2025',
//     BusinessTeam: 'CLEUS',
//     DueInDays: '2 days',
//     Unit: 'WLFS',
//     EquipmentType: 'Piping',
//     Status: 'Under MSP review',
//     ProcessDescription: 'SOUR WATER',
//   },
//   {
//     ESLID: '107013',
//     Severity: 'High',
//     AssignedDate: '30/07/2025',
//     BusinessTeam: 'CLEU3',
//     DueInDays: '3 days',
//     Unit: 'CLEU3',
//     EquipmentType: 'Pressure Vessel',
//     Status: 'New Task',
//     ProcessDescription: 'REACTIVATOR',
//   },
//   {
//     ESLID: '107014',
//     Severity: 'Critical',
//     AssignedDate: '30/07/2025',
//     BusinessTeam: 'CDCC',
//     DueInDays: '0 days',
//     Unit: 'WLFS',
//     EquipmentType: 'Pressure Vessel',
//     Status: 'MSP Review Completed',
//     ProcessDescription: 'SOUR WATER',
//   },
//   {
//     ESLID: '107015',
//     Severity: 'High',
//     AssignedDate: '30/07/2025',
//     BusinessTeam: 'CDCC',
//     DueInDays: '0 days',
//     Unit: 'WLFS',
//     EquipmentType: 'Piping',
//     Status: 'MSP Review Completed',
//     ProcessDescription: 'SOUR WATER',
//   },
//   {
//     ESLID: '107016',
//     Severity: 'High',
//     AssignedDate: '30/07/2025',
//     BusinessTeam: 'CLEUS',
//     DueInDays: '2 days',
//     Unit: 'WLFS',
//     EquipmentType: 'Piping',
//     Status: 'Inprogress',
//     ProcessDescription:
//       'Product Manifold System // Number Product Manifold (PS3-PI25F)',
//   },
//   {
//     ESLID: '107017',
//     Severity: 'Low',
//     AssignedDate: '30/07/2025',
//     BusinessTeam: 'CLEUS',
//     DueInDays: '3 days',
//     Unit: 'WLFS',
//     EquipmentType: 'Piping',
//     Status: 'New Task',
//     ProcessDescription:
//       'Product Manifold System // Number Product Manifold (PS3-PI25F)',
//   },
// ];

// const TMin: React.FC = () => {
//   return (
//     <MainLayout>
//       <Box sx={{ p: 3, pt: '5rem' }}>
//         <UserInfoHeader />

//         <DataTable
//           title="END OF SERVICE LIFE MANAGEMENT"
//           columns={COLUMNS}
//           rows={ROWS}
//           isSearchable              
//           isPagination             
//           showActions={{ view: true }} 
//         />
//       </Box>
//     </MainLayout>
//   );
// };

// export default TMin;

import React, { useMemo } from 'react';
import { Box, Typography, Link as MUILink } from '@mui/material';
import MainLayout from '../components/MainLayout';
import { UserInfoHeader } from './user-info-header/UserInfoHeader';
import DataTable from '../components/DataTable';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

/* ✅ NEW: Row & Column types so TS knows the shape */
type Row = {
  ESLID: string;
  Severity: string;
  AssignedDate: string;
  BusinessTeam: string;
  DueInDays: string;
  Unit: string;
  EquipmentType: string;
  Status: string;
  ProcessDescription: string;
};

type Column = {
  id: keyof Row | 'Actions';
  label: string;
  sortable?: boolean;
  minWidth?: number;
};

const COLUMNS: Column[] = [
  { id: 'ESLID', label: 'ESL ID', sortable: true, minWidth: 120 },
  { id: 'Severity', label: 'Severity' },
  { id: 'AssignedDate', label: 'Assigned Date' },
  { id: 'BusinessTeam', label: 'Business Team' },
  { id: 'DueInDays', label: 'Due In Days' },
  { id: 'Unit', label: 'Unit' },
  { id: 'EquipmentType', label: 'Equipment Type' },
  { id: 'Status', label: 'Status' },
  { id: 'ProcessDescription', label: 'Process Description', minWidth: 260 },
];

/* ✅ CHANGED: explicitly type ROWS as Row[] */
const ROWS: Row[] = [
  {
    ESLID: '107011',
    Severity: 'Critical',
    AssignedDate: '30/07/2025',
    BusinessTeam: 'CDCC',
    DueInDays: '2 days',
    Unit: 'PS3',
    EquipmentType: 'Piping',
    Status: 'Inprogress',
    ProcessDescription:
      'Product Manifold System // Number Product Manifold (PS3-PI25F)',
  },
  {
    ESLID: '107012',
    Severity: 'High',
    AssignedDate: '30/07/2025',
    BusinessTeam: 'CLEUS',
    DueInDays: '2 days',
    Unit: 'WLFS',
    EquipmentType: 'Piping',
    Status: 'Under MSP review',
    ProcessDescription: 'SOUR WATER',
  },
  {
    ESLID: '107013',
    Severity: 'High',
    AssignedDate: '30/07/2025',
    BusinessTeam: 'CLEU3',
    DueInDays: '3 days',
    Unit: 'CLEU3',
    EquipmentType: 'Pressure Vessel',
    Status: 'New Task',
    ProcessDescription: 'REACTIVATOR',
  },
   {
    ESLID: '107014',
    Severity: 'Critical',
    AssignedDate: '30/07/2025',
    BusinessTeam: 'CLEU3',
    DueInDays: '3 days',
    Unit: 'CLEU3',
    EquipmentType: 'Pressure Vessel',
    Status: 'New Task',
    ProcessDescription: 'REACTIVATOR',
  },
   {
    ESLID: '107015',
    Severity: 'High',
    AssignedDate: '30/07/2025',
    BusinessTeam: 'CLEU3',
    DueInDays: '3 days',
    Unit: 'CLEU3',
    EquipmentType: 'Pressure Vessel',
    Status: 'New Task',
    ProcessDescription: 'REACTIVATOR',
  },
];

const TMin: React.FC = () => {
  const location = useLocation();
  const params = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const taskIdFromState = (location.state as any)?.taskId as string | undefined;
  const taskId = taskIdFromState || params.id;

  /* ✅ CHANGED: type the memo result as Row[] */
  const rowsToShow: Row[] = useMemo(() => {
    const copy = [...ROWS];
    if (!taskId) return copy;
    copy.sort((a, b) => (a.ESLID === taskId ? -1 : b.ESLID === taskId ? 1 : 0));
    return copy;
  }, [taskId]);

  /* ✅ NEW: UI row type because ESLID becomes a ReactNode (link) */
  type UiRow = Omit<Row, 'ESLID'> & { ESLID: React.ReactNode };
  const enhancedRows: UiRow[] = rowsToShow.map((r) => ({
    ...r,
    ESLID: (
      <MUILink
        sx={{ cursor: 'pointer', color: 'primary.main', fontWeight: 600 }}
        onClick={() => navigate('/tmin/review', { state: { eslId: r.ESLID } })}
      >
        {r.ESLID}
      </MUILink>
    ),
  }));

  return (
    <MainLayout>
      <Box sx={{ p: 3, pt: '5rem' }}>
        <UserInfoHeader />

        {taskId && (
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            Showing details (clicked) for ESL ID: <strong>{taskId}</strong>
          </Typography>
        )}

        {/* If your DataTable only accepts string|number cells, keep the cast.
           Better: widen DataTable cell type to include React.ReactNode. */}
        <DataTable
          title="END OF SERVICE LIFE MANAGEMENT"
          columns={COLUMNS}
          rows={enhancedRows as any}
          isSearchable
          isPagination
          showActions={{ view: true }}
        />
      </Box>
    </MainLayout>
  );
};

export default TMin;