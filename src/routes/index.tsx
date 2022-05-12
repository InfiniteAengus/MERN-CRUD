import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Rinkeby, DAppProvider } from '@usedapp/core'

import MainLayout from '../layout/MainLayout'
import EditAssetPage from 'pages/EditAssetPage'

const CreateAssetPage = lazy(() => import('../pages/CreateAssetPage'))
const ExplorePage = lazy(() => import('../pages/ExplorePage'))

const config = {
  readOnlyChainId: Rinkeby.chainId,
  readOnlyUrls: {
    // [Mainnet.chainId]: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`,
    [Rinkeby.chainId]: `https://rinkeby.infura.io/v3/c1ba29d27c6b40779d9a00a8850d4f9e`,
  },
}

const AppRoutes = () => {
  return (
    <DAppProvider config={config}>
      <MainLayout>
        <Routes>
          <Route path='/create' element={<CreateAssetPage />} />
          <Route path='/edit/:id' element={<EditAssetPage />} />
          <Route path='/' element={<ExplorePage />} />
          {/* <Route component={ErrorPage} /> */}
        </Routes>
      </MainLayout>
    </DAppProvider>
  )
}

export default AppRoutes
