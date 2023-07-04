import { forwardRef, useState } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { IMaskInput } from 'react-imask'
import CommonCard from '../common/CommonCard'
import { validateEmail } from '@utils/common'

const PhoneMask = forwardRef(function PhoneMask(props, ref) {
  const { onChange, ...other } = props
  return (
    <IMaskInput
      {...other}
      mask="(00) 00000-0000"
      inputRef={ref}
      onAccept={value => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  )
})

const PersonalCard = ({ info, onSubmit }) => {
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
    if (!data?.email) {
      errObj = {
        ...errObj,
        email: `Email is required!`,
      }
    } else if (!validateEmail(data.email)) {
      errObj = {
        ...errObj,
        email: `Invalid email format!`,
      }
    }
    if (!data?.telephone) {
      errObj = {
        ...errObj,
        telephone: `Telephone is requied!`,
      }
    } else if (data.telephone.length !== 15) {
      errObj = {
        ...errObj,
        telephone: `Invalid telephone format!`,
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
          label="Nome Completo"
          type="text"
          variant="outlined"
          fullWidth
          value={data?.name || ''}
          onChange={e => updateData('name', e.target.value)}
          error={error?.name ? true: false}
          helperText={error?.name || ''}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="E-Mail"
              variant="outlined"
              type="email"
              fullWidth
              value={data?.email || ''}
              onChange={e => updateData('email', e.target.value)}
              error={error?.email ? true : false}
              helperText={error?.email || ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="tel"
              label="Telefone"
              variant="outlined"
              fullWidth
              value={data?.telephone || ''}
              onChange={e => updateData('telephone', e.target.value)}
              InputProps={{ inputComponent: PhoneMask }}
              error={error?.telephone ? true: false}
              helperText={error?.telephone || ''}
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

export default PersonalCard
