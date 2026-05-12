import { Search, ChevronDown, Plus } from 'lucide-react';
import { useStore } from '@/store/useStore';

const categoryPills = ['Sell', 'Categories', 'Vehicles', 'Property', 'Free'];

export default function MarketplaceScreen() {
  const products = useStore((s) => s.products);

  return (
    <div className="flex flex-col h-full relative">
      {/* Header */}
      <header
        className="shrink-0 px-4 pt-3 pb-2 z-50 sticky top-0"
        style={{
          background: 'rgba(24,25,26,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold text-[#E4E6EB]">Marketplace</h1>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full flex items-center justify-center active:bg-[#3A3B3C] transition-colors" style={{ background: 'var(--fb-bg-tertiary)' }}>
              <Search size={20} className="text-[#E4E6EB]" />
            </button>
            <img src="/assets/avatar-alex.jpg" alt="Profile" className="w-9 h-9 rounded-full object-cover" />
          </div>
        </div>

        {/* Location pill */}
        <button className="flex items-center gap-1 mb-3 text-[15px] text-[#E4E6EB]">
          <span>New York, NY</span>
          <ChevronDown size={16} className="text-[#B0B3B8]" />
        </button>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categoryPills.map((cat) => (
            <button
              key={cat}
              className="flex-shrink-0 px-4 h-8 rounded-full text-[13px] font-medium text-[#E4E6EB] active:opacity-80 transition-opacity"
              style={{
                background: cat === 'Sell' ? '#42B72A' : 'var(--fb-bg-tertiary)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Section header */}
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-[17px] font-semibold text-[#E4E6EB]">Today's Picks</h2>
          <button className="text-[15px] text-[#1877F2]">See All</button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-2 px-2 pb-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg overflow-hidden active:opacity-80 transition-opacity"
              style={{ background: 'var(--fb-bg-secondary)' }}
            >
              <div className="relative aspect-square">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-2.5">
                <p className="text-[15px] font-semibold text-[#E4E6EB]">{product.price}</p>
                <p className="text-[13px] text-[#B0B3B8] line-clamp-2 leading-snug mt-0.5">{product.title}</p>
                <p className="text-[12px] text-[#65676B] mt-1">{product.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sell FAB */}
      <button
        className="absolute bottom-4 right-4 w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform z-10"
        style={{ background: '#42B72A' }}
      >
        <Plus size={28} className="text-white" strokeWidth={2.5} />
      </button>
    </div>
  );
}
