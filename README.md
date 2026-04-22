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
cd ubicacionDelProyecto
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

# Agregar una nueva tienda

Esta guía resume qué hay que tocar cuando se suma un scraper nuevo al proyecto.

## 1. Crear el scraper

Crear un archivo nuevo en:

`services/scrapers/stores/<tienda>.py`

La convención recomendada es exponer una función:

```python
def get_<tienda>_products() -> list[dict]:
    ...
```

## 2. Shape obligatorio de cada producto

Cada scraper debe devolver una lista de diccionarios con este formato:

```python
{
    "store": "nombre_tienda",
    "id": 1234,
    "title": "Nombre del producto",
    "normalized_title": "nombre del producto",
    "price": 99999.0,
    "price_list": 109999.0,
    "stock": 3,
    "category": "Placas de Video",
    "marca": "MSI",
    "url": "https://tienda.com/producto/1234",
    "image": "https://tienda.com/producto.jpg",
}
```

## 3. Campos a tener en cuenta

- `store`: identificador estable de la tienda.
- `id`: identificador externo único dentro de esa tienda.
- `title`: nombre visible del producto.
- `normalized_title`: nombre normalizado para búsquedas y comparación.
- `price`: precio actual.
- `price_list`: precio de lista, si existe.
- `stock`: stock numérico.
- `category`: categoría original de la tienda.
- `marca`: marca del producto.
- `url`: link directo al producto.
- `image`: imagen del producto. Puede ser `None`.

## 4. Helpers recomendados

Si aplica, usar utilidades compartidas:

- `shared.cleaners.clean_text`
- `shared.cleaners.clean_price`
- `shared.normalizer.normalize_name`
- `shared.http.get_json`

## 5. Registrar el scraper en el job principal

Editar:

`services/scrapers/jobs/run_all.py`

Agregar:

```python
from stores.<tienda> import get_<tienda>_products
```

Y sumarlo a la ejecución:

```python
print("Scraping <Tienda>...")
all_products.extend(get_<tienda>_products())
```

## 6. Config opcional

Si la tienda usa endpoints, URLs base o parámetros fijos, crear:

`services/scrapers/config/urls_<tienda>.py`

Ejemplo:

```python
STORE_NAME = "mi_tienda"
BASE_URL = "https://mitienda.com"
PRODUCTS_URL = "https://mitienda.com/api/products"
```

## 7. Persistencia

No hace falta cambiar la persistencia si el scraper respeta el shape esperado.

El guardado actual:

- inserta productos en `product_offers`
- elimina antes los productos anteriores de esa misma `store`

## 8. API

No hace falta cambiar la API para una tienda nueva si no se agregan campos nuevos.

La API ya expone los datos guardados en `product_offers`.

## 9. Frontend

En general no hace falta tocar frontend para que la tienda aparezca.

Sí puede hacer falta ajustar:

`apps/web/lib/neon-store-utils.ts`

Esto aplica si las categorías de la nueva tienda no coinciden con los aliases o keywords actuales.

## 10. Checklist de validación

- El scraper corre sin errores.
- Devuelve productos con el shape correcto.
- `store` es estable.
- `id` es único dentro de la tienda.
- `price` y `url` son válidos.
- `image` no rompe si falta.
- Los productos se persisten en base.
- La API los devuelve en `/offers`.
- La web los muestra correctamente.
- Las categorías se asignan bien.

## 11. Template base de scraper

```python
from shared.cleaners import clean_price, clean_text
from shared.normalizer import normalize_name

STORE_NAME = "mi_tienda"


def get_mi_tienda_products() -> list[dict]:
    products = []

    # Reemplazar por la logica real de scraping
    raw_products = []

    for item in raw_products:
        product = {
            "store": STORE_NAME,
            "id": item.get("id"),
            "title": clean_text(item.get("title")),
            "normalized_title": normalize_name(item.get("title")),
            "price": clean_price(item.get("price")),
            "price_list": clean_price(item.get("price_list")),
            "stock": item.get("stock", 0),
            "category": item.get("category"),
            "marca": item.get("brand"),
            "url": item.get("url"),
            "image": item.get("image"),
        }

        products.append(product)

    return products
```

## 12. Si se agrega un campo nuevo

Si ademas de una tienda nueva se agrega un campo nuevo al producto, entonces hay que revisar:

- modelo SQLAlchemy
- persistencia
- API
- frontend
- migracion o init de DB si corresponde

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
