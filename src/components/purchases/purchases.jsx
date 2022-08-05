import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Button, Container, createTheme, ThemeProvider, Typography } from "@mui/material";
import { useSelector } from 'react-redux';

const darkTheme = createTheme({});
const purchases = ['harry potter', 'serious black', 'draco malfoy'];


function PurchasesComp() {
    const productsSelect = useSelector(state=>state.products);
    const customersSelect = useSelector(state=>state.customers);
    const purchasesSelect = useSelector(state=>state.purchases);

    const [optionCus, setOptionCus] = React.useState([])
    const [optionProd, setOptionProd] = React.useState([])


    const [selectedCustomer, setSelectedCustomer] = React.useState('')
    const [selectedProduct, setSelectedProduct] = React.useState('')

    React.useEffect(() => {
        const getProductList = () => {
            purchasesSelect.forEach(item=>{
                const _products = productsSelect.filter(prod=>prod.ID===item.ProductId)
                const _productsNames = _products.map(prod=>prod.Name)
                setOptionProd(_productsNames);
                return _productsNames
            })
            
        }
        const getCustomerList = () => {
            purchasesSelect.forEach(item=>{
                const _customers = customersSelect.filter(cus=>cus.ID===item.CustomerId)
                const _customersNames = _customers.map(cus=>`${cus.FirstName} ${cus.LastName}`)
                setOptionCus(_customersNames)
            })
        }
        getCustomerList()
        getProductList()
    }, [customersSelect, productsSelect, purchasesSelect])

    const cusSelected = (cus) => {
        setSelectedCustomer(cus)
    }
    const prodSelected = (prod) => {
        setSelectedProduct(prod)
    }

    
    
    return ( <Container>
        <ThemeProvider theme={darkTheme}>
            <Box sx={{
                flexGrow: 1,
                padding: "5px"
            }}>
                <Typography variant='h4'>
                    ✨ Purchases ✨
                </Typography>

                <ControllableStates options={optionProd} label='Products' prodSelected={prodSelected}></ControllableStates>
                <ControllableStates options={optionCus} label='Customers' cusSelected={cusSelected}></ControllableStates>
                <ControllableStates options={purchases} label='Dates'></ControllableStates>
                <Button variant='contained' sx={{marginTop: 3}} color="success">Search</Button>
            </Box>
        </ThemeProvider>
    </Container> );
}

export default PurchasesComp;


function ControllableStates({options, label, }) {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300, marginTop: 3 }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </div>
  );
}
