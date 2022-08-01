import { useSelector} from 'react-redux'
import { Box, Container, createTheme, Paper, ThemeProvider } from "@mui/material";
import { useEffect, useState } from 'react';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

function TotalAmountComp() {
    const productsSelect = useSelector(state=>state.products)
    const purchasesSelect = useSelector(state=>state.purchases)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        console.log("purchases", purchasesSelect);
        let Total = 0;
        purchasesSelect.forEach(pruch => {
            let prod = productsSelect.filter(prod=>prod.ID===pruch.ProductId)
            if(prod)
                prod.forEach(item=>Total += item.Price)
        });
        setTotal(Total)
    }, [productsSelect, purchasesSelect])

    return ( <Container>
        <ThemeProvider theme={darkTheme}>
        <Box sx={{
            flexGrow: 1,
            padding: "5px"
        }}>
            <Paper sx={{
                marginY: '5px',
                alignContent: 'center',
                padding: '10px'
            }}>
                Total - {total} $
            </Paper>
        </Box>
        </ThemeProvider>
    </Container> );
}

export default TotalAmountComp;