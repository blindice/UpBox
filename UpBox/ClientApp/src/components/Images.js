import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Image, Card, Tooltip, Button, message, Result } from 'antd'
import FileDownload from 'js-file-download'
import { useMediaQuery } from 'react-responsive'

import './Images.css'

export default function Images() {
  const [files, setFiles] = useState([])
  const isSmallScreen = useMediaQuery({ query: `(max-width: 1366px)` })

  const getAll = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'))
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/file/getall`,
        config,
      )

      setFiles(
        response.data.result.filter((f) => {
          return (
            (f.name.toLowerCase().includes('.apng') ||
              f.name.toLowerCase().includes('.avif') ||
              f.name.toLowerCase().includes('.gif') ||
              f.name.toLowerCase().includes('.jpg') ||
              f.name.toLowerCase().includes('.jpeg') ||
              f.name.toLowerCase().includes('.jfif') ||
              f.name.toLowerCase().includes('.pjpeg') ||
              f.name.toLowerCase().includes('.pjp') ||
              f.name.toLowerCase().includes('.png') ||
              f.name.toLowerCase().includes('.svg') ||
              f.name.toLowerCase().includes('.webp')) &&
            !f.isDeleted
          )
        }),
      )
    } catch (err) {
      console.log(err)
    }
  }

  const downloadFile = async (fileName) => {
    const token = JSON.parse(localStorage.getItem('token'))
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob', // Important
    }
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/file/download?filename=${fileName}`,
        config,
      )
      .then((response) => {
        FileDownload(response.data, fileName)
      })
      .catch((err) => message.error('Something went wrong 😭', 5))
  }

  useEffect(() => {
    getAll()
  }, [])

  if (files.length === 0) {
    return (
      <>
        <h4 className="header-text">Images</h4>
        <Result title="No Images Found!" style={{ marginTop: '15vh' }} />
      </>
    )
  }

  return (
    <>
      <h4 className="header-text">Images</h4>
      <div className="image-container">
        <Image.PreviewGroup>
          {files.map((f) => {
            return (
              <Tooltip placement="bottom" title={f.name}>
                <Card
                  style={
                    isSmallScreen
                      ? {
                          width: 200,
                          height: 170,
                          textAlign: 'center',
                        }
                      : {
                          width: 200,
                          height: 200,
                          textAlign: 'center',
                        }
                  }
                  hoverable
                  cover={
                    <Image
                      alt={f.name}
                      style={
                        isSmallScreen
                          ? {
                              height: 'auto',
                              maxHeight: 100,
                              width: 'auto',
                              maxWidth: 100,
                            }
                          : {
                              height: 'auto',
                              maxHeight: 100,
                              width: 'auto',
                              maxWidth: 200,
                            }
                      }
                      src={`${process.env.REACT_APP_API_URL}/Files/Image/${f.name}`}
                    />
                  }
                >
                  <Card.Meta title={f.name} />
                  <Button
                    type="primary"
                    size="small"
                    style={
                      isSmallScreen
                        ? {
                            marginTop: 20,
                            width: '80%',
                            position: 'absolute',
                            left: '20px',
                            bottom: '10px',
                          }
                        : {
                            marginTop: 20,
                            width: '80%',
                            position: 'absolute',
                            left: '20px',
                            bottom: '10px',
                          }
                    }
                    onClick={() => downloadFile(f.name)}
                  >
                    Download
                  </Button>
                </Card>
              </Tooltip>
            )
          })}
        </Image.PreviewGroup>
      </div>
    </>
  )
}
