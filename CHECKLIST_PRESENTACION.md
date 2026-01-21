# ✅ Checklist para la Presentación

## 📋 Pre-Presentación (Hacer 1-2 días antes)

### Setup Inicial
- [ ] Código pusheado a GitHub
- [ ] Repositorio configurado como público o privado según preferencia
- [ ] GitHub Actions habilitado en el repositorio
- [ ] Pipeline ejecutado al menos **una vez** exitosamente

### Configuración Opcional
- [ ] SNYK_TOKEN configurado (opcional pero recomendado)
- [ ] Permisos de GitHub Actions configurados (Read & Write)
- [ ] KUBE_CONFIG configurado (si quieres demo de K8s)

### Verificación de Evidencias
- [ ] Security tab muestra resultados de SAST
- [ ] Artefactos generados y disponibles para descarga
- [ ] Docker image visible en GitHub Packages
- [ ] Al menos 1 ejecución completa del pipeline documentada

---

## 🎬 Día de la Presentación

### Preparación (30 min antes)

#### Archivos para Mostrar
- [ ] README_CICD.md abierto y revisado
- [ ] PRESENTACION.md impreso o en pantalla
- [ ] GitHub Actions tab abierto en navegador
- [ ] Security tab abierto en otra pestaña
- [ ] VS Code abierto con el proyecto

#### Screenshots/Evidencias (Opcional)
- [ ] Screenshot del pipeline completo
- [ ] Screenshot de Security findings
- [ ] Screenshot de artefactos descargados
- [ ] Screenshot de imagen Docker en GHCR

#### Demo en Vivo (si aplica)
- [ ] Internet funcionando
- [ ] GitHub login activo
- [ ] Cambio preparado para hacer push
- [ ] Terminal lista con comandos

---

## 🗣️ Durante la Presentación

### Parte 1: Introducción (2 min)
- [ ] Presentar el proyecto (Ruleta de Almuerzos)
- [ ] Explicar el objetivo de la actividad evaluativa
- [ ] Mencionar por qué elegiste GitHub Actions

### Parte 2: Arquitectura (3 min)
- [ ] Mostrar diagrama del pipeline (en README_CICD.md)
- [ ] Explicar las 8 etapas del workflow
- [ ] Destacar tecnologías usadas

### Parte 3: DevSecOps (4 min)
- [ ] Explicar herramientas SAST (Trivy, Snyk, CodeQL)
- [ ] Mostrar validación de políticas (OPA, Conftest)
- [ ] Demostrar firma de artefactos (Cosign)
- [ ] Explicar SBOM y su importancia

### Parte 4: Demostración (5 min)

#### Opción A: Demo en Vivo
- [ ] Mostrar código del workflow (.github/workflows/ci-cd-devsecops.yml)
- [ ] Hacer cambio menor en index.html
- [ ] Git add, commit, push
- [ ] Mostrar pipeline ejecutándose en GitHub Actions
- [ ] Mostrar Security tab con findings

#### Opción B: Demo con Ejecución Previa
- [ ] Abrir GitHub Actions tab
- [ ] Mostrar ejecución exitosa reciente
- [ ] Expandir y explicar cada etapa
- [ ] Mostrar logs relevantes
- [ ] Mostrar artefactos generados

### Parte 5: Evidencias (3 min)
- [ ] Mostrar SAST reports descargados
- [ ] Mostrar SBOM generado
- [ ] Mostrar policy validation report
- [ ] Mostrar imagen Docker en GHCR con firma

### Parte 6: Kubernetes (2 min)
- [ ] Mostrar manifests (deployment.yaml)
- [ ] Explicar security contexts
- [ ] Explicar resource limits
- [ ] Mencionar HPA para escalabilidad

### Parte 7: Conclusiones (1 min)
- [ ] Resumir cumplimiento de requisitos
- [ ] Destacar ventajas de GitHub Actions
- [ ] Mencionar aprendizajes clave

---

## 📊 Puntos Clave a Enfatizar

### ✅ Requisitos Cumplidos
- [x] CI/CD completo (Build, Test, Artifact Gen, Deploy)
- [x] DevSecOps con al menos 1 SAST (tenemos 3!)
- [x] Validación de políticas automatizada
- [x] Integridad de artefactos garantizada
- [x] Deploy a Kubernetes configurado
- [x] Evidencias documentadas y disponibles

### 💡 Ventajas Técnicas
- **Automatización**: 8 etapas sin intervención manual
- **Seguridad**: 6+ herramientas integradas
- **Trazabilidad**: SBOM + Provenance + Signatures
- **Escalabilidad**: HPA + Multi-replica deployment
- **Reproducibilidad**: Todo en código (IaC)

### 🎯 Diferenciadores
- Pipeline MÁS completo que el requisito mínimo
- TRIPLE SAST (Trivy + Snyk + CodeQL)
- Firma de artefactos con Cosign (state-of-the-art)
- Policy as Code con OPA
- Documentación exhaustiva

---

## ❓ Preguntas Frecuentes - Respuestas Preparadas

### ¿Por qué GitHub Actions y no Jenkins?
> "GitHub Actions es más simple, no requiere servidor, tiene integración nativa con GitHub, y es gratis para repos públicos. Para este proyecto, cumple todos los requisitos con menos complejidad operacional."

### ¿Qué es SBOM y por qué es importante?
> "Software Bill of Materials es una lista completa de todos los componentes de la aplicación. Es crítico para supply chain security, permite detectar vulnerabilidades y cumplir con regulaciones como Executive Order 14028."

### ¿Cómo garantizas la integridad de los artefactos?
> "Usamos Cosign para firma digital keyless con identidad de GitHub, generamos SBOM con Syft, y creamos attestations de provenance. Todo esto es verificable criptográficamente."

### ¿Qué pasa si hay vulnerabilidades críticas?
> "El pipeline detecta vulnerabilidades con Trivy y Snyk. Dependiendo de la severidad, podemos configurar el workflow para que falle y bloquee el despliegue si hay CRITICAL vulnerabilities."

### ¿Esto funciona para proyectos más grandes?
> "Sí, este pipeline es un template escalable. Lo puedes usar para React, Vue, Angular, microservicios en Python, Go, Java, etc. Solo hay que ajustar las etapas de build y test específicas."

### ¿Cuánto cuesta ejecutar esto?
> "Para repos públicos es 100% gratis. Para privados, GitHub da 2000 minutos/mes gratis. Este pipeline usa ~15 min por ejecución, así que puedes ejecutarlo ~130 veces/mes gratis."

---

## 🎥 Estructura de Tiempo (20 min total)

| Sección | Tiempo | Acumulado |
|---------|--------|-----------|
| Introducción | 2 min | 2 min |
| Arquitectura | 3 min | 5 min |
| DevSecOps | 4 min | 9 min |
| Demostración | 5 min | 14 min |
| Evidencias | 3 min | 17 min |
| Kubernetes | 2 min | 19 min |
| Conclusiones | 1 min | 20 min |

**Buffer:** Si tienes más tiempo, expande "DevSecOps" y "Evidencias"

---

## 📱 Contactos de Emergencia

### Si algo falla durante la demo:
1. **Plan B**: Usa screenshots preparados
2. **Plan C**: Muestra logs de ejecución anterior
3. **Plan D**: Explica con diagramas en README_CICD.md

### Recursos de respaldo:
- README_CICD.md - Documentación completa
- PRESENTACION.md - Resumen ejecutivo
- Screenshots en carpeta (si los preparaste)
- Video grabado del pipeline (opcional)

---

## ✨ Tips Finales

### Antes de empezar:
- ⏰ Llega 15 min antes
- 🔋 Laptop cargada al 100%
- 🌐 Verifica conexión a internet
- 🎤 Prueba audio/video si es virtual
- 📱 Silencia notificaciones

### Durante la presentación:
- 🗣️ Habla claro y pausado
- 👁️ Mantén contacto visual (o con cámara)
- ⏸️ Haz pausas para preguntas
- 📊 Muestra evidencias concretas
- 💪 Demuestra confianza en tu trabajo

### Cierre fuerte:
- ✅ Recapitula requisitos cumplidos
- 🎯 Enfatiza aprendizajes
- 🚀 Menciona aplicabilidad real
- 🙏 Agradece la atención

---

## 🎓 Post-Presentación

- [ ] Compartir link del repositorio (si es público)
- [ ] Responder preguntas adicionales
- [ ] Tomar feedback para mejorar
- [ ] Celebrar el trabajo completado! 🎉

---

**¡Mucha suerte! 🚀**

Recuerda: Implementaste un pipeline CI/CD completo con DevSecOps que va MÁS ALLÁ de los requisitos. Tienes todas las herramientas y evidencias necesarias. ¡Confía en tu trabajo!
