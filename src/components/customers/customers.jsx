import { Box, Container } from "@mui/material";
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AccordionPanelComp from "./accordionPanel/accordionPanel";
import LoadingButton from '@mui/lab/LoadingButton';
import PreviewIcon from '@mui/icons-material/Preview';



function CustomersComp() {
    // const productsSelect = React.useSelector(state=>state.products)
    const customersSelect = useSelector(state=>state.customers)
    // const purchasesSelect = React.useSelector(state=>state.purchases)
    const [panels, setPanels] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
    
      useEffect(() => {
        let panels = [];
        customersSelect.forEach(customer => {
            panels.push(`panel` + customer.ID);
        });
        setPanels(panels);
        
      }, [customersSelect])
      
    return ( <Container>
        <Typography variant='h4'>
                ✨ All Customers 
        </Typography>
        <Box
            sx={{
                flexGrow: 1,
                marginTop: 3,
                width: '100%',
                height: '100%'
            }}
        >
            { panels && panels.length === 0 &&
                <Container>
                <LoadingButton
                size="large"
                loadingPosition="start"
                startIcon={<PreviewIcon/>}
                loading={panels.length === 0}
                >
                    Show All Customers
                </LoadingButton>     
            </Container>
            }
        </Box>
        
        {panels.length > 0 && customersSelect.map((customer, index)=>{
            return <Container key={index}>
                <AccordionPanelComp panel={panels[index]} expanded={expanded} handleChange={handleChange} customer={customer}></AccordionPanelComp>
            </Container>
        })}

    </Container> );
}

export default CustomersComp;