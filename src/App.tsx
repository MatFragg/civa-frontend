import './App.css'
import { Footer } from './public/components/Footer'
import { Header } from './public/components/Header'
import { BusPage } from './ui/pages/BusPage'

function App() {

  return (
    <div className="min-h-screen bg-gray-200">
      <Header />
      <main className="flex-1">
        <BusPage />
      </main>
      <Footer />
    </div>
  )
}

export default App
