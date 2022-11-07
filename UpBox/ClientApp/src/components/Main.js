import React, { useEffect } from 'react'
import { AwesomeButton } from 'react-awesome-button'

import './Main.css'

export default function Main({ toggleIcon }) {
  useEffect(() => {
    toggleIcon(true)
  })
  return (
    <>
      <div className="learn-more">
        <p className="cloud-title">Cloud Computing</p>
        <p className="cloud-description" align="justify">
          Cloud computing is named as such because the information being
          accessed is found remotely in the cloud or a virtual space. Companies
          that provide cloud services enable users to store files and
          applications on remote servers and then access all the data via the
          Internet. This means the user is not required to be in a specific
          place to gain access to it, allowing the user to work remotely. Cloud
          computing takes all the heavy lifting involved in crunching and
          processing data away from the device you carry around or sit and work
          at. It also moves all of that work to huge computer clusters far away
          in cyberspace. The Internet becomes the cloud, and voilà—your data,
          work, and applications are available from any device with which you
          can connect to the Internet, anywhere in the world.Cloud computing can
          be both public and private. Public cloud services provide their
          services over the Internet for a fee. Private cloud services, on the
          other hand, only provide services to a certain number of people. These
          services are a system of networks that supply hosted services. There
          is also a hybrid option, which combines elements of both the public
          and private services.
        </p>
        <AwesomeButton
          className="aws"
          type="primary"
          href="https://www.investopedia.com/terms/c/cloud-computing.asp"
        >
          Learn More
        </AwesomeButton>
      </div>
      <div className="cloud-logo"></div>
    </>
  )
}
