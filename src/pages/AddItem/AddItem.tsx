import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import axios from 'axios'

import MDropzone from '../../components/MDropzone'
import Button from '@mui/material/Button'
import { uploadFileToIPFS } from '../../utils'
import './AddItem.scss'

const AddItem = () => {
  const [path, setPath] = useState<any>()
  const [title, setTitle] = useState<String>('')
  const [description, setDescription] = useState<String>('')

  const saveItem = async () => {
    //Upload Image to IPFS
    const resp = await uploadFileToIPFS(path)

    await axios.post('http://localhost:4000/item/', {
      image_url: resp.pinataUrl,
      title: title,
      description: description,
    })
    window.location.href = '/'
  }

  return (
    <div className='add-item d-flex justify-content-center align-items-center mt-5 p-3'>
      {/* <MDropzone
        acceptType='image/*'
        setFile={(f, type) => {
          setWelcomeFile(f)
        }}
        defaultRes={{ link: settings.welcomeImage, type: 0 }}
      /> */}
      <input
        type='file'
        id='path'
        name='path'
        onChange={(e) => setPath(e.target.files?.[0])}
      />
      <div className='d-flex flex-column'>
        <TextField
          id='outlined-basic'
          label='Title'
          variant='outlined'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='my-2'
        />
        <TextField
          id='outlined-multiline-static'
          label='Description'
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='my-2'
        />
        <Button variant='outlined' onClick={saveItem} className='my-2'>
          Add Item
        </Button>
      </div>
    </div>
  )
}

export default AddItem
