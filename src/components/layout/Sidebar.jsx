// src/components/layout/Sidebar.jsx
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import {
  X,
  GraduationCap,
  ChevronRight,
  User,
  LogOut
} from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '@/utils/helpers'
import { useTranslation } from 'react-i18next'

export function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  filteredNavigation,
  user,
  handleLogout
}) {
  const { t } = useTranslation()
  const location = useLocation()

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 40 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 40 } }
  }

  const overlayVariants = { open: { opacity: 1 }, closed: { opacity: 0 } }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-card border-r shadow-sm">
          
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SchoolMS
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {filteredNavigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 transition-transform duration-200",
                      isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground",
                      "group-hover:scale-110"
                    )}
                  />
                  <span>{item.name}</span>

                  {isActive && (
                    <motion.div layoutId="activeIndicator" className="ml-auto">
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User Menu */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-3 p-2 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
              >
                <User className="w-4 h-4" />
                {t('nav.profile')}
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md w-full text-left"
              >
                <LogOut className="w-4 h-4" />
                {t('nav.logout')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />

            <motion.div
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-y-0 left-0 z-50 w-64 bg-card shadow-xl lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between h-16 px-4 border-b">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-blue-500" />
                    <span className="text-xl font-bold">SchoolMS</span>
                  </div>

                  <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                  {filteredNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent"
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Bottom User Section */}
                <div className="p-4 border-t">
                  <div className="flex items-center gap-3 p-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-2 py-1.5 text-sm w-full text-left text-muted-foreground hover:bg-accent rounded-md"
                  >
                    <LogOut className="w-4 h-4" />
                    {t('nav.logout')}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
