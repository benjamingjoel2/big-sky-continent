/**
 * Big Sky Continent: the one config file.
 * Name, domain, contact, disclosure wording and taxonomy live here.
 */
export const site = {
  name: 'Big Sky Continent',
  tagline: 'Stories and practical advice for travelling in Africa',
  description:
    'Story-led, practical travel writing for people planning a trip to Africa, from first safaris to gorilla treks, beaches and cities. Published by Tourground.',
  domain: 'bigskycontinent.tourground.com',
  url: 'https://bigskycontinent.tourground.com',
  language: 'en',
  locale: 'en_GB',
  email: 'bigskycontinent@tourground.com',
  publisher: { name: 'Tourground', url: 'https://tourground.com/' },
  /** The Tourground directory of verified travel companies, searchable by destination. */
  directoryUrl: 'https://tourground.com/#/explore',
  launch: '2026-11-11',
} as const;

export const disclosure = {
  publishedBy: 'Published by Tourground.',
  footerShort:
    'Big Sky Continent publishes story-led, practical travel writing about Africa. It is published by Tourground.',
  paidLabel: 'Advertisement feature',
  planNote:
    'Big Sky Continent and the brands linked here are part of Tourground. Some Tourground brands are owned by Tourground’s founders. No company pays to appear in this box.',
} as const;

export const categories = {
  safari: { name: 'Safari', path: '/safari/', blurb: 'Where and when to go on safari, how it works on the ground and how to plan your first.' },
  'gorillas-primates': { name: 'Gorillas & Primates', path: '/gorillas-and-primates/', blurb: 'Mountain gorillas, chimpanzees and the forests of Rwanda and Uganda.' },
  'beach-islands': { name: 'Beach & Islands', path: '/beach-and-islands/', blurb: 'Zanzibar, the Kenyan coast, Mozambique, Mauritius and the Seychelles, on their own or after a safari.' },
  itineraries: { name: 'Itineraries', path: '/itineraries/', blurb: 'Day-by-day routes and trip ideas, from Cape Town to the Sahara.' },
  'travel-tips': { name: 'Travel Tips', path: '/travel-tips/', blurb: 'Health, visas and money: the practical things to sort before you fly.' },
} as const;

export const tips = {
  health: { name: 'Health', path: '/travel-tips/health/', blurb: 'Malaria, vaccines, yellow fever and staying well on the road.' },
  visas: { name: 'Visas', path: '/travel-tips/visas/', blurb: 'Entry rules, e-visas and travel authorisations, with links to the official sources.' },
  money: { name: 'Money', path: '/travel-tips/money/', blurb: 'What a trip costs, what changes the price and how to pay safely.' },
} as const;

export const regions = {
  'east-africa': { name: 'East Africa', path: '/destinations/east-africa/', blurb: 'Kenya, Tanzania, Rwanda, Uganda and Ethiopia: the Migration, gorillas and the great savanna parks.' },
  'southern-africa': { name: 'Southern Africa', path: '/destinations/southern-africa/', blurb: 'South Africa, Botswana, Namibia, Zambia, Zimbabwe, Mozambique and Malawi.' },
  'north-africa': { name: 'North Africa', path: '/destinations/north-africa/', blurb: 'Morocco and Tunisia: medinas, mountains and the edge of the Sahara.' },
  'west-africa': { name: 'West Africa', path: '/destinations/west-africa/', blurb: 'Senegal, The Gambia, Ghana and São Tomé and Príncipe.' },
  'indian-ocean': { name: 'Indian Ocean islands', path: '/destinations/indian-ocean-islands/', blurb: 'Zanzibar, Mauritius, the Seychelles and Madagascar.' },
} as const;

export type CategoryKey = keyof typeof categories;
export type RegionKey = keyof typeof regions;
export type TipKey = keyof typeof tips;
