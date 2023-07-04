import styled from '@emotion/styled'
import { Button } from '@mui/material'

const GreyButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.grey[500_32],
  borderWidth: 2,
  borderStyle: 'solid',
  color: theme.palette.text.primary,
}))

export default GreyButton
