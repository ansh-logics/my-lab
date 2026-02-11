import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isLoggedIn, logout } = useAuth()

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/calculate", label: "Calculator" },
    { path: "/about", label: "About Us" },
  ]

  const handleLogout = () => {
    logout()
    navigate("/login")
    setIsMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">CFC</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/profile">
                <Button variant="ghost" size="sm">
                  Profile
                </Button>
              </Link>
              <Button variant="default" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="default" size="sm">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t w-full">
          <div className="w-full max-w-7xl mx-auto flex flex-col space-y-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Button variant="default" size="sm" className="w-full" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login" className="px-3 py-2" onClick={() => setIsMenuOpen(false)}>
                <Button variant="default" size="sm" className="w-full">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
