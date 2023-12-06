import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Typography,
  CircularProgress,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Box
} from '@mui/material'

import { AppDispatch, RootState } from '../../redux/store'
import { fetchOrders } from '../../redux/slices/orders/orderSlice'

const ManageOrders = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { orders, isLoading, error } = useSelector((state: RootState) => state.orders)

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <div>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        padding={2}
        paddingTop={10}
        gutterBottom>
        List of Orders
      </Typography>
      {isLoading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {!isLoading && !error && (
        <Box display="flex" justifyContent="center" paddingBottom={5}>
          <Paper elevation={3}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Product ID</TableCell>
                    <TableCell>User ID</TableCell>
                    <TableCell>Purchased At</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.productId}</TableCell>
                      <TableCell>{order.userId}</TableCell>
                      <TableCell>{order.purchasedAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={orders.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
          </Paper>
        </Box>
      )}
    </div>
  )
}

export default ManageOrders
