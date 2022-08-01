import { Link } from "react-router-dom";

function ListItemComp({isCus, cusList, prodList}) {

    return ( <div>
        {isCus? <div>
            {cusList && cusList.map(customer=>{
                return <li key={customer.id}><Link to='/:id'>{customer.Firstname + ' ' + customer.LastName}</Link></li>
            })}
        </div> : <div>
            {prodList && prodList.map(product=>{
                return <li key={product.id}><Link to='/:id'>{product.name}</Link></li>
            })}
        </div>}
    </div> );
}

export default ListItemComp;