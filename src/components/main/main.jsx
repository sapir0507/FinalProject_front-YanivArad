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
        // setProducts(productsSelect);
    }, [productsSelect])

    useEffect(() => {
    }, [purchasesSelect])

    useEffect(() => {
    }, [customersSelect])
    
    return ( <MenuComp></MenuComp>);
}

export default MainComp;