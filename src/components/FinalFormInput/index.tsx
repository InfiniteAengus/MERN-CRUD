import { TextField } from '@mui/material'
import React from 'react'

interface Props {
  component?: 'input' | 'textarea' | 'select'
  input: any
  meta: any
  label?: string
  id?: string
  options?: any
  pipe?: (value: string) => string
}

const FinalFormInput: React.FC<
  Props & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  component = 'input',
  input,
  meta,
  label,
  id,
  pipe,
  options,
  ...props
}) => {
  const hasError = (meta.error || meta.submitError) && meta.touched
  // const isValid = meta.valid && meta.touched

  return (
    <TextField
      id={id}
      label={label}
      autoComplete='off'
      {...input}
      error={hasError}
      helperText={hasError ? meta.error : ''}
    />
  )
}

export default FinalFormInput
