import React, { useMemo, useState } from 'react';
import {
  Camera,
  Flame,
  Leaf,
  Minus,
  Plus,
  Search,
  Shell,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { formatCLP, getText, UI_COPY } from '../data/restaurantConfig';
import { CategoryId, Language, MenuItem, MenuTag } from '../types/menu';

interface MenuExplorerProps {
  lang: Language;
  activeCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  activeTag: MenuTag | 'all';
  onSelectTag: (tag: MenuTag | 'all') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selection: Record<string, number>;
  onUpdateQuantity: (itemId: string, delta: number) => void;
}

const PHOTO_BG_CLASSES = {
  rocoto: 'from-[#F6EAE5] via-[#EFE0D8] to-[#E6CEC2]',
  aji: 'from-[#F7EFE0] via-[#F2E5CA] to-[#EAD7AF]',
  huacatay: 'from-[#EAF2EC] via-[#DCE9DF] to-[#CCE0D1]',
  sea: 'from-[#E9F0F3] via-[#DCE7EC] to-[#CDDEE5]',
};

export const MenuExplorer: React.FC<MenuExplorerProps> = ({
  lang,
  activeCategory,
  onSelectCategory,
  activeTag,
  onSelectTag,
  searchQuery,
  onSearchChange,
  selection,
  onUpdateQuantity,
}) => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const copy = UI_COPY[lang].menu;

  const filterButtons: { id: MenuTag | 'all'; label: string }[] = [
    { id: 'all', label: copy.filterAll },
    { id: 'spicy', label: copy.filterSpicy },
    { id: 'seafood', label: copy.filterSeafood },
    { id: 'vegetarian', label: copy.filterVegetarian },
    { id: 'sharing', label: copy.filterSharing },
    { id: 'signature', label: copy.filterSignature },
  ];

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return MENU_ITEMS.filter((item) => {
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      if (activeTag !== 'all' && !item.tags.includes(activeTag)) {
        return false;
      }
      if (q.length > 0) {
        const haystack = [
          item.name[lang],
          item.name.es,
          item.description?.[lang] ?? '',
          item.subcategory[lang],
          item.portionNote?.[lang] ?? '',
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategory, activeTag, searchQuery, lang]);

  // Group filtered items by category -> subcategory preserving canonical order
  const groupedSections = useMemo(() => {
    const catsToShow =
      activeCategory === 'all'
        ? MENU_CATEGORIES
        : MENU_CATEGORIES.filter((c) => c.id === activeCategory);

    return catsToShow
      .map((catMeta) => {
        const itemsInCat = filteredItems.filter((i) => i.category === catMeta.id);
        if (itemsInCat.length === 0) return null;

        const subGroups: { title: string; items: MenuItem[] }[] = [];
        itemsInCat.forEach((item) => {
          const subTitle = getText(item.subcategory, lang);
          let existing = subGroups.find((g) => g.title === subTitle);
          if (!existing) {
            existing = { title: subTitle, items: [] };
            subGroups.push(existing);
          }
          existing.items.push(item);
        });

        return {
          category: catMeta,
          subGroups,
          totalCount: itemsInCat.length,
        };
      })
      .filter((section): section is NonNullable<typeof section> => section !== null);
  }, [activeCategory, filteredItems, lang]);

  const handleResetFilters = () => {
    onSelectCategory('all');
    onSelectTag('all');
    onSearchChange('');
  };

  const renderTagInline = (tag: MenuTag) => {
    switch (tag) {
      case 'spicy':
        return (
          <span className="inline-flex items-center gap-1 text-[#A61C1E]">
            <Flame className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{copy.tags.spicy}</span>
          </span>
        );
      case 'seafood':
        return (
          <span className="inline-flex items-center gap-1 text-[#1E566E]">
            <Shell className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{copy.tags.seafood}</span>
          </span>
        );
      case 'vegetarian':
        return (
          <span className="inline-flex items-center gap-1 text-[#2F5E41]">
            <Leaf className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{copy.tags.vegetarian}</span>
          </span>
        );
      case 'sharing':
        return (
          <span className="inline-flex items-center gap-1 text-[#9E7223]">
            <Users className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{copy.tags.sharing}</span>
          </span>
        );
      case 'signature':
        return (
          <span className="inline-flex items-center gap-1 text-[#9E7223]">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{copy.tags.signature}</span>
          </span>
        );
    }
  };

  return (
    <section id="menu" className="py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading & Live Count */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#14110F]">
              {copy.sectionTitle}
            </h2>
            <p className="mt-1 text-sm sm:text-base text-[#57534E]">{copy.sectionSubtitle}</p>
          </div>
          <p className="text-xs sm:text-sm font-medium text-[#78716C] tabular-nums whitespace-nowrap">
            {copy.resultsCount(filteredItems.length)}
          </p>
        </div>

        {/* Search + Dietary Quick Filters Toolbar */}
        <div className="bg-[#F3EDE3]/80 border border-[#E5DAC7] rounded-xl p-3 sm:p-4 space-y-3">
          {/* Search Input */}
          <div className="relative">
            <Search
              className="w-4 h-4 text-[#78716C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={copy.searchPlaceholder}
              aria-label={copy.searchPlaceholder}
              className="w-full min-h-[44px] pl-10 pr-10 py-2.5 bg-[#FFFFFF] border border-[#DFD2BD] rounded-lg text-sm text-[#14110F] placeholder:text-[#78716C] focus:outline-none focus:ring-2 focus:ring-[#A61C1E]/30 focus:border-[#A61C1E]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label={copy.clearSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-[#78716C] hover:text-[#14110F] rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Rail */}
          <div
            role="tablist"
            aria-label="Categorías del menú"
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:flex-wrap sm:pb-0"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'all'}
              onClick={() => onSelectCategory('all')}
              className={`min-h-[40px] px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#14110F] text-[#FAF7F2]'
                  : 'bg-[#FFFFFF] text-[#57534E] hover:text-[#14110F] border border-[#E5DAC7]'
              }`}
            >
              {copy.allCategories}
            </button>

            {MENU_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`min-h-[40px] px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#A61C1E] text-white'
                      : 'bg-[#FFFFFF] text-[#57534E] hover:text-[#14110F] border border-[#E5DAC7]'
                  }`}
                >
                  {getText(cat.shortLabel, lang)}
                </button>
              );
            })}
          </div>

          {/* Quick Dietary & Craving Filters */}
          <div className="pt-1 border-t border-[#E4DACB] flex items-center gap-1.5 overflow-x-auto no-scrollbar sm:flex-wrap">
            {filterButtons.map((btn) => {
              const isSelected = activeTag === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onSelectTag(btn.id)}
                  className={`min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#14110F]/10 text-[#14110F] font-semibold ring-1 ring-[#14110F]/25'
                      : 'text-[#57534E] hover:text-[#14110F] hover:bg-[#FFFFFF]/60'
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Content or Empty State */}
        {groupedSections.length === 0 ? (
          <div className="mt-10 bg-[#FFFFFF] border border-[#E5DAC7] rounded-xl p-10 text-center">
            <p className="font-display text-xl font-semibold text-[#14110F]">
              {copy.emptyTitle}
            </p>
            <p className="mt-2 text-sm text-[#57534E]">{copy.emptySubtitle}</p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 px-5 py-2.5 text-sm font-semibold text-white bg-[#A61C1E] hover:bg-[#8A1517] rounded-lg transition-colors cursor-pointer"
            >
              {copy.emptyReset}
            </button>
          </div>
        ) : (
          <div className="mt-8 space-y-12">
            {groupedSections.map((section) => (
              <div
                key={section.category.id}
                id={`cat-${section.category.id}`}
                className="scroll-mt-20"
              >
                {/* Category Header */}
                <div className="border-b border-[#DFD2BD] pb-3 mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <h3 className="font-display text-2xl sm:text-[1.75rem] font-semibold text-[#14110F]">
                      {getText(section.category.label, lang)}
                    </h3>
                    <p className="mt-1 text-sm text-[#57534E]">
                      {getText(section.category.subtitle, lang)}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-[#78716C] tabular-nums shrink-0">
                    {section.totalCount}
                  </span>
                </div>

                {/* Subcategories */}
                <div className="space-y-9">
                  {section.subGroups.map((sub) => (
                    <div key={sub.title}>
                      <h4 className="text-sm font-bold tracking-wide text-[#9E7223] mb-4">
                        {sub.title}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                        {sub.items.map((item) => {
                          const qty = selection[item.id] ?? 0;
                          const desc = item.description ? getText(item.description, lang) : '';
                          const portion = item.portionNote
                            ? getText(item.portionNote, lang)
                            : '';

                          return (
                            <article
                              key={item.id}
                              className="bg-[#FFFFFF] border border-[#E5DAC7] rounded-xl p-4 sm:p-5 flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5"
                            >
                              <div>
                                {/* Signature Dish Photo or Reserved Photography Slot */}
                                {item.photoSlot?.enabled && (
                                  <div
                                    className={`aspect-[4/3] w-full mb-4 rounded-lg bg-gradient-to-br ${
                                      PHOTO_BG_CLASSES[item.photoSlot.accentColor]
                                    } border border-[#E5DAC7] overflow-hidden`}
                                  >
                                    {item.photoSlot.imageSrc && !failedImages[item.id] ? (
                                      <img
                                        src={item.photoSlot.imageSrc}
                                        alt={getText(item.name, lang)}
                                        loading="lazy"
                                        referrerPolicy="no-referrer"
                                        onError={() =>
                                          setFailedImages((prev) => ({
                                            ...prev,
                                            [item.id]: true,
                                          }))
                                        }
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                                        <div className="w-9 h-9 rounded-full bg-[#FAF7F2]/90 border border-[#DFD2BD] flex items-center justify-center mb-2 text-[#A61C1E]">
                                          <Camera className="w-4 h-4" aria-hidden="true" />
                                        </div>
                                        <span className="text-[11px] font-medium text-[#57534E]">
                                          {copy.photoReserved}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Top Row: Dish Name + Tabular CLP Price */}
                                <div className="flex items-start justify-between gap-3">
                                  <h5 className="text-[16px] font-semibold leading-snug text-[#14110F]">
                                    {getText(item.name, lang)}
                                  </h5>
                                  <span className="text-[15px] font-bold text-[#14110F] tabular-nums whitespace-nowrap shrink-0">
                                    {formatCLP(item.price)}
                                  </span>
                                </div>

                                {/* Description */}
                                {(desc || portion) && (
                                  <p className="mt-2 text-sm leading-relaxed text-[#57534E]">
                                    {desc}
                                    {desc && portion ? ' · ' : ''}
                                    {portion && (
                                      <span className="font-medium text-[#44403C]">
                                        {portion}
                                      </span>
                                    )}
                                  </p>
                                )}

                                {/* Variants (e.g., Wine Bottle / Half / Glass or Jalea Full / Half) */}
                                {item.variants && item.variants.length > 0 && (
                                  <div className="mt-3 pt-2.5 border-t border-[#F0EAE0] space-y-1">
                                    {item.variants.map((variant, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-center justify-between text-xs text-[#57534E]"
                                      >
                                        <span>{getText(variant.label, lang)}</span>
                                        <span className="font-semibold text-[#14110F] tabular-nums">
                                          {formatCLP(variant.price)}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* Bottom Row: Unboxed Metadata Tags + Selection Control */}
                              <div className="mt-4 pt-3 border-t border-[#F3EDE3] flex items-center justify-between gap-3">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium min-h-[20px]">
                                  {item.tags.map((tag, index) => (
                                    <React.Fragment key={tag}>
                                      {index > 0 && (
                                        <span className="text-[#C7BEB0]" aria-hidden="true">
                                          ·
                                        </span>
                                      )}
                                      {renderTagInline(tag)}
                                    </React.Fragment>
                                  ))}
                                </div>

                                {qty === 0 ? (
                                  <button
                                    type="button"
                                    onClick={() => onUpdateQuantity(item.id, 1)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#14110F] bg-[#F5EFE6] hover:bg-[#EAE0D0] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                                  >
                                    <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                                    <span>{copy.addToSelection}</span>
                                  </button>
                                ) : (
                                  <div className="inline-flex items-center gap-1 bg-[#14110F] text-[#FAF7F2] rounded-md p-0.5 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => onUpdateQuantity(item.id, -1)}
                                      aria-label="Restar uno"
                                      className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/15 transition-colors cursor-pointer"
                                    >
                                      <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="px-1.5 text-xs font-bold tabular-nums">
                                      {qty}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => onUpdateQuantity(item.id, 1)}
                                      aria-label="Sumar uno"
                                      className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/15 transition-colors cursor-pointer"
                                    >
                                      <Plus className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
