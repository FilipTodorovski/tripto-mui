import { ErrorOutline } from '@mui/icons-material'
import { Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'

const SubtitleTip = ({
  title,
  variant = 'h6',
  description = '',
  theme = 'dark',
}) => (
  <Box
    component="div"
    sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    }}
    gap={0.5}>
    <Typography variant={variant}>{title}</Typography>
    {description !== '' ? (
      <Tooltip title={description} arrow>
        <ErrorOutline
          sx={{
            height: 16,
            color: theme === 'dark' ? 'grey.500' : 'grey.400',
          }}
        />
      </Tooltip>
    ) : null}
  </Box>
)

export default SubtitleTip
