import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEthers } from '@usedapp/core'
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
  Avatar,
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { shortenAddress } from '@usedapp/core'
import api from 'utils/api'

interface Props {
  id: string
  image_url: string
  title: string
  description: string
  creator: string
}

const AssetItem: React.FC<Props> = (props) => {
  const navigate = useNavigate()
  const { account } = useEthers()

  const handleRemoveItem = async () => {
    try {
      await api.del(`/asset/${props.id}`)
      navigate(0)
    } catch {}
  }

  return (
    <Card>
      <CardHeader
        avatar={<Avatar></Avatar>}
        title={'Creator'}
        subheader={shortenAddress(props.creator)}
        action={
          account === props.creator && (
            <>
              {' '}
              <IconButton
                onClick={() => {
                  navigate(`/edit/${props.id}`)
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleRemoveItem()
                }}
              >
                <DeleteIcon />
              </IconButton>{' '}
            </>
          )
        }
      />
      <CardMedia
        component='img'
        image={props.image_url}
        height='194'
        alt='asset-img'
      />
      <CardContent>
        <Typography sx={{ fontWeight: 'bold' }}>{props.title}</Typography>
        <Typography>{props.description}</Typography>
      </CardContent>
    </Card>
  )
}

export default AssetItem
