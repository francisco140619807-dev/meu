import { useCallback, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BrandsCarousel from "./components/BrandsCarousel";
import Benefits from "./components/Benefits";
import Footer from "./components/Footer";

export default function App() {
  const [headerHeight, setHeaderHeight] = useState(44);
  const handleHeaderHeight = useCallback((height: number) => setHeaderHeight(height), []);
  return (
    <div className="min-h-screen relative selection:bg-red-600 selection:text-white">
      <Header onHeightChange={handleHeaderHeight} />
      <main className="overflow-hidden" style={{ paddingTop: `${headerHeight}px` }}>
        <Hero />
        <BrandsCarousel />
        <Benefits />
      </main>
      <Footer />
    </div>
  );
}
