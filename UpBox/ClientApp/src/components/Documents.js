import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Image, Card, Tooltip, Button, message, Result } from 'antd'
import FileDownload from 'js-file-download'

export default function Documents() {
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
            (f.name.toLowerCase().includes('pdf') ||
              f.name.toLowerCase().includes('doc') ||
              f.name.toLowerCase().includes('docx') ||
              f.name.toLowerCase().includes('html') ||
              f.name.toLowerCase().includes('htm') ||
              f.name.toLowerCase().includes('xls') ||
              f.name.toLowerCase().includes('xlsx') ||
              f.name.toLowerCase().includes('txt') ||
              f.name.toLowerCase().includes('ppt') ||
              f.name.toLowerCase().includes('pptx') ||
              f.name.toLowerCase().includes('key') ||
              f.name.toLowerCase().includes('csv') ||
              f.name.toLowerCase().includes('odp')) &&
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
        <h4 className="header-text">Documents</h4>
        <Result title="No Document Found!" style={{ marginTop: '15vh' }} />
      </>
    )
  }

  return (
    <>
      <h4 className="header-text">Documents</h4>
      <div className="image-container">
        {files.map((f) => {
          return (
            <Tooltip placement="bottom" title={f.name}>
              <Card
                style={{
                  width: 200,
                  height: 200,
                  textAlign: 'center',
                }}
                hoverable
                cover={
                  <img
                    alt={f.name}
                    src={
                      f.name.includes('.pdf')
                        ? '/images/pdf.png'
                        : f.name.includes('.doc') || f.name.includes('.docx')
                        ? '/images/doc.png'
                        : f.name.includes('.htm') || f.name.includes('.html')
                        ? '/images/html.png'
                        : f.name.includes('.xls') || f.name.includes('.xlsx')
                        ? '/images/xls.png'
                        : f.name.includes('.ppt') || f.name.includes('.pptx')
                        ? '/images/ppt.png'
                        : f.name.includes('.txt')
                        ? '/images/txt.png'
                        : f.name.includes('.csv')
                        ? '/images/csv.png'
                        : ''
                    }
                    style={{
                      height: 'auto',
                      maxHeight: 100,
                      width: 'auto',
                      maxWidth: 200,
                      marginLeft: '25%',
                    }}
                  ></img>
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
      </div>
    </>
  )
}
