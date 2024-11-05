import DefaultBanner from '@/components/DefaultBanner'
import React from 'react'
import AboutPageFakes from "@/fakeDatas/AboutPageFakes"

const page = () => {
  const { bannerData: { backgroundImage, FakeTitle } } = AboutPageFakes;

  return (
    <>
     <div>
      <div>
        <DefaultBanner title={FakeTitle} backgroundImage={backgroundImage}/>
      </div>
     </div>
    </>
  )
}

export default page