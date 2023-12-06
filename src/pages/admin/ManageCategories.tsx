import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Fab,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  TablePagination,
  Alert
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

import {
  fetchCategories,
  addCategory,
  removeCategory,
  editCategory,
  Category
} from '../../redux/slices/categories/categorieSlice'
import { RootState, AppDispatch } from '../../redux/store'

function ManageCategories() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const categories = state.categories

  // Edit Dialog
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [editedCategory, setEditedCategory] = useState<Category | null>(null)
  const [editedCategoryName, setEditedCategoryName] = useState('')
  const [editedCategoryImage, setEditedCategoryImage] = useState('')

  // Add Dialog
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [newCategory, setNewCategory] = useState({
    id: 0,
    name: '',
    image: ''
  })

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [addCategoryError, setAddCategoryError] = useState('')

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.image) {
      setAddCategoryError('Please fill out all fields.')
      return
    }
    const categoryToAdd = { ...newCategory, name: newCategory.name, image: newCategory.image }
    dispatch(addCategory(categoryToAdd))

    setNewCategory({
      id: 0,
      name: '',
      image: ''
    })
    setAddCategoryError('')

    setOpenAddDialog(false)
  }

  const handleRemoveCategory = (categoryId: number) => {
    dispatch(removeCategory(categoryId))
  }
  const handleEditCategory = (field: 'name' | 'image', value: string) => {
    if (field === 'name') {
      setEditedCategoryName(value)
    } else if (field === 'image') {
      setEditedCategoryImage(value)
    }
  }

  const handleStartEditCategory = (categoryId: number) => {
    const foundCategory = categories.categories.find((category) => category.id === categoryId)
    console.log('foundCategory is : ' + foundCategory)

    if (foundCategory) {
      setEditedCategory(foundCategory)
      setEditedCategoryName(foundCategory.name)
      setEditedCategoryImage(foundCategory.image)
      console.log('foundCategory is : ' + foundCategory.name)
      console.log('foundCategory is : ' + foundCategory.image)
      setOpenEditDialog(true)
    }
  }

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false)
  }

  const saveEditedCategory = () => {
    if (editedCategory) {
      const updatedCategory = {
        ...editedCategory,
        name: editedCategoryName,
        image: editedCategoryImage
      }
      dispatch(editCategory(updatedCategory))
    }
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
          <Typography variant="h5" component="h1" gutterBottom>
            Manage Categories
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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.categories
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      {category.image && (
                        <img
                          src={category.image}
                          alt={category.name}
                          style={{ maxWidth: '50px', maxHeight: '50px' }}
                        />
                      )}
                    </TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleStartEditCategory(category.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleRemoveCategory(category.id)}>
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
          count={categories.categories.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Category</DialogTitle>
          <br></br>
          <br></br>
          <DialogContent>
            <TextField
              label="Name"
              value={editedCategoryName}
              onChange={(e) => handleEditCategory('name', e.target.value)}
              fullWidth
            />
            {/* <TextField
              label="Image URL"
              value={editedCategoryImage}
              onChange={(e) => handleEditCategory('image', e.target.value)} 
              fullWidth
            /> */}
            <br></br>
            <br></br>

            <Button variant="contained" color="primary" onClick={saveEditedCategory}>
              Save Category
            </Button>
          </DialogContent>
        </Dialog>

        <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
          <DialogTitle>Add Category</DialogTitle>
          <br></br>
          <br></br>
          <DialogContent>
            <TextField
              label="Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              fullWidth
            />
            <br></br>
            <br></br>
            <TextField
              label="Image URL"
              value={newCategory.image}
              onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
              fullWidth
            />
            <br></br>
            {addCategoryError && <Alert severity="error">{addCategoryError}</Alert>}

            <br></br>
            <Button variant="contained" color="primary" onClick={handleAddCategory}>
              Add Category
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </Box>
  )
}

export default ManageCategories
