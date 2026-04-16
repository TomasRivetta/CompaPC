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
    <div className="bg-[#0e0e0e] min-h-screen relative font-body text-white/80">
      <HeaderNav onMenuClick={() => setIsSidebarOpen(true)} />
      
      {/* Mobile Drawer Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-[110] transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Main Structural Layout */}
      <div className="flex pt-20">
        
        {/* Sidebar - Fixed on Desktop, Drawer on Mobile */}
        <aside 
          className={`fixed lg:sticky top-20 left-0 bottom-0 w-72 h-[calc(100vh-5rem)] bg-[#0e0e0e] z-[120] lg:z-10 transition-transform duration-300 lg:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <SideNavBar onClose={() => setIsSidebarOpen(false)} />
        </aside>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#0e0e0e]">
          <main className="flex-1 px-4 sm:px-8 lg:px-12 py-10">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

