# DevStacks

Munkaerőpiaci Skill Intelligence Platform — valós idejű képet ad a technológiai álláspiacon keresett skill-ekről.

## Stack

- **Backend:** PHP 8.3 + Laravel 11 (API Gateway, Scraper, Analytics, Alert)
- **Data Engineering:** Python 3.12 + spaCy + pandas + Apache Airflow
- **Frontend:** Vue 3 + Pinia + Chart.js + D3.js
- **Adatbázisok:** PostgreSQL 16 · MongoDB 7 · Redis 7
- **Cloud:** AWS ECS Fargate · SQS · RDS · DocumentDB · S3

## Gyors indítás

### Előkövetelmény

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (vagy Docker Engine + Compose v2)
- Git

### 1. Klónozás és konfiguráció

```bash
git clone <repo-url> devstacks
cd devstacks
```

### 2. Konténerek indítása

```bash
cd infrastructure
docker compose up -d
```

Az első indítás 5–10 percet vesz igénybe (Docker image-ek build + spaCy modell letöltése).

### 3. Ellenőrzés

```bash
docker compose ps
# Minden service "Up (healthy)" állapotban kell legyen
```

### Elérhető szolgáltatások lokálisan

| Szolgáltatás | URL |
|---|---|
| Vue Frontend | http://localhost:5173 |
| API Gateway | http://localhost:8000 |
| Airflow UI | http://localhost:8080 (admin/admin) |
| Mailpit (email) | http://localhost:8025 |
| PostgreSQL | localhost:5432 |
| MongoDB | localhost:27017 |
| Redis | localhost:6379 |
| LocalStack (AWS) | http://localhost:4566 |

### 4. Laravel migrációk futtatása

```bash
docker compose exec api-gateway php artisan migrate
docker compose exec api-gateway php artisan db:seed --class=SkillOntologySeeder
```

### 5. Hasznos parancsok

```bash
# Logok követése
docker compose logs -f api-gateway

# Scraper egyszeri futtatása
docker compose exec scraper-service php artisan scrape:run --source=all

# Pipeline manuális indítása
docker compose exec data-pipeline python -m pipeline.run

# Queue worker indítása (scraper-hez)
docker compose exec scraper-service php artisan queue:work

# Összes konténer leállítása (adatok megmaradnak)
docker compose down

# Teljes reset (adatok törlésével!)
docker compose down -v
```

## Projekt struktúra

```
devstacks/
├── services/
│   ├── api-gateway/          # Laravel API Gateway
│   ├── scraper-service/      # Laravel Scraper
│   ├── data-pipeline/        # Python ETL + Airflow
│   ├── analytics-service/    # Laravel Analytics
│   └── alert-service/        # Laravel Alert
├── frontend/                 # Vue 3 SPA
├── infrastructure/
│   ├── docker-compose.yml    # Lokális fejlesztői környezet
│   ├── localstack-init/      # AWS erőforrások auto-létrehozása
│   └── terraform/            # AWS infrastruktúra (IaC)
└── database/
    ├── migrations/           # Laravel migrációk
    └── seeds/                # Alap adatok (skill ontológia)
```

## Fejlesztési dokumentáció

Részletes architektúra leírás: [DevStacks_dokumentacio.md](./DevStacks_dokumentacio.md)
