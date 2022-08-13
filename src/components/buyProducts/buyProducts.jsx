import { Box, Button, Container, Grid, Typography } from "@mui/material";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import { pruchaseAdd } from "../../redux/reducerSlices/purchases/pruchases";
import { nanoid } from "@reduxjs/toolkit";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useParams } from "react-router-dom";
import { productQuantityUpdate } from "../../redux/reducerSlices/products/products";




const addProduct = (_customerId, chosen, productsSelect, dispatch) => {
    let prodID = '';
    const date = new Date();
    const UTC_DATE = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;

    productsSelect.forEach(product=>{
        if(product.Name === chosen) 
            prodID = product.ID;
    })
    if(prodID!=='')
    {
        const obj = {
            Date: UTC_DATE,
            ProductId: prodID,
            CustomerId: _customerId? _customerId : '1',
            ID: nanoid()
        }
        dispatch(pruchaseAdd(obj))
        dispatch(productQuantityUpdate(obj.ProductId))
    }
}

function BuyProductsComp ({_customerId}) {
    const dispatch = useDispatch();
    const params = useParams();
    const [open, setOpen] = React.useState(false);
    const productsSelect = useSelector(state => state.products);
    const [products, setProducts] = React.useState([]);
    const [chosen, setChosen] = React.useState('');

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

      const handleClick = () => {
        setOpen(true);
      };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

   

    React.useEffect(() => {
        const prod = [...productsSelect];
        let prodNames = []
        prod.forEach(item => {
            prodNames = [...prodNames, item.Name];
        })
        setProducts(prodNames);
        setChosen(prodNames[0]);

    }, [productsSelect])

    return (<Container>
        <Typography variant="h4" sx={ {
            flexGrow: 1,
            textAlign: 'center',
            marginBottom: 3,
            fontWeight: 700,
            color: 'seagreen',
            textShadow: '2px 2px 1px'
        } }>
            Buy Product
        </Typography>
        <Box sx={ {
            width: '100%',
            height: '100%',
            placeContent: 'center'
        } }>
            <Grid container spacing={0 }>
                <Grid item xs = { 12 }>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={ products }
                        onChange = {(e, newValue)=>{
                            setChosen(newValue)
                        }}
                        renderInput={ (params) => <TextField { ...params } label="Products" /> }
                    />
                    <Button
                        variant="contained"
                        color="success"
                        sx={{
                            height: 53,
                        }}
                        endIcon={ <AddIcon></AddIcon> }
                        onClick={ () => {
                            if(params.id && params.id.includes("=")){
                                const cus_id = params.id.split("=")[1]
                                _customerId = cus_id
                            }
                            addProduct(_customerId, chosen, productsSelect, dispatch)
                            handleClick()
                        }}>Add
                    </Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Item was added successfully!
                        </Alert>
                    </Snackbar>
                    
                </Grid>
            </Grid>
        </Box>






    </Container>);
}

export default BuyProductsComp;


