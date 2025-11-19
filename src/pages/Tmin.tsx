import React, { useEffect, useState } from 'react';
import { Box, Typography, Modal, CircularProgress, Dialog } from '@mui/material';
import MainLayout from '../components/MainLayout';
import { UserInfoHeader } from './user-info-header/UserInfoHeader';
import DataTable from '../components/DataTable';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { ColumnsType } from 'types';
import { useGetItemsQuery } from 'store/api';
import SvgModalAnimator from 'components/SvgModalAnimator';

const COLUMNS: ColumnsType[] = [
  { id: "eslid", label: "ESL ID", sortable: true },
  { id: "eslHealth", label: "ESL Health", sortable: true },
  { id: "assignedDate", label: "Assigned Date", sortable: true },
  { id: "deadLineDate", label: "Due Date", sortable: true },
  { id: "statusName", label: "Execution Status", minWidth: 120, sortable: true },
  { id: "severityName", label: "Severity", sortable: true },
  { id: "site", label: "Site", sortable: true },
  { id: "unitName", label: "Unit", sortable: true },
  { id: "equipmentTypeName", label: "Equipment Type", sortable: true },
  //   { id: "businessTeamName", label: "Business Team",  minWidth: 150 },
  //  { id: "processDescription", label: "Process Description", minWidth: 260 },
]
const TMin: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ id?: string }>();
  const { data = [] } = useGetItemsQuery('Esls');
  const taskIdFromState = (location.state as any)?.taskId as string | undefined;
  const taskId = taskIdFromState || params.id;
  const [openModal, setOpenModal] = useState(false);
  const [selectedEslId, setSelectedEslId] = useState<string | null>(null)
  const [selectedEsl, setSelectedEsl] = useState<any>(null);
  const handleClick = (eslId: string) => {
    console.log("data:", data);

    const row = data.find((item: any) => item.eslid === Number(eslId));
    if (row) {
      setSelectedEsl(row);
      setOpenModal(true);
    } else {
      console.warn("No row found for ESL ID:", eslId);
    }
  };

  const handleClose = (event: object, reason: string) => {
    if (reason === "backdropClick") return; 
    console.log('reason', reason);
    setOpenModal(false);
  };

  useEffect(() => {
    if (openModal && selectedEsl) {
      const timer = setTimeout(() => {
        setOpenModal(false);
        sessionStorage.setItem("eslData", JSON.stringify(selectedEsl))
        // navigate("/tmin-review", { state: { eslData: selectedEsl } });
          navigate("/tmin-review");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [openModal, selectedEsl]);

  return (
    <MainLayout>
      <Box sx={{ p: 3, pt: "3.4rem" }}>
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
           rawCount={20}
          isSearchable
          isPagination={true}
          // showActions={{ view: true }}
          sourceLink="eslid"
          navigateTo="/tmin-review"
          onClick={handleClick}
        />
        {/* <Modal  slotProps={{
    backdrop: { onClick: (e) => {
      e.preventDefault()
    console.log('e', e)} }, // prevent backdrop clicks
  }} aria-labelledby="keep-modal-open"  disableEnforceFocus ={true} disableEscapeKeyDown = {true} open={openModal} onClose={() => {}} disableAutoFocus={true}> */}
        <Dialog open={openModal} onClose={handleClose} disableEscapeKeyDown={true}>
          <Box onClick={(e) =>
            e.preventDefault()}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              p: 2,
              borderRadius: 1.5,
              boxShadow: 20,
              textAlign: "center",
              width: 220,
              minHeight: 160,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              ESL ID: {selectedEsl?.eslId}
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              Redirecting to review...
            </Typography>
            <Box sx={{ mt: 1 }}>
              <SvgModalAnimator
                open={openModal}
                onClose={() => setOpenModal(false)}
                selectedEslId={selectedEsl?.eslId}
                frameInterval={400}
              />
            </Box>
            <CircularProgress size={20} sx={{ mt: 1.5 }} />
          </Box>
        </Dialog>

      </Box>
    </MainLayout>
  )
};

export default TMin;
