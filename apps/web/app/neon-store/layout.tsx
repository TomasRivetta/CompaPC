'use client';

import { useState } from 'react';
import { HeaderNav } from "@/components/neon-store/HeaderNav";
import { SideNavBar } from "@/components/neon-store/SideNavBar";
import { Footer } from "@/components/neon-store/Footer";

export default function NeonStoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-surface min-h-screen relative">
      <HeaderNav onMenuClick={() => setIsSidebarOpen(true)} />
      
      {/* Mobile Drawer Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-[110] transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Main Container using Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[18rem_1fr] pt-20">
        
        {/* Sidebar Holder - Sticky on Desktop, Drawer on Mobile */}
        <aside 
          className={`fixed lg:sticky top-20 left-0 bottom-0 w-72 lg:w-auto h-[calc(100vh-5rem)] bg-surface lg:bg-transparent z-[120] lg:z-auto transition-transform duration-300 lg:translate-x-0 custom-scrollbar overflow-y-auto ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <SideNavBar onClose={() => setIsSidebarOpen(false)} />
        </aside>

        {/* Content Area */}
        <div className="min-h-[calc(100vh-5rem)] flex flex-col min-w-0">
          <main className="flex-1 bg-surface-container-low px-4 sm:px-8 lg:px-12 py-10">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
