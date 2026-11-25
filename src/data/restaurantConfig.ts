import { Language, LocalizedText } from '../types/menu';

export const RESTAURANT_CONFIG = {
  brandName: 'Íkaro',
  fullTitle: {
    es: 'Íkaro — Gastronomía Peruana e Internacional',
    en: 'Íkaro — Peruvian & International Gastronomy',
    pt: 'Íkaro — Gastronomia Peruana e Internacional',
  },
  address: 'Av. Valparaíso 425, Galería Saleh',
  cityRegion: 'Viña del Mar, Región de Valparaíso, Chile',
  hoursShort: {
    es: 'Lun–Jue 12:30–22:00 · Vie–Dom 12:30–23:45',
    en: 'Mon–Thu 12:30–22:00 · Fri–Sun 12:30–23:45',
    pt: 'Seg–Qui 12:30–22:00 · Sex–Dom 12:30–23:45',
  },
  scheduleRows: [
    {
      days: { es: 'Lunes a jueves', en: 'Monday to Thursday', pt: 'Segunda a quinta' },
      hours: '12:30 – 22:00',
    },
    {
      days: { es: 'Viernes a Domingo', en: 'Friday & Sunday', pt: 'Sexta e Domingo' },
      hours: '12:30 – 23:45',
    },
    {
      days: { es: 'Domingo', en: 'Sunday', pt: 'Domingo' },
      hours: '12:30 – 19:00',
    },
  ],
  openingHoursNote: {
    es: 'Lun–Jue 12:30–20:00 · Vie–Sáb 12:30–00:00 · Dom 12:30–19:00 hrs',
    en: 'Mon–Thu 12:30–20:00 · Fri–Sat 12:30–00:00 · Sun 12:30–19:00 hrs',
    pt: 'Seg–Qui 12:30–20:00 · Sex–Sáb 12:30–00:00 · Dom 12:30–19:00 hrs',
  },
  priceRange: '$10.000 – $30.000 CLP',
  rating: {
    score: '4,9/5',
    votes: 80,
    platform: 'Facebook',
  },
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Av.+Valpara%C3%ADso+425,+Galer%C3%ADa+Saleh,+Vi%C3%B1a+del+Mar,+Chile',
  whatsappNumber: '56992268846',
  whatsappDisplay: '+56 9 9226 8846',
};

export const UI_COPY: Record<
  Language,
  {
    nav: {
      menu: string;
      sharing: string;
      drinks: string;
      location: string;
      ctaDirections: string;
    };
    hero: {
      kicker: string;
      headline: string;
      subheadline: string;
      ctaExplore: string;
      ctaDrinks: string;
      metaAddressLabel: string;
      metaHoursLabel: string;
      metaPriceLabel: string;
      metaRatingLabel: string;
      metaRatingValue: string;
      featuredLabel: string;
      featuredDishTitle: string;
      featuredDishDesc: string;
      featuredDishPrice: string;
      photoSlotCaption: string;
    };
    menu: {
      sectionTitle: string;
      sectionSubtitle: string;
      searchPlaceholder: string;
      clearSearch: string;
      allCategories: string;
      filterAll: string;
      filterSpicy: string;
      filterSeafood: string;
      filterVegetarian: string;
      filterSharing: string;
      filterSignature: string;
      resultsCount: (count: number) => string;
      emptyTitle: string;
      emptySubtitle: string;
      emptyReset: string;
      addToSelection: string;
      addedCount: (qty: number) => string;
      photoReserved: string;
      tags: {
        spicy: string;
        seafood: string;
        vegetarian: string;
        sharing: string;
        signature: string;
      };
    };
    selection: {
      barLabel: string;
      openDrawer: string;
      drawerTitle: string;
      drawerSubtitle: string;
      emptyDrawer: string;
      subtotalLabel: string;
      noteClp: string;
      copyList: string;
      copied: string;
      sendWhatsapp: string;
      clearAll: string;
      close: string;
      whatsappPrefix: string;
    };
    location: {
      sectionTitle: string;
      sectionSubtitle: string;
      addressTitle: string;
      addressHint: string;
      hoursTitle: string;
      hoursBody: string;
      priceTitle: string;
      priceBody: string;
      ratingTitle: string;
      ratingBody: string;
      btnMaps: string;
      btnReserve: string;
      reserveModalTitle: string;
      reserveModalBody: string;
      reserveModalHint: string;
      reserveNameLabel: string;
      reserveGuestsLabel: string;
      reserveTimeLabel: string;
      reserveSubmit: string;
      reserveSuccess: string;
      googleReadyTitle: string;
      googleReadyBody: string;
    };
    footer: {
      rights: string;
      menuLink: string;
      drinksLink: string;
      mapsLink: string;
    };
  }
> = {
  es: {
    nav: {
      menu: 'La Carta',
      sharing: 'Para Compartir',
      drinks: 'Bebidas y Tragos',
      location: 'Ubicación',
      ctaDirections: 'Cómo llegar',
    },
    hero: {
      kicker: 'Viña del Mar · Galería Saleh',
      headline: 'Gastronomía peruana e internacional sin rodeos.',
      subheadline:
        'Ceviches frescos al limón de pica, causas limeñas, fondos criollos, cocina chifa y nikkei, pastas, piqueos para compartir y coctelería de la casa en el centro de Viña del Mar.',
      ctaExplore: 'Explorar la carta',
      ctaDrinks: 'Tragos y bebidas',
      metaAddressLabel: 'Dirección',
      metaHoursLabel: 'Horario de atención',
      metaPriceLabel: 'Consumo promedio',
      metaRatingLabel: 'Reputación',
      metaRatingValue: '4,9/5 en Facebook (80 votos)',
      featuredLabel: 'Plato destacado · Cocina marina',
      featuredDishTitle: 'Ceviche Carretillero',
      featuredDishDesc:
        'Salmón, camarones, calamar y pulpo en limón de pica y ají amarillo, con choclo, camote glaseado y aros de calamar apanados.',
      featuredDishPrice: '$15.100',
      photoSlotCaption: 'Espacio reservado · Fotografía del plato',
    },
    menu: {
      sectionTitle: 'Nuestra Carta',
      sectionSubtitle:
        'Navega por categoría, filtra por preferencias o busca un ingrediente al instante.',
      searchPlaceholder: 'Buscar plato, ingrediente o trago (ej. pulpo, huancaína, sour)...',
      clearSearch: 'Limpiar búsqueda',
      allCategories: 'Toda la carta',
      filterAll: 'Todos',
      filterSpicy: 'Picante / Ají',
      filterSeafood: 'Mariscos',
      filterVegetarian: 'Vegetariano',
      filterSharing: 'Para compartir',
      filterSignature: 'Destacados',
      resultsCount: (count) =>
        count === 1 ? '1 preparación disponible' : `${count} preparaciones disponibles`,
      emptyTitle: 'No encontramos platos con ese filtro',
      emptySubtitle:
        'Prueba quitando los filtros activos o buscando con otra palabra clave.',
      emptyReset: 'Restablecer filtros',
      addToSelection: 'Agregar',
      addedCount: (qty) => `${qty} en mesa`,
      photoReserved: 'Espacio reservado para foto',
      tags: {
        spicy: 'Picante',
        seafood: 'Mariscos',
        vegetarian: 'Vegetariano',
        sharing: 'Compartir',
        signature: 'De la casa',
      },
    },
    selection: {
      barLabel: 'Tu selección de mesa',
      openDrawer: 'Ver selección',
      drawerTitle: 'Tu Selección de Mesa',
      drawerSubtitle:
        'Prepara tu pedido con anticipación para mostrarlo en mesa o consultarlo por WhatsApp.',
      emptyDrawer: 'Aún no has agregado platos ni tragos a tu selección.',
      subtotalLabel: 'Total estimado',
      noteClp: 'Valores en pesos chilenos (CLP), IVA incluido.',
      copyList: 'Copiar resumen',
      copied: 'Resumen copiado',
      sendWhatsapp: 'Consultar por WhatsApp',
      clearAll: 'Vaciar',
      close: 'Cerrar',
      whatsappPrefix: 'Hola Íkaro, me gustaría consultar/pedir esta selección:',
    },
    location: {
      sectionTitle: 'Visítanos en Viña del Mar',
      sectionSubtitle:
        'A pasos de la plaza y comercio central de Viña del Mar, dentro de la tradicional Galería Saleh.',
      addressTitle: 'Dirección',
      addressHint: 'Av. Valparaíso 425 (Galería Saleh), Viña del Mar, Región de Valparaíso.',
      hoursTitle: 'Horario de atención',
      hoursBody: 'Lun a Jue 12:30–20:00 · Vie y Sáb 12:30–00:00 · Dom 12:30–19:00 hrs.',
      priceTitle: 'Rango por persona',
      priceBody: '$10.000 – $30.000 CLP dependiendo de entradas, fondos y coctelería.',
      ratingTitle: 'Respaldo de comensales',
      ratingBody: '4,9/5 estrellas en Facebook basado en 80 reseñas verificadas.',
      btnMaps: 'Abrir ruta en Google Maps',
      btnReserve: 'Reservar por WhatsApp',
      reserveModalTitle: 'Reserva o consulta por WhatsApp',
      reserveModalBody:
        'Envía tu solicitud directa de mesa al WhatsApp de Íkaro (+56 9 9226 8846).',
      reserveModalHint: 'WhatsApp oficial: +56 9 9226 8846',
      reserveNameLabel: 'Tu nombre',
      reserveGuestsLabel: 'Personas',
      reserveTimeLabel: 'Hora estimada',
      reserveSubmit: 'Abrir en WhatsApp',
      reserveSuccess: 'Listo para enviar por WhatsApp.',
      googleReadyTitle: 'Perfil de Negocio & SEO Local',
      googleReadyBody:
        'Sitio estructurado con datos Schema.org (Restaurant), dirección exacta en Viña del Mar, carta en tres idiomas y enlace directo a Google Maps.',
    },
    footer: {
      rights: 'Íkaro Gastronomía Peruana e Internacional · Av. Valparaíso 425, Galería Saleh, Viña del Mar.',
      menuLink: 'Carta completa',
      drinksLink: 'Coctelería y vinos',
      mapsLink: 'Google Maps',
    },
  },
  en: {
    nav: {
      menu: 'The Menu',
      sharing: 'For Sharing',
      drinks: 'Drinks & Bar',
      location: 'Location',
      ctaDirections: 'Directions',
    },
    hero: {
      kicker: 'Viña del Mar · Galería Saleh',
      headline: 'Peruvian and international cuisine, clearly served.',
      subheadline:
        'Fresh ceviche cured in key lime, Peruvian causas, criollo classics, chifa & nikkei fusion, pastas, sharing platters, and house pisco sours in downtown Viña del Mar.',
      ctaExplore: 'Explore the menu',
      ctaDrinks: 'Drinks & cocktails',
      metaAddressLabel: 'Address',
      metaHoursLabel: 'Opening hours',
      metaPriceLabel: 'Average per guest',
      metaRatingLabel: 'Guest rating',
      metaRatingValue: '4.9/5 on Facebook (80 votes)',
      featuredLabel: 'Signature dish · Coastal kitchen',
      featuredDishTitle: 'Ceviche Carretillero',
      featuredDishDesc:
        'Fresh salmon, shrimp, squid, and octopus cured in key lime juice and yellow chili sauce, served with Peruvian corn, glazed sweet potato, and crispy calamari.',
      featuredDishPrice: '$15.100',
      photoSlotCaption: 'Reserved slot · Dish photography',
    },
    menu: {
      sectionTitle: 'Full Menu',
      sectionSubtitle:
        'Browse by course, filter by dietary preference, or search any ingredient in seconds.',
      searchPlaceholder: 'Search dish, ingredient, or cocktail (e.g. octopus, huancaína, sour)...',
      clearSearch: 'Clear search',
      allCategories: 'All courses',
      filterAll: 'All',
      filterSpicy: 'Spicy / Chili',
      filterSeafood: 'Seafood',
      filterVegetarian: 'Vegetarian',
      filterSharing: 'For sharing',
      filterSignature: 'House favorites',
      resultsCount: (count) => (count === 1 ? '1 dish available' : `${count} dishes available`),
      emptyTitle: 'No dishes match this filter',
      emptySubtitle: 'Try clearing active filters or searching with a different keyword.',
      emptyReset: 'Reset filters',
      addToSelection: 'Add',
      addedCount: (qty) => `${qty} selected`,
      photoReserved: 'Reserved photo slot',
      tags: {
        spicy: 'Spicy',
        seafood: 'Seafood',
        vegetarian: 'Vegetarian',
        sharing: 'Sharing',
        signature: 'Signature',
      },
    },
    selection: {
      barLabel: 'Your table selection',
      openDrawer: 'View list',
      drawerTitle: 'Your Table Selection',
      drawerSubtitle:
        'Build a quick shortlist to show at your table or share via WhatsApp.',
      emptyDrawer: 'No dishes or drinks added to your list yet.',
      subtotalLabel: 'Estimated total',
      noteClp: 'Prices in Chilean Pesos (CLP), tax included.',
      copyList: 'Copy summary',
      copied: 'Copied to clipboard',
      sendWhatsapp: 'Send via WhatsApp',
      clearAll: 'Clear',
      close: 'Close',
      whatsappPrefix: 'Hello Íkaro, I would like to inquire about this selection:',
    },
    location: {
      sectionTitle: 'Visit Us in Viña del Mar',
      sectionSubtitle:
        'Located in the heart of Viña del Mar inside the classic Galería Saleh.',
      addressTitle: 'Address',
      addressHint: 'Av. Valparaíso 425 (Galería Saleh), Viña del Mar, Valparaíso Region, Chile.',
      hoursTitle: 'Opening hours',
      hoursBody: 'Mon–Thu 12:30–20:00 · Fri–Sat 12:30–00:00 · Sun 12:30–19:00 hrs.',
      priceTitle: 'Price per person',
      priceBody: '$10.000 – $30.000 CLP depending on starters, mains, and cocktails.',
      ratingTitle: 'Community rating',
      ratingBody: '4.9/5 rating on Facebook across 80 guest reviews.',
      btnMaps: 'Open in Google Maps',
      btnReserve: 'Book via WhatsApp',
      reserveModalTitle: 'Table inquiry via WhatsApp',
      reserveModalBody:
        'Send a quick table request directly to Íkaro WhatsApp (+56 9 9226 8846).',
      reserveModalHint: 'Official WhatsApp: +56 9 9226 8846',
      reserveNameLabel: 'Your name',
      reserveGuestsLabel: 'Party size',
      reserveTimeLabel: 'Preferred time',
      reserveSubmit: 'Send on WhatsApp',
      reserveSuccess: 'Ready to send on WhatsApp.',
      googleReadyTitle: 'Local SEO & Google Business Ready',
      googleReadyBody:
        'Built with Schema.org Restaurant structured data, verified Viña del Mar address, trilingual catalog, and direct Google Maps routing.',
    },
    footer: {
      rights: 'Íkaro Peruvian & International Gastronomy · Av. Valparaíso 425, Galería Saleh, Viña del Mar.',
      menuLink: 'Full menu',
      drinksLink: 'Drinks & wine',
      mapsLink: 'Google Maps',
    },
  },
  pt: {
    nav: {
      menu: 'Cardápio',
      sharing: 'Para Compartilhar',
      drinks: 'Drinques e Bebidas',
      location: 'Localização',
      ctaDirections: 'Como chegar',
    },
    hero: {
      kicker: 'Viña del Mar · Galería Saleh',
      headline: 'Gastronomia peruana e internacional sem complicação.',
      subheadline:
        'Ceviches frescos no limão-galego, causas limenhas, pratos criollos, fusão chifa e nikkei, massas, porções para compartilhar e coquetéis clássicos no centro de Viña del Mar.',
      ctaExplore: 'Explorar o cardápio',
      ctaDrinks: 'Drinques e bebidas',
      metaAddressLabel: 'Endereço',
      metaHoursLabel: 'Horário de funcionamento',
      metaPriceLabel: 'Faixa por pessoa',
      metaRatingLabel: 'Avaliação',
      metaRatingValue: '4,9/5 no Facebook (80 votos)',
      featuredLabel: 'Prato destaque · Cozinha marinha',
      featuredDishTitle: 'Ceviche Carretillero',
      featuredDishDesc:
        'Cubos de salmão, camarão, lula e polvo marinados no limón de pica com molho de ají amarillo, milho peruano, batata-doce caramelizada e anéis de lula empanados.',
      featuredDishPrice: '$15.100',
      photoSlotCaption: 'Espaço reservado · Foto do prato',
    },
    menu: {
      sectionTitle: 'Nosso Cardápio',
      sectionSubtitle:
        'Navegue por categoria, filtre por preferências ou pesquise qualquer ingrediente.',
      searchPlaceholder: 'Buscar prato, ingrediente ou drinque (ex. polvo, huancaína, sour)...',
      clearSearch: 'Limpar busca',
      allCategories: 'Todo o cardápio',
      filterAll: 'Todos',
      filterSpicy: 'Picante / Ají',
      filterSeafood: 'Frutos do mar',
      filterVegetarian: 'Vegetariano',
      filterSharing: 'Para compartilhar',
      filterSignature: 'Destaques',
      resultsCount: (count) =>
        count === 1 ? '1 opção disponível' : `${count} opções disponíveis`,
      emptyTitle: 'Nenhum prato encontrado com este filtro',
      emptySubtitle: 'Tente remover os filtros ativos ou buscar outra palavra.',
      emptyReset: 'Redefinir filtros',
      addToSelection: 'Adicionar',
      addedCount: (qty) => `${qty} na mesa`,
      photoReserved: 'Espaço reservado para foto',
      tags: {
        spicy: 'Picante',
        seafood: 'Frutos do mar',
        vegetarian: 'Vegetariano',
        sharing: 'Compartilhar',
        signature: 'Da casa',
      },
    },
    selection: {
      barLabel: 'Sua seleção de mesa',
      openDrawer: 'Ver seleção',
      drawerTitle: 'Sua Seleção de Mesa',
      drawerSubtitle:
        'Monte sua lista para mostrar ao garçom ou enviar pelo WhatsApp.',
      emptyDrawer: 'Você ainda não adicionou pratos ou bebidas.',
      subtotalLabel: 'Total estimado',
      noteClp: 'Preços em Pesos Chilenos (CLP), impostos incluídos.',
      copyList: 'Copiar resumo',
      copied: 'Resumo copiado',
      sendWhatsapp: 'Enviar por WhatsApp',
      clearAll: 'Limpar',
      close: 'Fechar',
      whatsappPrefix: 'Olá Íkaro, gostaria de consultar esta seleção:',
    },
    location: {
      sectionTitle: 'Visite-nos em Viña del Mar',
      sectionSubtitle:
        'No centro de Viña del Mar, dentro da tradicional Galería Saleh.',
      addressTitle: 'Endereço',
      addressHint: 'Av. Valparaíso 425 (Galería Saleh), Viña del Mar, Região de Valparaíso.',
      hoursTitle: 'Horário de funcionamento',
      hoursBody: 'Seg–Qui 12:30–20:00 · Sex–Sáb 12:30–00:00 · Dom 12:30–19:00 hrs.',
      priceTitle: 'Faixa de preço por pessoa',
      priceBody: '$10.000 – $30.000 CLP conforme entradas, pratos principais e drinques.',
      ratingTitle: 'Avaliação dos clientes',
      ratingBody: '4,9/5 estrelas no Facebook com 80 avaliações.',
      btnMaps: 'Abrir rota no Google Maps',
      btnReserve: 'Reservar por WhatsApp',
      reserveModalTitle: 'Reserva pelo WhatsApp',
      reserveModalBody:
        'Envie sua solicitação de mesa diretamente para o WhatsApp do Íkaro (+56 9 9226 8846).',
      reserveModalHint: 'WhatsApp oficial: +56 9 9226 8846',
      reserveNameLabel: 'Seu nome',
      reserveGuestsLabel: 'Pessoas',
      reserveTimeLabel: 'Horário estimado',
      reserveSubmit: 'Abrir no WhatsApp',
      reserveSuccess: 'Pronto para enviar pelo WhatsApp.',
      googleReadyTitle: 'SEO Local & Perfil Google',
      googleReadyBody:
        'Estruturado com dados Schema.org (Restaurant), endereço em Viña del Mar, cardápio trilíngue e link direto para o Google Maps.',
    },
    footer: {
      rights: 'Íkaro Gastronomia Peruana e Internacional · Av. Valparaíso 425, Galería Saleh, Viña del Mar.',
      menuLink: 'Cardápio completo',
      drinksLink: 'Drinques e vinhos',
      mapsLink: 'Google Maps',
    },
  },
};

export function formatCLP(price: number): string {
  return '$' + price.toLocaleString('es-CL');
}

export function getText(obj: LocalizedText, lang: Language): string {
  return obj[lang];
}
