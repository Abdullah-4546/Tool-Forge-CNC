import React from 'react'
import Footer from '../components/common/Footer'

function ConditionalFooter() {
  return (
    <div>
        {
            window.location.pathname === 
            "/seller/dashboard" ||
             "/seller/dashboard/create-product" ? null : <Footer/>
        }
    </div>
  )
}

export default ConditionalFooter