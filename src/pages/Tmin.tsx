import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography, Link as MUILink, Modal, CircularProgress } from '@mui/material';
import MainLayout from '../components/MainLayout';
import { UserInfoHeader } from './user-info-header/UserInfoHeader';
import DataTable from '../components/DataTable';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { ColumnsType } from 'types';
import { useGetItemsQuery } from 'store/api';
import SvgModalAnimator from 'components/SvgModalAnimator';

const COLUMNS: ColumnsType[] = [
  { id: "eslid", label: "ESL ID", sortable: true, minWidth: 120 },
  { id: "severityName", label: "Severity" },
  { id: "assignedDate", label: "Assigned Date" },
  { id: "businessTeamName", label: "Business Team", sortable: true },
  { id: "dueInDays", label: "Due In Days" },
  { id: "unitName", label: "Unit" },
  { id: "equipmentTypeName", label: "Equipment Type" },
  { id: "statusName", label: "Status" },
  { id: "processDescription", label: "Process Description", minWidth: 260 },
]

const TMin: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ id?: string }>();
  const {data = []} = useGetItemsQuery('Esls');
  const taskIdFromState = (location.state as any)?.taskId as string | undefined;
  const taskId = taskIdFromState || params.id;
  const [openModal, setOpenModal] = useState(false);
  const [selectedEslId, setSelectedEslId] = useState<string | null>(null)
  const handleClick = (value: string) => {
    setSelectedEslId(value);
    setOpenModal(true);
  }

  useEffect(() => {
    if (openModal && selectedEslId) {
      const timer = setTimeout(() => {
        setOpenModal(false)
        navigate("/tmin-review", { state: { eslId: selectedEslId } })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [openModal, selectedEslId])

  return (
    <MainLayout>
      <Box sx={{ p: 3, pt: "5rem" }}>
        <UserInfoHeader />

        {taskId && (
          <Typography variant="subtitle2" sx={{ mb: 1, color: "text.secondary" }}>
            Showing details (clicked) for ESL ID: <strong>{taskId}</strong>
          </Typography>
        )}
        <DataTable
          title="END OF SERVICE LIFE MANAGEMENT"
          columns={COLUMNS}
          rows={data}
          isSearchable
          isPagination
          showActions={{ view: true }}
          sourceLink="eslid"
          navigateTo="/tmin-review"
          onClick={handleClick}
        />
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 2,
              boxShadow: 24,
              textAlign: "center",
              width: 300,
            }}
          >
            <Typography variant="h6">ESL ID: {selectedEslId}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Redirecting to review...
            </Typography>
            <Box sx={{ mt: 2 }}>
              <SvgModalAnimator
                open={openModal}
                onClose={() => setOpenModal(false)}
                selectedEslId={selectedEslId}
                frameInterval={400}
              />
            </Box>
            <CircularProgress sx={{ mt: 2 }} />
          </Box>
        </Modal>
      </Box>
    </MainLayout>
  )
};

export default TMin;
