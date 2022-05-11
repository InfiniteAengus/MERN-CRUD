import React from 'react'
import TextField from '@mui/material/TextField'

const ViewItem = ({ data }) => {
  return (
    <div className='view-item d-flex justify-content-center'>
      <img src={data.image_url} alt='item image' />
      <div className='d-flex flex-column'>
        <TextField
          id='outlined-read-only-input'
          label='Title'
          value={data.title}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id='outlined-multiline-static'
          label='Multiline'
          value={data.description}
          multiline
          rows={4}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
    </div>
  )
}

export default ViewItem
