# 🖥️ CompaPC

CompaPC es una plataforma web para comparar precios de productos de hardware en Argentina.  
Permite buscar componentes de PC y visualizar rápidamente las mejores ofertas disponibles en distintas tiendas.

---

## 🚀 Objetivo

Facilitar la decisión de compra mostrando:

- precios actualizados
- comparación entre tiendas
- acceso directo a la compra
- (futuro) historial de precios y alertas

---

## ⚙️ Stack Tecnológico

### Frontend
- Next.js
- React
- TypeScript

### Backend
- FastAPI
- Python

### Scraping
- Playwright
- BeautifulSoup

### Base de Datos
- PostgreSQL

### Infraestructura
- Docker
- Docker Compose

---

## 🔄 Flujo del sistema

1. Los scrapers obtienen datos de tiendas
2. Se normalizan los productos
3. Se almacenan en la base de datos
4. El backend expone endpoints
5. El frontend consume la API y muestra resultados

---

## ⚠️ Disclaimer

CompaPC actúa únicamente como comparador de precios.
No comercializa productos ni garantiza la exactitud o disponibilidad de los precios publicados, los cuales dependen de terceros.

---

## 🔐 Licencia

Este proyecto está bajo la licencia MIT.
Ver el archivo LICENSE para más detalles.

---

## 👨‍💻 Autor

### Desarrollado por Tomás Rivetta

- Portfolio: https://totoridev.netlify.app/
- GitHub: https://github.com/TomasRivetta
