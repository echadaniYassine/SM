import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"

export default function LanguageSelector() {
  const { i18n } = useTranslation()

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => changeLanguage("en")}
      >
        EN
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => changeLanguage("fr")}
      >
        FR
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => changeLanguage("ar")}
      >
        AR
      </Button>
    </div>
  )
}
