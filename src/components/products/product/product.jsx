import { useSelector} from 'react-redux'
import { Box, Container, createTheme, Paper, ThemeProvider, Typography } from "@mui/material";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ExpendedZoneComp from './expendedZone/expendedZone';


const darkTheme = createTheme({ palette: { mode: 'dark' } });

function ProductComp() {
    const productsSelect = useSelector(state=>state.products);
    const customersSelect = useSelector(state=>state.customers);
    const purchasesSelect = useSelector(state=>state.purchases);

    useEffect(() => {
        console.log("products", productsSelect);
        console.log("customers", customersSelect);
        console.log("purchases", purchasesSelect);

    }, [customersSelect, productsSelect, purchasesSelect])

    return ( <Container>
        <ThemeProvider theme={darkTheme}>
        <Box sx={{
            flexGrow: 1,
            padding: "5px"
        }}>
            <Typography variant='h4'>
                ✨ All Products 
            </Typography>
            {productsSelect && productsSelect.map((prod, index)=>{
                return <Paper sx={{
                    marginY: '10px',
                    alignContent: 'center',
                    padding: '10px',
                    backgroundColor: 'darkgray',
                    color: 'black',
                    border: '2px solid black',
                    '&:hover':{
                        'NameLink':{
                            color: 'red'
                        }
                    }
                }} key={index} elevation={2} onClick={(e)=>{
                    console.log(prod.Name)
                }}>
                    <ul>
                        <Box sx={{
                            'a':{
                                color: 'black'
                            },
                            'a:hover':{
                                color: 'seagreen'
                            }
                        }}>
                            <Link to={`/EditProducts/${prod.ID}`}><li>
                                Name: {prod.Name}
                            </li></Link>
                        </Box>
                        <li>
                            Price: {prod.Price} $
                        </li>
                        <li>
                            Quantity: {prod.Quantity}
                        </li>                        
                    </ul>
                    <ExpendedZoneComp productID = {prod.ID} customersSelect={customersSelect} purchasesSelect={purchasesSelect}></ExpendedZoneComp>
                    {purchasesSelect && purchasesSelect.find(pur=>prod.ID===pur.ProductID) ?  <ExpendedZoneComp productID = {prod.ID} customersSelect={customersSelect} purchasesSelect={purchasesSelect}></ExpendedZoneComp> : <Container>
                    <Typography variant='body1' style={{marginLeft: 25, color: 'black', fontWeight: 800}}>
                         No one bought this product yet.
                    </Typography>
                    </Container>
                    }
                   
                </Paper>
            })}
        </Box>
        </ThemeProvider>
    </Container> );
}

export default ProductComp;