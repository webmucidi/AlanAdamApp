export interface HistoricalData {
  year: number;
  goldGram: number; // TL
  fuelLitre: number; // TL
  bread: number; // TL
  usd: number; // TL
}

export interface CountryData {
  id: string;
  name: string;
  flag: string;
  minWage: number; // In local currency or USD? Let's use local and convert if needed, or just use a common "units" approach.
  currency: string;
  products: {
    iphone: number;
    tesla: number;
    pizza: number;
    nike: number;
  };
}

export interface VenueData {
  id: string;
  name: string;
  productName: string;
  imageUrl: string;
  color: string;
  unit: string;
  history: {
    [year: number]: number; // Price in that year
  };
  currentPrice: number;
}

export const historicalData: HistoricalData[] = [
  { year: 2002, goldGram: 12, fuelLitre: 1.5, bread: 0.15, usd: 1.5 },
  { year: 2005, goldGram: 18, fuelLitre: 2.5, bread: 0.25, usd: 1.35 },
  { year: 2008, goldGram: 35, fuelLitre: 3.2, bread: 0.4, usd: 1.25 },
  { year: 2010, goldGram: 60, fuelLitre: 3.7, bread: 0.6, usd: 1.5 },
  { year: 2012, goldGram: 100, fuelLitre: 4.4, bread: 0.75, usd: 1.8 },
  { year: 2015, goldGram: 100, fuelLitre: 4.5, bread: 1.0, usd: 2.7 },
  { year: 2018, goldGram: 200, fuelLitre: 6.2, bread: 1.25, usd: 4.5 },
  { year: 2020, goldGram: 450, fuelLitre: 7.0, bread: 1.5, usd: 7.5 },
  { year: 2022, goldGram: 1000, fuelLitre: 20.0, bread: 4.0, usd: 18.0 },
  { year: 2023, goldGram: 1800, fuelLitre: 35.0, bread: 7.0, usd: 27.0 },
  { year: 2024, goldGram: 2400, fuelLitre: 43.0, bread: 10.0, usd: 32.0 },
  { year: 2025, goldGram: 3100, fuelLitre: 45.0, bread: 15.0, usd: 34.0 },
];

export const countries: CountryData[] = [
  {
    id: "tr",
    name: "Türkiye",
    flag: "🇹🇷",
    minWage: 17002,
    currency: "TL",
    products: {
      iphone: 85000,
      tesla: 2500000,
      pizza: 300,
      nike: 4500,
    },
  },
  {
    id: "us",
    name: "ABD",
    flag: "🇺🇸",
    minWage: 1200,
    currency: "$",
    products: {
      iphone: 999,
      tesla: 45000,
      pizza: 15,
      nike: 120,
    },
  },
  {
    id: "de",
    name: "Almanya",
    flag: "🇩🇪",
    minWage: 1500,
    currency: "€",
    products: {
      iphone: 1100,
      tesla: 42000,
      pizza: 12,
      nike: 110,
    },
  },
  {
    id: "jp",
    name: "Japonya",
    flag: "🇯🇵",
    minWage: 160000,
    currency: "¥",
    products: {
      iphone: 140000,
      tesla: 5500000,
      pizza: 2500,
      nike: 15000,
    },
  },
  {
    id: "br",
    name: "Brezilya",
    flag: "🇧🇷",
    minWage: 1412,
    currency: "R$",
    products: {
      iphone: 7000,
      tesla: 350000,
      pizza: 60,
      nike: 800,
    },
  },
  {
    id: "gb",
    name: "İngiltere",
    flag: "🇬🇧",
    minWage: 1600,
    currency: "£",
    products: {
      iphone: 950,
      tesla: 40000,
      pizza: 14,
      nike: 100,
    },
  },
  {
    id: "fr",
    name: "Fransa",
    flag: "🇫🇷",
    minWage: 1400,
    currency: "€",
    products: {
      iphone: 1150,
      tesla: 43000,
      pizza: 13,
      nike: 115,
    },
  },
  {
    id: "ch",
    name: "İsviçre",
    flag: "🇨🇭",
    minWage: 4000,
    currency: "CHF",
    products: {
      iphone: 1000,
      tesla: 50000,
      pizza: 25,
      nike: 150,
    },
  },
  {
    id: "az",
    name: "Azerbaycan",
    flag: "🇦🇿",
    minWage: 345,
    currency: "₼",
    products: {
      iphone: 2200,
      tesla: 120000,
      pizza: 15,
      nike: 250,
    },
  },
  {
    id: "cn",
    name: "Çin",
    flag: "🇨🇳",
    minWage: 2500,
    currency: "¥",
    products: {
      iphone: 6000,
      tesla: 250000,
      pizza: 50,
      nike: 600,
    },
  },
  {
    id: "ru",
    name: "Rusya",
    flag: "🇷🇺",
    minWage: 19242,
    currency: "₽",
    products: {
      iphone: 100000,
      tesla: 5000000,
      pizza: 800,
      nike: 10000,
    },
  },
  {
    id: "it",
    name: "İtalya",
    flag: "🇮🇹",
    minWage: 1400,
    currency: "€",
    products: {
      iphone: 1100,
      tesla: 45000,
      pizza: 10,
      nike: 120,
    },
  },
];

export const venues: VenueData[] = [
  {
    id: "starbucks",
    name: "Starbucks",
    productName: "Caffe Latte",
    imageUrl: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop",
    color: "#FEF3C7",
    unit: "Bardak",
    history: {
      2010: 6.5,
      2015: 9.5,
      2020: 16.0,
      2023: 65.0,
    },
    currentPrice: 115.0,
  },
  {
    id: "mcdonalds",
    name: "McDonald's",
    productName: "Big Mac Menü",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop",
    color: "#FEE2E2",
    unit: "Menü",
    history: {
      2010: 12.0,
      2015: 18.0,
      2020: 35.0,
      2023: 180.0,
    },
    currentPrice: 280.0,
  },
  {
    id: "nusret",
    name: "Nusr-Et",
    productName: "Kuzu Kafes",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop",
    color: "#FFEDD5",
    unit: "Porsiyon",
    history: {
      2015: 250,
      2020: 650,
      2023: 2800,
    },
    currentPrice: 4500,
  },
  {
    id: "oses",
    name: "Oses Çiğ Köfte",
    productName: "Çiğ Köfte Dürüm",
    imageUrl: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=600&auto=format&fit=crop",
    color: "#FEF2F2",
    unit: "Dürüm",
    history: {
      2010: 3.5,
      2015: 6.0,
      2020: 12.0,
      2023: 45.0,
    },
    currentPrice: 85.0,
  },
  {
    id: "simitsarayi",
    name: "Simit Sarayı",
    productName: "Sade Simit",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop",
    color: "#FFF7ED",
    unit: "Adet",
    history: {
      2010: 1.0,
      2015: 1.75,
      2020: 3.5,
      2023: 12.0,
    },
    currentPrice: 20.0,
  },
  {
    id: "kofteciyusuf",
    name: "Köfteci Yusuf",
    productName: "Köfte (200gr)",
    imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=600&auto=format&fit=crop",
    color: "#FDF2F2",
    unit: "Porsiyon",
    history: {
      2015: 18.0,
      2020: 32.0,
      2023: 140.0,
    },
    currentPrice: 260.0,
  },
  {
    id: "tavukdunyasi",
    name: "Tavuk Dünyası",
    productName: "Kekiklim",
    imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600&auto=format&fit=crop",
    color: "#F0FDF4",
    unit: "Tabak",
    history: {
      2015: 19.5,
      2020: 34.0,
      2023: 145.0,
    },
    currentPrice: 295.0,
  },
];
