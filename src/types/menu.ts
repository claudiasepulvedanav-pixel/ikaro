export type Language = 'es' | 'en' | 'pt';

export type LocalizedText = {
  es: string;
  en: string;
  pt: string;
};

export type MenuTag = 'spicy' | 'seafood' | 'vegetarian' | 'sharing' | 'signature';

export type CategoryId =
  | 'all'
  | 'starters-causas'
  | 'soups-salads'
  | 'mains'
  | 'rice-pasta'
  | 'fusion-snacks'
  | 'sharing'
  | 'veggie-kids'
  | 'desserts-coffee'
  | 'drinks';

export interface PriceVariant {
  label: LocalizedText;
  price: number;
}

export interface MenuItem {
  id: string;
  category: Exclude<CategoryId, 'all'>;
  subcategory: LocalizedText;
  name: LocalizedText;
  description?: LocalizedText;
  price: number;
  variants?: PriceVariant[];
  tags: MenuTag[];
  photoSlot?: {
    enabled: boolean;
    imageSrc?: string;
    aspect?: '4/3' | '16/9';
    accentColor: 'rocoto' | 'aji' | 'huacatay' | 'sea';
  };
  portionNote?: LocalizedText;
}

export interface CategoryMeta {
  id: Exclude<CategoryId, 'all'>;
  label: LocalizedText;
  shortLabel: LocalizedText;
  subtitle: LocalizedText;
}
