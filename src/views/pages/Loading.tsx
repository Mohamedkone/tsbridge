import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface LoadingProps {
  width?: string | number | null;
}

export default function Loading({ width = null }: LoadingProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress
        style={width ? { width } : undefined}
      />
    </Box>
  );
}
