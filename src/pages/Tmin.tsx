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
  { id: "ESLID", label: "ESL ID", sortable: true, minWidth: 120 },
  { id: "Severity", label: "Severity" },
  { id: "AssignedDate", label: "Assigned Date" },
  { id: "BusinessTeam", label: "Business Team", sortable: true },
  { id: "DueInDays", label: "Due In Days" },
  { id: "Unit", label: "Unit" },
  { id: "EquipmentType", label: "Equipment Type" },
  { id: "Status", label: "Status" },
  { id: "ProcessDescription", label: "Process Description", minWidth: 260 },
]

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
        onClick={() => navigate('/tmin-review', { state: { eslId: r.ESLID } })}
      >
        {r.ESLID}
      </MUILink>
    ),
  }));

  return (
    <MainLayout>
      <Box sx={{ p: 3, pt: "5rem" }}>
        <UserInfoHeader />

        {taskId && (
          <Typography variant="subtitle2" sx={{ mb: 1, color: "text.secondary" }}>
            Showing details (clicked) for ESL ID: <strong>{taskId}</strong>
          </Typography>
        )}

        {/* If your DataTable only accepts string|number cells, keep the cast.
           Better: widen DataTable cell type to include React.ReactNode. */}
        <DataTable
          title="END OF SERVICE LIFE MANAGEMENT"
          columns={COLUMNS}
          rows={ROWS}
          isSearchable
          isPagination
          showActions={{ view: true }}
          sourceLink='ESLID'
          navigateTo='/tmin-review'
        />
      </Box>
    </MainLayout>
  )
};

export default TMin;
