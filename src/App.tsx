import React, { Suspense } from 'react'

import AppRoutes from './routes'

const App = () => {
  return (
    <Suspense fallback={null}>
      <AppRoutes />
    </Suspense>
  )
}

export default App
