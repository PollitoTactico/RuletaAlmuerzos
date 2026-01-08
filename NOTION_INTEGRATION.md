# Integración Notion - Ruleta de Almuerzos

## 🚀 Pasos para Configurar

### 1. Crear Base de Datos en Notion

1. Ve a notion.so
2. Crea una nueva página
3. Agrega una **Table database** (Base de datos de tabla)
4. Nómbrala: `Ruleta de Almuerzos - Historial`
5. Crea estas propiedades:

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| **Name** | Title | Auto-generado |
| **Fecha** | Date | Fecha de generación |
| **Periodo** | Number | 1, 2, 3... |
| **Grupo 3** | Multi-select | Nombres de las 3 personas |
| **Grupo 2** | Multi-select | Nombres de las 2 personas |
| **Horario Grupo 3** | Text | 12:00 PM o 1:00 PM |
| **Horario Grupo 2** | Text | 12:00 PM o 1:00 PM |
| **Días Grupo 3** | Multi-select | Lunes, Martes, etc. |
| **Días Grupo 2** | Multi-select | Lunes, Martes, etc. |

### 2. Crear Integración en Notion

1. Ve a https://www.notion.so/profile/integrations
2. Haz clic en **"Create new integration"**
3. Dale un nombre: `RuletaAlmuerzos`
4. En **Capabilities**, habilita:
   - ✅ Read content
   - ✅ Update content
   - ✅ Insert content
5. Haz clic en **"Submit"**
6. Copia el **"Internal Integration Token"** (comienza con `ntn_`)

### 3. Compartir Base de Datos

1. Abre tu base de datos en Notion
2. Haz clic en **Share** (arriba a la derecha)
3. Busca tu integración **RuletaAlmuerzos**
4. Dale permisos de lectura y escritura
5. Haz clic en **Invite**

### 4. Obtener Database ID

1. Abre tu base de datos en Notion
2. Copia la URL del navegador
3. El ID está entre `/` y `?v`

Ejemplo: `https://www.notion.so/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?v=yyyy`
```
                         ↑ Este es el ID (sin guiones)
```

### 5. Actualizar script.js

En `script.js`, líneas 10-11:

```javascript
NOTION_API_KEY: 'ntn_xxxxxxxxxxxxxxxxxxxxx', // Tu token
NOTION_DATABASE_ID: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' // Tu ID
```

### 6. ¡Listo!

Ahora cada vez que generes un grupo, se guardará en Notion automáticamente.

---

## ❓ Preguntas Comunes

**P: ¿Dónde obtengo el token?**
R: En https://www.notion.so/profile/integrations → tu integración → "Internal Integration Token"

**P: ¿Dónde está el Database ID?**
R: En la URL de tu base de datos en Notion. Es la parte larga de caracteres.

**P: ¿Funciona sin Notion?**
R: Sí, sin problema. Supabase sigue funcionando igual.

**P: ¿Cómo embebo esto en Notion?**
R: Usa un bloque "Embed" con la URL de tu Vercel deployment.

---

## 🔗 URLs Útiles

- Notion Integrations: https://www.notion.so/profile/integrations
- Notion API Docs: https://developers.notion.com/reference/intro
- Tu Ruleta: https://ruleta-almuerzos.vercel.app
