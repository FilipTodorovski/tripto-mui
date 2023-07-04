import { Add, Remove } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'

const NumberButton = ({ value, onPlus, onMinus, darkMode = false }) => {
  return (
    <Box
      component="div"
      sx={{
        borderRadius: theme => theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: theme =>
          darkMode ? theme.palette.primary.light : theme.palette.grey[500_32],
      }}
      px={1}
      py={0.6}>
      <Remove
        color={value === 0 ? 'disabled' : 'inherit'}
        onClick={onMinus}
        sx={{ cursor: 'pointer' }}
      />
      <Typography
        variant="body2"
        sx={{
          width: theme => theme.spacing(6),
          textAlign: 'center',
          color: darkMode ? 'white' : 'text.primary',
        }}>
        {value}
      </Typography>
      <Add onClick={onPlus} sx={{ cursor: 'pointer' }} />
    </Box>
  )
}

export default NumberButton
