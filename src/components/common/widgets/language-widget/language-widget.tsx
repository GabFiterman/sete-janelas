import { useTranslation } from 'react-i18next';
import './language-widget.scss';

export function LanguageWidget() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'pt-BR' ? 'en-US' : 'pt-BR';
    i18n.changeLanguage(nextLang);
  };

  const displayLang = i18n.language === 'pt-BR' ? 'PT' : 'EN';

  return (
    <div className="language-widget" onClick={toggleLanguage} title="Alternar idioma">
      {displayLang}
    </div>
  );
}

export default LanguageWidget;
