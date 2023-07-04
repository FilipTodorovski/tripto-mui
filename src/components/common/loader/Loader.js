// import { LinearProgress } from "@mui/material";
import { styled } from '@mui/material'
import LoadingOverlay from '../LoadingOverlay'

const LoaderWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1001,
  width: '100%',
})

const Loader = () => {
  return (
    <LoaderWrapper>
      {/* <LinearProgress color="primary" /> */}
      <LoadingOverlay isOpen={true} text={`Loading data...`} />
    </LoaderWrapper>
  )
}

export default Loader
