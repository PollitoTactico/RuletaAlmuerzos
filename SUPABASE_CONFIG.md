# Configuración Supabase - Ruleta de Almuerzos

## 🚀 Pasos Rápidos

### 1. Crear Tabla en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Ve a **SQL Editor** → **New Query**
4. Copia y pega el contenido de `SUPABASE_SETUP.sql`
5. Ejecuta la query

O simplemente copia esto y pégalo:

```sql
CREATE TABLE roulette_history (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  week_number INTEGER NOT NULL,
  group_3 TEXT[] NOT NULL,
  group_2 TEXT[] NOT NULL,
  schedule_3 TEXT NOT NULL,
  schedule_2 TEXT NOT NULL,
  days_3 TEXT[] NOT NULL,
  days_2 TEXT[] NOT NULL
);

ALTER TABLE roulette_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON roulette_history
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select" ON roulette_history
  FOR SELECT USING (true);
```

### 2. Obtener las Credenciales

1. En Supabase, ve a **Project Settings** → **API**
2. Copia:
   - **Project URL** (ej: `https://abcdef.supabase.co`)
   - **anon public** key (la llave pública)

### 3. Actualizar script.js

Abre `script.js` y reemplaza las líneas 8-9:

```javascript
SUPABASE_URL: 'https://your-project.supabase.co',  // Reemplaza con tu URL
SUPABASE_KEY: 'your-anon-key'                      // Reemplaza con tu key
```

Ejemplo real:
```javascript
SUPABASE_URL: 'https://abcdef123456.supabase.co',
SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

### 4. ¡Listo!

Sube los cambios a Vercel:
```bash
git add .
git commit -m "Agregar Supabase"
git push
```

---

## 📝 ¿Qué Hace?

✅ **Genera combinaciones** de grupos (igual que antes)
✅ **Guarda automáticamente en Supabase** 
✅ **Botón "Ver Historial"** muestra todos los registros
✅ **Si Supabase no está configurado**, funciona solo con localStorage
✅ **Muestra "Semana 1" o "Semana 2"** claramente

---

## 🔧 Estructura de Datos en Supabase

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | BIGINT | ID único |
| `created_at` | TIMESTAMP | Fecha/hora de creación |
| `week_number` | INTEGER | 1 o 2 |
| `group_3` | TEXT[] | Array: ['José', 'Cíndel', ...] |
| `group_2` | TEXT[] | Array: ['Sebas', 'Felipito'] |
| `schedule_3` | TEXT | '12:00 PM' o '1:00 PM' |
| `schedule_2` | TEXT | '12:00 PM' o '1:00 PM' |
| `days_3` | TEXT[] | Array: ['Lunes', 'Miércoles', ...] |
| `days_2` | TEXT[] | Array: ['Martes', 'Viernes'] |

---

## ❓ Preguntas Comunes

**P: ¿Dónde copio la URL de Supabase?**
R: En Supabase → Project Settings → API → "Project URL"

**P: ¿Cuál es la "anon key"?**
R: En Supabase → Project Settings → API → "anon public"

**P: ¿Funciona sin Supabase?**
R: Sí, guardaría en localStorage solamente. El botón mostraría el historial local.

**P: ¿Debo guardar la key en variables de entorno?**
R: No es necesario (es pública), pero si quieres, crea `.env.local` y úsala.

---

## 🎯 Estructura de Carpetas Esperada

```
RuletaAlmuerzos/
├── index.html
├── style.css
├── script.js
├── SUPABASE_SETUP.sql
├── SUPABASE_CONFIG.md (este archivo)
└── vercel.json
```

¡Listo! Tu ruleta ahora guarda en Supabase 🚀
