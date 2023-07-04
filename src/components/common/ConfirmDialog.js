import styled from '@emotion/styled'
import { Button, Dialog, DialogContent, Typography } from '@mui/material'
import { Box } from '@mui/system'

import GreyButton from './GreyButton'

const SimpleDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(3),
  },
}))

const ConfirmDialog = ({ isOpen, onClose, onCheckout, onContinue }) => {
  return (
    <SimpleDialog onClose={onClose} open={isOpen} maxWidth="sm">
      <DialogContent>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          Pedido adicionado ao carrinho!
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          gap={2}
          mt={3}>
          <GreyButton onClick={onCheckout} sx={{ width: '190px' }}>
            Finalizar Compra
          </GreyButton>
          <Button
            variant="contained"
            color="primary"
            onClick={onContinue}
            sx={{ width: '190px' }}>
            Continuar Comprando
          </Button>
        </Box>
      </DialogContent>
    </SimpleDialog>
  )
}

export default ConfirmDialog
