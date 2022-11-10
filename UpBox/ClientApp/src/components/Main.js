import React, { useEffect } from 'react'
import { AwesomeButton } from 'react-awesome-button'
import { useHistory } from 'react-router-dom'

import './Main.css'

export default function Main({ toggleIcon }) {
  const history = useHistory()
  useEffect(() => {
    toggleIcon(true)
  })
  return (
    <>
      <div className="learn-more">
        <p className="cloud-title">Cloud Computing</p>
        <p className="cloud-description" align="justify">
          Cloud computing permits customers to store their data in a remote
          location. However, data security is the most significant risk in cloud
          computing. Due to this, many businesses are hesitant to use cloud
          environments. To combat this, a CSP's Service-Level Agreement (SLA)
          with its customers should include provisions for 14 confidentiality,
          integrity, and availability. If not, verify that important information
          is not stored in a public cloud, and if it is, that it is encrypted.
          Effective auditing procedures may also be utilized to ensure data
          integrity.
        </p>
        <AwesomeButton
          className="aws"
          type="primary"
          href="https://www.investopedia.com/terms/c/cloud-computing.asp"
          onPress={() => history.push('/info')}
        >
          Learn More
        </AwesomeButton>
      </div>
      <div className="cloud-logo"></div>
    </>
  )
}
