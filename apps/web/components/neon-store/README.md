# Neon Monolith - Gaming E-Commerce Store

## 📋 Descripción

Tienda de e-commerce de gaming hardware de alto rendimiento con diseño "Neon Monolith". Construida con Next.js, React, TypeScript y Tailwind CSS.

## 🏗️ Estructura del Proyecto

```
app/
├── neon-store/
│   ├── layout.tsx          # Layout principal de la tienda
│   └── page.tsx            # Página principal con grid de productos
├── globals.css             # Estilos globales
├── layout.tsx              # Layout raíz de la aplicación
└── page.tsx                # Redirecciona a /neon-store

components/
└── neon-store/
    ├── HeaderNav.tsx                  # Barra de navegación superior
    ├── SideNavBar.tsx                 # Barra lateral con categorías y filtros
    ├── ProductCard.tsx                # Tarjeta individual de producto
    ├── ProductGrid.tsx                # Grid responsivo de productos
    ├── ProductHeader.tsx              # Header de resultados y sorting
    ├── Pagination.tsx                 # Componente de paginación
    ├── Footer.tsx                     # Footer de la tienda
    └── filters/
        ├── CategoryMenu.tsx           # Menú de categorías
        ├── PriceFilter.tsx            # Filtro de rango de precio
        ├── BrandsFilter.tsx           # Filtro de marcas
        ├── StockFilter.tsx            # Filtro de disponibilidad
        └── RatingFilter.tsx           # Filtro de calificación

lib/
└── neon-store-utils.ts    # Utilidades y funciones helpers

types/
└── neon-store.ts          # Tipos e interfaces TypeScript

tailwind.config.ts          # Configuración de Tailwind CSS
```

## 🎨 Características de Diseño

### Paleta de Colores
- **Fondo Base**: #0e0e0e (Neon Black)
- **Color Primario**: #6dddff (Neon Cyan)
- **Color Primario Contenedor**: #00d2fd (Bright Cyan)
- **Color de Error**: #ff716c (Neon Red)
- **Terciario**: #82a3ff (Neon Blue)

### Tipografía
- **Encabezados**: Space Grotesk (bold, geometric, tech-feel)
- **Cuerpo**: Inter (legible, neutral, funcional)

### Componentes Estilizados
- ✨ Efecto de brillo "Neon Glow" en tarjetas
- 🌀 Barra lateral con scroll personalizado
- 🎛️ Controles deslizantes de rango interactivos
- 🔲 Checkboxes y controles de formulario personalizados
- 📱 Diseño completamente responsivo

## 🚀 Guía de Uso

### Crear una Nueva Página de Categoría

```typescript
// app/neon-store/[category]/page.tsx
import { ProductGrid } from '@/components/neon-store/ProductGrid';
import { ProductHeader } from '@/components/neon-store/ProductHeader';

export default function CategoryPage({ params }: { params: { category: string } }) {
  return (
    <>
      <ProductHeader 
        title={`${decodeURIComponent(params.category)}`}
        resultCount={0}
        sortBy="newest"
        onSortChange={() => {}}
      />
      <ProductGrid products={[]} />
    </>
  );
}
```

### Agregar un Nuevo Filtro

```typescript
// components/neon-store/filters/NewFilter.tsx
'use client';

interface NewFilterProps {
  value: any;
  onChange: (value: any) => void;
}

export function NewFilter({ value, onChange }: NewFilterProps) {
  return (
    <div className="mb-8 flex flex-col gap-3">
      <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1 block">
        Nuevo Filtro
      </span>
      {/* Contenido del filtro */}
    </div>
  );
}
```

### Usar el Componente ProductCard

```typescript
<ProductCard
  id={1}
  name="RTX 4080"
  brand="NVIDIA"
  price={1399}
  originalPrice={1549}
  image="https://example.com/image.jpg"
  status="IN_STOCK"
  alt="Graphics Card"
  onAddToCart={() => console.log('Agregado al carrito')}
/>
```

## 📦 Componentes Disponibles

### HeaderNav
Barra de navegación superior con logo, búsqueda y controles de usuario.

**Props**: Ninguna (usa estado interno)

### SideNavBar
Barra lateral con categorías y todos los filtros disponibles.

**Props**: Ninguna (usa estado interno)

### ProductCard
Tarjeta de producto individual con imagen, nombre, precio y botón de compra.

**Props**:
- `id`: number
- `name`: string
- `brand`: string
- `price`: number
- `originalPrice?`: number
- `image`: string
- `status`: 'IN_STOCK' | 'NEW_ARRIVAL' | 'LIMITED'
- `alt`: string
- `onAddToCart?`: () => void

### ProductGrid
Grid responsivo que renderiza múltiples ProductCards.

**Props**:
- `products`: Product[]

### ProductHeader
Header con título de categoría, contador de resultados y selector de orden.

**Props**:
- `title`: string
- `resultCount`: number
- `sortBy`: string
- `onSortChange`: (value: string) => void

### Filtros
Todos los filtros están en `components/neon-store/filters/`:
- **PriceFilter**: Rango de precio con sliders
- **BrandsFilter**: Checkboxes de marcas
- **StockFilter**: Toggle de disponibilidad
- **RatingFilter**: Selector de estrellas
- **CategoryMenu**: Menú de categorías

## 🎯 Estilos Personalizados

### Clases CSS Disponibles

```css
/* Brillo Neon */
.neon-glow              /* Aplicar brillo suave */
.neon-glow-hover        /* Brillo en hover con borde superior */

/* Scroll personalizado */
.custom-scrollbar       /* Aplicar a contenedores scrollables */

/* Efectos de fuente */
.font-headline          /* Space Grotesk - para encabezados */
.font-body              /* Inter - para texto de cuerpo */
```

### Variables de Tailwind

Se puede usar directamente en clases de Tailwind:

```tsx
<div className="bg-surface-container text-on-surface">
  <h1 className="text-primary font-headline">Título</h1>
</div>
```

## 🔧 Configuración

### Tailwind Colors
Todos los colores del sistema de diseño están configurados en `tailwind.config.ts`:

```typescript
colors: {
  'primary': '#6dddff',
  'primary-container': '#00d2fd',
  'surface': '#0e0e0e',
  'surface-container': '#1a1a1a',
  // ... más colores
}
```

### Fuentes
Las fuentes se cargan desde Google Fonts en `app/globals.css`:
- Space Grotesk (headings)
- Inter (body, labels)
- Material Symbols Outlined (icons)

## 📱 Responsividad

El diseño es completamente responsivo:
- **Mobile**: 1 columna
- **Tablet (640px)**: 2 columnas
- **Desktop (1024px)**: 3 columnas
- **Large (1280px)**: 4 columnas

## ✨ Próximas Mejoras Sugeridas

- [ ] Integración con carrito de compras
- [ ] Sistema de favoritos
- [ ] Búsqueda en tiempo real
- [ ] Filtros avanzados (especificaciones)
- [ ] Galería de imágenes en detalle de producto
- [ ] Reseñas y calificaciones de usuarios
- [ ] Sistema de autenticación
- [ ] Dashboard de administración
- [ ] API backend integrada
- [ ] Animaciones más elaboradas

## 📄 Licencia

Este proyecto es parte del ecosistema CompAPC.
