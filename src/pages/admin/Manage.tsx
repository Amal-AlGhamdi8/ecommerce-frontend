import { Link } from 'react-router-dom'

import { Box, Button, Grid, Paper } from '@mui/material'

import productsImage from '../../images/ManageProducts.png'
import categoriesImage from '../../images/ManageCategories.jpg'

const imageStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '2px solid black',
  padding: '10px',
  borderRadius: '5px',
  boxShadow: '2px 2px 5px 0px #000000',
  background: 'white'
}

const titleStyle = {
  marginTop: 'auto',
  fontSize: '20px',
  fontWeight: 'bold',
  color: 'black'
}

const Manage = () => {
  return (
    <Box paddingTop={10} paddingBottom={2} style={{ minHeight: '100%' }}>
      <div style={{ minHeight: '100%' }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3}>
              <Link to="/dashboard/Admin/ManageProducts">
                <Button component="div" sx={imageStyle}>
                  <img
                    src={productsImage}
                    alt="Manage Products"
                    style={{ width: '300px', height: '300px' }}
                  />
                  <div style={titleStyle}>Manage Products</div>
                </Button>
              </Link>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3}>
              <Link to="/dashboard/Admin/ManageCategories">
                <Button component="div" sx={imageStyle}>
                  <img
                    src={categoriesImage}
                    alt="Manage Categories"
                    style={{ width: '300px', height: '300px' }}
                  />
                  <div style={titleStyle}>Manage Categories</div>
                </Button>
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Box>
  )
}

export default Manage
