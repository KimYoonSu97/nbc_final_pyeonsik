import { Box, CircularProgress } from '@mui/material';

/**
 * 돌아가는 빈 원으로 로딩 중임을 나타냅니다.
 */
const ProgressCircle = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
};

export default ProgressCircle;
