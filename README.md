# Ruleta de Almuerzos Semanales

Una aplicación web para organizar grupos de almuerzo entre 5 personas con historial en Supabase.

## ⚡ Características

✨ Generación automática de grupos (3 y 2 personas)
🔄 Sin repeticiones
📅 Sistema de 2 semanas con intercambio de horarios
💾 Historial en localStorage (siempre) + Supabase (opcional)
📱 Responsive en todos los dispositivos

## � **NUEVO: CI/CD con DevSecOps**

Este proyecto ahora incluye un **pipeline completo de CI/CD** con GitHub Actions que implementa:

### ✅ Pipeline Automatizado
- 🏗️ Build & Test automatizados
- 🔒 Análisis de seguridad (SAST) con Trivy, Snyk y CodeQL
- 🐳 Containerización con Docker
- ☸️ Despliegue a Kubernetes
- 📝 Generación de reportes y evidencias

### 🔐 DevSecOps
- **SAST**: Trivy + Snyk + CodeQL
- **Policy Validation**: OPA + Conftest
- **Artifact Signing**: Cosign + SBOM (SPDX)
- **Container Security**: Non-root user, security headers
- **K8s Security**: Security contexts, resource limits, HPA

### 📚 Documentación
- 📖 [README_CICD.md](README_CICD.md) - Documentación completa del pipeline
- ⚡ [QUICKSTART.md](QUICKSTART.md) - Guía rápida de uso
- 🔧 [GITHUB_SETUP.md](GITHUB_SETUP.md) - Configuración de GitHub

---

## 👥 Personas

- José
- Cíndel
- Sebas
- Felipito
- Rachel

## 🕐 Horarios

**Semana 1:**
- Grupo 3: 12:00 PM (Lun, Mié, Jue)
- Grupo 2: 1:00 PM (Mar, Vie)

**Semana 2:** (Se intercambian horarios)
- Grupo 3: 1:00 PM (Lun, Mié, Jue)
- Grupo 2: 12:00 PM (Mar, Vie)

## 🚀 Despliegue

### Opción 1: Vercel (Simple)
```bash
vercel
```

### Opción 2: Kubernetes (CI/CD)
El pipeline automáticamente despliega a Kubernetes cuando haces push a `main`.
Ver [README_CICD.md](README_CICD.md) para detalles.

### Opción 3: Docker Local
```bash
docker build -t ruleta-almuerzos .
docker run -p 8080:8080 ruleta-almuerzos
```

## 📊 Supabase (Opcional)

1. Lee `SUPABASE_CONFIG.md`
2. Copy-paste del SQL
3. Agrega URL y key en `script.js`

## 📁 Estructura del Proyecto

```
RuletaAlmuerzos/
├── .github/workflows/       # GitHub Actions CI/CD
├── k8s/                     # Kubernetes manifests
├── tests/                   # Tests automatizados
├── index.html              # Frontend
├── style.css               # Estilos
├── script.js               # Lógica
├── Dockerfile              # Container image
├── nginx.conf              # Nginx configuration
└── README_CICD.md          # Documentación CI/CD
```

## 🎓 Proyecto Académico

Este proyecto fue desarrollado como parte de la actividad evaluativa ISW3205, demostrando:
- ✅ CI/CD completo con GitHub Actions
- ✅ DevSecOps con múltiples herramientas de seguridad
- ✅ Containerización y orquestación con Kubernetes
- ✅ Firma de artefactos y validación de políticas
