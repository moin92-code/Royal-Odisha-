import React, { useState, useEffect } from 'react';
import { MessageCircle, Mail, Phone, MapPin, CheckCircle2, X, Send, Menu } from 'lucide-react';

// Product Data based on your uploads
const PRODUCTS = [
  { id: 'HLD-132', category: 'Designer Doors', name: 'Premium Floral Inlay Door', image: '/api/placeholder/400/600' },
  { id: 'HLD-133', category: 'Designer Doors', name: 'Modern Geometric Door', image: '/api/placeholder/400/600' },
  { id: 'HLD-147', category: 'Designer Doors', name: 'Deep Carved Walnut Door', image: '/api/placeholder/400/600' },
  { id: '3CD-412', category: 'Designer Doors', name: 'Royal Arch Carved Door', image: '/api/placeholder/400/600' },
  { id: 'MIR-01', category: 'LED Mirrors', name: 'Geometric Infinity Mirror', image: '/api/placeholder/400/400' },
  { id: 'MIR-02', category: 'LED Mirrors', name: 'Circular Nature LED Mirror', image: '/api/placeholder/400/400' },
  { id: 'MIR-03', category: 'LED Mirrors', name: 'Oval Greek Border Mirror', image: '/api/placeholder/400/400' },
];

const OTHER_SERVICES = ['Stair Railings', 'Aluminium Windows', 'Wooden Cupboards', 'Modular Kitchen'];

export default function RoyalOdishaLanding() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', address: '', message: '' });

  // Theme Colors based on Logo
  const colors = {
    gold: '#D4AF37',
    deepBlack: '#1A1A1A',
    accentOrange: '#FF8C00',
  };

  const handleQuoteRequest = (product) => {
    setSelectedProduct(product);
    setFormData({ ...formData, message: `Inquiry for ${product.category}: ${product.id}` });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // WhatsApp Automation Logic
    const waMessage = `*New Inquiry for Royal Odisha*%0A
*Name:* ${formData.name}%0A
*Phone:* ${formData.phone}%0A
*Product:* ${selectedProduct?.id || 'General'}%0A
*Address:* ${formData.address}%0A
*Message:* ${formData.message}`;
    
    const waLink = `https://wa.me/917853903438?text=${waMessage}`;
    
    // In a real app, you'd trigger EmailJS here
    console.log("Sending to royalodisha941@gmail.com", formData);
    
    window.open(waLink, '_blank');
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#1A1A1A] text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] overflow-hidden bg-black">
              <img src="/logo.png" alt="Royal Odisha Logo" className="object-cover" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight tracking-tight text-[#D4AF37]">ROYAL ODISHA</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Interior & Hardware</p>
            </div>
          </div>
          <a href="tel:+917853903438" className="bg-[#FF8C00] p-2 rounded-full md:hidden">
            <Phone size={20} />
          </a>
          <nav className="hidden md:flex gap-6 font-medium">
            <a href="#catalog" className="hover:text-[#D4AF37]">Products</a>
            <a href="#services" className="hover:text-[#D4AF37]">Services</a>
            <button onClick={() => setIsModalOpen(true)} className="bg-[#D4AF37] px-4 py-2 rounded text-black font-bold">Get Quote</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#1A1A1A] text-white py-16 px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Premium Interior Solutions in <span className="text-[#FF8C00]">Odisha</span></h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-8">Transforming homes with designer doors, LED mirrors, and luxury fabrication.</p>
        <div className="flex justify-center gap-4">
          <button onClick={() => document.getElementById('catalog').scrollIntoView()} className="bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-bold shadow-xl">View Designs</button>
        </div>
      </section>

      {/* Product Catalog */}
      <main id="catalog" className="container mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold mb-8 border-l-4 border-[#FF8C00] pl-4">Product Catalog</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {PRODUCTS.map((product) => (
            <div 
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className={`relative group rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${selectedProduct?.id === product.id ? 'border-[#FF8C00] shadow-xl' : 'border-transparent'}`}
            >
              <img src={product.image} alt={product.name} className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute top-2 right-2">
                {selectedProduct?.id === product.id && (
                  <div className="bg-[#FF8C00] text-white p-1 rounded-full"><CheckCircle2 size={20} /></div>
                )}
              </div>
              <div className="p-3 bg-white">
                <p className="text-[10px] text-gray-500 font-bold uppercase">{product.category}</p>
                <p className="font-bold text-sm truncate">{product.id}</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleQuoteRequest(product); }}
                  className="mt-2 w-full bg-[#1A1A1A] text-white py-2 rounded text-xs font-bold"
                >
                  Get Free Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Other Services Sections */}
      <section id="services" className="bg-gray-100 py-12 px-4">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">Our Specializations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {OTHER_SERVICES.map(service => (
              <div key={service} className="bg-white p-6 rounded-xl shadow-sm text-center border-b-4 border-[#D4AF37]">
                <p className="font-bold">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Fixed Button */}
      <a 
        href="https://wa.me/917853903438"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center gap-2 hover:scale-110 transition-transform"
      >
        <MessageCircle fill="currentColor" />
        <span className="hidden md:inline font-bold">Chat with Us</span>
      </a>

      {/* Quote Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden relative">
            {isSubmitted ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
                <p className="text-gray-600">Thanks for choosing Royal Odisha! I will contact you soon.</p>
              </div>
            ) : (
              <>
                <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black">
                  <X size={24} />
                </button>
                <div className="p-6 bg-[#1A1A1A] text-white">
                  <h2 className="text-xl font-bold">Request a Free Quote</h2>
                  <p className="text-sm text-gray-400">Share your details for {selectedProduct?.id || 'Interior Design'}</p>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <input required type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg" onChange={e => setFormData({...formData, name: e.target.value})} />
                  <input required type="tel" placeholder="WhatsApp Number" className="w-full p-3 border rounded-lg" onChange={e => setFormData({...formData, phone: e.target.value})} />
                  <input type="email" placeholder="Email Address (Optional)" className="w-full p-3 border rounded-lg" onChange={e => setFormData({...formData, email: e.target.value})} />
                  <textarea required placeholder="Project Address" className="w-full p-3 border rounded-lg h-20" onChange={e => setFormData({...formData, address: e.target.value})} />
                  <textarea readOnly value={formData.message} className="w-full p-3 border rounded-lg bg-gray-50 text-gray-500 h-16 text-sm" />
                  <button type="submit" className="w-full bg-[#FF8C00] text-white py-4 rounded-lg font-bold text-lg shadow-lg flex items-center justify-center gap-2">
                    Submit & Open WhatsApp <Send size={18} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-gray-400 py-12 px-4 border-t border-gray-800">
        <div className="container mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">Contact Us</h4>
            <p className="flex items-center gap-2 mb-2"><Phone size={16} /> +91 8328801414</p>
            <p className="flex items-center gap-2 mb-2"><Mail size={16} /> royalodisha941@gmail.com</p>
            <p className="flex items-center gap-2 leading-relaxed"><MapPin size={16} /> Birmitrapur, Sundargarh, Odisha</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">Our Work</h4>
            <ul className="text-sm space-y-2">
              <li>Luxury Door Installations</li>
              <li>LED Mirror Customization</li>
              <li>Aluminium Fabrication</li>
            </ul>
          </div>
          <div className="text-center md:text-right">
             <p className="text-xs">© 2026 Royal Odisha Interior.</p>
             <p className="text-[10px] mt-2">Designed for Premium Quality.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
