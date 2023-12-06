import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#141e46', // Set the primary color for the "Add to Cart" button
    },
    secondary: {
      main: '#001f4d', // Set the secondary color for the "Favorite" button
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#141e46', 
          color: 'white', // "Add to Cart" button 
          '&:hover': {
            backgroundColor: '#480048', 
            color: 'white', 
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#B2BEB5', // icon color for the "Favorite" button
          
          '&:hover': {
            color: '#c04848', 
          },
        },
      },
    },
  },
});

export default theme;

