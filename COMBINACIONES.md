# 🍽️ Combinaciones de la Ruleta de Almuerzos

## Fórmula Utilizada
**C(n,r) = n! / (r! × (n-r)!)**

Donde:
- **n** = número total de personas (5)
- **r** = tamaño del grupo

## Grupos de 3 Personas
**C(5,3) = 5! / (3! × 2!) = 120 / (6 × 2) = 10 combinaciones**

Todas las posibles combinaciones de grupos de 3:

1. **{José, Cíndel, Sebas}** → {Felipito, Rachel}
2. **{José, Cíndel, Felipito}** → {Sebas, Rachel}
3. **{José, Cíndel, Rachel}** → {Sebas, Felipito}
4. **{José, Sebas, Felipito}** → {Cíndel, Rachel}
5. **{José, Sebas, Rachel}** → {Cíndel, Felipito}
6. **{José, Felipito, Rachel}** → {Cíndel, Sebas}
7. **{Cíndel, Sebas, Felipito}** → {José, Rachel}
8. **{Cíndel, Sebas, Rachel}** → {José, Felipito}
9. **{Cíndel, Felipito, Rachel}** → {José, Sebas}
10. **{Sebas, Felipito, Rachel}** → {José, Cíndel}

## Grupos de 2 Personas (Complementarios)
**C(5,2) = 5! / (2! × 3!) = 120 / (2 × 6) = 10 combinaciones**

Las 10 combinaciones de grupos de 2 son automáticamente generadas como complementarias de los grupos de 3:

1. {Felipito, Rachel}
2. {Sebas, Rachel}
3. {Sebas, Felipito}
4. {Cíndel, Rachel}
5. {Cíndel, Felipito}
6. {Cíndel, Sebas}
7. {José, Rachel}
8. {José, Felipito}
9. {José, Sebas}
10. {José, Cíndel}

## Total de Combinaciones Únicas
**10 combinaciones** (cada semana genera 1 combinación de grupo de 3 + su grupo de 2 complementario)

## Funcionamiento del Sistema

### Generación de Combinaciones Basada en Fecha
El sistema utiliza un algoritmo determinístico que:

1. **Calcula la semana ISO actual** (número de semana del año)
2. **Genera un índice seed** basado en: `(año × 53 + semana) % 10`
3. **Mapea el índice a una combinación** del array de 10 combinaciones
4. **Verifica el historial**: Si esa combinación ya fue usada, busca la siguiente disponible

### Ventajas de Este Enfoque

✅ **Determinístico**: La misma semana siempre genera la misma combinación
- Si alguien accede el lunes, miércoles o viernes de la misma semana → **misma combinación**
- Si alguien accede el lunes de la siguiente semana → **diferente combinación**

✅ **No se repite**: Después de 2 semanas (14 días), automáticamente genera una combinación diferente
- Semana 1: {José, Cíndel, Sebas}
- Semana 2: {José, Cíndel, Felipito}
- Semana 3: {José, Cíndel, Rachel} (nunca será igual a semana 1)

✅ **Respeta historial**: Si una combinación ya fue usada en una semana anterior, saltará a la siguiente disponible

### Generación de Combinaciones
El sistema utiliza la función `generateCombinations()` para crear todas las posibles combinaciones de 3 personas a partir del array de 5 personas.

## Estadísticas
- **Total de semanas posibles**: 10 semanas
- **Duración máxima**: ~2.5 meses (si se genera 1 semana por semana)
- **Después de 10 generaciones**: Se debe reiniciar el historial

## Cómo Monitorear el Progreso

En la consola del navegador (F12), puedes ejecutar:

```javascript
// Ver información completa de combinaciones
console.log(getCombinationsInfo());

// Salida incluye:
// - totalPossible: 10
// - used: número de combinaciones ya usadas
// - available: combinaciones restantes
// - percentageUsed: porcentaje de combinaciones usadas
// - allCombinations: lista de todas las posibles
// - usedCombinations: historial de combinaciones usadas
// - availableCombinations: combinaciones aún disponibles
```

## Mejoras Implementadas

✅ Generación correcta de todas las combinaciones matemáticamente posibles
✅ Verificación de duplicados basada en los miembros del grupo (orden independiente)
✅ Información clara cuando se agotan las combinaciones
✅ Estadísticas detalladas del progreso
✅ Función de debugging para monitorear estado del sistema
