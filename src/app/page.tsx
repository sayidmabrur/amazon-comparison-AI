'use client';

import { useState, useEffect, useRef } from 'react';
import { color, motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductModal from '@/components/ui/ProductModal';
import SubmitButton from '@/components/ui/SubmitButton';
import ProductSlider from '@/components/ui/ProductSlider';
import LoadingScreen from '@/components/layout/LoadingScreen';


export default function HomePage() {
  const [productLinks, setProductLinks] = useState<string[]>(['', '']);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true); // 👈 loading state

  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  // Delay loading for 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout); // cleanup
  }, []);

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

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  // 👇 Show loading screen if still loading
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <main className="min-h-screen text-gray-900 font-sans">
      <Navbar />

      <div className="container mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left content animated */}
        <motion.div
          className="w-full space-y-6 max-w-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInLeft}
        >
          <p className="text-sm text-orange-600 font-semibold uppercase tracking-wide">
            Analysis &nbsp;&middot;&nbsp; RECOMMENDATION &nbsp;&middot;&nbsp; Benchmark
          </p>
          <h1 className="text-4xl font-semibold max-w-xl " style={{ color: 'var(--h1-text)' }}>
            Smart Amazon Product Comparison with <b>AI</b>
          </h1>
          <p className="max-w-md">
            Paste in Amazon product <b>up-to 10</b> URLs, and our AI will compare them and recommend the best choice for you.
          </p>
          <div className="mt space-y-4">
            {productLinks.map((link, i) => (
              <input
                key={i}
                type="text"
                value={link}
                onChange={(e) => handleInputChange(i, e.target.value)}
                placeholder="Paste product URL here"
                className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-orange-500"
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <SubmitButton onClick={() => setShowModal(true)} text="+Add Product" className='add-product-button rounded-lg' />
            <SubmitButton onClick={handleSubmit} text="Try it Now!" className='submit-button rounded-lg' />
          </div>
        </motion.div>

        {/* Right content animated */}
        <motion.div
          className="w-full py-0 flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInRight}
        >
          <ProductSlider />
        </motion.div>
      </div>

      {/* Modal */}
      <ProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCompare={handleCompareFromModal}
      />

      <Footer />
    </main >
  );
}
