import React from 'react'
import './index.css'
import FeaturedProjects from './sub-components/featured-projects/FeaturedProjects'
import TopProjects from './sub-components/albion-top-projects/TopProjects'
import RecommendedProperty from './sub-components/recommended-property/RecommendedProperty'
import NewProjects from './sub-components/new-projects/NewProjects'
import Steps from './sub-components/how-we-operate/Steps'
import Footer from '../../../footer/Footer'

const OurProjects = () => {
  return (
    <div className='our-projects_mainpg'>
      <FeaturedProjects/>
      <TopProjects/>
      <RecommendedProperty/>
      <NewProjects/>
      <Steps/>
    </div>
  )
}

export default OurProjects