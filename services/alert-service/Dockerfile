# =============================================================
# Laravel service Dockerfile
# Használat: minden PHP Laravel service-hez (api-gateway, scraper, stb.)
# Multi-stage: development (hot reload) és production (optimalizált)
# =============================================================

# -----------------------------------------------------------
# BASE — közös PHP alap mindkét stage-hez
# -----------------------------------------------------------
FROM php:8.3-fpm-alpine AS base

# System dependencies
RUN apk add --no-cache \
    postgresql-dev \
    libzip-dev \
    oniguruma-dev \
    curl \
    nginx \
    supervisor

# PHP extensions
RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    pgsql \
    zip \
    mbstring \
    pcntl \
    bcmath

# MongoDB PHP extension (pecl-ből)
RUN apk add --no-cache $PHPIZE_DEPS \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb \
    && apk del $PHPIZE_DEPS

# Redis PHP extension
RUN apk add --no-cache $PHPIZE_DEPS \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apk del $PHPIZE_DEPS

# Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# -----------------------------------------------------------
# DEVELOPMENT — volume mount-tal, nincs kód copy
# -----------------------------------------------------------
FROM base AS development

# PHP konfiguráció fejlesztőkhöz
RUN cp "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"

# Nginx konfiguráció
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Supervisor: nginx + php-fpm egyszerre fut
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

# -----------------------------------------------------------
# PRODUCTION — kód bemásolva, optimalizált
# -----------------------------------------------------------
FROM base AS production

RUN cp "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Kód másolása
COPY . .

# Composer install (dev dependencies nélkül)
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --no-progress

# Laravel cache-elés production-ban
RUN php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

# Fájljogosultságok
RUN chown -R www-data:www-data /var/www/html/storage \
    && chmod -R 775 /var/www/html/storage

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
