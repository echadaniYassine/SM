import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Globe } from 'lucide-react'
import { cn } from "@/lib/utils"

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦' },
  ];
  return (
    <div className="relative group">
      <Button variant="outline" size="icon" className="relative"><Globe className="h-[1.2rem] w-[1.2rem]" /></Button>
      <div className="absolute right-0 top-full mt-2 w-48 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-1">
          {languages.map((lang) => (
            <button key={lang.code} onClick={() => i18n.changeLanguage(lang.code)} className={cn("w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground flex items-center gap-2", i18n.language === lang.code && "bg-accent text-accent-foreground")}>
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}