import { Box, Container, Grid, Paper, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ListItemComp from "../shared/listItem";
import EditProductForm from "./form/form";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.button,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'black',
    '&:hover':{
        backgroundColor: 'lightgray',
        color: 'black',
    }
  }));

function EditProductsComp() {
    const customersSelect = useSelector(state=>state.customers)
    const productsSelect = useSelector(state=>state.products)
    const purchasesSelect = useSelector(state=>state.purchases)
    const params = useParams();
    const [cusList, setCusList] = useState([])
    const [product, setProduct] = useState({
        ID: 'ID',
        Name: 'Name',
        Quantity: 'Quantity',
        Price: 'Price'
    })


    useEffect(() => {
        let _cusList = purchasesSelect.filter(pur=>{
            return Number(pur.ProductId)===Number(params.id)
        });
        const arr = _cusList.map(cusFromPurchase=>{
            let CustomerName = customersSelect.find(item =>{ 
                return Number(item.ID) === Number(cusFromPurchase.CustomerId)
            })
            if(!CustomerName) return cusFromPurchase;
            return {
                ID: CustomerName.ID,
                FirstName: CustomerName.FirstName,
                LastName: CustomerName.LastName
            }
        });
        setCusList(arr);
    
      }, [customersSelect, params, purchasesSelect])


      useEffect(() => {
        const prod = productsSelect.filter(prod=>Number(prod.ID)===Number(params.id));
      if(prod.length>0)
        {setProduct(prod[0])}
      }, [params.id, productsSelect])
      
    return ( <Container>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
                <Item>
                    {/* product data */}
                    edit product 1
                    <EditProductForm product={product}></EditProductForm>
                </Item>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Item>
                    {/* list of all customers that bought the item */}
                    <Box sx={{
                        width:"fit-content", 
                        maxWidth: 400
                    }}>
                    <h1>Customer List:</h1>
                    <ul>
                        {cusList.length > 0 &&<ListItemComp isCus={true} cusList={cusList}></ListItemComp>}
                    </ul>
                    </Box>
                </Item>
            </Grid>
        </Grid>
    </Container> );
}

export default EditProductsComp;