import React, { useEffect, useState } from 'react'
import { Grid, Box, Typography } from '@mui/material'

import AssetItem from 'components/AssetItem'

import api from 'utils/api'

const ExplorePage = () => {
  const [assets, setAssets] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await api.get('/asset')

        setAssets(res || [])
      } catch {}
    }

    fetchData()
  }, [])

  return (
    <>
      <Typography variant='h4'>Explore Assets</Typography>
      <Box marginTop={3}>
        <Grid container spacing={2}>
          {assets.map((asset, ind) => (
            <Grid item key={ind} lg={3} md={4} sm={6} xs={12}>
              <AssetItem {...asset} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}

export default ExplorePage
