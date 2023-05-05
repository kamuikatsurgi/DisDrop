import React from 'react'
import CreateDisDropSection from '../components/CreateDisdropSection'
import HeaderComponent from '../components/HeaderComponent'

function Dashboard() {
  return (
    <div className='h-screen bg-black'>
        <HeaderComponent />
        <CreateDisDropSection />
    </div>
  )
}

export default Dashboard