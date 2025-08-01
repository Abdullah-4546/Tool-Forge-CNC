import React from 'react'
import Navbar from '../components/common/Navbar'

function ConditionalNavbar() {
  return (
    <div>
        {
            window.location.pathname === "/seller/dashboard" || "/seller/dashboard/create-product" ? null : <Navbar/>
        }
    </div>
  )
}

export default ConditionalNavbar