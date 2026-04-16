'use client';

interface BrandsFilterProps {
  selectedBrands: string[];
  onBrandsChange: (brands: string[]) => void;
}

const BRANDS = ['ASUS', 'MSI', 'Gigabyte', 'Intel'];

export function BrandsFilter({ selectedBrands, onBrandsChange }: BrandsFilterProps) {
  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      onBrandsChange(selectedBrands.filter((b) => b !== brand));
    } else {
      onBrandsChange([...selectedBrands, brand]);
    }
  };

  return (
    <div className="mb-8 flex flex-col gap-3">
      <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1 block">Marcas</span>
      {BRANDS.map((brand) => (
        <label key={brand} className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={selectedBrands.includes(brand)}
            onChange={() => handleBrandChange(brand)}
            className="rounded-sm bg-surface-container-highest border-none text-primary focus:ring-0 focus:ring-offset-0"
          />
          <span className={`text-xs transition-colors ${
            selectedBrands.includes(brand) ? 'text-white' : 'text-white/60 group-hover:text-white'
          }`}>
            {brand}
          </span>
        </label>
      ))}
    </div>
  );
}

