import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { UI_COPY } from '../data/restaurantConfig';
import { CategoryId, Language } from '../types/menu';

interface HeaderProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  onSelectCategory: (cat: CategoryId) => void;
}

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
];

export const Header: React.FC<HeaderProps> = ({ lang, onChangeLang, onSelectCategory }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const copy = UI_COPY[lang].nav;

  const handleNavCategory = (cat: CategoryId) => {
    onSelectCategory(cat);
    setMobileOpen(false);
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E5DAC7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single-element Brand Lockup */}
        <a
          href="#top"
          className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A61C1E]"
        >
          <img
            src="/assets/aistudio/Logo_Ikaro_700b2d4c.png"
            alt="Logo Íkaro"
            referrerPolicy="no-referrer"
            className="h-10 w-10 sm:h-11 sm:w-11 object-contain mix-blend-multiply shrink-0"
          />
          <span className="font-display text-2xl sm:text-[1.7rem] font-semibold tracking-tight text-[#14110F]">
            Íkaro
          </span>
        </a>

        {/* Zone 2: 4 Single-Line Text Navigation Links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534E]"
        >
          <button
            type="button"
            onClick={() => handleNavCategory('all')}
            className="hover:text-[#14110F] hover:underline underline-offset-4 decoration-[#A61C1E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {copy.menu}
          </button>
          <button
            type="button"
            onClick={() => handleNavCategory('sharing')}
            className="hover:text-[#14110F] hover:underline underline-offset-4 decoration-[#A61C1E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {copy.sharing}
          </button>
          <button
            type="button"
            onClick={() => handleNavCategory('drinks')}
            className="hover:text-[#14110F] hover:underline underline-offset-4 decoration-[#A61C1E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {copy.drinks}
          </button>
          <a
            href="#location"
            className="hover:text-[#14110F] hover:underline underline-offset-4 decoration-[#A61C1E] transition-colors whitespace-nowrap shrink-0"
          >
            {copy.location}
          </a>
        </nav>

        {/* Zone 3: Language Switcher + 1 Primary Action */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div
            role="group"
            aria-label="Language selector"
            className="flex items-center p-0.5 bg-[#EFE8DC] rounded-lg border border-[#E2D8C8]"
          >
            {LANGUAGES.map((item) => {
              const active = lang === item.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => onChangeLang(item.code)}
                  aria-pressed={active}
                  className={`px-2 sm:px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#FFFFFF] text-[#14110F] shadow-xs'
                      : 'text-[#57534E] hover:text-[#14110F]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <a
            href="#location"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-[#A61C1E] hover:bg-[#8A1517] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            {copy.ctaDirections}
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#14110F] hover:bg-[#EFE8DC] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E5DAC7] bg-[#FAF7F2] px-4 py-3 space-y-1">
          <button
            type="button"
            onClick={() => handleNavCategory('all')}
            className="w-full text-left py-2.5 px-2 text-sm font-medium text-[#14110F] hover:bg-[#EFE8DC] rounded-md cursor-pointer"
          >
            {copy.menu}
          </button>
          <button
            type="button"
            onClick={() => handleNavCategory('sharing')}
            className="w-full text-left py-2.5 px-2 text-sm font-medium text-[#14110F] hover:bg-[#EFE8DC] rounded-md cursor-pointer"
          >
            {copy.sharing}
          </button>
          <button
            type="button"
            onClick={() => handleNavCategory('drinks')}
            className="w-full text-left py-2.5 px-2 text-sm font-medium text-[#14110F] hover:bg-[#EFE8DC] rounded-md cursor-pointer"
          >
            {copy.drinks}
          </button>
          <a
            href="#location"
            onClick={() => setMobileOpen(false)}
            className="block py-2.5 px-2 text-sm font-semibold text-[#A61C1E] hover:bg-[#EFE8DC] rounded-md"
          >
            {copy.ctaDirections} · {copy.location}
          </a>
        </div>
      )}
    </header>
  );
};
