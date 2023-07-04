import { forwardRef, useState } from 'react'
import { IMaskInput, IMask } from 'react-imask'
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material'
import { Box } from '@mui/system'

import CommonCard from '../common/CommonCard'

const CreditMask = forwardRef(function CreditMask(props, ref) {
  const { onChange, ...other } = props
  return (
    <IMaskInput
      {...other}
      mask="0000 0000 0000 0000"
      inputRef={ref}
      onAccept={value => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  )
})

const ValidadeMask = forwardRef(function ValidadeMask(props, ref) {
  const { onChange, ...other } = props
  return (
    <IMaskInput
      {...other}
      mask="DD/MM"
      blocks={{
        DD: {
          mask: IMask.MaskedRange,
          placeholderChar: 'D',
          from: 1,
          to: 31,
          maxLength: 2,
        },
        MM: {
          mask: IMask.MaskedRange,
          placeholderChar: 'M',
          from: 1,
          to: 12,
          maxLength: 2,
        },
      }}
      inputRef={ref}
      onAccept={value => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  )
})

const CodigoMask = forwardRef(function CodigoMask(props, ref) {
  const { onChange, ...other } = props
  return (
    <IMaskInput
      {...other}
      mask="000"
      inputRef={ref}
      onAccept={value => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  )
})

const CPFMask = forwardRef(function CPFMask(props, ref) {
  const { onChange, ...other } = props
  return (
    <IMaskInput
      {...other}
      mask="000.000.000-00"
      inputRef={ref}
      onAccept={value => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  )
})

const PaymentCard = ({ info, onSubmit }) => {
  const [data, setData] = useState(info)
  const [error, setError] = useState(null)

  const handleSubmit = () => {
    let errObj = null
    if (!data?.credit) {
      errObj = {
        ...errObj,
        credit: `Credit is required!`,
      }
    } else if (data.credit.length !== 19) {
      errObj = {
        ...errObj,
        credit: `Credit is invalid format!`,
      }
    }
    if (!data?.name) {
      errObj = {
        ...errObj,
        name: `Name is required!`,
      }
    }
    if (!data?.validade) {
      errObj = {
        ...errObj,
        validade: `Validade is required!`,
      }
    } else if (data.validade.length !== 5) {
      errObj = {
        ...errObj,
        validade: `Validade is invalid format!`,
      }
    }
    if (!data?.codigo) {
      errObj = {
        ...errObj,
        codigo: `Codigo is required!`,
      }
    } else if (data.codigo.length !== 3) {
      errObj = {
        ...errObj,
        codigo: `Codigo is invalid format!`,
      }
    }
    if (!data?.cpf) {
      errObj = {
        ...errObj,
        cpf: `CPF is required!`,
      }
    } else if (data?.cpf.length !== 14) {
      errObj = {
        ...errObj,
        cpf: `CPF is invalid format!`,
      }
    }
    if (errObj) {
      setError(errObj)
      return
    }
    onSubmit(data)
  }

  const updateData = (key, val) => {
    setError(null)
    const updated = { ...data }
    updated[key] = val
    setData(updated)
  }

  return (
    <CommonCard>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Número do Cartão de Crédito *"
          variant="outlined"
          fullWidth
          value={data?.credit || ''}
          onChange={e => updateData('credit', e.target.value)}
          InputProps={{ inputComponent: CreditMask }}
          error={error?.credit ? true : false}
          helperText={error?.credit || ''}
        />
        <TextField
          label="Nome Impresso no Cartão *"
          variant="outlined"
          fullWidth
          value={data?.name || ''}
          onChange={e => updateData('name', e.target.value)}
          error={error?.name ? true : false}
          helperText={error?.name || ''}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Validade *"
              variant="outlined"
              fullWidth
              value={data?.validade || ''}
              // ref={validadeRef}
              InputProps={{ inputComponent: ValidadeMask }}
              onChange={e => updateData('validade', e.target.value)}
              error={error?.validade ? true : false}
              helperText={error?.validade || ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Código de Segurança *"
              variant="outlined"
              fullWidth
              value={data?.codigo || ''}
              InputProps={{ inputComponent: CodigoMask }}
              onChange={e => updateData('codigo', e.target.value)}
              error={error?.codigo ? true : false}
              helperText={error?.codigo || ''}
            />
          </Grid>
        </Grid>
        <TextField
          label="CPF do Titular *"
          variant="outlined"
          fullWidth
          value={data?.cpf || ''}
          InputProps={{ inputComponent: CPFMask }}
          onChange={e => updateData('cpf', e.target.value)}
          error={error?.cpf ? true : false}
          helperText={error?.cpf || ''}
        />
        <FormControlLabel
          control={
            <Checkbox
              value={data?.same}
              onChange={e => updateData('same', e.target.checked)}
            />
          }
          label="Endereço da fatura é o mesmo usado em “Dados do Idoso”"
        />
        <Button variant="contained" onClick={handleSubmit} fullWidth>
          Realizar Pagamento
        </Button>
      </Box>
    </CommonCard>
  )
}

export default PaymentCard
