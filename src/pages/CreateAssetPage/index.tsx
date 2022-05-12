import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

const CreateAssetPage = () => {
  const navigate = useNavigate()

  const { account } = useEthers()

  const [file, setFile] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)

  const onChange = (val: any) => {}

  const createAsset = async (values: any) => {
    if (!account) {
      return
    }

    setLoading(true)
    try {
      const res: any = await uploadFileToIPFS(file.file)

      if (res.success) {
        await api.post('/asset', {
          image_url: res.pinataUrl,
          ...values,
          creator: account,
        })

        navigate('/')
      }

      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  const onNextClick = (errors: any, formData: any) => {}

  return (
    <Paper elevation={4}>
      <Box padding={3}>
        <Form
          onSubmit={(val) => createAsset(val)}
          render={({ handleSubmit, errors, values }) => (
            <form autoComplete='off' onSubmit={handleSubmit}>
              <FormSpy subscription={{ values: true }} onChange={onChange} />
              <Typography variant='h4' textAlign='center'>
                Create your own Asset
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
                        render={(props) => <FinalFormInput {...props} />}
                      />

                      <Button
                        variant='contained'
                        type='submit'
                        onClick={() => onNextClick(errors, values)}
                      >
                        Create Asset
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

export default CreateAssetPage
