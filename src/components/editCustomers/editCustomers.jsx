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

function EditCustomersComp() {
    const customersSelect = useSelector(state=>state.customers)
    const productsSelect = useSelector(state=>state.products)
    const purchasesSelect = useSelector(state=>state.purchases)


    const [prodList, setProdList] = useState([]);
    const params = useParams();

    useEffect(() => {
      console.log("editCustomers, params", params.id);
      let _prodList = purchasesSelect.filter(pur=>{
        console.log(pur);
        return pur.CustomerId===params.id
    });
      console.log(_prodList)

    }, [params])
    

    return ( <Container>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
                <Item>
                    {/* customers data */}
                    edit customer 1
                </Item>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <Item>
                    {/* list of all items that a customer bought */}
                     <ListItemComp isCus={true} prodList={prodList}></ListItemComp>
                </Item>
            </Grid>
        </Grid>
    </Container> );
}

export default EditCustomersComp;