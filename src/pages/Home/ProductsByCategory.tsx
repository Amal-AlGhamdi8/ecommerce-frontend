import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Grid,
  ThemeProvider
} from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import theme from '../../styles/theme'

import { ProductState, fetchProducts } from '../../redux/slices/products/productSlice'
import { AppDispatch } from '../../redux/store'
import {
  CategoriesState,
  fetchCategories,
  findCategoryById
} from '../../redux/slices/categories/categorieSlice'
import { CartState, addToCart } from '../../redux/slices/cart/cartSlice'

function ProductsByCategory() {
  const { categoryId } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector((state: { products: ProductState }) => state.products)
  const categories = useSelector((state: { categories: CategoriesState }) => state.categories)
  const cart = useSelector((state: { cart: CartState }) => state.cart)

  useEffect(() => {
    dispatch(fetchCategories()).then(() => dispatch(findCategoryById(Number(categoryId))))
    dispatch(fetchProducts())
  }, [categoryId, dispatch])

  if (!categoryId) {
    return (
      <div>
        <Typography variant="h4" align="center" padding={5} gutterBottom>
          No category selected.
        </Typography>
      </div>
    )
  }

  const category = categories.categories.find(
    (category) => category.id === parseInt(categoryId, 10)
  )

  if (!category) {
    return (
      <div>
        <Typography variant="h4" align="center" padding={5} gutterBottom>
          Category not found.
        </Typography>
      </div>
    )
  }

  const filteredProducts = products.products.filter((product) =>
    product.categories.includes(parseInt(categoryId, 10))
  )

  return (
    <ThemeProvider theme={theme}>
      <div className="productsByCategory" style={{ minHeight: '100%' }}>
        <Typography variant="h4" align="center" padding={5} gutterBottom>
          Products in {category.name}
        </Typography>
        <Grid container spacing={2} padding={5}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card className="product">
                <Link to={`/products/${product.id}`}>
                  <CardMedia
                    component="img"
                    alt={product.name}
                    height="140"
                    image={product.image}
                  />
                </Link>
                <CardContent>
                  <Link to={`/products/${product.id}`}>
                    <Typography variant="h4" className="product-title">
                      {product.name}
                    </Typography>
                  </Link>
                  <Typography variant="h6">{product.price} $</Typography>
                  <br />
                  <Button
                    variant="contained"
                    className="btn-button"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => {
                      dispatch(addToCart({ ...product, quantity: 1 }))
                    }}>
                    ADD TO CART
                  </Button>
                  <IconButton color="primary" className="btn-button">
                    <FavoriteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </ThemeProvider>
  )
}

export default ProductsByCategory
