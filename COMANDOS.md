# Comandos Útiles para CI/CD

## 🚀 Git - Subir cambios a GitHub

```bash
# Ir al directorio del proyecto
cd "c:\Emporium Projects\RuletaAlmuerzos"

# Ver estado actual
git status

# Agregar todos los archivos nuevos
git add .

# Commit con mensaje descriptivo
git commit -m "feat: Implementar CI/CD completo con DevSecOps"

# Push a GitHub (esto activará el pipeline)
git push origin main
```

## 🐳 Docker - Probar localmente

```bash
# Construir la imagen
docker build -t ruleta-almuerzos:local .

# Ejecutar el container
docker run -p 8080:8080 ruleta-almuerzos:local

# Ver en navegador
# http://localhost:8080

# Ver logs del container
docker logs <container-id>

# Detener el container
docker stop <container-id>

# Limpiar
docker rmi ruleta-almuerzos:local
```

## 🧪 Tests - Ejecutar localmente

```bash
# Ejecutar tests
npm test

# O directamente con Node
node tests/test.js
```

## ☸️ Kubernetes - Desplegar localmente (requiere Minikube/Docker Desktop)

```bash
# Iniciar Minikube (si lo usas)
minikube start

# Crear namespace
kubectl apply -f k8s/namespace.yaml

# Aplicar todos los manifests
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
kubectl apply -f k8s/hpa.yaml

# Ver estado de los pods
kubectl get pods -n ruleta-almuerzos

# Ver logs de un pod
kubectl logs -n ruleta-almuerzos <pod-name>

# Describir deployment
kubectl describe deployment ruleta-almuerzos -n ruleta-almuerzos

# Port forward para probar localmente
kubectl port-forward -n ruleta-almuerzos svc/ruleta-almuerzos-service 8080:80

# Limpiar todo
kubectl delete namespace ruleta-almuerzos
```

## 🔍 Verificar el Pipeline en GitHub

```bash
# Ver workflow en navegador
# https://github.com/<tu-usuario>/RuletaAlmuerzos/actions

# Ver security alerts
# https://github.com/<tu-usuario>/RuletaAlmuerzos/security

# Ver packages (Docker images)
# https://github.com/<tu-usuario>?tab=packages
```

## 📦 Cosign - Verificar firma de imagen (avanzado)

```bash
# Instalar Cosign
# Windows: winget install sigstore.cosign
# Linux: wget https://github.com/sigstore/cosign/releases/download/v2.2.2/cosign-linux-amd64
# Mac: brew install cosign

# Verificar firma de imagen
cosign verify \
  --certificate-identity-regexp=https://github.com/<tu-usuario>/RuletaAlmuerzos \
  --certificate-oidc-issuer=https://token.actions.githubusercontent.com \
  ghcr.io/<tu-usuario>/ruletaalmuerzos:<sha>
```

## 🛠️ Troubleshooting

### Pipeline falla en build
```bash
# Verificar que package.json existe
ls package.json

# Verificar que los tests funcionan localmente
npm test
```

### Error de permisos en GHCR
```bash
# Ve a: GitHub repo → Settings → Actions → General
# Marca: "Read and write permissions"
```

### Docker build falla
```bash
# Verificar Dockerfile
cat Dockerfile

# Build con logs detallados
docker build --progress=plain -t ruleta-almuerzos:local .
```

### K8s deployment no funciona
```bash
# Verificar que el contexto es correcto
kubectl config current-context

# Ver eventos
kubectl get events -n ruleta-almuerzos --sort-by='.lastTimestamp'

# Ver descripción de pods
kubectl describe pods -n ruleta-almuerzos
```

## 📊 Generar Reportes Locales

### Trivy - Escaneo local
```bash
# Instalar Trivy
# Windows: winget install Aqua.Trivy
# Linux: apt-get install trivy
# Mac: brew install trivy

# Escanear código
trivy fs .

# Escanear imagen Docker
trivy image ruleta-almuerzos:local
```

### SBOM Local con Syft
```bash
# Instalar Syft
# https://github.com/anchore/syft#installation

# Generar SBOM
syft ruleta-almuerzos:local -o spdx-json > sbom-local.json

# Ver SBOM
cat sbom-local.json
```

## 🎯 Quick Commands para la Demo

```bash
# 1. Mostrar estructura del proyecto
tree /F /A

# 2. Mostrar workflow
type .github\workflows\ci-cd-devsecops.yml

# 3. Mostrar Dockerfile
type Dockerfile

# 4. Mostrar K8s deployment
type k8s\deployment.yaml

# 5. Ejecutar tests
npm test

# 6. Build Docker local
docker build -t demo .

# 7. Ejecutar app
docker run -p 8080:8080 demo

# 8. Push a GitHub (activa pipeline)
git add .
git commit -m "demo: Presentación CI/CD"
git push origin main
```

## 📝 Notas Importantes

- El pipeline se ejecuta automáticamente en cada push a `main`
- Los artefactos se guardan por 90 días en GitHub
- SNYK_TOKEN es opcional, el pipeline funciona sin él
- El deploy a K8s está comentado por defecto
- Puedes ejecutar el workflow manualmente desde GitHub Actions
