# Multi-stage build para optimizar tamaño de imagen
FROM nginx:alpine AS production

# Metadata de la imagen
LABEL maintainer="tu-email@example.com"
LABEL description="Ruleta de Almuerzos - Aplicación web estática"
LABEL version="1.0"

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 appgroup && \
    adduser -D -u 1001 -G appgroup appuser

# Copiar archivos de la aplicación
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY vercel.json /usr/share/nginx/html/ || true

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Cambiar permisos para non-root user
RUN chown -R appuser:appgroup /usr/share/nginx/html && \
    chown -R appuser:appgroup /var/cache/nginx && \
    chown -R appuser:appgroup /var/log/nginx && \
    mkdir -p /var/run && \
    touch /var/run/nginx.pid && \
    chown -R appuser:appgroup /var/run/nginx.pid && \
    chmod -R 755 /var/log/nginx /var/cache/nginx /var/run

# Cambiar a usuario no-root
USER appuser

# Exponer puerto 8080 (no-privileged port)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/ || exit 1

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]
