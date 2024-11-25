import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='bg-black'>
      <div className='container max-w-7xl mx-auto'>
        <Navbar />
        <div>
            <Outlet />
        </div>
        <Footer />
    </div>
    </div>
  )
}

export default MainLayout