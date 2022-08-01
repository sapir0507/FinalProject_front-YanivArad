import { Container } from "@mui/material";
import ProductComp from "./product/product";
import TotalAmountComp from "./total/total";

function ProductsComp() {
    return ( <Container>
        <TotalAmountComp></TotalAmountComp>
        <hr></hr>
        <ProductComp></ProductComp>
    </Container> );
}

export default ProductsComp;