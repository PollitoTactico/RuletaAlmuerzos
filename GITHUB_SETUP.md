# Configuración de GitHub Secrets

Para que el pipeline funcione completamente, configura estos secrets en tu repositorio:

## Secrets Requeridos

### 1. SNYK_TOKEN (Opcional pero recomendado)
- Ve a https://app.snyk.io/
- Crea una cuenta gratuita
- Ve a Settings > API Token
- Copia el token
- En GitHub: Settings > Secrets and variables > Actions > New repository secret
- Nombre: `SNYK_TOKEN`
- Valor: tu token de Snyk

### 2. KUBE_CONFIG (Para deploy a Kubernetes)
- Obtén tu kubeconfig del cluster
- Codifícalo en base64:
  ```bash
  cat ~/.kube/config | base64 -w 0
  ```
- En GitHub: Settings > Secrets and variables > Actions > New repository secret
- Nombre: `KUBE_CONFIG`
- Valor: tu kubeconfig en base64

## Permisos de GitHub Actions

Asegúrate de que GitHub Actions tenga los permisos necesarios:

1. Ve a Settings > Actions > General
2. En "Workflow permissions", selecciona "Read and write permissions"
3. Marca "Allow GitHub Actions to create and approve pull requests"
4. Guarda los cambios

## GitHub Container Registry (GHCR)

El pipeline usa GHCR automáticamente. No necesitas configuración adicional si:
- Tu repositorio es público, o
- Has habilitado GHCR para repositorios privados

Para verificar:
1. Ve a tu perfil > Packages
2. Deberías ver tu imagen después de la primera ejecución del pipeline

## Notas

- El pipeline funciona **sin secrets** para la mayoría de las etapas
- Snyk es opcional (el workflow continúa sin error si no está configurado)
- El deploy a K8s está comentado hasta que configures KUBE_CONFIG
- Todas las herramientas de seguridad (Trivy, CodeQL, OPA) funcionan sin configuración adicional
