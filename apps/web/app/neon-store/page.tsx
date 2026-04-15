'use client';

import { useState } from 'react';
import { ProductGrid } from '@/components/neon-store/ProductGrid';
import { ProductHeader } from '@/components/neon-store/ProductHeader';
import { Pagination } from '@/components/neon-store/Pagination';
import { MOCK_PRODUCTS } from '@/data/neon-store-mockup';

export default function NeonStorePage() {
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const totalPages = Math.ceil(MOCK_PRODUCTS.length / productsPerPage);

  return (
    <>
      <ProductHeader 
        title="Placas de Video" 
        resultCount={MOCK_PRODUCTS.length}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <ProductGrid products={MOCK_PRODUCTS} />
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
