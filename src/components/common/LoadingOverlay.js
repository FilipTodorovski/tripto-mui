const { Backdrop, Typography } = require('@mui/material')
const { Box } = require('@mui/system')

const LoadingOverlay = ({ isOpen, text }) => {
  return (
    <Backdrop
      sx={{ color: 'white', zIndex: theme => theme.zIndex.tooltip + 1 }}
      open={isOpen}>
      <Box
        component="div"
        sx={{ display: 'flex', flexDirection: 'column' }}
        gap={1}>
        <Box component="img" src="/assets/icons/loading-icon.svg" />
        <Typography variant="h6" sx={{ color: 'white' }}>
          {text}
        </Typography>
      </Box>
    </Backdrop>
  )
}

export default LoadingOverlay
