import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Image, Card, Tooltip, Button, message, Result } from 'antd'
import FileDownload from 'js-file-download'

export default function Videos() {
  const [files, setFiles] = useState([])

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
            (f.name.toLowerCase().includes('mp4') ||
              f.name.toLowerCase().includes('avi') ||
              f.name.toLowerCase().includes('mov') ||
              f.name.toLowerCase().includes('flv')) &&
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
        <h4 className="header-text">Videos</h4>
        <Result title="No Videos Found!" style={{ marginTop: '15vh' }} />
      </>
    )
  }

  return (
    <>
      <h4 className="header-text">Videos</h4>
      <div className="image-container">
        <Image.PreviewGroup>
          {files.map((f) => {
            return (
              <Tooltip placement="bottom" title={f.name}>
                <Card
                  onMouseEnter={(e) => setHover(true)}
                  onMouseLeave={(e) => setHover(false)}
                  style={{
                    width: 200,
                    height: 200,
                    textAlign: 'center',
                  }}
                  hoverable
                  cover={
                    <video
                      style={{
                        height: 'auto',
                        maxHeight: 100,
                        width: 'auto',
                        maxWidth: 200,
                      }}
                      controls
                    >
                      <source
                        src={`${process.env.REACT_APP_API_URL}/Files/Video/${f.name}`}
                      />
                    </video>

                    // <Image
                    //   alt={f.name}
                    //   style={{
                    //     height: 'auto',
                    //     maxHeight: 100,
                    //     width: 'auto',
                    //     maxWidth: 200,
                    //   }}
                    //   src={`${process.env.REACT_APP_API_URL}/Files/Video/${f.name}`}
                    // />
                  }
                >
                  <Card.Meta title={f.name} />
                  <Button
                    type="primary"
                    size="small"
                    style={{ marginTop: 20, width: '100%' }}
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
