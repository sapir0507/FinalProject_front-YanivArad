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

        let customers = customersSelect.filter(customer=>{
          if(customerID)
            return customerID===customer.ID
          else return customer
        })

        let products = productsSelect.filter(product=>{
          if(productID)
            return productID===product.ID
          else return product
        })
        const originals = {
          customers: customers,
          products: products
        }
        purchasesSelect.forEach(purchase=>{
          customers = originals.customers.filter(cus=>cus.ID===purchase.CustomerId)
          products = originals.products.filter(prod=>prod.ID===purchase.ProductId)
          products = products.map(prod=>{
             let purchaseDetails = purchasesSelect.filter(pur=>prod.ID===pur.ProductId)
             if(purchaseDetails.length>0) 
                return {
                  ...prod,
                  date: purchaseDetails[0].Date
                }
              else return prod
          })
          if(customers.length>0 && products.length>0)
          {
              const _tableItem = {
                  customerID: purchase.CustomerId,
                  name: getFullName(customers, purchase),
                  purchasedItem: getPurchasedItem(products, purchase),
                  purchaseDate: getDateOfBuying(products, purchase)
              }
              tempRows.push(_tableItem)
          }
        })         
      
        setMyRows(tempRows);

    },[productID, customerID, customersSelect, productsSelect, purchasesSelect])

    const getFullName = (customers, purchase) =>{
      const customer = customers.filter(cus=>cus.ID===purchase.CustomerId)
      if(customer.length > 0)
        return customer[0].FirstName + ' ' + customer[0].LastName
      else return ''
    }


    const getPurchasedItem = (products, purchase) => {
      const item = products.filter(pur=>pur.ID===purchase.ProductId)
      if(item.length > 0)
        return item[0].Name 
      else return ''
    }

    const getDateOfBuying = (products, purchase) => {
      const item = products.filter(pur=>pur.ID===purchase.ProductId)
      if(item.length > 0)
        return item[0].date 
      else return ''
    }
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