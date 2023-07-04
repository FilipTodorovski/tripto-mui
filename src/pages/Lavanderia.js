import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Grid,
  Typography,
  Container,
  TextField,
  Divider,
  Button,
  FormControlLabel,
  Checkbox,
  Tab,
} from '@mui/material'
import styled from '@emotion/styled'
import { Delete } from '@mui/icons-material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { v4 as uuidv4 } from 'uuid'

import Page from '@components/common/loader/Page'
import { items, description, faq } from '@mock/lavanderia'
import {
  SubtitleTip,
  NumberButton,
  DescriptionSection,
  CommonCard,
  ConfirmDialog,
  LoadingOverlay,
  StickyTabHeaders,
  CustomTabs,
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
  const [data, setData] = useState(items)
  const [date, setDate] = useState({})
  const [total, setTotal] = useState(0)
  const [coletaManha, setColetaManha] = useState(false)
  const [coletaTarde, setColetaTarde] = useState(false)
  const [entregaManha, setEntregaManha] = useState(false)
  const [entregaTarde, setEntregaTarde] = useState(false)
  const [activeService, setActiveService] = useState(0)

  const [showDialog, setShowDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useRecoilState(orderAtom)

  const navigate = useNavigate()

  useEffect(() => {
    // set default start and end for this month
    const date = new Date()
    setDate(date.toLocaleDateString())

    // make initial data
    let list = {}
    items.forEach(type => {
      type.items.forEach(s => {
        list[s.key] = { price: s.price, value: 0, label: s.label }
      })
    })
    setData(list)
  }, [])

  const updateData = (key, value) => {
    if (value < 0) return
    let updated = { ...data }
    updated[key].value = value
    setData(updated)

    const sum = Object.values(updated).reduce(
      (partial, itm) => partial + itm.value * itm.price,
      0,
    )
    setTotal(sum)
  }

  const resetData = () => {
    setData([])
    setColetaManha(false)
    setColetaTarde(false)
    setEntregaManha(false)
    setEntregaTarde(false)
    setTotal(0)
  }

  const handleSubmit = () => {
    const filtered = Object.values(data)
      .filter(d => d.value > 0)
      .map(v => ({
        tipo: 'pedido',
        title: `Lavanderia (${v.label})`,
        servico: 'lavanderia',
        value: v.value,
        price: v.price,
        image: '/assets/icons/servicos-lavanderia.svg',
        total: v.price * v.value,
        coletaManha,
        coletaTarde,
        entregaManha,
        entregaTarde,
        uuid: uuidv4()
      }))
    if (filtered.length === 0) return
    setLoading(true)
    const updated = [...orders, ...filtered]
    setTimeout(() => {
      setLoading(false)
      setOrders(updated)
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

  const handleStickHeader = (event, newValue) => {
    setActiveService(newValue)
    const element = document.getElementById(`service-section-${newValue}`)
    if (element) {
      // navigatgion = 56, sticky = 56, offset 3
      window.scrollTo({ top: element.offsetTop - 115, behavior: 'smooth' })
    }
  }

  return (
    <RootStyle title="Lavanderia" id="lavanderia">
      <PageWrapper>
        <Container>
          <Typography variant="h3">Lavanderia</Typography>
          <Grid container spacing={2} mt={5}>
            <Grid item md={6} sm={12} order={{ md: 1, xs: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={5}>
                <Box>
                  <Typography variant="body1">
                    Garantimos os melhores e mais eficientes serviços de
                    lavanderia profissional, através da coleta e entrega semanal
                    das peças no conforto de casa. Com equipamentos altamente
                    tecnológicos e produtos de excelente qualidade, Suas peças
                    recebem todo o cuidado de lavagem, secagem e passadoria,
                    chegando em sua casa prontas para serem guardadas.
                  </Typography>
                  <Typography variant="body1" mt={3}>
                    O serviço de lavagem é exclusivo para roupas do dia a dia,
                    como: camisetas, calças jeans, shorts, roupas íntimas, meias
                    e etc.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4">
                    Monte sua Cesta de Roupas
                  </Typography>
                  <StickyTabHeaders>
                    <Box
                      sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                      }}>
                      <CustomTabs
                        value={activeService}
                        onChange={handleStickHeader}
                        scrollButtons="auto"
                        variant="scrollable"
                        gap={2}>
                        {items.map((itm, idx) => (
                          <Tab
                            label={itm.label}
                            key={`service-type-mobile-${idx}`}
                            sx={{ paddingLeft: 0, paddingRight: 0 }}
                          />
                        ))}
                      </CustomTabs>
                    </Box>
                  </StickyTabHeaders>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    gap={4}
                    mt={2}>
                    {items.map((itm, idx) => (
                      <Box
                        key={`service-type-${idx}`}
                        sx={{ display: 'flex', flexDirection: 'column' }}
                        id={`service-section-${idx}`}>
                        <SubtitleTip
                          title={itm.label}
                          description={itm.description}
                        />
                        <Grid container>
                          {itm.items.map((s, idx1) => (
                            <Grid
                              item
                              xs={12}
                              md={6}
                              key={`service-type-${idx}-${idx1}`}
                              mt={2}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                }}
                                gap={0.5}>
                                <SubtitleTip
                                  variant="subtitle1"
                                  title={s.label}
                                  description={s.description}
                                />
                                <Typography
                                  variant="body2"
                                  color="text.secondary">
                                  R$ {s.price.toFixed(2)} por peça
                                </Typography>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}
                                  gap={2}>
                                  <NumberButton
                                    value={data[s.key]?.value || 0}
                                    onPlus={() =>
                                      updateData(
                                        s.key,
                                        (data[s.key]?.value || 0) + 1,
                                      )
                                    }
                                    onMinus={() =>
                                      updateData(
                                        s.key,
                                        (data[s.key]?.value || 0) - 1,
                                      )
                                    }
                                  />
                                  {data[s.key]?.value > 0 && (
                                    <Delete
                                      color="disabled"
                                      sx={{ cursor: 'pointer' }}
                                      onClick={() => updateData(s.key, 0)}
                                    />
                                  )}
                                </Box>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={1}>
                  <SubtitleTip
                    title="Coleta e Entrega"
                    description="Coleta e Entrega"
                  />
                  <Typography variant="body1">
                    Coleta terça-feira, entrega quinta-feira ou coleta
                    quinta-feira e entrega terça-feira.
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
                  <Box mt={2}>
                    <Typography variant="subtitle1">
                      Turno Disponível para Coleta (01/11)
                    </Typography>
                    <Box sx={{ display: 'flex' }} gap={2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={coletaManha}
                            onChange={e => setColetaManha(e.target.checked)}
                          />
                        }
                        label="Manhã"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={coletaTarde}
                            onChange={e => setColetaTarde(e.target.checked)}
                          />
                        }
                        label="Tarde"
                      />
                    </Box>
                  </Box>
                  <Box mt={2}>
                    <Typography variant="subtitle1">
                      Disponibilidade para Entrega (03/11)
                    </Typography>
                    <Box sx={{ display: 'flex' }} gap={2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={entregaManha}
                            onChange={e => setEntregaManha(e.target.checked)}
                          />
                        }
                        label="Manhã"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={entregaTarde}
                            onChange={e => setEntregaTarde(e.target.checked)}
                          />
                        }
                        label="Tarde"
                      />
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={2}>
                  <CommonCard>
                    <Typography variant="h6">
                      Valor da Assinatura Mensal
                    </Typography>
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column' }}
                      gap={1}
                      my={2}>
                      {Object.values(data)
                        .filter(d => d.value > 0)
                        .map((s, idx) => (
                          <Box
                            component="div"
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                            key={`week-order-${idx}`}>
                            <Typography variant="body2" color="text.secondary">
                              {`${s.value}x ${s.label}`}
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                              R$ {(s.value * s.price).toFixed(2)}
                            </Typography>
                          </Box>
                        ))}
                    </Box>
                    <Divider />
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
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
                    Realizar Pedido
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item md={6} xs={12} order={{ md: 2, xs: 1 }}>
              <Box
                component="img"
                src={`/assets/images/lavanderia/1.png`}
                sx={{
                  width: '100%',
                  height: theme => theme.spacing(50),
                  borderRadius: theme => theme.spacing(1),
                  overflow: 'hidden',
                  objectFit: 'cover',
                  pointerEvents: 'none',
                  cursor: 'pointer',
                }}
              />
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
