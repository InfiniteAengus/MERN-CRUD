import { Container, Box } from '@mui/material'
import Header from './Header'

interface Props {
  children: React.ReactElement | null
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <Container sx={{ minHeight: 'calc(100vh - 64px)' }}>
        <Box padding={5}>{children}</Box>
      </Container>
    </>
  )
}

export default MainLayout
