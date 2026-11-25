/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LocationAndFooter } from './components/LocationAndFooter';
import { MenuExplorer } from './components/MenuExplorer';
import { SelectionDrawer } from './components/SelectionDrawer';
import { RESTAURANT_CONFIG } from './data/restaurantConfig';
import { CategoryId, Language, MenuTag } from './types/menu';

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [activeTag, setActiveTag] = useState<MenuTag | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selection, setSelection] = useState<Record<string, number>>({});

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `${RESTAURANT_CONFIG.fullTitle[lang]} | Viña del Mar`;
  }, [lang]);

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setSelection((prev) => {
      const nextQty = Math.max(0, (prev[itemId] ?? 0) + delta);
      if (nextQty === 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: nextQty };
    });
  };

  const handleClearAll = () => {
    setSelection({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#14110F]">
      <Header
        lang={lang}
        onChangeLang={setLang}
        onSelectCategory={setActiveCategory}
      />

      <main className="flex-1">
        <Hero lang={lang} onExploreCategory={setActiveCategory} />

        <MenuExplorer
          lang={lang}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          activeTag={activeTag}
          onSelectTag={setActiveTag}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selection={selection}
          onUpdateQuantity={handleUpdateQuantity}
        />

        <LocationAndFooter lang={lang} onSelectCategory={setActiveCategory} />
      </main>

      <SelectionDrawer
        lang={lang}
        selection={selection}
        onUpdateQuantity={handleUpdateQuantity}
        onClearAll={handleClearAll}
      />
    </div>
  );
}
