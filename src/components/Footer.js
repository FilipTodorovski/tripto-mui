import styled from '@emotion/styled'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'

const FooterDiv = styled('div')(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.primary.main,
}))

const FooterContainer = styled(Container)(({ theme }) => ({
  padding: `60px 0px 0px 0px`,
  [theme.breakpoints.down('sm')]: {
    padding: `40px 16px 16px 16px`,
  },
}))

const WhatsappButton = styled('a')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'white',
  color: theme.palette.primary.main,
  borderRadius: '8px',
  padding: '11px 22px',
  fontWeight: 500,
  cursor: 'pointer',
  '&:hover': {
    opacity: '75%',
    transitionDuration: '300ms',
  },
}))

const FooterParagraph = styled(`div`)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
  color: theme.palette.primary.lighter,
  fontWeight: 400,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

const FooterInfoWrapper = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '30px 0px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  },
}))

const FooterLinkWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '20px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: '10px',
  },
}))
const FooterLink = styled('a')(({ theme }) => ({
  color: theme.palette.primary.lighter,
  fontWeight: 400,
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': {
    opacity: '75%',
  },
}))

const Footer = () => {
  return (
    <FooterDiv>
      <FooterContainer>
        <Grid
          container
          alignItems="center"
          sx={{
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}>
          <Typography variant="h4" sx={{ color: 'white', textAlign: 'center' }}>
            Dúvidas? Entre em contato conosco!
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'white', textAlign: 'center' }}>
            Escreva para contato@tripto360.com.br ou ligue para (51) 3232-5454.
            <br />
            Nosso horário de atendimento é de segunda a sexta-feira, das 9h às
            19h.
          </Typography>
          <WhatsappButton>
            <Box
              component="img"
              src="/assets/icons/whatsapp.svg"
              sx={{ height: 24, marginRight: '5px' }}
            />
            Falar por WhatsApp
          </WhatsappButton>
        </Grid>
        <Divider
          sx={{
            marginTop: theme => theme.spacing(3),
            bgcolor: theme => theme.palette.primary.dark,
          }}
        />
        <FooterInfoWrapper>
          <FooterParagraph>
            <p>Copyright © 2022 Tripto.</p>
            <p>Todos os direitos reservados.</p>
          </FooterParagraph>
          <FooterLinkWrapper>
            <FooterLink href="tel:51-9822203239">
              <Box
                component="img"
                sx={{ height: 22, marginRight: '5px' }}
                src="/assets/icons/whatsapp-white.svg"
              />
              (51) 98222-3239
            </FooterLink>
            <FooterLink href="/terms">Termos de Uso</FooterLink>
            <FooterLink href="/politica">Politica de Privacidade</FooterLink>
          </FooterLinkWrapper>
        </FooterInfoWrapper>
      </FooterContainer>
    </FooterDiv>
  )
}

export default Footer
