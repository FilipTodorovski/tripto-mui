import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import Carousel from 'react-material-ui-carousel'
import {
  Box,
  Grid,
  Typography,
  Container,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Divider,
  Button,
} from '@mui/material'
import styled from '@emotion/styled'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { v4 as uuidv4 } from 'uuid'

import Page from '@components/common/loader/Page'
import { items, carouseImages, description, faq } from '@mock/tecnico'
import {
  SubtitleTip,
  DescriptionSection,
  TipoButton,
  CommonCard,
  ConfirmDialog,
  LoadingOverlay,
} from '@components/common'
import { orderAtom } from '@states'

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

const Tecnico = () => {
  const [tipo, setTipo] = useState('assinatura')
  const [data, setData] = useState(items)
  const [hours, setHours] = useState([])
  const [date, setDate] = useState(null)
  const [total, setTotal] = useState(0)
  const [showDialog, setShowDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  const [orders, setOrders] = useRecoilState(orderAtom)

  const durations = [2, 4, 6, 8, 12, 24]

  const navigate = useNavigate()

  useEffect(() => {
    // load data
    const h = []
    for (let i = 0; i < 24; i++) {
      h.push((i < 10 ? '0' : '') + i + ':00')
    }
    setHours(h)

    // set default start and end for this month
    const date = new Date()
    setDate(date.toLocaleDateString())
  }, [])

  const updateData = (idx, type, value) => {
    const updated = [...data]
    updated[idx][type] = value
    setData(updated)

    const sum = updated
      .filter(u => u.enabled)
      .reduce((partial, itm) => partial + itm.price * itm.duration, 0)
    setTotal(sum)
  }

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

  const resetData = () => {
    const updated = data.map(d => ({
      ...d,
      enabled: false,
    }))
    setData(updated)
    setTotal(0)
  }

  const handleSubmit = () => {
    const filtered = data.filter(d => d.enabled)
    if (filtered.length === 0) {
      return
    }
    setLoading(true)
    const updated = [...orders]
    filtered.forEach(f => {
      updated.push({
        tipo,
        servico: 'tecnico',
        title: `Técnico de Enfermagem`,
        subtitle: `${f.label} (${f.duration}h)`,
        start: f.start,
        duration: f.duration,
        price: f.price,
        image: '/assets/icons/servicos-tecnico.svg',
        total: f.duration * f.price,
        uuid: uuidv4(),
      })
    })
    setTimeout(() => {
      setOrders(updated)
      setLoading(false)
      setShowDialog(true)
    }, 2000)
  }

  const handleCheckout = () => {
    navigate('/checkout')
  }

  const handleContinue = () => {
    resetData()
    setShowDialog(false)
  }

  return (
    <RootStyle title="Técnico de Enfermagem" id="tecnico">
      <PageWrapper>
        <Container>
          <Typography variant="h3">Técnico de Enfermagem</Typography>
          <Grid container spacing={2} mt={4}>
            <Grid item md={6} sm={12} order={{ md: 1, xs: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={5}>
                <Box>
                  <Typography variant="body1">
                    Além de atuar no ambiente hospitalar, o profissional técnico
                    em enfermagem também assume o papel de um cuidador
                    especializado para estender os cuidados com o paciente em
                    casa no processo de desospitalização.
                  </Typography>
                  <Typography variant="body1" mt={2}>
                    ATambém conhecido como home care, este serviço é capaz de
                    oferecer cuidados humanizados em casa, reduzindo o período
                    de internação e garantindo maior qualidade de vida, bem
                    estar e segurança ao paciente.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4">Monte seu Plano</Typography>
                  <Box mt={3}>
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
                <Box>
                  <SubtitleTip
                    title="Frequência / Duração do Serviço"
                    description="Frequência / Duração do Serviço"
                  />
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    gap={2}
                    mt={2}>
                    {data.map((w, idx) => (
                      <Grid container spacing={2} key={`week-data-${idx}`}>
                        <Grid
                          item
                          xs={6}
                          md={3}
                          lg={4}
                          sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle1">{w.label}</Typography>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          md={1}
                          lg={2}
                          sx={{ display: 'flex', alignItems: 'center' }}>
                          <Switch
                            color="primary"
                            checked={w.enabled || false}
                            onChange={e =>
                              updateData(idx, 'enabled', e.target.checked)
                            }
                          />
                        </Grid>
                        {w.enabled ? (
                          <>
                            <Grid item xs={6} md={4} lg={3}>
                              <FormControl
                                sx={{ m: 1, width: '100%' }}
                                size="small">
                                <InputLabel id={`label-week-start-${w.key}`}>
                                  Hora de Início
                                </InputLabel>
                                <Select
                                  labelId={`label-week-start-${w.key}`}
                                  id={`select-week-start-${w.key}`}
                                  value={w.start}
                                  label="Hora de Início"
                                  onChange={e =>
                                    updateData(idx, 'start', e.target.value)
                                  }>
                                  {hours.map(h => (
                                    <MenuItem
                                      value={h}
                                      key={`hours-${idx}-${h}`}>
                                      {h}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={6} lg={3} md={4}>
                              <FormControl
                                sx={{ m: 1, width: '100%' }}
                                size="small">
                                <InputLabel id={`label-week-duration-${w.key}`}>
                                  Duração
                                </InputLabel>
                                <Select
                                  labelId={`label-week-duration-${w.key}`}
                                  id={`select-week-duration-${w.key}`}
                                  value={w.duration}
                                  label="Duração"
                                  onChange={e =>
                                    updateData(idx, 'duration', e.target.value)
                                  }>
                                  {durations.map(d => (
                                    <MenuItem
                                      value={d}
                                      key={`hours-${idx}-${d}`}>
                                      {d}H
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </>
                        ) : null}
                      </Grid>
                    ))}
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={1}>
                  <Typography variant="h6">Início do Serviço</Typography>
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
                <Box gap={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CommonCard>
                    <Typography variant="h6">
                      {tipo === 'assinatura'
                        ? 'Valor da Assinatura Mensal'
                        : 'Valor do Pedido Único'}
                    </Typography>
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column' }}
                      gap={1}
                      my={2}>
                      {data
                        .filter(w => w.enabled)
                        .map((w, idx) => (
                          <Box
                            component="div"
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                            key={`week-order-${idx}`}>
                            <Typography variant="body2" color="text.secondary">
                              {`${w.label} (${w.duration}h)`}
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                              R$ {(w.duration * w.price).toFixed(2)}
                            </Typography>
                          </Box>
                        ))}
                    </Box>
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
                    onClick={handleSubmit}>
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
      {showDialog && (
        <ConfirmDialog
          isOpen={showDialog}
          onClose={() => {
            resetData()
            setShowDialog(false)
          }}
          onCheckout={handleCheckout}
          onContinue={handleContinue}
        />
      )}
      {loading && (
        <LoadingOverlay isOpen={loading} text="Adding orders to cart..." />
      )}
    </RootStyle>
  )
}

export default Tecnico
