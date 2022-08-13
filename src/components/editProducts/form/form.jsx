import * as React from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import MuiAlert from '@mui/material/Alert';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import { Button, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { useDispatch } from 'react-redux';
import { productDelete, productUpdate } from '../../../redux/reducerSlices/products/products';


function MyFormHelperText(text) {
  const { focused } = useFormControl() || {};
  const _focused = text.text.focused;
  const _text = text.text.text;
  const helperText = React.useMemo(() => {
    if (focused) {
      return _focused;
    }
    return _text;
  }, [focused, _focused, _text]);

  return <FormHelperText>{helperText}</FormHelperText>;
}

export default function EditProductForm({product}) {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const [snackbarMessage, setSnackbarMessage] = React.useState('');


  const [ID, setID] = React.useState(product.ID)
  const [name, setName] = React.useState(product.Name)
  const [quantity, setQuantity] = React.useState(product.Quantity)
  const [price, setPrice] = React.useState(product.Price)

  React.useEffect(() => {
    setID(product.ID)
    setName(product.Name)
    setQuantity(product.Quantity)
    setPrice(product.Price)
  
}, [product])

const handleClick = () => {
  setOpen(true);
};

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const handleUpdate = () => {
  const obj = {
    ID: ID,
    Name: name,
    Quantity: Number(quantity), 
    Price: Number(price)
  }
  dispatch(productUpdate(obj))
  setSnackbarMessage("Product Updated")
  handleClick()
}

const handleDelete = () => {
  dispatch(productDelete(ID))
  setSnackbarMessage("Product Deleted")
  handleClick()
}


  return (
    <Box component="form" sx={{
        '& > :not(style)': { m: 1 },
      }} noValidate autoComplete="off">
        <FormControl sx={{ width: '25ch' }}>
        <OutlinedInput value={ID} onChange={(e)=>{
          setID(e.target.value)
        }} />
        <MyFormHelperText text={{focused: 'ID', text: ''}}/>
      </FormControl>
      <FormControl sx={{ width: '25ch' }}>
        <OutlinedInput value={name} onChange={(e)=>{setName(e.target.value)}} />
        <MyFormHelperText text={{focused: 'Name', text: ''}}/>
      </FormControl>
      <FormControl sx={{ width: '25ch' }}>
        <OutlinedInput value={price} onChange={(e)=>{
          setPrice(e.target.value)
        }} />
        <MyFormHelperText text={{focused: 'Price', text: ''}}/>
      </FormControl>
      <FormControl sx={{ width: '25ch' }}>
        <OutlinedInput value={quantity} onChange={(e)=>{
          setQuantity(e.target.value)
        }} />
        <MyFormHelperText text={{focused: 'Quantity', text: ''}}/>
      </FormControl>
      <Button variant='contained' sx={{padding:2}} endIcon={<UpdateIcon/>} color={"success"} onClick={handleUpdate}>Update</Button>
      <Button variant='contained' sx={{padding:2}} startIcon={<DeleteIcon />} color={"error"} onClick={handleDelete} >Delete</Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
      </Snackbar>

    </Box>
  );
}