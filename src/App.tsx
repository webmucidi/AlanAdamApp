import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Globe, MapPin, ArrowLeft, Info, TrendingUp, TrendingDown, History, BarChart3 } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { historicalData, countries, venues } from "./data";

type Page = "years" | "countries" | "venues";

export default function App() {
  const [activePage, setActivePage] = useState<Page>("years");
  const [result, setResult] = useState<any>(null);

  const handleReset = () => setResult(null);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="pt-8 pb-4 px-6 text-center border-b border-gray-100 bg-white sticky top-0 z-10">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Alım Gücü</h1>
          <p className="text-sm text-gray-500 mt-1">Enflasyonun ürünler üzerindeki etkisi</p>
        </header>

        {/* Content */}
        <main className="flex-1 pb-24 overflow-y-auto">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result-screen"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <ResultScreen result={result} onReset={handleReset} />
              </motion.div>
            ) : (
              <motion.div
                key={activePage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="p-6"
              >
                {activePage === "years" && <YearsPage onResult={setResult} />}
                {activePage === "countries" && <CountriesPage onResult={setResult} />}
                {activePage === "venues" && <VenuesPage onResult={setResult} />}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Bottom Navigation */}
        {!result && (
          <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 px-6 py-3 flex justify-around items-center z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            <NavButton
              active={activePage === "years"}
              onClick={() => setActivePage("years")}
              icon={<Calendar size={20} />}
              label="Yıllar"
            />
            <NavButton
              active={activePage === "countries"}
              onClick={() => setActivePage("countries")}
              icon={<Globe size={20} />}
              label="Ülkeler"
            />
            <NavButton
              active={activePage === "venues"}
              onClick={() => setActivePage("venues")}
              icon={<MapPin size={20} />}
              label="Mekanlar"
            />
          </nav>
        )}
      </div>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-colors ${
        active ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
      }`}
    >
      <div className={`p-2 rounded-xl transition-colors ${active ? "bg-gray-100" : ""}`}>
        {icon}
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span>
    </button>
  );
}

// --- YEARS PAGE ---
function YearsPage({ onResult }: { onResult: (res: any) => void }) {
  const [amount, setAmount] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(2010);

  const categories = [
    { id: "gold", name: "Gram Altın Fiyatı", image: "https://loremflickr.com/400/400/gold,ingot", color: "#FEF3C7" },
    { id: "fuel", name: "Benzin Litre Fiyatı", image: "https://loremflickr.com/400/400/gasoline,pump", color: "#DBEAFE" },
    { id: "bread", name: "1 Adet Ekmek Fiyatı", image: "https://loremflickr.com/400/400/bread,bakery", color: "#FFEDD5" },
    { id: "usd", name: "Dolar / Döviz Kuru", image: "https://loremflickr.com/400/400/dollar,money", color: "#D1FAE5" },
  ];

  const handleSelect = (catId: string) => {
    if (!amount || isNaN(Number(amount))) return;
    const numAmount = Number(amount);
    const hist = historicalData.find((d) => d.year === selectedYear);
    const current = historicalData[historicalData.length - 1];
    if (!hist || !current) return;

    let histPrice = 0;
    let currentPrice = 0;
    let unit = "";

    switch (catId) {
      case "gold": histPrice = hist.goldGram; currentPrice = current.goldGram; unit = "Gram Altın"; break;
      case "fuel": histPrice = hist.fuelLitre; currentPrice = current.fuelLitre; unit = "Litre Benzin"; break;
      case "bread": histPrice = hist.bread; currentPrice = current.bread; unit = "Adet Ekmek"; break;
      case "usd": histPrice = hist.usd; currentPrice = current.usd; unit = "Dolar"; break;
    }

    const histCount = numAmount / histPrice;
    const currentCount = numAmount / currentPrice;

    onResult({
      type: "years",
      year: selectedYear,
      amount: numAmount,
      unit,
      catId,
      histCount: histCount.toFixed(1),
      currentCount: currentCount.toFixed(1),
      histPrice,
      currentPrice,
      image: categories.find(c => c.id === catId)?.image,
      color: categories.find(c => c.id === catId)?.color
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <input
            type="number"
            placeholder="Maliyet (TL)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-gray-100 border-none rounded-2xl px-5 py-4 text-lg focus:ring-2 focus:ring-gray-900 transition-all outline-none"
          />
        </div>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="w-full bg-gray-100 border-none rounded-2xl px-5 py-4 text-lg focus:ring-2 focus:ring-gray-900 transition-all outline-none appearance-none cursor-pointer"
        >
          {historicalData.map((d) => (
            <option key={d.year} value={d.year}>{d.year} Seçiniz</option>
          ))}
        </select>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-4">Kategoriler</h2>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className="group relative aspect-square rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all active:scale-95 border border-gray-100"
              style={{ backgroundColor: cat.color }}
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 mix-blend-multiply opacity-80" 
                referrerPolicy="no-referrer" 
                onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/400x400/${cat.color.replace('#', '')}/444?text=${encodeURIComponent(cat.name)}` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-[10px] font-bold leading-tight drop-shadow-sm uppercase tracking-wider">{cat.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- COUNTRIES PAGE ---
function CountriesPage({ onResult }: { onResult: (res: any) => void }) {
  const [selectedCountry1, setSelectedCountry1] = useState<string>("tr");
  const [selectedCountry2, setSelectedCountry2] = useState<string>("de");

  const products = [
    { id: "iphone", name: "iPhone", image: "https://loremflickr.com/400/400/iphone,smartphone", color: "#F3E8FF" },
    { id: "tesla", name: "Tesla", image: "https://loremflickr.com/400/400/tesla,car", color: "#E0F2FE" },
    { id: "pizza", name: "Pizza", image: "https://loremflickr.com/400/400/pizza,food", color: "#FEE2E2" },
    { id: "nike", name: "Nike Air", image: "https://loremflickr.com/400/400/nike,sneakers", color: "#F1F5F9" },
  ];

  const handleSelect = (prodId: string) => {
    if (selectedCountry1 === selectedCountry2) {
      alert("Lütfen farklı iki ülke seçiniz!");
      return;
    }

    const c1 = countries.find(c => c.id === selectedCountry1);
    const c2 = countries.find(c => c.id === selectedCountry2);
    if (!c1 || !c2) return;

    const price1 = (c1.products as any)[prodId];
    const price2 = (c2.products as any)[prodId];

    const calculateWorkTime = (price: number, monthlyWage: number) => {
      const totalMonths = price / monthlyWage;
      if (totalMonths < 1) {
        const hours = totalMonths * 160;
        return `${hours.toFixed(1)} saat`;
      } else if (totalMonths < 24) {
        return `${totalMonths.toFixed(1)} ay`;
      } else {
        const years = totalMonths / 12;
        return `${years.toFixed(1)} yıl`;
      }
    };

    const time1 = calculateWorkTime(price1, c1.minWage);
    const time2 = calculateWorkTime(price2, c2.minWage);

    onResult({
      type: "countries",
      id: prodId,
      country1: c1,
      country2: c2,
      time1,
      time2,
      price1,
      price2,
      productName: products.find(p => p.id === prodId)?.name,
      image: products.find(p => p.id === prodId)?.image,
      color: products.find(p => p.id === prodId)?.color
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Alım Gücü - Ülke Kıyaslaması</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">1. Ülke</label>
            <select
              value={selectedCountry1}
              onChange={(e) => setSelectedCountry1(e.target.value)}
              className="w-full bg-gray-100 border-none rounded-2xl px-4 py-4 text-sm focus:ring-2 focus:ring-gray-900 transition-all outline-none appearance-none cursor-pointer"
            >
              {countries.map((c) => (
                <option key={c.id} value={c.id}>{c.flag} {c.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">2. Ülke</label>
            <select
              value={selectedCountry2}
              onChange={(e) => setSelectedCountry2(e.target.value)}
              className="w-full bg-gray-100 border-none rounded-2xl px-4 py-4 text-sm focus:ring-2 focus:ring-gray-900 transition-all outline-none appearance-none cursor-pointer"
            >
              {countries.map((c) => (
                <option key={c.id} value={c.id}>{c.flag} {c.name}</option>
              ))}
            </select>
          </div>
        </div>
        {selectedCountry1 === selectedCountry2 && (
          <p className="text-red-500 text-[10px] font-bold mt-2">Aynı ülkeler birbiriyle kıyaslanamaz!</p>
        )}
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Kıyaslanacak Ürün</h3>
        <div className="grid grid-cols-2 gap-4">
          {products.map((prod) => (
            <button
              key={prod.id}
              disabled={selectedCountry1 === selectedCountry2}
              onClick={() => handleSelect(prod.id)}
              className={`group relative aspect-square rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all active:scale-95 border border-gray-100 ${selectedCountry1 === selectedCountry2 ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{ backgroundColor: prod.color }}
            >
              <img 
                src={prod.image} 
                alt={prod.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 mix-blend-multiply opacity-80" 
                referrerPolicy="no-referrer" 
                onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/400x400/${prod.color.replace('#', '')}/444?text=${encodeURIComponent(prod.name)}` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-[10px] font-bold leading-tight drop-shadow-sm uppercase tracking-wider">{prod.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- VENUES PAGE ---
function VenuesPage({ onResult }: { onResult: (res: any) => void }) {
  const [selectedVenueId, setSelectedVenueId] = useState<string>(venues[0].id);
  const [selectedYear, setSelectedYear] = useState<number>(2010);

  const venue = venues.find(v => v.id === selectedVenueId)!;
  const availableYears = Object.keys(venue.history).map(Number);

  const handleCompare = () => {
    const v = venues.find(v => v.id === selectedVenueId)!;
    const histPrice = v.history[selectedYear];
    const currentPrice = v.currentPrice;

    onResult({
      type: "venues",
      venueName: v.name,
      productName: v.productName,
      year: selectedYear,
      histPrice: histPrice,
      currentPrice: currentPrice,
      image: v.imageUrl,
      color: v.color,
      unit: v.unit
    });
  };

  useEffect(() => {
    if (!availableYears.includes(selectedYear)) {
      const firstYear = availableYears[0];
      setSelectedYear(firstYear);
    }
  }, [selectedVenueId]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Mekan Kıyaslaması</h2>
      <div className="space-y-4">
        <select
          value={selectedVenueId}
          onChange={(e) => setSelectedVenueId(e.target.value)}
          className="w-full bg-gray-100 border-none rounded-2xl px-5 py-4 text-lg focus:ring-2 focus:ring-gray-900 transition-all outline-none appearance-none cursor-pointer"
        >
          {venues.map((v) => (
            <option key={v.id} value={v.id}>{v.name} Seçiniz</option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="w-full bg-gray-100 border-none rounded-2xl px-5 py-4 text-lg focus:ring-2 focus:ring-gray-900 transition-all outline-none appearance-none cursor-pointer"
        >
          {availableYears.map((y) => (
            <option key={y} value={y}>{y} Seçiniz</option>
          ))}
        </select>
      </div>

      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-lg">
        <img 
          src={venue.imageUrl} 
          alt={venue.productName} 
          className="w-full h-full object-cover" 
          referrerPolicy="no-referrer" 
          onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/800x450/222/FFF?text=${encodeURIComponent(venue.name)}` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
          <h3 className="text-white text-2xl font-bold">{venue.name} {venue.productName}</h3>
        </div>
      </div>

      <button
        onClick={handleCompare}
        className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-black active:scale-95 transition-all"
      >
        Kıyasla
      </button>
    </div>
  );
}

// --- RESULT SCREEN ---
function ResultScreen({ result, onReset }: { result: any; onReset: () => void }) {
  const getComparisonImage = () => {
    if (result.type === "years") {
      const urls: Record<string, string> = {
        gold: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
        fuel: "https://images.unsplash.com/photo-1565034946487-077786996e27?w=400",
        bread: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
        usd: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=400"
      };
      return urls[result.catId] || result.image;
    }
    if (result.type === "countries") {
      const urls: Record<string, string> = {
        iphone: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400",
        tesla: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400",
        pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
        nike: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
      };
      return urls[result.id] || result.image;
    }
    return result.image;
  };

  const displayImage = getComparisonImage();
  const placeholderColor = (result.color || "#f3f4f6").replace('#', '');

  return (
    <div className="p-6 space-y-8 pb-24">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-gray-400 flex items-center justify-center gap-2">
          <History size={20} />
          Kıyaslama Analizi
        </h2>
      </div>

      <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-gray-200/50 border border-gray-50 relative overflow-hidden">
        <div className="flex justify-between items-center gap-4 relative z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img 
                src={displayImage} 
                alt="old" 
                className="w-24 h-24 rounded-2xl object-cover shadow-md border-2 border-white" 
                referrerPolicy="no-referrer" 
                onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/200x200/${placeholderColor}/444?text=${encodeURIComponent(result.year || result.country1?.name)}` }}
              />
              <div className="absolute -top-2 -right-2 bg-slate-700 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                {result.type === "venues" ? `${result.histPrice} TL` : result.type === "countries" ? result.time1 : `${result.histCount} ${result.unit}`}
              </div>
            </div>
            <span className="text-sm font-bold text-gray-500">{result.year || result.country1?.name}</span>
          </div>

          <div className="flex-1 flex flex-col items-center">
             <div className="w-full h-[2px] bg-gray-100 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full border border-gray-100 shadow-sm">
                  <ArrowLeft className="rotate-180 text-gray-400" size={20} />
                </div>
             </div>
             {result.type === "years" && (
               <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">
                 <TrendingDown size={12} />
                 %{Math.round((1 - parseFloat(result.currentCount) / parseFloat(result.histCount)) * 100)} Kayıp
               </div>
             )}
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img 
                src={displayImage} 
                alt="new" 
                className="w-16 h-16 rounded-2xl object-cover shadow-sm opacity-60 border-2 border-white" 
                referrerPolicy="no-referrer"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/200x200/${placeholderColor}/444?text=${encodeURIComponent(result.type === "countries" ? result.country2?.name : "Bugün")}` }}
              />
              <div className="absolute -top-2 -right-2 bg-gray-400 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                {result.type === "venues" ? `${result.currentPrice} TL` : result.type === "countries" ? result.time2 : `${result.currentCount} ${result.unit}`}
              </div>
            </div>
            <span className="text-sm font-bold text-gray-500">{result.type === "countries" ? result.country2?.name : "Bugün"}</span>
          </div>
        </div>
      </div>

      {result.type === "years" && (
        <div className="bg-gray-50 rounded-2xl p-4 mx-4 space-y-1">
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Baz Alınan Birim Fiyatlar</p>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{result.year} Yılı Fiyatı:</span>
            <span className="font-bold">{result.histPrice.toLocaleString()} TL</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Bugünkü Fiyat:</span>
            <span className="font-bold">{result.currentPrice.toLocaleString()} TL</span>
          </div>
        </div>
      )}

      {result.type === "countries" && (
        <div className="bg-gray-50 rounded-2xl p-4 mx-4 space-y-1">
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Baz Alınan Birim Fiyatlar</p>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{result.country1.name}:</span>
            <span className="font-bold">{result.price1.toLocaleString()} {result.country1.currency}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{result.country2.name}:</span>
            <span className="font-bold">{result.price2.toLocaleString()} {result.country2.currency}</span>
          </div>
        </div>
      )}

      {result.type === "venues" && (
        <div className="bg-gray-50 rounded-2xl p-4 mx-4 space-y-1">
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Baz Alınan Birim Fiyatlar</p>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{result.year} Yılı Fiyatı:</span>
            <span className="font-bold">{result.histPrice.toLocaleString()} TL</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Bugünkü Fiyat:</span>
            <span className="font-bold">{result.currentPrice.toLocaleString()} TL</span>
          </div>
        </div>
      )}

      <div className="pt-4">
        <button
          onClick={onReset}
          className="w-full bg-slate-800 text-white font-bold py-5 rounded-3xl shadow-xl hover:bg-slate-900 active:scale-95 transition-all"
        >
          Yeni Sorgu
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
        <Info size={14} />
        <span>Veriler yaklaşık değerleri temsil etmektedir.</span>
      </div>
    </div>
  );
}
