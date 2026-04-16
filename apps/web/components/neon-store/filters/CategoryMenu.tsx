'use client';

import { useState } from 'react';

const CATEGORIES = [
  { id: 'gpu', name: 'Placas de video', icon: 'videogame_asset' },
  { id: 'cpu', name: 'Procesadores', icon: 'memory' },
  { id: 'mobo', name: 'Motherboards', icon: 'settings_input_component' },
  { id: 'ram', name: 'Memorias RAM', icon: 'sd_card' },
  { id: 'storage', name: 'Almacenamiento', icon: 'database' },
  { id: 'peripherals', name: 'Periféricos', icon: 'mouse' },
];

interface CategoryMenuProps {
  onItemClick?: () => void;
}

export function CategoryMenu({ onItemClick }: CategoryMenuProps) {
  const [active, setActive] = useState('gpu');

  const handleItemClick = (id: string) => {
    setActive(id);
    if (onItemClick) onItemClick();
  };

  return (
    <div className="flex flex-col py-8 px-6 gap-2">
      <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-[#00d4ff] mb-4">CATEGORIES</h3>
      {CATEGORIES.map((category) => (
        <button 
          key={category.id}
          className={`flex items-center gap-3 py-3 px-4 rounded-md text-xs font-semibold uppercase tracking-widest transition-all ${
            active === category.id 
              ? 'text-[#00d4ff] bg-[#1a1a1a] border-r-2 border-[#00d4ff]' 
              : 'text-white/40 hover:text-white/80 hover:bg-[#131111] hover:translate-x-1'
          }`}
          onClick={() => handleItemClick(category.id)}
        >
          <span className="material-symbols-outlined text-sm">{category.icon}</span>
          {category.name}
        </button>
      ))}
    </div>
  );
}

