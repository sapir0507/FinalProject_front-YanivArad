import { styled } from '@mui/material/styles';
import { Box, Container, Grid, Paper } from "@mui/material";
import { useNavigate } from 'react-router-dom';

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
  
function MenuComp() {
    const navigate = useNavigate();

    const navigateTo = (e, button, address) => {
        e.preventDefault()
        console.log(button);
        navigate(address);
    }

    return ( <Container>
        <Box sx={{
            width: '100%',
            height: '100%',
        }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                    <Item onClick={(e)=>{
                        navigateTo(e, "products clicked", "/Products" )
                    }}>Products</Item>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Item onClick={(e)=>{
                        navigateTo(e, "customers clicked", "/Customers" )
                    }}>Customers</Item>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Item onClick={(e)=>{
                        navigateTo(e, "purchases clicked", "/Purchases" )
                    }}>Purchases</Item>
                </Grid>
            </Grid>
        </Box>
    </Container> );
}

export default MenuComp;