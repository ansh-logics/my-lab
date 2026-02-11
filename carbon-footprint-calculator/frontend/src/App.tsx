import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/contexts/AuthContext"
import Navbar from "@/components/Navbar"
import Home from "@/pages/Home"
import Calculate from "@/pages/Calculate"
import Login from "@/pages/Login"
import Profile from "@/pages/Profile"
import Result from "@/pages/Result"
import About from "@/pages/About"

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="w-full min-h-screen bg-background">
          <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculate" element={<Calculate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/result" element={<Result />} />
          <Route path="/about" element={<About />} />
        </Routes>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
