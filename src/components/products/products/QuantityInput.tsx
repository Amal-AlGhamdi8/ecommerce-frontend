import React, { ChangeEvent } from 'react'

import { TextField } from '@mui/material'

type QuantityInputProps = {
  quantity: number
  onQuantityChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const QuantityInput: React.FC<QuantityInputProps> = ({ quantity, onQuantityChange }) => {
  return (
    <TextField
      type="number"
      variant="outlined"
      InputProps={{ inputProps: { min: 1 } }}
      value={quantity}
      onChange={onQuantityChange}
    />
  )
}

export default QuantityInput
