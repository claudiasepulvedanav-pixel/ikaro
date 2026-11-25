import React, { useMemo, useState } from 'react';
import { Check, Copy, MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { MENU_ITEMS } from '../data/menuData';
import { formatCLP, getText, RESTAURANT_CONFIG, UI_COPY } from '../data/restaurantConfig';
import { Language } from '../types/menu';

interface SelectionDrawerProps {
  lang: Language;
  selection: Record<string, number>;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onClearAll: () => void;
}

export const SelectionDrawer: React.FC<SelectionDrawerProps> = ({
  lang,
  selection,
  onUpdateQuantity,
  onClearAll,
}) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copy = UI_COPY[lang].selection;

  const selectedEntries = useMemo(() => {
    return Object.entries(selection)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const item = MENU_ITEMS.find((m) => m.id === id);
        return item ? { item, qty } : null;
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
  }, [selection]);

  const totalItems = useMemo(
    () => selectedEntries.reduce((acc, e) => acc + e.qty, 0),
    [selectedEntries]
  );

  const totalCLP = useMemo(
    () => selectedEntries.reduce((acc, e) => acc + e.item.price * e.qty, 0),
    [selectedEntries]
  );

  if (totalItems === 0 && !open) {
    return null;
  }

  const buildSummaryText = () => {
    const lines = selectedEntries.map(
      ({ item, qty }) =>
        `• ${qty}x ${getText(item.name, lang)} (${formatCLP(item.price * qty)})`
    );
    return `${copy.whatsappPrefix}\n\n${lines.join('\n')}\n\n${copy.subtotalLabel}: ${formatCLP(
      totalCLP
    )} CLP`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildSummaryText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore clipboard failures
    }
  };

  const whatsappHref = RESTAURANT_CONFIG.whatsappNumber
    ? `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
        buildSummaryText()
      )}`
    : undefined;

  return (
    <>
      {/* Compact Bottom Floating Bar (Only visible when items > 0, well under 15% viewport height) */}
      {totalItems > 0 && !open && (
        <div className="fixed bottom-3 inset-x-3 sm:inset-x-auto sm:right-6 sm:bottom-6 z-40">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="w-full sm:w-auto flex items-center justify-between gap-5 px-4 py-3 bg-[#14110F] text-[#FAF7F2] border border-[#B38836]/40 rounded-xl shadow-lg hover:bg-[#241E1B] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-[#D4AF5A]" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
                {copy.barLabel} ({totalItems})
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold tabular-nums">{formatCLP(totalCLP)}</span>
              <span className="text-xs font-semibold text-[#D4AF5A] underline underline-offset-2 whitespace-nowrap">
                {copy.openDrawer}
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Slide-Over Table Selection Drawer */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="selection-drawer-title"
          className="fixed inset-0 z-50 flex justify-end bg-[#14110F]/50 backdrop-blur-xs"
        >
          <div className="bg-[#FAF7F2] w-full max-w-md h-full flex flex-col border-l border-[#E5DAC7] shadow-2xl">
            <div className="p-5 border-b border-[#E5DAC7] bg-[#FFFFFF] flex items-start justify-between gap-4">
              <div>
                <h3
                  id="selection-drawer-title"
                  className="font-display text-xl font-semibold text-[#14110F]"
                >
                  {copy.drawerTitle}
                </h3>
                <p className="mt-1 text-xs text-[#57534E]">{copy.drawerSubtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={copy.close}
                className="p-1.5 text-[#78716C] hover:text-[#14110F] rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {selectedEntries.length === 0 ? (
                <p className="text-sm text-[#57534E] text-center py-12">{copy.emptyDrawer}</p>
              ) : (
                selectedEntries.map(({ item, qty }) => (
                  <div
                    key={item.id}
                    className="bg-[#FFFFFF] border border-[#E5DAC7] rounded-lg p-3.5 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#14110F] truncate">
                        {getText(item.name, lang)}
                      </p>
                      <p className="text-xs text-[#57534E] tabular-nums mt-0.5">
                        {formatCLP(item.price)} × {qty} ={' '}
                        <span className="font-semibold text-[#14110F]">
                          {formatCLP(item.price * qty)}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1 bg-[#F3EDE3] rounded-md p-0.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        aria-label="Restar"
                        className="w-7 h-7 flex items-center justify-center text-[#14110F] hover:bg-white rounded cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-1.5 text-xs font-bold tabular-nums">{qty}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        aria-label="Sumar"
                        className="w-7 h-7 flex items-center justify-center text-[#14110F] hover:bg-white rounded cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {selectedEntries.length > 0 && (
              <div className="p-5 border-t border-[#E5DAC7] bg-[#FFFFFF] space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-[#57534E]">
                    {copy.subtotalLabel}
                  </span>
                  <span className="text-xl font-bold text-[#14110F] tabular-nums">
                    {formatCLP(totalCLP)}
                  </span>
                </div>
                <p className="text-[11px] text-[#78716C]">{copy.noteClp}</p>

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-[#14110F] bg-[#F3EDE3] hover:bg-[#E5DAC7] rounded-lg transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#2F5E41]" />
                        <span>{copy.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copy.copyList}</span>
                      </>
                    )}
                  </button>

                  {whatsappHref ? (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-white bg-[#2F5E41] hover:bg-[#244A33] rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{copy.sendWhatsapp}</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        onClearAll();
                        setOpen(false);
                      }}
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-[#A61C1E] bg-[#FAF7F2] hover:bg-[#F3EDE3] border border-[#E5DAC7] rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{copy.clearAll}</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
