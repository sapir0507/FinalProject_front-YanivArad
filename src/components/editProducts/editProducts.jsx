import { Container, Grid, Paper, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ListItemComp from "../shared/listItem";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#1A2027',
    ...theme.typography.button,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
    '&:hover':{
        backgroundColor: 'gray',
        color: 'black',
    }
  }));

function EditProductsComp() {
    const customersSelect = useSelector(state=>state.customers)
    const productsSelect = useSelector(state=>state.products)
    const purchasesSelect = useSelector(state=>state.purchases)
    const params = useParams();
    const [cusList, setCusList] = useState([])

    useEffect(() => {
        let arr = []
        let _cusList = purchasesSelect.filter(pur=>{
          return pur.ID===params.id
      });
      arr = _cusList.map(prod=>{
          let prodName = (customersSelect.find(item => item.ID === prod.CustomerId))
          return {
              ID: prodName.ID,
              FirstName: prodName.FirstName,
              LastName: prodName.LastName
          }
      });
      setCusList(arr);
  
      }, [customersSelect, params, productsSelect, purchasesSelect])
    return ( <Container>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
                <Item>
                    {/* product data */}
                    edit product 1
                </Item>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <Item>
                    {/* list of all customers that bought the item */}
                    <ul>
                     <ListItemComp isCus={true} cusList={cusList}></ListItemComp>
                    </ul>
                </Item>
            </Grid>
        </Grid>
    </Container> );
}

export default EditProductsComp;