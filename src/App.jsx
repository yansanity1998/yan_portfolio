import Header from './Portfolio/Header'
import Content from './Portfolio/Content'
import Footer from './Portfolio/Footer'
import Snowfall from 'react-snowfall'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] relative">
      {/* Snowfall Effect */}
      <Snowfall
        color="white"
        snowflakeCount={150}
        wind={[-0.2, 0.5]}
        radius={[0.5, 3]}
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
