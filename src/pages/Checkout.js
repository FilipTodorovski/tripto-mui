import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { Avatar, Divider, Link, Typography } from '@mui/material'
import { Box } from '@mui/system'
import {
  ChevronLeft,
  Delete,
  LockOutlined,
  WhatsApp,
} from '@mui/icons-material'
import styled from '@emotion/styled'

import Page from '@components/common/loader/Page'
import { orderAtom } from '@states'
import {
  PersonalCard,
  PersonalDetail,
  AddressCard,
  AddressDetail,
  PaymentCard,
} from '@components/checkout'
import { LoadingOverlay, SubtitleTip, NumberButton } from '@components/common'

const RootStyle = styled(Page)({
  width: '100%',
})

const SideContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  minHeight: '100vh',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}))

const LeftPane = styled(Box)(({ theme }) => ({
  width: '50%',
  paddingRight: theme.spacing(7),
  paddingLeft: theme.spacing(16),
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('xl')]: {
    paddingRight: theme.spacing(7),
    paddingLeft: theme.spacing(7),
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
}))
const RightPane = styled(Box)(({ theme }) => ({
  width: '50%',
  paddingLeft: theme.spacing(7),
  paddingRight: theme.spacing(16),
  [theme.breakpoints.down('xl')]: {
    paddingLeft: theme.spacing(7),
    paddingRight: theme.spacing(7),
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
}))

const FooterBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(3),
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
    gap: theme.spacing(0.5),
  },
}))

const Checkout = () => {
  const [step, setStep] = useState(0)
  const [personal, setPersonal] = useState(null)
  const [address, setAddress] = useState(null)
  const [payment, setPayment] = useState(null)
  const [loading, setLoading] = useState(false)
  const [assinaturas, setAssinaturas] = useState([])
  const [assinaturaTotal, setAssinaturaTotal] = useState(0)
  const [pedidos, setPedidos] = useState([])
  const [pedidoTotal, setPedidoTotal] = useState(0)

  const [orders, setOrders] = useRecoilState(orderAtom)

  useEffect(() => {
    if (orders.length === 0) {
      setStep(-1)
    } else {
      const list1 = orders.filter(o => o.tipo === 'assinatura')
      setAssinaturas(list1)
      if (list1.length > 0) {
        const sum = list1.reduce((partial, itm) => partial + itm.total, 0)
        setAssinaturaTotal(sum)
      }
      const list2 = orders.filter(o => o.tipo === 'pedido')
      setPedidos(list2)
      if (list2.length > 0) {
        const sum = list2.reduce((partial, itm) => partial + itm.total, 0)
        setPedidoTotal(sum)
      }
    }
  }, [orders])

  const navigate = useNavigate()

  const handlePersonal = info => {
    setPersonal(info)
    setStep(1)
  }

  const handleAddress = info => {
    setAddress(info)
    setStep(2)
  }

  const handlePayment = info => {
    setPayment(info)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/approved')
      setOrders([])
    }, 3000)
  }

  const handleDelete = uuid => {
    const idx = orders.findIndex(u => u.uuid === uuid)
    if (idx > -1) {
      const updated = [...orders]
      updated.splice(idx, 1)
      setOrders(updated)
    }
  }

  const generateRow = itm => {
    if (itm.servico === 'alimentacao') {
      return (
        <>
          <Box
            component="img"
            src={itm.image}
            sx={{
              width: theme => theme.spacing(8),
              height: theme => theme.spacing(8),
              objectFit: 'cover',
              borderRadius: theme => theme.spacing(1),
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 0.5,
            }}>
            <SubtitleTip
              title={itm.title}
              description={itm.description}
              variant="subtitle1"
              theme="light"
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <NumberButton
                value={itm.value}
                onPlus={() => {}}
                onMinus={() => {}}
                darkMode={true}
              />
            </Box>
          </Box>
        </>
      )
    } else if (itm.servico === 'lavanderia') {
      return (
        <>
          <Avatar
            src={itm.image}
            sx={{
              width: theme => theme.spacing(8),
              height: theme => theme.spacing(8),
              bgcolor: theme => theme.palette.primary.lighter,
            }}
            variant="rounded"
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Typography variant="subtitle1">{itm.title}</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <NumberButton
                value={itm.value}
                onPlus={() => {}}
                onMinus={() => {}}
                darkMode={true}
              />
            </Box>
          </Box>
        </>
      )
    } else if (['cuidador', 'tecnico'].includes(itm.servico)) {
      return (
        <>
          <Avatar
            src={itm.image}
            sx={{
              width: theme => theme.spacing(8),
              height: theme => theme.spacing(8),
              bgcolor: theme => theme.palette.primary.lighter,
            }}
            variant="rounded"
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Typography variant="subtitle1">{itm.title}</Typography>
            <Typography variant="subtitle2">{itm.subtitle}</Typography>
          </Box>
        </>
      )
    } else {
      return (
        <>
          <Avatar
            src={itm.image}
            sx={{
              width: theme => theme.spacing(8),
              height: theme => theme.spacing(8),
              bgcolor: theme => theme.palette.primary.lighter,
            }}
            variant="rounded"
          />
          <Box>
            <Typography variant="subtitle1">{itm.label}</Typography>
            <Typography variant="subtitle2" mt={0.5}>
              {itm.value}
            </Typography>
          </Box>
        </>
      )
    }
  }

  return (
    <RootStyle title="Checkout" id="checkout">
      <SideContainer>
        <LeftPane
          sx={{ bgcolor: 'primary.main', py: 5, color: 'white', gap: 3 }}>
          <Link href="/" underline="none">
            <Box component="img" src="/assets/logo/logo-full.png" height={40} />
          </Link>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h4">Resumo da Compra</Typography>
            {orders?.length > 0 ? (
              <>
                {assinaturas.length > 0 ? (
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h6">Assinatura Mensal</Typography>
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {assinaturas.map((itm, idx) => (
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                          key={`assinatura-item-${idx}`}>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: 2,
                            }}>
                            {generateRow(itm)}
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 2,
                            }}>
                            <Typography
                              variant="subtitle1"
                              sx={{ display: 'flex', alignItems: 'center' }}>
                              R$ {itm.total.toFixed(2)}
                            </Typography>
                            <Delete
                              sx={{
                                cursor: 'pointer',
                                color: 'primary.light',
                              }}
                              onClick={() => handleDelete(itm.uuid)}
                            />
                          </Box>
                        </Box>
                      ))}
                    </Box>
                    <Divider sx={{ bgcolor: 'primary.dark', height: `2px` }} />
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle1" color="primary.lighter">
                        Valor da Assinatura
                      </Typography>
                      <Typography variant="h6">
                        R$ {assinaturaTotal.toFixed(2)}/mes
                      </Typography>
                    </Box>
                  </Box>
                ) : null}
                {pedidos.length > 0 ? (
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h6">Pedido Unitário</Typography>
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {pedidos.map((itm, idx) => (
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                          key={`assinatura-item-${idx}`}>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: 2,
                            }}>
                            {generateRow(itm)}
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 2,
                            }}>
                            <Typography
                              variant="subtitle1"
                              sx={{ display: 'flex', alignItems: 'center' }}>
                              R$ {itm.total.toFixed(2)}
                            </Typography>
                            <Delete
                              sx={{
                                cursor: 'pointer',
                                color: 'primary.light',
                              }}
                              onClick={() => handleDelete(itm.uuid)}
                            />
                          </Box>
                        </Box>
                      ))}
                    </Box>
                    <Divider sx={{ bgcolor: 'primary.dark', height: `2px` }} />
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle1" color="primary.lighter">
                        Valor do Pedido
                      </Typography>
                      <Typography variant="h6">
                        R$ {pedidoTotal.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                ) : null}
              </>
            ) : (
              <Typography variant="h6" mt={3}>
                Seu carrinho está vazio!
              </Typography>
            )}
          </Box>
          <Link href="/" underline="none">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ChevronLeft sx={{ color: 'white' }} />
              <Typography variant="subtitle1" color="white">
                Continuar Comprando
              </Typography>
            </Box>
          </Link>
        </LeftPane>
        <RightPane sx={{ bgcolor: 'grey.100', py: 5 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              gap: 3,
            }}>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                  gap: 0.5,
                }}>
                <LockOutlined color="disabled" />
                <Typography variant="body2" color="action.disabled">
                  Compra Segura
                </Typography>
              </Box>
              <Typography variant="h4">Realizar Pagamento</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                flex: 1,
              }}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  pb: 3,
                }}>
                {step === 0 ? (
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h5">Seus Dados Pessoais</Typography>
                    <PersonalCard info={personal} onSubmit={handlePersonal} />
                  </Box>
                ) : (
                  <>
                    {step === -1 ? (
                      <Typography variant="h5" color="text.disabled">
                        Seus Dados Pessoais
                      </Typography>
                    ) : (
                      <PersonalDetail
                        personal={personal}
                        onEdit={() => setStep(0)}
                      />
                    )}
                  </>
                )}
              </Box>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  pb: 3,
                }}>
                {step === 1 ? (
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h5">Dados do Idoso</Typography>
                    <AddressCard info={address} onSubmit={handleAddress} />
                  </Box>
                ) : (
                  <>
                    {address ? (
                      <AddressDetail
                        address={address}
                        onEdit={() => setStep(1)}
                      />
                    ) : (
                      <Typography variant="h5" color="text.disabled">
                        Dados do Idoso
                      </Typography>
                    )}
                  </>
                )}
              </Box>
              {step === 2 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography variant="h5">Pagamento</Typography>
                  <PaymentCard info={payment} onSubmit={handlePayment} />
                </Box>
              ) : (
                <Typography variant="h5" color="text.disabled">
                  Pagamento
                </Typography>
              )}
            </Box>
            <Box sx={{ mt: 5 }}>
              <Typography variant="body2" color="text.disabled">
                Copyright © 2022 Tripto. Todos os direitos reservados.
              </Typography>
              <FooterBox
                sx={{
                  mt: 1,
                }}>
                <Link href="tel:51982223239" underline="none">
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <WhatsApp
                      color="disabled"
                      sx={{ width: theme => theme.spacing(2) }}
                    />
                    <Typography variant="subtitle1" color="text.disabled">
                      (51) 98222-3239
                    </Typography>
                  </Box>
                </Link>
                <Link href="/terms" underline="none">
                  <Typography variant="subtitle1" color="text.disabled">
                    Termos de Uso
                  </Typography>
                </Link>
                <Link href="/policy" underline="none">
                  <Typography variant="subtitle1" color="text.disabled">
                    Política de Privacidade
                  </Typography>
                </Link>
              </FooterBox>
            </Box>
          </Box>
        </RightPane>
        {loading && (
          <LoadingOverlay isOpen={loading} text={`Processando Pagamento...`} />
        )}
      </SideContainer>
    </RootStyle>
  )
}

export default Checkout
