import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './Home.scss'

import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import ViewItem from '../../components/ViewItem/ViewItem'

const Home = () => {
  const [item, setItem] = useState<any>()

  useEffect(() => {
    const fetch = async () => {
      const data = await axios.get('http://localhost:4000/item/')
      console.log(data)
      setItem(data)
    }
    fetch()
  }, [])
  return (
    <div className='home'>
      <Button
        variant='outlined'
        id='btn-add'
        onClick={() => (window.location.href = '/add-item')}
      >
        <AddIcon />
      </Button>
      <div className='d-flex'>
        {item &&
          item?.map((option: any, index: any) => (
            <ViewItem key={index} data={option} />
          ))}
      </div>
    </div>
  )
}

export default Home
