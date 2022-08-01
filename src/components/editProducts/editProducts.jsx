import { Container, Grid, Paper, styled } from "@mui/material";

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
                    edit product 2
                </Item>
            </Grid>
        </Grid>
    </Container> );
}

export default EditProductsComp;