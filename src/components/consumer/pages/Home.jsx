import React from 'react'
import Banner from '../../common/Banner'
import ProductCategories from '../home/ProductCategory'
import DisplayProducts from '../home/DisplayProduct'

function Home() {
  return (
    <>
      <Banner/>
      <ProductCategories/>
      <DisplayProducts/>
    </>
  )
}

export default Home