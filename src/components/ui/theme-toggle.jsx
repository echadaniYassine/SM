import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "@/contexts/ThemeContext"

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className="relative overflow-hidden">
      <Sun className={cn("h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300", theme === 'dark' && "-rotate-90 scale-0")} />
      <Moon className={cn("absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300", theme === 'dark' && "rotate-0 scale-100")} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}