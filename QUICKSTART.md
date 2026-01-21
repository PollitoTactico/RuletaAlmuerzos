# Guía Rápida: Ejecutar el Pipeline

## 🚀 Inicio Rápido

### 1. Subir el código a GitHub

```bash
cd "c:\Emporium Projects\RuletaAlmuerzos"
git add .
git commit -m "feat: Implementar CI/CD con DevSecOps completo"
git push origin main
```

### 2. Ver la ejecución

1. Ve a tu repositorio en GitHub
2. Click en la pestaña **"Actions"**
3. Verás el workflow "CI/CD Pipeline con DevSecOps" ejecutándose

### 3. Monitorear progreso

El pipeline tiene 8 etapas que se ejecutan en ~10-15 minutos:

```
✓ Build & Test (1-2 min)
✓ Security SAST (3-4 min)
✓ Docker Build & Scan (3-4 min)
✓ Sign Artifacts (1-2 min)
✓ Policy Validation (1-2 min)
✓ K8s Deploy (1 min) - comentado por defecto
✓ DAST (2-3 min) - solo en main
✓ Generate Report (1 min)
```

## 📊 Revisar Resultados

### En la pestaña Actions:
- ✅ Verde = Todo bien
- ❌ Rojo = Hay problemas (revisa los logs)

### En la pestaña Security:
- Click en "Security" > "Code scanning"
- Verás alertas de Trivy, Snyk y CodeQL

### Descargar Artefactos:
1. Click en el workflow ejecutado
2. Scroll down hasta "Artifacts"
3. Descarga:
   - `app-build` - Aplicación compilada
   - `sast-report` - Reporte de seguridad
   - `sbom` - Software Bill of Materials
   - `policy-report` - Validación de políticas
   - `pipeline-report` - Reporte completo

## 🔧 Troubleshooting

### Error: "No se puede pushear a GHCR"
**Solución**: Ve a Settings > Actions > General > Workflow permissions > "Read and write permissions"

### Error: "Snyk token missing"
**Solución**: Es normal, Snyk es opcional. El workflow continúa sin error.

### Warning: "K8s deploy skipped"
**Solución**: Normal, está comentado hasta que configures tu cluster. Lee `GITHUB_SETUP.md`

## 🎓 Para la Presentación

### Opción 1: Demostración en Vivo
1. Haz un pequeño cambio en `index.html`
2. Push a GitHub
3. Muestra el pipeline ejecutándose en tiempo real

### Opción 2: Mostrar Ejecución Previa
1. Ve a Actions
2. Selecciona una ejecución exitosa anterior
3. Muestra cada etapa y sus logs
4. Descarga y muestra los artefactos

### Puntos a Destacar:
✅ Pipeline totalmente automatizado
✅ 3 herramientas SAST (Trivy, Snyk, CodeQL)
✅ Firma de artefactos con Cosign
✅ SBOM generado automáticamente
✅ Validación de políticas con OPA
✅ Manifests de Kubernetes seguros
✅ Reportes descargables

## 📝 Checklist Pre-Presentación

- [ ] Código pusheado a GitHub
- [ ] Pipeline ejecutado al menos una vez exitosamente
- [ ] Security tab muestra resultados
- [ ] Artefactos descargados
- [ ] README_CICD.md revisado
- [ ] Screenshots tomados (opcional)
- [ ] Demo preparada

## 💡 Tips

- Si el pipeline falla, revisa los logs de cada step
- El pipeline genera reportes incluso si algunas etapas fallan
- Puedes ejecutar el pipeline manualmente desde Actions > "Run workflow"
- Los artefactos se guardan por 90 días
