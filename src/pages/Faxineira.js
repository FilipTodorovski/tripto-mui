import { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import {
  Box,
  Grid,
  Typography,
  Container,
  TextField,
  Divider,
  Button,
} from '@mui/material'
import styled from '@emotion/styled'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { propertySize, carouseImages, description, faq } from '@mock/faxineira'
import Page from '@components/common/loader/Page'
import {
  SubtitleTip,
  DescriptionSection,
  TipoButton,
  CommonCard,
} from '@components/common'

const RootStyle = styled(Page)({
  height: '100%',
})

const PageWrapper = styled(`div`)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
  padding: `${theme.spacing(10)} 0`,
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(5)} 0`,
  },
}))

const weekLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex']
const durations = [4, 6, 8]

const Faxineira = () => {
  const [tipo, setTipo] = useState('assinatura')
  const [size, setSize] = useState(null)
  const [weeks, setWeeks] = useState([])
  const [duration, setDuration] = useState(4)
  const [stuff, setStuff] = useState(null)
  const [date, setDate] = useState(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    // load data
    const dt = new Date()
    setDate(dt.toLocaleDateString())
    setWeeks(
      weekLabels.map(w => ({
        label: w,
        enabled: false,
        price: 100,
      })),
    )
    setTotal(0)
  }, [])

  const indicatorImages = carouseImages.map(img => (
    <Box
      component="img"
      src={img}
      sx={{
        width: theme => theme.spacing(8),
        height: theme => theme.spacing(8),
        objectFit: 'cover',
      }}
    />
  ))

  const updateWeek = idx => {
    const updated = [...weeks]
    if (!updated[idx].enabled) {
      const count = updated.filter(w => w.enabled).length
      if (count >= 2) {
        return
      }
      updated[idx].enabled = true
    } else {
      updated[idx].enabled = false
    }
    setWeeks(updated)
  }

  const handlesubmit = () => {}

  return (
    <RootStyle title="Faxineira" id="faxineira">
      <PageWrapper>
        <Container>
          <Typography variant="h3">Faxineira</Typography>
          <Grid container spacing={2} mt={5}>
            <Grid item md={6} sm={12} order={{ md: 1, xs: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={5}>
                <Typography variant="body1">
                  Através de nossos parceiros, a Tripto conecta você aos
                  melhores serviços de faxineiras diaristas e outros
                  profissionais do lar, diminuindo o custo e estresse da família
                  na gestão do domícilio. Os profissionais parceiros têm
                  confiabilidade e habilidade para executar as funções
                  necessárias para atender a sua demanda.
                </Typography>
                <Box>
                  <Typography variant="h4">Monte seu Plano</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }} mt={3}>
                    <SubtitleTip title="Tipo" description="Monteseu plano" />
                    <Grid container spacing={2} mt={0}>
                      <Grid item xs={6}>
                        <TipoButton
                          selected={tipo === 'assinatura'}
                          onClick={() => setTipo('assinatura')}>
                          <Typography variant="subtitle1">
                            Contratação Contínua
                          </Typography>
                          <Typography variant="body2">
                            Assinatura Mensal
                          </Typography>
                        </TipoButton>
                      </Grid>
                      <Grid item xs={6}>
                        <TipoButton
                          selected={tipo === 'pedido'}
                          onClick={() => setTipo('pedido')}>
                          <Typography variant="subtitle1">
                            Contratação Eventual
                          </Typography>
                          <Typography variant="body2">Pedido Único</Typography>
                        </TipoButton>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={1}>
                  <SubtitleTip
                    title="Tamanho Aproximado do Imóvel"
                    description="Tamanho Aproximado do Imóvel"
                  />
                  <Grid container spacing={2}>
                    {propertySize.map(itm => (
                      <Grid item xs={4} key={`property-size-${itm.key}`}>
                        <TipoButton
                          selected={itm.key === size?.key}
                          onClick={() => setSize(itm)}>
                          <Typography variant="subtitle1">
                            {itm.label}
                          </Typography>
                        </TipoButton>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                {tipo === 'continua' ? (
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    gap={1}>
                    <SubtitleTip title="Frequência Semanal do Serviço" />
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                      gap={2}>
                      {weeks.map((w, idx) => (
                        <TipoButton
                          selected={w.enabled}
                          onClick={() => updateWeek(idx)}
                          sx={{ width: '100%' }}
                          key={`week-item-${idx}`}>
                          <Typography variant="subtitle1">{w.label}</Typography>
                        </TipoButton>
                      ))}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Máximo 2 dias por semana.
                    </Typography>
                  </Box>
                ) : null}
                <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={1}>
                  <SubtitleTip title="Duração do Serviço" />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                    gap={2}>
                    {durations.map((d, idx) => (
                      <TipoButton
                        selected={d === duration}
                        onClick={() => setDuration(d)}
                        sx={{ width: '100%' }}
                        key={`duration-item-${idx}`}>
                        <Typography variant="subtitle1">{d}h</Typography>
                      </TipoButton>
                    ))}
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={1}>
                  <SubtitleTip title="Turno do Serviço" />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                    gap={2}>
                    {['Manhã', 'Tarde'].map((s, idx) => (
                      <TipoButton
                        selected={s === stuff}
                        onClick={() => setStuff(s)}
                        sx={{ width: '100%' }}
                        key={`stuff-item-${idx}`}>
                        <Typography variant="subtitle1">{s}</Typography>
                      </TipoButton>
                    ))}
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={1}>
                  <Typography variant="h6">
                    Data de Início do Serviço
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label=""
                      value={date}
                      onChange={v => setDate(v)}
                      inputFormat="DD/MM/YYYY"
                      renderInput={params => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={2}>
                  <CommonCard>
                    <Typography variant="h6">
                      {tipo === 'assinatura'
                        ? 'Valor da Assinatura Mensal'
                        : 'Valor do Pedido Único'}
                    </Typography>
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column' }}
                      gap={1}
                      my={2}></Box>
                    <Divider />
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                      mt={2}>
                      <Typography variant="subtitle1">Total</Typography>
                      <Typography variant="subtitle1">
                        R$ {total.toFixed(2)}
                      </Typography>
                    </Box>
                  </CommonCard>
                  <Button
                    variant="contained"
                    fullWidth={true}
                    size="large"
                    onClick={handlesubmit}>
                    Contratar Serviço
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item md={6} xs={12} order={{ md: 2, xs: 1 }}>
              <Carousel
                IndicatorIcon={indicatorImages}
                animation="slide"
                swipe={true}
                navButtonsAlwaysInvisible={true}
                indicatorIconButtonProps={{
                  style: {
                    borderRadius: '8px',
                    marginLeft: '4px',
                    border: '4px solid transparent',
                    overflow: 'hidden',
                  },
                }}
                indicatorContainerProps={{ style: { gap: '5px' } }}
                activeIndicatorIconButtonProps={{
                  style: { border: `4px solid red`, overflow: 'hidden' },
                }}>
                {carouseImages.map((itm, idx) => (
                  <Box
                    component="img"
                    src={itm}
                    sx={{
                      width: '100%',
                      height: theme => theme.spacing(50),
                      borderRadius: theme => theme.spacing(1),
                      overflow: 'hidden',
                      objectFit: 'cover',
                      pointerEvents: 'none',
                      cursor: 'pointer',
                    }}
                    key={`carousel-image-${idx}`}
                  />
                ))}
              </Carousel>
            </Grid>
          </Grid>
        </Container>
      </PageWrapper>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: theme => theme.palette.grey['100'],
        }}>
        <Container>
          <DescriptionSection description={description} faq={faq} />
        </Container>
      </Box>
    </RootStyle>
  )
}

export default Faxineira
