import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import { Typography } from '@mui/material'

import { CategoriesState, fetchCategories } from '../../redux/slices/categories/categorieSlice'
import { AppDispatch } from '../../redux/store'
import AllCategoryImage from '../../images/All.jpg'

function Categories() {
  const dispatch = useDispatch<AppDispatch>()
  const categories = useSelector((state: { categories: CategoriesState }) => state.categories)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleCategoryClick = (categoryId: number) => {
    if (categoryId === allCategories.id) {
      navigate(`/products/`)
    } else {
      navigate(`/products/category/${categoryId}`)
    }
  }

  const allCategories = {
    id: -1,
    name: 'All Categories',
    image: AllCategoryImage
  }

  return (
    <div className="categories" style={{ minHeight: '100%' }}>
      <Typography variant="h4" align="center" padding={5} gutterBottom>
        Shop By Category
      </Typography>
      <Grid container spacing={2}>
        {categories.categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} lg={3} padding={5} key={category.id}>
            <IconButton onClick={() => handleCategoryClick(category.id)}>
              <img src={category.image} alt={category.name} />
            </IconButton>
            <Typography variant="subtitle1" align="center">
              {category.name}
            </Typography>
          </Grid>
        ))}

        <Grid item xs={12} sm={6} md={4} lg={3} padding={5} key={allCategories.id}>
          <IconButton onClick={() => handleCategoryClick(allCategories.id)}>
            <img src={allCategories.image} alt={allCategories.name} />
          </IconButton>
          <Typography variant="subtitle1" align="center">
            {allCategories.name}
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default Categories
