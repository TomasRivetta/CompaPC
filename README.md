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

## 🐳 Docker

### Requisitos previos

- Tener Docker Desktop instalado
- Tener Docker Desktop iniciado
- Ejecutar los comandos desde la raíz del proyecto

### 1. Levantar la aplicación

Desde la raíz del proyecto:

```bash
cd c:\Users\minio\Dev\personal\compapc
docker compose -f infra/docker/docker-compose.yml up --build
```

Esto levanta:

- web: `http://localhost:3000`
- api: `http://localhost:8000/health`
- db: `localhost:5432`

El flujo de navegación queda así:

`usuario -> Next.js -> FastAPI -> PostgreSQL`

El scraper no se ejecuta al visitar la web.

### 2. Cargar datos con scraping manual

Cuando quieras actualizar precios, ejecutá el scraper manualmente:

```bash
docker compose -f infra/docker/docker-compose.yml build scraper
docker compose -f infra/docker/docker-compose.yml --profile scraper run --rm scraper
```

También podés usar una sola línea:

```bash
docker compose -f infra/docker/docker-compose.yml --profile scraper run --rm --build scraper
```

Ese proceso:

1. crea el contenedor del scraper
2. ejecuta el scraping
3. guarda los productos en PostgreSQL
4. termina solo
5. elimina el contenedor temporal por `--rm`

### 3. Verificar que todo está funcionando

Revisá que los servicios estén corriendo:

```bash
docker compose -f infra/docker/docker-compose.yml ps
```

Probá la API:

```bash
http://localhost:8000/health
http://localhost:8000/offers?limit=10
```

Probá la web:

```bash
http://localhost:3000
```

Si la home carga pero una categoría no muestra productos, normalmente significa que todavía no corriste el scraper o que no hay datos útiles cargados para esa categoría.

### 4. Ver logs si algo falla

Logs del backend:

```bash
docker compose -f infra/docker/docker-compose.yml logs -f api
```

Logs del frontend:

```bash
docker compose -f infra/docker/docker-compose.yml logs -f web
```

Logs del scraper:

```bash
docker compose -f infra/docker/docker-compose.yml --profile scraper run --rm scraper
```

### 5. Apagar todo

```bash
docker compose -f infra/docker/docker-compose.yml down
```

Si querés bajar también los volúmenes de base de datos:

```bash
docker compose -f infra/docker/docker-compose.yml down -v
```

### 6. Qué comando correr según lo que cambies

Si modificás el frontend en `apps/web`:

```bash
docker compose -f infra/docker/docker-compose.yml up --build -d web
```

Si modificás el backend en `apps/api`:

```bash
docker compose -f infra/docker/docker-compose.yml up --build -d api
```

Si modificás scrapers en `services/scrapers`:

```bash
docker compose -f infra/docker/docker-compose.yml build scraper
docker compose -f infra/docker/docker-compose.yml --profile scraper run --rm scraper
```

Si modificaste varias partes o querés reconstruir todo:

```bash
docker compose -f infra/docker/docker-compose.yml up --build -d
```

Si solo querés comprobar que sigue levantado:

```bash
docker compose -f infra/docker/docker-compose.yml ps
```

### 7. Flujo recomendado de desarrollo

Flujo sugerido para trabajar sin perder tiempo:

1. Levantá la base, la API y la web:

```bash
docker compose -f infra/docker/docker-compose.yml up --build -d
```

2. Hacé cambios en el código.

3. Reconstruí solo el servicio que cambiaste:

- `apps/web`:

```bash
docker compose -f infra/docker/docker-compose.yml up --build -d web
```

- `apps/api`:

```bash
docker compose -f infra/docker/docker-compose.yml up --build -d api
```

- `services/scrapers`:

```bash
docker compose -f infra/docker/docker-compose.yml build scraper
docker compose -f infra/docker/docker-compose.yml --profile scraper run --rm scraper
```

4. Si necesitás datos nuevos, corré scraping manual.

5. Si tocaste varias capas al mismo tiempo, reconstruí todo:

```bash
docker compose -f infra/docker/docker-compose.yml up --build -d
```

6. Verificá estado o logs si algo no responde:

```bash
docker compose -f infra/docker/docker-compose.yml ps
docker compose -f infra/docker/docker-compose.yml logs -f web
docker compose -f infra/docker/docker-compose.yml logs -f api
```

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
