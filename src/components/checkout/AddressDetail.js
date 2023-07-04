import { Check, Edit } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'

const AddressDetail = ({ address, onEdit }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}>
          <Check color="success" sx={{ width: theme => theme.spacing(2.5) }} />
          <Typography variant="h6" color="text.secondary">
            Dados do Idoso
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            cursor: 'pointer',
          }}
          onClick={onEdit}>
          <Edit color="disabled" sx={{ width: theme => theme.spacing(2) }} />
          <Typography variant="subtitle2" color="text.disabled">
            Editar
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          ml: theme => theme.spacing(3),
          color: 'text.secondary',
        }}>
        <Typography variant="subtitle1">{address?.name}</Typography>
        <Typography variant="body2">
          {`${address?.address},${address?.number} · ${address?.complemento}`}
        </Typography>
        <Typography variant="body2">
          {`${address?.bairro} · ${address?.cidade} · CEP${address?.cep}`}
        </Typography>
      </Box>
    </Box>
  )
}

export default AddressDetail
