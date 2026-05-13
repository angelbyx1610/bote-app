# bote. — Deploy en Vercel

## Paso 1 — Sube el código a GitHub

1. Ve a github.com → New repository → nombre: `bote-app` → Create
2. Descarga GitHub Desktop: desktop.github.com
3. Clona el repo vacío, copia estos archivos dentro, y haz commit + push

## Paso 2 — Conecta con Vercel

1. Ve a vercel.com → Sign up con tu cuenta de GitHub
2. "Add New Project" → selecciona el repo `bote-app`
3. Framework: **Vite** (lo detecta solo)
4. Pulsa **Deploy**

En 2 minutos tienes una URL tipo `bote-app.vercel.app`.

## Paso 3 — Añadir a pantalla de inicio (iPhone)

Manda el link a tus amigos con estas instrucciones:
1. Abrir el link en Safari (no Chrome)
2. Pulsar el botón compartir (cuadrado con flecha)
3. "Añadir a pantalla de inicio"
4. Pulsar "Añadir"

Ya aparece como una app en su iPhone, sin App Store.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:5173
