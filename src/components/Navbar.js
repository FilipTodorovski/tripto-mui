import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart } from '@mui/icons-material'
import { AppBar, Badge, Box, styled, Toolbar, Typography } from '@mui/material'

import { orderAtom } from '@states'
import { useRecoilValue } from 'recoil'

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  boxShadow: 'none',
})
const Icons = styled(Box)({
  display: 'flex',
  alignItems: 'center',
})

const Items = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: theme.spacing(8),
  gap: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}))

const TagItem = styled(Typography)(({ theme, selected }) => ({
  display: 'flex',
  alignItems: 'center',
  // color: "white",
  cursor: 'pointer',
  height: '100%',
  fontWeight: '500',
  transitionDuration: '300ms',
  borderBottom: `4px solid ${
    selected ? theme.palette.primary.dark : 'transparent'
  }`,
}))

const CustomBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.primary.dark,
  },
}))

const tagStrings = [`Serviços`, `Quem Somos`, `Contato`]

const Navbar = () => {
  const [selected, setSelected] = useState('Serviços')
  const order = useRecoilValue(orderAtom)

  const navigate = useNavigate()

  const handleCart = () => {
    navigate('/checkout')
  }

  return (
    <AppBar position="sticky" sx={{ boxShadow: 'none' }}>
      <StyledToolbar>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src={`/assets/logo/logo-full.png`}
            sx={{ height: 40 }}
          />
        </Link>
        <Items>
          {tagStrings.map((itm, idx) => (
            <TagItem
              variant="subtitle2"
              key={`tag-item-${idx}`}
              onClick={() => setSelected(itm)}
              selected={selected === itm}>
              {itm}
            </TagItem>
          ))}
        </Items>
        <Icons sx={{ gap: 2 }}>
          <CustomBadge badgeContent={order?.length}>
            <ShoppingCart sx={{ cursor: 'pointer' }} onClick={handleCart} />
          </CustomBadge>
        </Icons>
      </StyledToolbar>
    </AppBar>
  )
}

export default Navbar
