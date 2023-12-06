import{ useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  Box,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Button,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import { CartState, editCart, removeFromCart, CartProduct, resetCart } from '../../redux/slices/cart/cartSlice'

function UserCart() {
  const dispatch = useDispatch()
  const cart = useSelector((state: { cart: CartState }) => state.cart)

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    // Calculate the total price whenever the cart changes
    const total = cart.cart.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
    setTotalPrice(total)
  }, [cart])

  const handleQuantityChange = (product: CartProduct, newQuantity: number) => {
    // Dispatch an action to edit the quantity of a product in the cart
    dispatch(editCart({ ...product, quantity: newQuantity }))
  }

  const handleRemoveProduct = (productId: number) => {
    // Dispatch an action to remove a product from the cart
    dispatch(removeFromCart(productId))
  }

  const handleResetCart = () => {
    // Dispatch an action to reset the cart
    dispatch(resetCart());
  };
  return (
    <Container style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Box display="flex" flexDirection="column" alignItems="center" marginTop={5}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cart.cart.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <TableContainer component={Paper} style={{ marginBottom: '20px' }} className="table-container">
          <Table className="cart-table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.cart.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      width="50"
                      height="50"
                      style={{ marginRight: '10px' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{product.name}</Typography>
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      inputProps={{ min: '1' }}
                      value={product.quantity}
                      onChange={(e) => handleQuantityChange(product, +e.target.value)}
                    />
                  </TableCell>
                  <TableCell>${product.price * product.quantity}</TableCell>
                  <TableCell>
                    <IconButton color="secondary" onClick={() => handleRemoveProduct(product.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Typography style={{ padding: '10px' }} variant="h6">
        Total Price: $ {totalPrice}
      </Typography>
      {cart.cart.length > 0 && (
        <Box display="flex" alignItems="center" justifyContent="center" marginTop={2}>
          <Box marginRight={2}>
            <Button variant="outlined" color="primary">
              Checkout
            </Button>
          </Box>
          <Box>
            <Button variant="outlined" color="secondary" onClick={handleResetCart}>
              Reset
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  </Container>
  );
};

export default UserCart;
