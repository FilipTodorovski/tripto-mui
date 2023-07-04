import { forwardRef, useState } from 'react'
import { IMaskInput } from 'react-imask'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import CommonCard from '../common/CommonCard'

const CepMask = forwardRef(function CepMask(props, ref) {
  const { onChange, ...other } = props
  return (
    <IMaskInput
      {...other}
      mask="00000-000"
      inputRef={ref}
      onAccept={value => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  )
})

const AddressCard = ({ info, onSubmit }) => {
  const [data, setData] = useState(info)
  const [error, setError] = useState(null)

  const handleSubmit = () => {
    let errObj = null
    if (!data?.name) {
      errObj = {
        ...errObj,
        name: `Name is required!`,
      }
    } else if (data.name.split(' ').length < 2) {
      errObj = {
        ...errObj,
        name: `Name should be at least two string(like [firstname lastname])`,
      }
    }

    if (!data?.cep) {
      errObj = {
        ...errObj,
        cep: `CEP is required!`,
      }
    } else if (data.cep.length !== 9) {
      errObj = {
        ...errObj,
        cep: `CEP is invalid format!`,
      }
    }

    if (!data?.address) {
      errObj = {
        ...errObj,
        address: `Endereço is required!`,
      }
    }

    if (!data?.number) {
      errObj = {
        ...errObj,
        number: `Número is required!`,
      }
    }

    if (!data?.bairro) {
      errObj = {
        ...errObj,
        bairro: `Bairro is required!`,
      }
    }

    if (!data?.cidade) {
      errObj = {
        ...errObj,
        cidade: `Cidade / Estado is required!`,
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
          label="Nome Completo do Idoso *"
          variant="outlined"
          fullWidth
          value={data?.name || ''}
          onChange={e => updateData('name', e.target.value)}
          error={error?.name ? true : false}
          helperText={error?.name || ''}
        />
        <Typography variant="subtitle2" color="text.secondary">
          Local de prestação do Serviço e/ou Entrega
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="CEP *"
              variant="outlined"
              fullWidth
              value={data?.cep || ''}
              onChange={e => updateData('cep', e.target.value)}
              InputProps={{ inputComponent: CepMask }}
              error={error?.cep ? true : false}
              helperText={error?.cep || ''}
            />
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="text">Buscar</Button>
          </Grid>
        </Grid>
        <TextField
          label="Endereço *"
          variant="outlined"
          fullWidth
          value={data?.address || ''}
          onChange={e => updateData('address', e.target.value)}
          error={error?.address ? true : false}
          helperText={error?.address || ''}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Número *"
              variant="outlined"
              type="number"
              fullWidth
              value={data?.number || ''}
              onChange={e => updateData('number', e.target.value)}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              error={error?.number ? true : false}
              helperText={error?.number || ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Complemento"
              variant="outlined"
              fullWidth
              value={data?.complemento || ''}
              onChange={e => updateData('complemento', e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Bairro *"
              variant="outlined"
              fullWidth
              value={data?.bairro || ''}
              onChange={e => updateData('bairro', e.target.value)}
              error={error?.bairro ? true : false}
              helperText={error?.bairro || ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Cidade / Estado *"
              variant="outlined"
              fullWidth
              value={data?.cidade || ''}
              onChange={e => updateData('cidade', e.target.value)}
              error={error?.cidade ? true : false}
              helperText={error?.cidade || ''}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button variant="contained" onClick={handleSubmit}>
            Avançar
          </Button>
        </Box>
      </Box>
    </CommonCard>
  )
}

export default AddressCard
