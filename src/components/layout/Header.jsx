// src/components/layout/Header.jsx
import { Menu } from 'lucide-react'
import { Button } from '../ui/button'
import { ThemeToggle } from '../ui/theme-toggle'
import { LanguageSelector } from '../ui/language-selector'

export function Header({ setSidebarOpen }) {
  const handleMenuClick = () => {
    if (setSidebarOpen) {
      setSidebarOpen(true)
    }
  }

  return (
    <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur px-4 sm:px-6">

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleMenuClick}
        className="lg:hidden"
      >
        <Menu className="w-5 h-5" />
      </Button>

      <div className="flex-1" />

      {/* Language + Theme */}
      <div className="flex items-center gap-2">
        <LanguageSelector />
        <ThemeToggle />
      </div>
    </div>
  )
}