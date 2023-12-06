import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Fab,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Alert
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

import {
  fetchProducts,
  addProduct,
  removeProduct,
  editProduct,
  Product
} from '../../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../../redux/store'

function ManageProducts() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const products = state.products

  // Edit Dialog
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [editedProduct, setEditedProduct] = useState<Product | null>(null)

  // Add Dialog
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [newProduct, setNewProduct] = useState({
    id: 0,
    name: '',
    image: '',
    description: '',
    categories: [],
    variants: [],
    sizes: [],
    price: 0
  })

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [addProductError, setAddProductError] = useState('');


  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.description || newProduct.price <= 0) {
      setAddProductError('Please fill out all fields and ensure that Price is greater than 0.');
      return;
    }
    dispatch(addProduct({ product: newProduct }))
    setNewProduct({
      id: 0,
      name: '',
      image: '',
      description: '',
      categories: [],
      variants: [],
      sizes: [],
      price: 0
    })
    // Close the Add Dialog
    setOpenAddDialog(false)
  }

  const handleRemoveProduct = (productId: number) => {
    // Dispatch the action to remove a product
    dispatch(removeProduct({ productId }))
  }

  const handleEditProduct = (productId: number) => {
    // Dispatch the action to find a product by its ID
    const foundProduct = products.products.find((product) => product.id === productId)
    if (foundProduct) {
      setEditedProduct(foundProduct)
      // Open the Edit Dialog
      setOpenEditDialog(true)
    }
  }

  const handleCloseEditDialog = () => {
    // Close the Edit Dialog
    setOpenEditDialog(false)
  }

  const saveEditedProduct = () => {
    // Dispatch the action to edit the product
    if (editedProduct) {
      dispatch(editProduct({ product: editedProduct }))
    }
    // Close the Edit Dialog
    setOpenEditDialog(false)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" padding={5}>
      <div>
        <Box display="flex" justifyContent="space-between" alignItems="center" padding={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Manage Products
          </Typography>
          <Fab color="primary" aria-label="add" onClick={() => setOpenAddDialog(true)}>
            <AddIcon />
          </Fab>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ maxWidth: '50px', maxHeight: '50px' }}
                        />
                      )}
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.price} $</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEditProduct(product.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleRemoveProduct(product.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={products.products.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              value={editedProduct ? editedProduct.name : ''}
              onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
              fullWidth
            />
            <br></br>
            <br></br>
            <TextField
              label="Description"
              value={editedProduct ? editedProduct.description : ''}
              onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
              fullWidth
            />
            <br></br>
            <br></br>
            <TextField
              label="Price"
              value={editedProduct ? editedProduct.price.toString() : ''}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, price: parseFloat(e.target.value) })
              }
              fullWidth
            />
            <br></br>
            <br></br>
            <Button variant="contained" color="primary" onClick={saveEditedProduct}>
              Save Product
            </Button>
          </DialogContent>
        </Dialog>

        <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
          <DialogTitle>Add Product</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              fullWidth
            />
            <br></br>
            <br></br>
            <TextField
              label="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              fullWidth
            />
            <br></br>
            <br></br>
            <TextField
              label="Price"
              value={newProduct.price.toString()}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
              fullWidth
            />
            <br></br>
            <br></br>
            <TextField
              label="Image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              fullWidth
            />
            <br></br>
            {addProductError && <Alert severity="error">{addProductError}</Alert>}

            <br></br>
            <Button variant="contained" color="primary" onClick={handleAddProduct}>
              Add Product
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </Box>
  )
}

export default ManageProducts
