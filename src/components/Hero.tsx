import React, { useState } from 'react';
import { ArrowDownRight, Camera, Clock, MapPin, Star, Utensils } from 'lucide-react';
import { RESTAURANT_CONFIG, UI_COPY } from '../data/restaurantConfig';
import { CategoryId, Language } from '../types/menu';

interface HeroProps {
  lang: Language;
  onExploreCategory: (cat: CategoryId) => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onExploreCategory }) => {
  const [imgError, setImgError] = useState(false);
  const copy = UI_COPY[lang].hero;

  const jumpToMenu = (cat: CategoryId) => {
    onExploreCategory(cat);
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="top" className="pt-8 sm:pt-12 pb-6 sm:pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Identity & Primary CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-between py-1">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="inline-block w-6 h-0.5 bg-[#A61C1E]" aria-hidden="true" />
                <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#A61C1E]">
                  {copy.kicker}
                </p>
              </div>
              <h1 className="font-display text-[clamp(2.25rem,4.5vw,3.65rem)] leading-[1.08] font-semibold tracking-tight text-[#14110F] text-balance max-w-2xl">
                {copy.headline}
              </h1>
              <p className="mt-5 text-base sm:text-[17px] leading-relaxed text-[#57534E] max-w-xl">
                {copy.subheadline}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => jumpToMenu('all')}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#A61C1E] hover:bg-[#8A1517] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{copy.ctaExplore}</span>
                <ArrowDownRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => jumpToMenu('drinks')}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#14110F] bg-[#FFFFFF] hover:bg-[#F3EDE3] border border-[#DFD2BD] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{copy.ctaDrinks}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Featured Signature Dish & Photography */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="h-full bg-[#FFFFFF] border border-[#E5DAC7] rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="aspect-[4/3] w-full rounded-lg bg-gradient-to-br from-[#F4ECE0] via-[#EFE3D2] to-[#E9D7C0] border border-[#E5DAC8] overflow-hidden relative">
                  {!imgError ? (
                    <img
                      src="/assets/aistudio/ceviche_carretillero_9790c200.jfif"
                      alt={copy.featuredDishTitle}
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-[#FAF7F2]/90 border border-[#DFD2BF] flex items-center justify-center mb-3 text-[#A61C1E]">
                        <Camera className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-medium text-[#57534E]">
                        {copy.photoSlotCaption}
                      </p>
                      <p className="mt-1 font-display text-lg font-semibold text-[#14110F]">
                        {copy.featuredDishTitle}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="text-xs font-semibold text-[#9E7223]">
                    {copy.featuredLabel}
                  </span>
                  <span className="text-base font-bold text-[#14110F] tabular-nums">
                    {copy.featuredDishPrice}
                  </span>
                </div>

                <h2 className="mt-1 font-display text-xl font-semibold text-[#14110F]">
                  {copy.featuredDishTitle}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-[#57534E]">
                  {copy.featuredDishDesc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Quick Info Strip (Clean Hairline Dividers, Zero Pills) */}
        <div className="mt-8 sm:mt-10 border-t border-b border-[#E5DAC7] py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[#A61C1E] shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-[#78716C]">{copy.metaAddressLabel}</p>
              <p className="text-sm font-semibold text-[#14110F] leading-snug">
                {RESTAURANT_CONFIG.address}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-[#A61C1E] shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-[#78716C]">{copy.metaHoursLabel}</p>
              <p className="text-xs sm:text-sm font-semibold text-[#14110F] leading-snug tabular-nums">
                {RESTAURANT_CONFIG.hoursShort[lang]}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Utensils className="w-4 h-4 text-[#B38836] shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-[#78716C]">{copy.metaPriceLabel}</p>
              <p className="text-sm font-semibold text-[#14110F] tabular-nums">
                {RESTAURANT_CONFIG.priceRange}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Star className="w-4 h-4 text-[#B38836] shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-[#78716C]">{copy.metaRatingLabel}</p>
              <p className="text-sm font-semibold text-[#14110F] tabular-nums">
                {copy.metaRatingValue}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
