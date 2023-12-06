// SortProducts.tsx
import React from 'react'
import { useDispatch } from 'react-redux'

import { sortProducts } from '../../../redux/slices/products/productSlice'

import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { SelectChangeEvent } from '@mui/material/Select'

const SortProducts = () => {
  const dispatch = useDispatch()
  const [selectedOption, setSelectedOption] = React.useState('')

  const handleOptionChange = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value as string)
    dispatch(sortProducts(event.target.value as string))
  }

  return (
    <Box sx={{ minWidth: 120 }} className="sort-container">
      <FormControl fullWidth>
        <InputLabel id="sort-label">Sort By:</InputLabel>
        <Select
          labelId="sort-label"
          id="sort"
          value={selectedOption}
          label="Sort By"
          onChange={handleOptionChange}>
          <MenuItem value="DescendingPrice">Price: High - Low</MenuItem>
          <MenuItem value="AscendingPrice">Price: Low - High</MenuItem>
          <MenuItem value="A-Z">Name: A - Z</MenuItem>
          <MenuItem value="Z-A">Name: Z - A</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default SortProducts
