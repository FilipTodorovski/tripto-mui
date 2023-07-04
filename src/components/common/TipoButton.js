import { Box } from '@mui/material'
import { alpha } from '@mui/material/styles'
import styled from '@emotion/styled'
const TipoButton = styled(Box)(({ theme, selected }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(2),
  color: selected ? theme.palette.primary.main : theme.palette.text.secondary,
  backgroundColor: selected
    ? alpha(theme.palette.primary.main, 0.08)
    : 'transparent',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: selected
    ? alpha(theme.palette.primary.main, 0.08)
    : alpha(theme.palette.text.secondary, 0.32),
  borderRadius: theme.spacing(1),
  cursor: 'pointer',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    transitionDuration: '300ms',
  },
}))

export default TipoButton
