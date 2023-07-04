import styled from '@emotion/styled'
import { Box, Tabs } from '@mui/material'

const StickyTabHeaders = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  overflowX: 'hidden',
  position: 'sticky',
  top: '56px',
  backgroundColor: 'white',
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}))

const CustomTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-flexContainer': {
    gap: theme.spacing(2),
  },
}))

export { StickyTabHeaders, CustomTabs}