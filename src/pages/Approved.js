import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Container, Typography } from '@mui/material'
import { Box } from '@mui/system'

import styled from '@emotion/styled'
import Page from '@components/common/loader/Page'

import Footer from '@components/Footer'

const RootStyle = styled(Page)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: theme.palette.primary.main,
  padding: `${theme.spacing(5)} 0 0 0`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
}))

const Approved = () => {
  const navigate = useNavigate()

  const handleContinue = () => {
    navigate('/')
  }
  return (
    <RootStyle title="Checkout - Pagamento approved" id="approved">
      <Link to="/">
        <Box component="img" src="/assets/logo/logo-full.png" height={40} />
      </Link>
      <Box
        component={Container}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
        gap={3}>
        <Typography variant="h3" mt={5} sx={{ textAlign: 'center' }}>
          Compra realizada com sucesso!
        </Typography>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '520px',
            maxWidth: '100%',
            padding: theme => theme.spacing(3),
            gap: theme => theme.spacing(3),
          }}>
          <Typography variant="h4">Obrigado, Janaina!</Typography>
          <Typography variant="body1">
            Em instantes você receber uma mensagem no email
            janainaramos55@gmail.com com os detalhes do seu pedido #9561
          </Typography>
          <Button variant="contained" color="primary" onClick={handleContinue}>
            Continuar Comprando
          </Button>
        </Card>
      </Box>
      <Footer />
    </RootStyle>
  )
}

export default Approved
