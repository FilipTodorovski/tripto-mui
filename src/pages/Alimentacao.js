import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import Carousel from 'react-material-ui-carousel'
import {
  Box,
  Grid,
  Typography,
  Container,
  TextField,
  Divider,
  Button,
  alpha,
  Tab,
} from '@mui/material'
import styled from '@emotion/styled'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Delete } from '@mui/icons-material'
import { v4 as uuidv4 } from 'uuid'

import Page from '@components/common/loader/Page'
import { items, carouselImages, description, faq } from '@mock/alimentacao'
import {
  SubtitleTip,
  NumberButton,
  DescriptionSection,
  TipoButton,
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

const DiscountBadge = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.warning.main, 0.16),
  color: theme.palette.warning.dark,
  padding: `1px ${theme.spacing(1)}`,
  fontWeight: 700,
  fontSize: `12px`,
  borderRadius: `6px`,
}))

const Alimentacao = () => {
  const [tipo, setTipo] = useState('assinatura')
  const [data, setData] = useState({})
  const [date, setDate] = useState(null)
  const [list, setList] = useState([])
  const [activeService, setActiveService] = useState(0)
  const [total, setTotal] = useState(0)
  const [showDialog, setShowDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  const [orders, setOrders] = useRecoilState(orderAtom)

  const navigate = useNavigate()

  useEffect(() => {
    // load data
    // set default start and end for this month
    const dt = new Date()
    setDate(dt.toLocaleDateString())
  }, [])

  const updateData = (dish, value) => {
    if (value < 0) return
    const updated = { ...data }
    updated[dish.key] = value
    setData(updated)

    const updatedList = [...list]
    const idx = list.findIndex(o => o.dish.key === dish.key)
    if (idx > -1) {
      if (value === 0) {
        // remove
        updatedList.splice(idx, 1)
      } else {
        updatedList[idx].value = value
      }
    } else {
      updatedList.push({
        value,
        dish,
      })
    }
    setList(updatedList)
    // calc total
    const sum = updatedList.reduce(
      (partial, itm) =>
        partial +
        (itm.dish.price * itm.value * (100 - (itm.dish.discount || 0))) / 100,
      0,
    )
    setTotal(sum)
  }

  const indicatorImages = carouselImages.map(img => (
    <Box
      component="img"
      src={img}
      sx={{
        width: theme => theme.spacing(8),
        height: theme => theme.spacing(8),
        borderRadius: theme => theme.shape.borderRadiusSm,
        objectFit: 'cover',
      }}
    />
  ))

  const resetData = () => {
    setData({})
    setList([])
    setTotal(0)
  }

  const handleSubmit = () => {
    if (list.length === 0) return
    const filtered = list.map(l => ({
      tipo,
      servico: 'alimentacao',
      title: l.dish.label,
      description: l.dish.description,
      image: l.dish.image,
      price: l.dish.price,
      discount: l.dish.discount || 0,
      value: l.value,
      total: (l.value * l.dish.price * (100 - (l.dish.discount || 0))) / 100,
      uuid: uuidv4(),
    }))
    const updated = [...orders, ...filtered]
    setLoading(true)
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
    <RootStyle title="Alimentação" id="alimentacao">
      <PageWrapper>
        <Container>
          <Typography variant="h3">Alimentação</Typography>
          <Grid container spacing={2} mt={5}>
            <Grid item md={6} sm={12} order={{ md: 1, xs: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={5}>
                <Box>
                  <Typography variant="body1">
                    Para garantir a qualidade e segurança alimentar, um cardápio
                    rico em nutrientes elaborado por nutricionistas faz toda a
                    diferença para o familiar idoso.
                  </Typography>
                  <Typography variant="body1" mt={3}>
                    No caso dos idosos, o controle do sal e açúcar no preparo
                    das refeições, bem como a seleção de ingredientes saudáveis
                    são indispensáveis para a manutenção da saúde e prevenção de
                    doenças.
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
                          label={itm.type}
                          key={`service-type-mobile-${idx}`}
                          sx={{ paddingLeft: 0, paddingRight: 0 }}
                        />
                      ))}
                    </CustomTabs>
                  </Box>
                </StickyTabHeaders>
                <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={5}>
                  {items.map((itm, idx) => (
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column' }}
                      gap={2}
                      key={`alimentacao-type-${idx}`}
                      id={`service-section-${idx}`}>
                      <SubtitleTip
                        title={itm.type}
                        description={itm.description}
                      />
                      {itm.items.map((dish, idx1) => (
                        <Box
                          key={`dish-${idx}-${idx1}`}
                          sx={{ display: 'flex', flexDirection: 'row' }}
                          gap={2}>
                          <Box
                            component="img"
                            src={dish.image}
                            sx={{
                              width: theme => theme.spacing(12),
                              height: theme => theme.spacing(12),
                              objectFit: 'cover',
                              borderRadius: theme => theme.shape.borderRadiusSm,
                            }}
                          />
                          <Box
                            sx={{ display: 'flex', flexDirection: 'column' }}
                            gap={0.5}>
                            <SubtitleTip
                              title={dish.label}
                              description={dish.description}
                              marginTop={0}
                            />
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                              gap={1}>
                              <Typography
                                variant="body2"
                                color="text.secondary">
                                R$ {dish.price.toFixed(2)}
                              </Typography>
                              {dish.discount ? (
                                <DiscountBadge>
                                  {dish.discount}% Desconto
                                </DiscountBadge>
                              ) : null}
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                              gap={2}>
                              <NumberButton
                                value={data[dish.key] || 0}
                                onPlus={() =>
                                  updateData(dish, (data[dish.key] || 0) + 1)
                                }
                                onMinus={() => {
                                  updateData(dish, (data[dish.key] || 0) - 1)
                                }}
                              />
                              {data[dish.key] > 0 && (
                                <Delete
                                  color="disabled"
                                  sx={{ cursor: 'pointer' }}
                                  onClick={() => updateData(dish, 0)}
                                />
                              )}
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={2}>
                  <Typography variant="h6">Data da Entrega</Typography>
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
                      component="div"
                      sx={{ display: 'flex', flexDirection: 'column' }}
                      gap={1}
                      my={2}>
                      {list.map((order, idx) => (
                        <Box
                          component="div"
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                          key={`order-${idx}`}>
                          <Typography variant="body2" color="text.secondary">
                            {order.value}x {order.dish.label}
                          </Typography>
                          <Typography variant="body2" color="text.primary">
                            R${' '}
                            {(
                              (order.value *
                                order.dish.price *
                                (100 - (order.dish.discount || 0))) /
                              100
                            ).toFixed(2)}
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
                {carouselImages.map((itm, idx) => (
                  <Box
                    component="img"
                    src={itm}
                    sx={{
                      width: '100%',
                      height: theme => theme.spacing(50),
                      borderRadius: theme => theme.shape.borderRadiusSm,
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

export default Alimentacao
