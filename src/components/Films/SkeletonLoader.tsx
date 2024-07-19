import { Box, Typography, Skeleton } from '@mui/material'

const SkeletonLoader = () => {
  return (
    <Box sx={{ padding: '10px', textAlign: 'center' }}>
      <Skeleton variant="rectangular" width={150} height={225} />
      <Typography variant="body2" component="div" sx={{ marginTop: 1 }}>
        <Skeleton width="60%" />
      </Typography>
      <Typography variant="body2" component="div">
        <Skeleton width="40%" />
      </Typography>
    </Box>
  )
}

export default SkeletonLoader
