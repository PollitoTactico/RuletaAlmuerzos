# 🚀 CI/CD Pipeline con DevSecOps - Ruleta de Almuerzos

## 📋 Descripción del Proyecto

Este proyecto implementa un pipeline completo de **CI/CD con prácticas DevSecOps** para la aplicación "Ruleta de Almuerzos", cumpliendo con los requisitos académicos de integración y despliegue continuo.

## 🎯 Objetivos Cumplidos

### ✅ 1. Pipeline de CI/CD Completo
Implementación de flujo automatizado con **GitHub Actions** que incluye:
- **Build**: Compilación y empaquetado de la aplicación
- **Test**: Pruebas automatizadas y validación de código
- **Artifact Generation**: Generación de artefactos Docker con multi-plataforma
- **Deploy**: Despliegue automatizado a cluster Kubernetes

### ✅ 2. Prácticas DevSecOps Integradas

#### **Análisis de Seguridad (SAST)**
- ✓ **Trivy**: Escaneo de vulnerabilidades en código y containers
- ✓ **Snyk**: Análisis de dependencias y vulnerabilidades
- ✓ **CodeQL**: Análisis estático de código JavaScript
- ✓ **Dockle**: Validación de mejores prácticas Docker

#### **Validación de Políticas**
- ✓ **OPA (Open Policy Agent)**: Validación de políticas Docker
- ✓ **Conftest**: Testing de manifests Kubernetes
- ✓ Validación de security contexts
- ✓ Verificación de resource limits

#### **Integridad de Artefactos**
- ✓ **Cosign**: Firma digital de imágenes Docker
- ✓ **SBOM**: Generación de Software Bill of Materials (SPDX)
- ✓ **Provenance**: Attestation de procedencia
- ✓ Verificación de firmas

## 🏗️ Arquitectura del Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                    GITHUB ACTIONS WORKFLOW                       │
└─────────────────────────────────────────────────────────────────┘

 STAGE 1: BUILD & TEST
 ┌──────────────────────────────┐
 │ ✓ Checkout code              │
 │ ✓ Install dependencies       │
 │ ✓ Run linting                │
 │ ✓ Execute tests              │
 │ ✓ Build artifacts            │
 └──────────────────────────────┘
            ↓
 STAGE 2: SECURITY ANALYSIS (SAST)
 ┌──────────────────────────────┐
 │ ✓ Trivy FS scan              │
 │ ✓ Snyk vulnerability check   │
 │ ✓ CodeQL analysis            │
 │ ✓ Generate SARIF reports     │
 └──────────────────────────────┘
            ↓
 STAGE 3: DOCKER BUILD & SCAN
 ┌──────────────────────────────┐
 │ ✓ Build multi-arch image     │
 │ ✓ Push to GHCR               │
 │ ✓ Trivy image scan           │
 │ ✓ Dockle best practices      │
 └──────────────────────────────┘
            ↓
 STAGE 4: SIGN & VERIFY
 ┌──────────────────────────────┐
 │ ✓ Cosign signature           │
 │ ✓ Verify signature           │
 │ ✓ Generate SBOM              │
 │ ✓ Attest SBOM                │
 └──────────────────────────────┘
            ↓
 STAGE 5: POLICY VALIDATION
 ┌──────────────────────────────┐
 │ ✓ OPA Docker policies        │
 │ ✓ Conftest K8s policies      │
 │ ✓ Security validation        │
 │ ✓ Compliance check           │
 └──────────────────────────────┘
            ↓
 STAGE 6: KUBERNETES DEPLOY
 ┌──────────────────────────────┐
 │ ✓ Update manifests           │
 │ ✓ Apply to cluster           │
 │ ✓ Verify rollout             │
 │ ✓ Run smoke tests            │
 └──────────────────────────────┘
            ↓
 STAGE 7: DAST (Optional)
 ┌──────────────────────────────┐
 │ ✓ OWASP ZAP scan             │
 │ ✓ Dynamic security testing   │
 └──────────────────────────────┘
            ↓
 STAGE 8: REPORTING
 ┌──────────────────────────────┐
 │ ✓ Consolidate results        │
 │ ✓ Generate reports           │
 │ ✓ Upload artifacts           │
 └──────────────────────────────┘
```

## 📂 Estructura del Proyecto

```
RuletaAlmuerzos/
├── .github/
│   └── workflows/
│       └── ci-cd-devsecops.yml    # Pipeline principal de CI/CD
├── k8s/                            # Manifests de Kubernetes
│   ├── namespace.yaml              # Namespace para la app
│   ├── configmap.yaml              # Configuraciones
│   ├── deployment.yaml             # Deployment con seguridad
│   ├── service.yaml                # Service ClusterIP
│   ├── ingress.yaml                # Ingress con TLS
│   └── hpa.yaml                    # Horizontal Pod Autoscaler
├── tests/
│   └── test.js                     # Tests automatizados
├── Dockerfile                      # Multi-stage build optimizado
├── nginx.conf                      # Configuración nginx segura
├── .dockerignore                   # Exclusiones para Docker
├── package.json                    # Configuración npm
├── index.html                      # Frontend
├── style.css                       # Estilos
├── script.js                       # Lógica
└── README_CICD.md                  # Esta documentación
```

## 🔧 Componentes Técnicos

### Docker
- **Base Image**: `nginx:alpine` (ligera y segura)
- **Non-root user**: Ejecuta como usuario `appuser` (UID 1001)
- **Security headers**: X-Frame-Options, CSP, HSTS
- **Health checks**: Validación de disponibilidad
- **Multi-platform**: `linux/amd64`, `linux/arm64`

### Kubernetes
- **Replicas**: 3 pods para alta disponibilidad
- **Rolling Updates**: Sin downtime en despliegues
- **Resource Limits**: CPU y memoria limitados
- **Security Context**: runAsNonRoot, capabilities drop
- **Probes**: Liveness y readiness configurados
- **HPA**: Auto-escalado basado en CPU/memoria

### Seguridad
- **SAST**: 3 herramientas (Trivy, Snyk, CodeQL)
- **DAST**: OWASP ZAP para pruebas dinámicas
- **Container Scanning**: Trivy + Dockle
- **Policy as Code**: OPA + Conftest
- **Image Signing**: Cosign con keyless signing
- **SBOM**: SPDX format para transparencia

## 🚀 Configuración e Implementación

### Prerequisitos

1. **Repositorio GitHub** con el código
2. **GitHub Actions** habilitado
3. **Secrets de GitHub** configurados (opcional):
   - `SNYK_TOKEN`: Token de Snyk (para análisis avanzado)
   - `KUBE_CONFIG`: Configuración del cluster Kubernetes (base64)

### Paso 1: Push del Código

```bash
cd RuletaAlmuerzos
git add .
git commit -m "feat: Implementar CI/CD con DevSecOps"
git push origin main
```

### Paso 2: El Pipeline se Ejecuta Automáticamente

El workflow se activa en:
- Push a `main` o `develop`
- Pull requests a `main`
- Ejecución manual desde GitHub Actions

### Paso 3: Monitorear el Pipeline

1. Ve a tu repositorio en GitHub
2. Click en la pestaña "Actions"
3. Observa la ejecución del workflow
4. Revisa los logs de cada stage

### Paso 4: Revisar Reportes de Seguridad

- **Security Tab**: Revisa vulnerabilidades detectadas
- **Artifacts**: Descarga reportes SAST, SBOM, policy validation
- **SARIF Upload**: Visualiza resultados en GitHub Security

## 📊 Evidencias de Implementación

### 1. Etapas del Pipeline

| Etapa | Herramientas | Estado |
|-------|--------------|--------|
| Build & Test | Node.js, npm | ✅ Implementado |
| SAST | Trivy, Snyk, CodeQL | ✅ Implementado |
| Docker Build | Docker Buildx, GHCR | ✅ Implementado |
| Image Scan | Trivy, Dockle | ✅ Implementado |
| Artifact Sign | Cosign, Syft | ✅ Implementado |
| Policy Check | OPA, Conftest | ✅ Implementado |
| K8s Deploy | kubectl | ✅ Implementado |
| DAST | OWASP ZAP | ✅ Implementado |

### 2. Herramientas DevSecOps

#### SAST (Static Application Security Testing)
- **Trivy**: Detecta vulnerabilidades en dependencias y código
- **Snyk**: Análisis de seguridad de dependencias
- **CodeQL**: Análisis semántico de código JavaScript

#### Policy Validation
- **OPA**: Valida que containers no corren como root
- **Conftest**: Asegura que K8s manifests cumplen políticas

#### Artifact Integrity
- **Cosign**: Firma criptográfica de imágenes
- **SBOM**: Lista completa de componentes (SPDX)

### 3. Resultados Esperados

Cuando ejecutes el pipeline verás:
1. ✅ **Build exitoso** con artefactos generados
2. ✅ **Tests pasando** con cobertura básica
3. ✅ **Security scans** sin vulnerabilidades críticas
4. ✅ **Docker image** firmada y verificada
5. ✅ **SBOM generado** en formato SPDX
6. ✅ **Políticas validadas** correctamente
7. ✅ **Deployment a K8s** (cuando configures cluster)
8. 📊 **Reportes disponibles** en Artifacts

## 🔐 Seguridad Implementada

### Nivel de Código
- ✓ Análisis estático con CodeQL
- ✓ Detección de secretos
- ✓ Validación de dependencias

### Nivel de Container
- ✓ Usuario no-root
- ✓ Imagen base actualizada (Alpine)
- ✓ Escaneo de vulnerabilidades
- ✓ Firma digital de imagen

### Nivel de Kubernetes
- ✓ Security contexts restrictivos
- ✓ Network policies
- ✓ Resource limits
- ✓ Pod security standards

## 📈 Mejoras Futuras

- [ ] Integrar Prometheus para métricas
- [ ] Implementar Grafana dashboards
- [ ] Agregar tests de integración
- [ ] Configurar GitOps con ArgoCD
- [ ] Implementar canary deployments
- [ ] Agregar disaster recovery

## 🎓 Para la Presentación

### Demostración Sugerida

1. **Mostrar el código del workflow** (`.github/workflows/ci-cd-devsecops.yml`)
2. **Ejecutar el pipeline** en vivo o mostrar ejecución grabada
3. **Revisar Security Tab** con vulnerabilidades detectadas
4. **Mostrar artefactos generados** (SBOM, reportes)
5. **Explicar cada herramienta** DevSecOps utilizada
6. **Demostrar firma de imagen** con Cosign
7. **Revisar manifests de K8s** con seguridad aplicada

### Puntos Clave para Destacar

✅ **CI/CD Completo**: 8 etapas automatizadas
✅ **DevSecOps**: 6+ herramientas de seguridad
✅ **SAST**: Trivy + Snyk + CodeQL
✅ **Políticas**: OPA + Conftest
✅ **Integridad**: Cosign + SBOM
✅ **K8s Ready**: Manifests production-ready
✅ **Automatización**: Zero touch deployment
✅ **Evidencias**: Reportes y logs completos

## 📚 Referencias

- [GitHub Actions](https://docs.github.com/en/actions)
- [Trivy](https://aquasecurity.github.io/trivy/)
- [Snyk](https://snyk.io/learn/)
- [CodeQL](https://codeql.github.com/)
- [Cosign](https://docs.sigstore.dev/cosign/overview/)
- [OPA](https://www.openpolicyagent.org/)
- [Kubernetes](https://kubernetes.io/docs/)

## 👥 Autores

**Tu Nombre** - Proyecto para ISW3205

---

## 🎯 Conclusión

Este proyecto demuestra la implementación completa de un pipeline CI/CD moderno con prácticas DevSecOps avanzadas:

- ✅ **Automatización total** del ciclo de vida del software
- ✅ **Seguridad integrada** desde el código hasta el runtime
- ✅ **Validación de políticas** automatizada
- ✅ **Trazabilidad completa** con SBOM y firmas
- ✅ **Kubernetes-ready** con manifests seguros
- ✅ **Evidencias documentadas** para auditoría

**GitHub Actions se confirma como la mejor opción** por su simplicidad, integración nativa, y amplio ecosistema de actions reutilizables.
