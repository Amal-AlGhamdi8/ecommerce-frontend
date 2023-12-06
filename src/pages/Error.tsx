import Typography from '@mui/material/Typography'

const Error = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}>
      <Typography variant="h1" component="h2" color="error">
        404
      </Typography>
      <Typography variant="h6" component="p" gutterBottom>
        Oops! Page not found.
      </Typography>
    </div>
  )
}

export default Error
