import { useState, useEffect } from 'react'
import Header from './Portfolio/Header'
import Content from './Portfolio/Content'
import Footer from './Portfolio/Footer'
import Snowfall from 'react-snowfall'
import './App.css'


function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0b] relative">
      {/* Snowfall Effect */}
      <Snowfall
        color="white"
        snowflakeCount={isMobile ? 20 : 100}
        wind={[-0.2, 0.5]}
        radius={isMobile ? [0.5, 2] : [0.5, 3]}
        speed={[0.2, 1]}
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex: 50,
          pointerEvents: 'none'
        }}
      />

      <Header />
      <Content />
      <Footer />
    </div>
  )
}

export default App
