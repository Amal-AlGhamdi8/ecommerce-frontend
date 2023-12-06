//Products.tsx
import { ChangeEvent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  ThemeProvider,
  Typography
} from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import theme from '../../styles/theme'

import { AppDispatch } from '../../redux/store'
import api from '../../api'
import {
  searchProducts,
  productsRequest,
  productsSuccess,
  ProductState,
  setPage
} from '../../redux/slices/products/productSlice'
import SortProducts from '../../components/products/products/SortProducts'
import { addToCart } from '../../redux/slices/cart/cartSlice'

function Products() {
  const dispatch = useDispatch<AppDispatch>()

  const products = useSelector((state: { products: ProductState }) => state.products)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      dispatch(productsRequest())

      try {
        const response = await api.get('/mock/e-commerce/products.json')

        dispatch(productsSuccess(response.data))
      } catch (error) {
        console.error('Error fetching products: ', error)
      }
    }

    fetchData()
  }, [dispatch])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target
    dispatch(searchProducts(value))
  }

  const filteredProducts = products.searchTerm
    ? products.products.filter((product) =>
        product.name.toLocaleLowerCase().includes(products.searchTerm.toLocaleLowerCase())
      )
    : products.products

  const { currentPage, itemsPerPage } = products
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredProducts
    .filter((product) =>
      product.name.toLocaleLowerCase().includes(products.searchTerm.toLocaleLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => {
    dispatch(setPage(pageNumber))
  }

  const numberOfPaginate = Math.ceil(filteredProducts.length / itemsPerPage)

  return (
    <ThemeProvider theme={theme}>
      <div className="productsPage" style={{ minHeight: '100%', padding: '20px' }}>
        <br />
        <br />
        <br />
        <h2>All Products</h2>
        <hr />
        <br />
        <div className="actions">
          <SortProducts />
          <input
            className="search-input"
            type="text"
            placeholder="Search by product name .."
            onChange={handleSearch}
            value={products.searchTerm}
          />
        </div>
        <Grid container spacing={3}>
          {currentItems.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
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
        <ul className="pagination">
          {Array.from({ length: numberOfPaginate }).map((_, index) => (
            <li
              key={index}
              className={currentPage === index + 1 ? 'active-page' : ''}
              onClick={() => paginate(index + 1)}>
              {index + 1}
            </li>
          ))}
        </ul>
      </div>
    </ThemeProvider>
  )
}

export default Products
