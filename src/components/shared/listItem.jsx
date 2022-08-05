import { Container } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function ListItemComp({isCus, cusList, prodList}) {

    useEffect(() => {
      if(!isCus){
        console.log("listItem", prodList)
      }
    }, [isCus, prodList])
    
    return ( <Container>
        {isCus? <Container>
            {cusList && cusList.map(customer=>{
                return <li key={customer.ID}><Link to={`/EditCustomers/${customer.ID}`}>{customer.FirstName + ' ' + customer.LastName}</Link></li>
            })}
        </Container> : <Container>
            {prodList && prodList.map(product=>{
                return <li key={product.ID}><Link to={`/EditProducts/${product.ID}`}>{product.Name}</Link></li>
            })}
        </Container>}
    </Container> );
}

export default ListItemComp;