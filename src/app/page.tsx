'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductModal from '@/components/ui/ProductModal';
import SubmitButton from '@/components/ui/SubmitButton';
import ProductSlider from '@/components/ui/ProductSlider';
import LoadingScreen from '@/components/layout/LoadingScreen';
import HeroSlider from '@/components/ui/HeroSlider';
import introJs from 'intro.js';
import 'intro.js/introjs.css';

export default function HomePage() {
  const [productLinks, setProductLinks] = useState<string[]>(['', '']);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Define steps for intro.js
  const steps = [
    {
      element: '.tutor-3',
      intro: 'For better results, compare similar product such as iphone & samsung.',
      position: 'bottom' as const,
    },
    {
      element: '.add-product-button',
      intro: 'Click here to compare more than 2 products.',
      position: 'bottom' as const,
    },
    {
      element: '.submit-button',
      intro: 'Click here to run the AI comparison.',
      position: 'bottom' as const,
    },
  ];
  // Delay loading screen
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  // Run intro.js tour on page load
  useEffect(() => {
    if (!loading) {
      const intro = introJs();
      intro.setOptions({
        steps,
        showProgress: true,
        showBullets: false,
        exitOnOverlayClick: false,
        disableInteraction: false, // allow clicking inside tooltip
        overlayOpacity: 0.45,
        skipLabel: 'Skip',
        doneLabel: 'Done',
        nextLabel: 'Next',
        prevLabel: 'Back',
      });
      intro.start();
    }
  }, [loading]);

  const handleInputChange = (index: number, value: string) => {
    const newLinks = [...productLinks];
    newLinks[index] = value;
    setProductLinks(newLinks);
  };

  const handleSubmit = () => {
    const links = productLinks.filter(link => link.trim() !== '');
    const query = encodeURIComponent(JSON.stringify(links));
    window.location.href = `/comparison?links=${query}`;
  };

  const handleCompareFromModal = (links: string[]) => {
    setProductLinks(links);
    setShowModal(false);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <main className="min-h-screen text-gray-900 font-sans">
      <Navbar />

      <div className="container max-w-screen-xl px-6 sm:px-10 lg:px-16 xl:px-20 mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
        <div className="w-full space-y-6 max-w-xl">
          <p className="text-sm custom-subtext font-semibold uppercase tracking-wide">
            Analysis &nbsp;&middot;&nbsp; RECOMMENDATION &nbsp;&middot;&nbsp; Benchmark
          </p>
          <h1 className="text-4xl font-semibold max-w-xl" style={{ color: 'var(--h1-text)' }}>
            Smart Amazon Product Comparison with <b>AI</b>
          </h1>
          <p className="max-w-md text-subtext">
            Paste in Amazon product <b>up-to 10</b> URLs, and our AI will compare them and recommend the best choice for you.
          </p>
          <div className="mt space-y-4 tutor-3">
            {productLinks.map((link, i) => (
              <input
                key={i}
                type="text"
                value={link}
                onChange={(e) => handleInputChange(i, e.target.value)}
                placeholder="Paste product URL here"
                className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-orange-500 text-subtext"
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <SubmitButton onClick={() => setShowModal(true)} text="+Add Product" className="add-product-button rounded-lg" />
            <SubmitButton onClick={handleSubmit} text="Try it Now!" className="submit-button rounded-lg" />
          </div>
        </div>

        <div className="w-full py-0 flex">
          {/* <ProductSlider /> */}
          <HeroSlider />
          {/* <img src="/assets/review_1.gif" alt="" /> */}

        </div>
      </div>

      <ProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCompare={handleCompareFromModal}
      />
      <Footer />
    </main>
  );
}
