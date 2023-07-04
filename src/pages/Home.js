import { Link } from 'react-router-dom'
import { alpha } from '@mui/material/styles'
import styled from '@emotion/styled'
import { Container } from '@mui/system'
import { Avatar, Box, Card, Grid, Typography } from '@mui/material'
import Page from '@components/common/loader/Page'

const RootStyle = styled(Page)({
  height: '100%',
})

const servicos = [
  { value: 'cuidador', label: 'Cuidador' },
  { value: 'tecnico', label: 'Técnico de Enfermagem' },
  { value: 'faxineira', label: 'Diarista' },
  { value: 'lavanderia', label: 'Lavanderia' },
  { value: 'alimentacao', label: 'Alimentação' },
]

const features = [
  {
    title: 'Curabitur vitae euismod',
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
    vel lorem vel est interdum condimentum eget non ante. Sed
    vestibulum elit sit`,
  },
  {
    title: 'Sed vestibulum elit',
    text: `Morbi in tincidunt diam. Nullam quis mi tincidunt elit
    rhoncus venenatis a id erat.Lorem ipsum dolor sit amet,
    consectetur adipiscing.`,
  },
  {
    title: 'vitae dolor pharetra',
    text: `Nam vel lorem vel est interdum condimentum eget non ante.
    Sed vestibulum elit sit amet velit fringilla ultrices. Donec
    eu eros ut dui posuere dapibus et non urna.`,
  },
  {
    title: 'mattis et ut orci',
    text: `Cras id efficitur lorem. Pellentesque pretium nulla vel
    vehicula mollis. Curabitur vitae euismod tortor. Donec eu
    eros ut dui.`,
  },
]

const CardLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme => theme.spacing(2),
}))

const FeatureContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
  [theme.breakpoints.down('md')]: {
    padding: `0px ${theme.spacing(2)}`,
    flexDirection: 'column',
  },
}))

const FeatureList = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginLeft: 'auto',
  [theme.breakpoints.up('sm')]: {
    paddingLeft: `${theme.spacing(3)}`,
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: '600px',
  },
}))

const FeatureColumn = styled(`div`)(({ theme }) => ({
  width: '50%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))

const Home = () => {
  return (
    <RootStyle title="Tripto" id="homepage">
      <Box
        sx={{
          height: '100%',
          width: '100%',
          backgroundColor: theme => theme.palette.grey['100'],
        }}>
        <Box component={Container} pt={10} pb={15}>
          <Typography variant="h3">Serviços</Typography>
          <Grid
            container
            sx={{ marginTop: theme => theme.spacing(5) }}
            spacing={2}>
            {servicos.map((itm, idx) => (
              <Grid item xs={6} sm={4} md={3} key={`card-item-${idx}`}>
                <CardLink to={itm.value}>
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: theme => theme.spacing(2),
                      boxShadow: theme => theme.customShadows.zCard,
                      aspectRatio: '1 /1',
                      '&:hover': {
                        boxShadow: theme => theme.customShadows.primary,
                        transitionDuration: '300ms',
                      },
                      gap: 2,
                    }}>
                    <Avatar
                      src={`/assets/icons/servicos-${itm.value}.svg`}
                      sx={{
                        width: '50%',
                        height: 'auto',
                        aspectRatio: '1 / 1',
                        bgcolor: theme =>
                          alpha(theme.palette.primary.lighter, 0.25),
                        justifyContent: 'center',
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textAlign: 'center',
                      }}>
                      {itm.label}
                    </Typography>
                  </Card>
                </CardLink>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Box
        component="div"
        sx={{ width: '100%', height: '100%', backgroundColor: 'white' }}
        pt={10}
        pb={15}>
        <Container>
          <Typography variant="h3">
            Tripto, o primero marketplace de serviços de apoio à saúde e bem
            estar.
          </Typography>
        </Container>
        <Box component="div" sx={{ width: '100%' }}>
          <FeatureContent mt={4}>
            <FeatureColumn>
              <FeatureList gap={3}>
                {features.map((itm, idx) => (
                  <Box component="div" key={`feature-${idx}`}>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: 'primary.dark' }}>
                      {itm.title}
                    </Typography>
                    <Typography variant="body1">{itm.text}</Typography>
                  </Box>
                ))}
              </FeatureList>
            </FeatureColumn>
            <FeatureColumn>
              <Box
                component="img"
                src="/assets/images/home-hero.png"
                sx={{ width: '100%', maxWidth: '100%' }}
              />
            </FeatureColumn>
          </FeatureContent>
        </Box>
      </Box>
    </RootStyle>
  )
}

export default Home
