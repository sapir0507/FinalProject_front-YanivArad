import { Box, Container, Grid, Paper, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ListItemComp from "../shared/listItem";
import EditCustomersForm from "./form/form";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.button,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'black',
  }));

function EditCustomersComp() {
    const productsSelect = useSelector(state=>state.products)
    const purchasesSelect = useSelector(state=>state.purchases)
    const customersSelect = useSelector(state=>state.customers)

    const [prodList, setProdList] = useState([]);
    const [customer, setCustomer] = useState({
        ID: 'ID',
        FirstName: 'First Name',
        LastName: 'Last Name',
        City: 'City'
    });
    const params = useParams();

    useEffect(() => {
      let arr = []
      let _prodList = purchasesSelect.filter(pur=>{
        return pur.CustomerId===params.id
      });

    if(prodList){
        arr = _prodList.map(prod=>{
            let prodName = (productsSelect.find(item => {
                return item.ID === prod.ProductId
            }))

            return {
                ID: prod.ID,
                Name: prodName.Name
            }
        });
        setProdList(arr);
    }
    else setProdList([]);
    

    }, [params, prodList, productsSelect, purchasesSelect])

    useEffect(()=>{
        const cus = customersSelect.filter(cus=>Number(cus.ID)===Number(params.id))
        
        if(cus.length>0)
            setCustomer(cus[0])
    }, [customersSelect, params.id])
    

    return ( <Container>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
                <Item>
                    {/* customers data */}
                    edit customer 1
                    <EditCustomersForm customer={customer}></EditCustomersForm>
                </Item>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Item>
                    {/* list of all items that a customer bought */}
                    <Box
                        sx={{
                            maxWidth: 400,
                            width: "fit-content"
                        }}
                    >
                    <h1>Product List:</h1>
                    <ul>
                        {
                            prodList.length > 0 &&
                            <ListItemComp isCus={false} prodList={prodList}></ListItemComp>
                        }
                    </ul>
                    </Box>
                </Item>
            </Grid>
        </Grid>
    </Container> );
}

export default EditCustomersComp;