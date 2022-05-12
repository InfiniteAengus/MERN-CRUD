import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEthers } from '@usedapp/core'
import { Form, Field, FormSpy } from 'react-final-form'
import {
  Paper,
  Stack,
  Box,
  Button,
  Typography,
  Grid,
  Backdrop,
  CircularProgress,
} from '@mui/material'

import FinalFormInput from 'components/FinalFormInput'
import Dropzone from 'components/Dropzone'

import api from 'utils/api'
import { required } from 'utils/validator'
import { uploadFileToIPFS } from 'utils/pinata'

const EditAssetPage = () => {
  const navigate = useNavigate()

  const { account } = useEthers()

  const [asset, setAsset] = useState<any>({})
  const [file, setFile] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)

  const { id } = useParams()

  const onChange = (val: any) => {}

  const createAsset = async (values: any) => {
    if (!account) {
      return
    }

    setLoading(true)
    try {
      let res: any = undefined
      if (file) {
        res = await uploadFileToIPFS(file.file)
      }

      await api.put(`/asset/${asset.id}`, {
        image_url: res ? res?.pinataUrl : asset.image_url,
        ...values,
        creator: account,
      })

      navigate('/')

      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  const onNextClick = (errors: any, formData: any) => {}

  useEffect(() => {
    const fetchAsset = async (index: string) => {
      try {
        const res = await api.get(`/asset/${index}`)
        setAsset(res)
      } catch {}
    }

    if (id) {
      fetchAsset(id)
    }
  }, [id])

  return (
    <Paper elevation={4}>
      <Box padding={3}>
        <Form
          onSubmit={(val) => createAsset(val)}
          render={({ handleSubmit, errors, values }) => (
            <form autoComplete='off' onSubmit={handleSubmit}>
              <FormSpy subscription={{ values: true }} onChange={onChange} />
              <Typography variant='h4' textAlign='center'>
                Edit Asset
              </Typography>
              <Box>
                <Grid container spacing={2} alignItems='center'>
                  <Grid item md={6} sm={12} xs={12}>
                    <Typography>Asset Image</Typography>
                    <Dropzone
                      acceptType={{ 'image/*': [] }}
                      setFile={(f: any, type: any) => {
                        setFile({ file: f, type: type })
                      }}
                      defaultRes={{ link: asset.image_url }}
                    />
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <Stack spacing={2}>
                      <Typography>Name</Typography>
                      <Field
                        name='title'
                        label='Name'
                        placeholder='Name'
                        validate={required}
                        defaultValue={asset.title}
                        render={(props) => <FinalFormInput {...props} />}
                      />

                      <Typography>Description</Typography>
                      <Field
                        name='description'
                        label='Description'
                        placeholder='Description'
                        multiline={true}
                        maxRows={4}
                        validate={required}
                        defaultValue={asset.description}
                        render={(props) => <FinalFormInput {...props} />}
                      />

                      <Button
                        variant='contained'
                        type='submit'
                        onClick={() => onNextClick(errors, values)}
                      >
                        Update Asset
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </form>
          )}
        />
      </Box>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </Paper>
  )
}

export default EditAssetPage
