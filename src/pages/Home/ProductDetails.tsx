//ProductDetails.tsx
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Rating,
  Stack,
  Tab,
  Tabs,
  ThemeProvider,
  Typography
} from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import theme from '../../styles/theme'

import { AppDispatch } from '../../redux/store'
import {
  ProductState,
  fetchProducts,
  findProductById
} from '../../redux/slices/products/productSlice'
import { addToCart } from '../../redux/slices/cart/cartSlice'
import { CategoriesState, fetchCategories } from '../../redux/slices/categories/categorieSlice'
import QuantityInput from '../../components/products/products/QuantityInput'

function ProductDetails() {
  const { productId } = useParams()
  const singleProduct = useSelector((state: { products: ProductState }) => state.products)
  const categories = useSelector(
    (state: { categories: CategoriesState }) => state.categories.categories
  )
 
  const [activeTab, setActiveTab] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchProducts()).then(() => dispatch(findProductById(Number(productId))))
    dispatch(fetchCategories())
  }, [productId, dispatch])

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId)
    return category ? category.name : ''
  }

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10)
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity)
    }
  }

  if (singleProduct.isLoading) {
    return <p>Loading...</p>
  }

  if (singleProduct.error) {
    return <p>{singleProduct.error}</p>
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: '20px', minHeight: '100%' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <img
              style={{ width: '100%' }}
              className="product-image"
              src={singleProduct.singleProduct.image}
              alt={singleProduct.singleProduct.name}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <p>Name :</p>
            <Typography variant="h4" gutterBottom>
              {singleProduct.singleProduct.name}
            </Typography>
            <p>Price :</p>
            <Typography variant="h4" gutterBottom>
              {singleProduct.singleProduct.price} $
            </Typography>
            <QuantityInput quantity={quantity} onQuantityChange={handleQuantityChange} />
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
              <Button
                variant="contained"
                startIcon={<AddShoppingCartIcon />}
                onClick={() => {
                  dispatch(addToCart({ ...singleProduct.singleProduct, quantity: quantity }))
                }}>
                ADD TO CART
              </Button>
              <IconButton color="primary">
                <FavoriteIcon />
              </IconButton>
            </div>
            <Divider />
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary">
              <Tab label="Description" />
              <Tab label="Reviews" />
            </Tabs>
            <TabPanel value={activeTab} index={0}>
              <Typography variant="h6">Description:</Typography>
              <Typography paragraph>{singleProduct.singleProduct.description}</Typography>
              {singleProduct.singleProduct.variants &&
                singleProduct.singleProduct.variants.length > 0 && (
                  <>
                    <Typography variant="h6">Variants:</Typography>
                    <Typography paragraph>
                      {singleProduct.singleProduct.variants.join(' , ')}
                    </Typography>
                  </>
                )}
              {singleProduct.singleProduct.sizes &&
                singleProduct.singleProduct.sizes.length > 0 && (
                  <>
                    <Typography variant="h6">Sizes:</Typography>
                    <Typography paragraph>
                      {singleProduct.singleProduct.sizes.join(' , ')}
                    </Typography>
                  </>
                )}
              {categories && categories.length > 0 && (
                <>
                  <Typography variant="h6">Categories:</Typography>
                  <Stack direction="row" spacing={1}>
                    {singleProduct.singleProduct.categories.map((categoryId) => (
                      <Chip
                        label={getCategoryName(categoryId)}
                        color="primary"
                        variant="outlined"
                        key={categoryId}
                      />
                    ))}
                  </Stack>
                </>
              )}
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
              <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <div className="review">
                  <Typography variant="subtitle2" color="textSecondary">
                    Amal
                  </Typography>
                  <Typography paragraph>Lacks bass but overall it's a Budget soundbar.</Typography>
                  <Rating name="read-only" value={3} readOnly />
                </div>
              </Paper>
              <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <div className="review">
                  <Typography variant="subtitle2" color="textSecondary">
                    Amani{' '}
                  </Typography>
                  <Typography paragraph>Good</Typography>
                  <Rating name="read-only" value={4} readOnly />
                </div>
              </Paper>
            </TabPanel>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  )
}

function TabPanel(props: { children: React.ReactNode; value: number; index: number }) {
  const { children, value, index } = props
  return <div hidden={value !== index}>{value === index && <Box p={3}>{children}</Box>}</div>
}

export default ProductDetails
