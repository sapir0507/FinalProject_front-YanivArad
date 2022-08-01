/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";

import { useSelector} from 'react-redux'
import MenuComp from "../menu/menu";

function MainComp() {
    // const dispatch = useDispatch()
    const productsSelect = useSelector(state=>state.products)
    const customersSelect = useSelector(state=>state.customers)
    const purchasesSelect = useSelector(state=>state.purchases)
    // const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log("products", productsSelect);
        // setProducts(productsSelect);
    }, [productsSelect])

    useEffect(() => {
        console.log("pruchases", purchasesSelect);
    }, [purchasesSelect])

    useEffect(() => {
        console.log("customers", customersSelect);
    }, [customersSelect])
    
    return ( <MenuComp></MenuComp>);
}

export default MainComp;