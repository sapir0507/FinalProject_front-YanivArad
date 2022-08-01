import { Box, Container, createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

const darkTheme = createTheme({ palette: { mode: 'dark' } });

function AllBuyersComp({prodID, customersSelect, purchasesSelect}) {
    // const customersSelect = useSelector(state=>state.customers);
    // const purchasesSelect = useSelector(state=>state.parchases);

    const [buyingUsers, setBuyingUsers] = useState([]);

    useEffect(()=>{
        const ids = purchasesSelect.filter(purchase=>purchase.ProductID===prodID);
        if(ids && ids.length > 0){
            const map = customersSelect.filter(cus=>ids.includes(cus.ID));
            if(map && map.length>0){
                setBuyingUsers(map);
            }
        }
    },[customersSelect, prodID, purchasesSelect])
    return ( <Container>
        <ThemeProvider theme={darkTheme}>
        <Box sx={{
            flexGrow: 1,
            padding: '5px'
        }}>
            {buyingUsers && buyingUsers.map(buying=>{
                return <div>
                    {buying.Name}
                </div>
            })}
        </Box>
        </ThemeProvider>
    </Container> );
}

export default AllBuyersComp;