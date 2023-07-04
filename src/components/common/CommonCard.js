import styled from '@emotion/styled'
import { Card } from '@mui/material'

const CommonCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.customShadows.zCard,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  backgroundColor: 'transparent',
}))

export default CommonCard
