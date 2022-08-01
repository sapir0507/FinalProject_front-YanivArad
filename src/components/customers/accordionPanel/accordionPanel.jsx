import { Container } from "@mui/material";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomerProductsComp from "./customerProducts/customerProducts";

function AccordionPanelComp({panel, expanded, handleChange, customer}) {
    return ( <Container>

      <Accordion expanded={expanded === panel} onChange={handleChange(panel)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${panel}bh-content`}
          id={`${panel}bh-header`}
        >
          <Typography st sx={{ width: '33%', flexShrink: 0 }}>
            {customer.FirstName + ' ' + customer.LastName}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            A List of All the products {customer.FirstName + ' ' + customer.LastName} bought
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CustomerProductsComp customer={customer}></CustomerProductsComp>
        </AccordionDetails>
      </Accordion>
    </Container> );
}

export default AccordionPanelComp;