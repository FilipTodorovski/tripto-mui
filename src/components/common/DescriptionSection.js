import PropTypes from 'prop-types'
import { Tab, Tabs, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'

function TabPanel(props) {
  const { children, id, ariaLabeledBy, active, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={!active}
      id={id}
      aria-labelledby={ariaLabeledBy}
      {...other}>
      {active && <Box px={2}>{children}</Box>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  ariaLabeledBy: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
}

const DescriptionSection = ({ description, faq }) => {
  const [active, setActive] = useState('description')

  return (
    <Box component="div" sx={{ width: `100%` }} pt={5} pb={10}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={active} onChange={(e, v) => setActive(v)}>
          <Tab
            label="Como Funciona"
            id="tab-description"
            value="description"
            aria-controls="tabpanel-description"
          />
          <Tab
            label="Dúvidas Frequentes"
            id="tab-faq"
            value="faq"
            aria-controls="tabpanel-faq"
          />
        </Tabs>
      </Box>
      <TabPanel
        id="tabpanel-description"
        ariaLabeledBy="tab-description"
        active={active === 'description'}>
        <Box py={2}>
          <Typography variant="body2" color="text.primary">
            {description}
          </Typography>
        </Box>
      </TabPanel>
      <TabPanel
        id="tabpanel-faq"
        ariaLabeledBy="tab-faq"
        active={active === 'faq'}>
        <Box py={2} gap={2} sx={{ display: 'flex', flexDirection: 'column' }}>
          {faq.map((f, idx) => (
            <Box key={`faq-${idx}`}>
              <Typography variant="overline">
                {f.question}
              </Typography>
              <Typography variant="body2" color="text.primary">
                {f.answer}
              </Typography>
            </Box>
          ))}
        </Box>
      </TabPanel>
    </Box>
  )
}

export default DescriptionSection
