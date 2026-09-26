# 🎬 Scroll Tied Video Section: LIBERTAD FINANCIERA

Una experiencia cinemática *one-page* interactiva que representa la meta personal de **Libertad Financiera** mediante un sistema de video acoplado al scroll (scroll-tied), decodificación de fotogramas mediante **WebCodecs + MP4Box** con aceleración por hardware/software, y tipografía editorial minimalista.

---

## 🛠️ Stack Tecnológico

- **Vite + React 18 + TypeScript**
- **Tailwind CSS 3**
- **mp4box ^0.5.2** (Extracción de pistas y configuración de muestras para decodificación)
- **WebCodecs API** (`VideoDecoder` para decodificar fotogramas y dibujar en canvas con caché LRU)
- **lucide-react** (`ArrowRight`, `ArrowDown`, `ChevronUp`, `Info`, `X`)
- **Alias de ruta:** `@` -> `src`
- **Sin routers, sin GSAP, sin Lenis.**

---

## 📐 Arquitectura de la Página

- **Pista de Scroll Externa:** `relative h-[500vh]` (distancia total de desplazamiento).
- **Escena Sticky:** `sticky top-0 w-full h-screen overflow-hidden`.
- **Composición Visual:**
  1. `<video>` con `object-cover` como base.
  2. `<canvas width="1920" height="1080">` que dibuja fotogramas decodificados en tiempo real para un scrubbing suave a 60 FPS (transición de opacidad de 300ms al activarse el banco de fotogramas).
  3. Capa de superposición con **Navbar dinámico** y **3 secciones secuenciales**.

---

## 🎛️ Secciones Secuenciales & Opacidades

Cada sección se desvanece por completo antes de que aparezca la siguiente, con transiciones escalonadas (*stagger*) para los textos:

1. **SECCIÓN 1 — THE GOAL (Inicio del viaje)**
   - H1: `FINANCIAL FREEDOM` (Color `#1D3045`)
   - Subtítulo: `BUILD STABILITY. BUY BACK YOUR TIME.`
   - Botón circular con flecha derecha para avanzar suavemente.
   - Visible en el tramo luminoso y etéreo del video.

2. **SECCIÓN 2 — BUILDING THE FOUNDATION (Disciplina y Propósito)**
   - H2: `SAVE WITH DISCIPLINE, INVEST WITH PURPOSE, AND BUILD INCOME THAT GIVES YOU MORE CONTROL OVER YOUR TIME.`
   - Variaciones sutiles de opacidad en las palabras clave *discipline*, *purpose* y *time*.
   - Columna lateral con botón de avance, 3 puntos indicadores de avance y retorno arriba.

3. **SECCIÓN 3 — THE RESULT (Soberanía y Madurez)**
   - Eyebrow: `Your time. Your choices.`
   - H2: `WORK TOWARD FREEDOM, LIVE ON YOUR TERMS.` (Tipografía blanca sobre el paisaje oscuro y maduro del video).
   - Botón CTA: `START BUILDING` con círculo blanco interactivo.

---

## 🚀 Cómo Ejecutar

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

O simplemente haz doble clic en el archivo [iniciar.bat](file:///c:/Users/marin/OneDrive/Documentos/GitHub/My-Objective/iniciar.bat).
