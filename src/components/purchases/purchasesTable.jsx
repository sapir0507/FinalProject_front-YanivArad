import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled, ThemeProvider, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { TableHead } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createNextState } from '@reduxjs/toolkit';
// import { useSelector} from 'react-redux'

function TablePaginationActions(props) {
    const theme = useTheme({ palette: { mode: 'light' } });

  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

function PurchasesTableComp({productID, customerID}) {
    const productsSelect = useSelector(state=>state.products);
    const customersSelect = useSelector(state=>state.customers);
    const purchasesSelect = useSelector(state=>state.purchases);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [myRows, setMyRows] = useState([]);

    useEffect(()=>{
        let tempRows = [];
        let cus = [];
        let prod = [];
        // if(customerID){
        //     cus = customersSelect.filter(customer => customer.ID === customerID);
        //     console.log("customer from purchases component", cus);
        // }
        if(productID){
            prod = productsSelect.filter(products=> products.ID === productID);
            // console.log("product from purchases component", prod);
        }
       
        // purchasesSelect
        const filteredCus = customersSelect.filter(customer=>{
          if(customerID){
            if(customer.ID === customerID){
              return customer;
            }
          }
          else return customer;
        })

         const data = filteredCus.map(fil=>{
          let releventPurchases = []
          purchasesSelect.filter(pur=>{
            if(pur.CustomerId === fil.ID)
              releventPurchases = [...releventPurchases, {date: {id: pur.ProductId, date: pur.Date}}]
            return pur.CustumerId === fil.ID
          })

          const _releventProduct = (productsSelect.filter(prod=>{
            let _rel = releventPurchases.find(rel=>prod.ID === rel.date.id)
            return _rel
          }))

          const releventProduct = _releventProduct.map(item=>{
            // get the relevent purchase event
            let _rel = releventPurchases.filter(rel=>item.ID === rel.date.id)
            console.log(_rel);
            if(_rel.length > 0 && _rel[0].date && _rel[0].date.date)
              item = {...item, date: _rel[0].date.date}
            return item
          })

          //array of objects
          console.log("relevent products", releventProduct);

          const finalObj = {
            ...fil,
            arrayOfProducts: [...releventProduct]
          }

          return finalObj
        })
        console.log(data);
        //placeholder
        
        data.forEach(item=>{
          item.arrayOfProducts.forEach(product => {
            tempRows.push({
                customerID: item.ID,
                name: item.FirstName + ' ' + item.LastName,
                purchasedItem: product.Name,
                purchaseDate: product.date
            })
          });

        })
      
        // tempRows.push({
        //     customerID: 1,
        //     name: "sapir",
        //     purchasedItem: "item",
        //     purchaseDate: "17.7.1994"
        // })
        setMyRows(tempRows);

    },[productID, customerID, customersSelect, productsSelect])

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - myRows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(parseInt(newPage, 10));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const theme = useTheme();

  return (
   <ThemeProvider theme={theme}>
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <StyledTableCell align="center">User ID</StyledTableCell >
            <StyledTableCell align="center">User Name</StyledTableCell>
            <StyledTableCell align="center">Purchased Item</StyledTableCell>
            <StyledTableCell align="center">Purchase Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? myRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : myRows
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell style={{ width: 160 }} align="center">
                {row.customerID}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {row.purchasedItem}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {row.purchaseDate}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              sx = {{
                minWidth: 500
              }}
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={myRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
   </ThemeProvider>
  );
}

export default PurchasesTableComp;