'use client'
import React, { Fragment } from 'react'
import EstimateSection from '../components/EstimateSection'
import InfoSection from '../components/InfoSection'
import WhyChooseUsSection from '../components/WhyChooseUsSection'
import SellGoodsSection from '../components/SellGoodsSection'
import FooterSection from '../components/FooterSection'

const Homepage: React.FC = () => {
  return (
    <Fragment>
      <EstimateSection />
      <InfoSection />
      <WhyChooseUsSection />
      <SellGoodsSection />
      <FooterSection />
    </Fragment>
  )
}

export default Homepage
