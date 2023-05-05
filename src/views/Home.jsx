import React from 'react'
import HeaderComponent from '../components/HeaderComponent'
import HeroSectionComponent from '../components/HeroSectionComponent'
import FeatureSectionComponent from '../components/FeaturesSectionComponent'
import LiveParticlesBackground from '../components/LiveParticlesBackground'

function Home() {
  return (
    <div>
        <LiveParticlesBackground />
        <HeaderComponent />
        <HeroSectionComponent />
        <FeatureSectionComponent />
    </div>
  )
}

export default Home