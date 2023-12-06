import { Grid, Typography, useMediaQuery } from '@mui/material'

const UserDashboard = () => {
  const isSmallScreen = useMediaQuery('(max-width:700px)')

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}>
      <Grid item>
        <Typography variant="h5" component="h5" color="primary">
          User Dashboard
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5" component="p" gutterBottom>
          {isSmallScreen ? 'Welcome' : 'Welcome back'}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default UserDashboard
