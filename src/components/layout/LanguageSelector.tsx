import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية (Arabic)' },
  { code: 'es', name: 'Español (Spanish)' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'pt', name: 'Português (Portuguese)' },
  { code: 'fr', name: 'Français (French)' },
  { code: 'nl', name: 'Nederlands (Dutch)' },
  { code: 'ru', name: 'Русский (Russian)' },
  { code: 'tr', name: 'Türkçe (Turkish)' },
  { code: 'fa', name: 'فارسی (Persian)' },
];

export const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);
    
    // Find the Google Translate combo box
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.lang-selector-container')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative lang-selector-container">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-200 hover:text-brand-green transition-colors p-2 rounded-full hover:bg-white/5"
        aria-label="Select Language"
      >
        <Globe className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-brand-dark border border-white/10 rounded-md shadow-lg py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors ${
                currentLang === lang.code ? 'text-brand-green' : 'text-gray-200'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
