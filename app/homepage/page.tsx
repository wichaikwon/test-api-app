'use client'
import React, { Fragment } from 'react'
import EstimateSection from '@/app/components/homepageSection/EstimateSection'
import InfoSection from '@/app/components/homepageSection/InfoSection'
import WhyChooseUsSection from '@/app/components/homepageSection/WhyChooseUsSection'
import SellGoodsSection from '@/app/components/homepageSection/SellGoodsSection'
import FooterSection from '@/app/components/homepageSection/FooterSection'
import FaqSection from '@/app/components/homepageSection/FaqSection'

const Homepage: React.FC = () => {
  return (
    <Fragment>
      <EstimateSection />
      <InfoSection />
      <WhyChooseUsSection />
      <SellGoodsSection />
      <FaqSection />
      <FooterSection />
    </Fragment>
  )
}

export default Homepage
