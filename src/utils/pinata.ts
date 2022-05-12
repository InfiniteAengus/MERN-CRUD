import axios from 'axios'
const pinata_gateway_url = `https://gateway.pinata.cloud/ipfs/`

export const uploadFileToIPFS = async (file: any) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`

  let data: any = new FormData()

  data.append('file', file)

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
    customPinPolicy: {
      regions: [
        {
          id: 'FRA1',
          desiredReplicationCount: 1,
        },
        {
          id: 'NYC1',
          desiredReplicationCount: 2,
        },
      ],
    },
  })

  data.append('pinataOptions', pinataOptions)

  try {
    const response = await axios.post(url, data, {
      maxBodyLength: Infinity, //this is needed to prevent axios from erroring out with large files
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: process.env.REACT_APP_PINATA_API_KEY || '',
        pinata_secret_api_key:
          process.env.REACT_APP_PINATA_SECRECT_API_KEY || '',
      },
    })
    return {
      success: true,
      pinataUrl: pinata_gateway_url + response.data.IpfsHash,
    }
  } catch (err: any) {
    return {
      success: false,
      status: 'Something went wrong: ' + err.message,
    }
  }
}
