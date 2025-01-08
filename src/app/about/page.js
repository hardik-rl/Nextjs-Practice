"use client"

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, TextField, Typography } from '@mui/material';
import apiCall from '@/api/ApiCalling';

export default function About() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);

  const handleChangePage = (event, newPage) => {    
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(1+event.target.value);
    setPage(0);
  };

  const fetchProducts = async () => {
    try {
      const offset = page * rowsPerPage;
      const products = await apiCall(`/products?limit=${rowsPerPage}&skip=${offset}`, 'GET');
      setData(products)
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, [page, rowsPerPage]);

  return (
    <>
      <Box sx={{ display: "flex", mb: 4, alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant='h5'>Stock Market</Typography>
        <TextField id="standard-basic" label="Standard" variant="standard" />
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 420 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ fontWeight: 600 }}>Title</TableCell>
                <TableCell align="left" style={{ fontWeight: 600 }}>Description</TableCell>
                <TableCell align="right" style={{ fontWeight: 600 }}>Price</TableCell>
                <TableCell align="right" style={{ fontWeight: 600 }}>Rating</TableCell>
                <TableCell align="right" style={{ fontWeight: 600 }}>Stock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.products?.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.rating}</TableCell>
                  <TableCell>{row.stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
