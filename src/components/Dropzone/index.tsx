import React, { useCallback, useState, useEffect } from 'react'
import { Accept, useDropzone } from 'react-dropzone'

import styles from './style.module.scss'

interface Props {
  acceptType: Accept | undefined
  setFile: any
  defaultRes?: any
}

const Dropzone: React.FC<Props> = (props) => {
  const { acceptType, setFile, defaultRes } = props

  const [fileType, setFileType] = useState(defaultRes?.type || 0)

  const useDisplayImage = () => {
    const [result, setResult] = useState('')

    const uploader = (e: any) => {
      const imageFile = e

      const reader = new FileReader()
      reader.addEventListener('load', (e: any) => {
        setResult(e.target.result)
      })

      reader.readAsDataURL(imageFile)
    }

    return { result, uploader }
  }

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: any) => {
      uploader(file)
    })
  }, []) //eslint-disable-line

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: acceptType,
  })

  const { result, uploader } = useDisplayImage()

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      let type = 0
      if (acceptedFiles[0].type.indexOf('image') !== -1) {
        type = 0
      } else if (acceptedFiles[0].type.indexOf('video') !== -1) {
        type = 1
      } else if (acceptedFiles[0].type.indexOf('audio') !== -1) {
        type = 2
      }

      setFileType(type)
      setFile(acceptedFiles[0], type)
    } else {
      setFileType(0)
    }
  }, [acceptedFiles]) //eslint-disable-line

  useEffect(() => {
    setFileType(defaultRes?.type || 0)
  }, [defaultRes])

  return (
    <div {...getRootProps()} className={styles.dropZone}>
      <input {...getInputProps()} />
      {fileType === 0 ? (
        <img
          src={result || defaultRes?.link || '/images/img_error.png'}
          alt='placeholder'
        />
      ) : (
        <video src={result || defaultRes?.link} width='100%' controls />
      )}
    </div>
  )
}

export default Dropzone
