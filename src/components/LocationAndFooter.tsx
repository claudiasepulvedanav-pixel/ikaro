import React, { useState } from 'react';
import {
  Check,
  Clock,
  Copy,
  ExternalLink,
  MapPin,
  MessageCircle,
  Star,
  Utensils,
  X,
} from 'lucide-react';
import { RESTAURANT_CONFIG, UI_COPY } from '../data/restaurantConfig';
import { CategoryId, Language } from '../types/menu';

interface LocationAndFooterProps {
  lang: Language;
  onSelectCategory: (cat: CategoryId) => void;
}

export const LocationAndFooter: React.FC<LocationAndFooterProps> = ({
  lang,
  onSelectCategory,
}) => {
  const copy = UI_COPY[lang].location;
  const footerCopy = UI_COPY[lang].footer;
  const [reserveOpen, setReserveOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestsCount, setGuestsCount] = useState('2');
  const [preferredTime, setPreferredTime] = useState('20:00');
  const [generatedMsg, setGeneratedMsg] = useState('');
  const [copiedMsg, setCopiedMsg] = useState(false);

  const buildInquiryMessage = () => {
    const safeName = guestName.trim() || 'Cliente';
    return lang === 'en'
      ? `Hello Íkaro! Table request from ${safeName} for ${guestsCount} guests around ${preferredTime} hrs (Av. Valparaíso 425, Viña del Mar).`
      : lang === 'pt'
      ? `Olá Íkaro! Solicitação de mesa de ${safeName} para ${guestsCount} pessoas por volta das ${preferredTime} hrs (Av. Valparaíso 425, Viña del Mar).`
      : `Hola Íkaro, solicitud de mesa de ${safeName} para ${guestsCount} personas cerca de las ${preferredTime} hrs (Av. Valparaíso 425, Galería Saleh, Viña del Mar).`;
  };

  const whatsappDirectUrl = `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    buildInquiryMessage()
  )}`;

  const handleCreateInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneratedMsg(buildInquiryMessage());
    setCopiedMsg(false);
  };

  const handleCopyInquiry = async () => {
    if (!generatedMsg) return;
    try {
      await navigator.clipboard.writeText(generatedMsg);
      setCopiedMsg(true);
    } catch {
      // Clipboard blocked silently
    }
  };

  const jumpToCategory = (cat: CategoryId) => {
    onSelectCategory(cat);
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section id="location" className="py-12 sm:py-16 border-t border-[#E5DAC7] bg-[#F3EDE3]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Location Details & Actions */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#14110F]">
                  {copy.sectionTitle}
                </h2>
                <p className="mt-2 text-base text-[#57534E] max-w-xl">
                  {copy.sectionSubtitle}
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-[#FFFFFF] border border-[#E5DAC7] rounded-xl p-5">
                    <div className="flex items-center gap-2 text-[#A61C1E] mb-2">
                      <MapPin className="w-4 h-4" aria-hidden="true" />
                      <h3 className="text-sm font-semibold text-[#14110F]">
                        {copy.addressTitle}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-[#57534E]">{copy.addressHint}</p>
                  </div>

                  <div className="bg-[#FFFFFF] border border-[#E5DAC7] rounded-xl p-5">
                    <div className="flex items-center gap-2 text-[#A61C1E] mb-2">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      <h3 className="text-sm font-semibold text-[#14110F]">
                        {copy.hoursTitle}
                      </h3>
                    </div>
                    <ul className="space-y-1 text-xs sm:text-sm text-[#57534E]">
                      {RESTAURANT_CONFIG.scheduleRows.map((row) => (
                        <li key={row.hours + row.days.es} className="flex justify-between gap-2">
                          <span>{row.days[lang]}</span>
                          <span className="font-semibold text-[#14110F] tabular-nums whitespace-nowrap">
                            {row.hours}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#FFFFFF] border border-[#E5DAC7] rounded-xl p-5">
                    <div className="flex items-center gap-2 text-[#B38836] mb-2">
                      <Utensils className="w-4 h-4" aria-hidden="true" />
                      <h3 className="text-sm font-semibold text-[#14110F]">
                        {copy.priceTitle}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-[#57534E] tabular-nums">
                      {copy.priceBody}
                    </p>
                  </div>

                  <div className="bg-[#FFFFFF] border border-[#E5DAC7] rounded-xl p-5">
                    <div className="flex items-center gap-2 text-[#B38836] mb-2">
                      <Star className="w-4 h-4" aria-hidden="true" />
                      <h3 className="text-sm font-semibold text-[#14110F]">
                        {copy.ratingTitle}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-[#57534E] tabular-nums">
                      {copy.ratingBody}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <a
                  href={RESTAURANT_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#A61C1E] hover:bg-[#8A1517] rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  <span>{copy.btnMaps}</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={() => setReserveOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#14110F] bg-[#FFFFFF] hover:bg-[#FAF7F2] border border-[#DFD2BD] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#2F5E41]" aria-hidden="true" />
                  <span>{copy.btnReserve}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Official Íkaro Crest & Galería Saleh Reference Card */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="h-full bg-[#FFFFFF] border border-[#E5DAC7] rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] w-full rounded-lg bg-[#FFFFFF] border border-[#E5DAC7] flex flex-col items-center justify-center p-5 text-center">
                    <img
                      src="/assets/aistudio/Logo_Ikaro_700b2d4c.png"
                      alt="Íkaro Gastronomía Peruana e Internacional"
                      referrerPolicy="no-referrer"
                      className="h-24 w-auto object-contain mb-2"
                    />
                    <p className="font-display text-base font-semibold text-[#14110F]">
                      Galería Saleh · Av. Valparaíso 425
                    </p>
                    <p className="mt-0.5 text-xs text-[#57534E]">
                      Viña del Mar, Región de Valparaíso
                    </p>
                    <a
                      href={RESTAURANT_CONFIG.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#A61C1E] hover:underline underline-offset-4"
                    >
                      <span>{copy.btnMaps}</span>
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-semibold text-[#14110F]">
                    {copy.googleReadyTitle}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#57534E]">
                    {copy.googleReadyBody}
                  </p>
                </div>

                <p className="mt-5 pt-4 border-t border-[#F0EAE0] text-xs text-[#78716C]">
                  {RESTAURANT_CONFIG.openingHoursNote[lang]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Editorial Footer */}
      <footer className="bg-[#FAF7F2] border-t border-[#E5DAC7] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/Logo_Ikaro_700b2d4c.png"
              alt="Logo Íkaro"
              referrerPolicy="no-referrer"
              className="h-9 w-9 object-contain mix-blend-multiply shrink-0"
            />
            <span className="text-xs text-[#57534E]">{footerCopy.rights}</span>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-[#57534E]">
            <button
              type="button"
              onClick={() => jumpToCategory('all')}
              className="hover:text-[#14110F] hover:underline underline-offset-4 cursor-pointer"
            >
              {footerCopy.menuLink}
            </button>
            <button
              type="button"
              onClick={() => jumpToCategory('drinks')}
              className="hover:text-[#14110F] hover:underline underline-offset-4 cursor-pointer"
            >
              {footerCopy.drinksLink}
            </button>
            <a
              href={RESTAURANT_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#14110F] hover:underline underline-offset-4"
            >
              {footerCopy.mapsLink}
            </a>
          </div>
        </div>
      </footer>

      {/* Reservation / WhatsApp Inquiry Modal */}
      {reserveOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reserve-modal-title"
          className="fixed inset-0 z-50 bg-[#14110F]/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-[#FFFFFF] border border-[#E5DAC7] rounded-xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  id="reserve-modal-title"
                  className="font-display text-xl font-semibold text-[#14110F]"
                >
                  {copy.reserveModalTitle}
                </h3>
                <p className="mt-1 text-sm text-[#57534E]">{copy.reserveModalBody}</p>
              </div>
              <button
                type="button"
                onClick={() => setReserveOpen(false)}
                aria-label="Cerrar"
                className="p-1.5 text-[#78716C] hover:text-[#14110F] rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInquiry} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#14110F] mb-1">
                  {copy.reserveNameLabel}
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-[#DFD2BD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A61C1E]/30 focus:border-[#A61C1E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#14110F] mb-1">
                    {copy.reserveGuestsLabel}
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-[#DFD2BD] rounded-lg bg-white"
                  >
                    {['1', '2', '3', '4', '5', '6', '8+'].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#14110F] mb-1">
                    {copy.reserveTimeLabel}
                  </label>
                  <input
                    type="time"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-[#DFD2BD] rounded-lg tabular-nums"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-white bg-[#2F5E41] hover:bg-[#244A33] rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>{copy.reserveSubmit}</span>
                </a>

                <button
                  type="submit"
                  className="py-2.5 px-4 text-sm font-semibold text-[#14110F] bg-[#F3EDE3] hover:bg-[#E5DAC7] rounded-lg transition-colors cursor-pointer"
                >
                  {UI_COPY[lang].selection.copyList}
                </button>
              </div>
            </form>

            {generatedMsg && (
              <div className="mt-4 p-3.5 bg-[#FAF7F2] border border-[#E5DAC7] rounded-lg space-y-2.5">
                <p className="text-xs font-semibold text-[#2F5E41]">{copy.reserveSuccess}</p>
                <p className="text-xs text-[#14110F] leading-relaxed">{generatedMsg}</p>
                <button
                  type="button"
                  onClick={handleCopyInquiry}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A61C1E] hover:underline cursor-pointer"
                >
                  {copiedMsg ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{UI_COPY[lang].selection.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{UI_COPY[lang].selection.copyList}</span>
                    </>
                  )}
                </button>
              </div>
            )}

            <p className="mt-4 text-[11px] text-[#78716C] leading-relaxed">
              {copy.reserveModalHint}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
