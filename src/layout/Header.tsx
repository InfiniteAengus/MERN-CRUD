import { useEthers, shortenAddress } from '@usedapp/core'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
} from '@mui/material'
import { Link } from 'react-router-dom'

const Header = () => {
  const { account, activate, deactivate } = useEthers()

  const handleConnect = async () => {
    const providerOptions = {
      injected: {
        display: {
          name: 'Metamask',
          description: 'Connect with the provider in your Browser',
        },
        package: null,
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          // infuraId: process.env.REACT_APP_INFURA_ID,
          infuraId: 'c1ba29d27c6b40779d9a00a8850d4f9e',
        },
      },
    }

    console.log(account)

    if (!account) {
      const web3Modal = new Web3Modal({
        providerOptions,
      })
      const provider = await web3Modal.connect()
      await activate(provider)
    }
  }

  console.log(account)

  return (
    <AppBar position='static' color='default'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}></Box>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to='/'>Home</Link>
            <Link to='/create'>Create</Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!account ? (
              <Button
                color='primary'
                variant='contained'
                onClick={handleConnect}
              >
                Connect
              </Button>
            ) : (
              <Button
                color='primary'
                variant='contained'
                onClick={() => deactivate()}
              >
                {shortenAddress(account)}
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
