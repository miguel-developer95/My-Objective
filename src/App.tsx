import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Info,
  X,
  Compass,
  Clock,
  Heart,
  Briefcase,
  Plane,
  Sun,
  Code,
  ShieldCheck,
  Trees,
  Coffee,
  MapPin,
  Sparkles,
} from 'lucide-react';

const MASTER_CITY_IMAGE = '/ciudad_costera_diorama.jpg';

interface SectorDef {
  id: number;
  numberStr: string;
  title: string;
  subtitle: string;
  badge: string;
  detailImage: string;
  icon: React.ElementType;
  primaryQuote: string;
  secondaryQuotes: string[];
  macroNote: string;
  focal: {
    x: number;
    y: number;
  };
  details: {
    tag: string;
    items: string[];
  };
}

const SECTORS: SectorDef[] = [
  {
    id: 1,
    numberStr: '01',
    title: 'TRABAJO Y ESTABILIDAD',
    subtitle: 'El cimiento técnico y profesional',
    badge: 'SECTOR 01 — TORRES TECNOLÓGICAS',
    detailImage: '/diorama_desarrollo.jpg',
    icon: Briefcase,
    primaryQuote: 'Construir estabilidad.',
    secondaryQuotes: [
      'Crecer profesionalmente como desarrollador de software.',
      'Dominar habilidades técnicas de alto impacto y alto valor.',
      'El trabajo como cimiento activo para alimentar la libertad financiera.',
    ],
    macroNote: 'DISTRITO DE SOFTWARE & OFICINAS',
    focal: { x: 54, y: 28 },
    details: {
      tag: 'TALLER DIGITAL',
      items: [
        'Miniature setup: laptop, dual display y código',
        'Generación de ingresos activos sólidos',
        'Desarrollo de disciplina técnica e innovación',
        'Código limpio y arquitectura escalable',
      ],
    },
  },
  {
    id: 2,
    numberStr: '02',
    title: 'AHORRO Y CRECIMIENTO',
    subtitle: 'El motor silencioso del interés compuesto',
    badge: 'SECTOR 02 — BÓVEDA & FINANZAS',
    detailImage: '/diorama_ahorro.jpg',
    icon: ShieldCheck,
    primaryQuote: 'Aprender a administrar.',
    secondaryQuotes: [
      'Construir estabilidad económica duradera.',
      'Crear oportunidades que no dependan de la suerte.',
      'Ahorro disciplinado e inversiones que crecen en silencio.',
    ],
    macroNote: 'BÓVEDA FINANCIERA & INTERÉS COMPUESTO',
    focal: { x: 42, y: 46 },
    details: {
      tag: 'SISTEMA FINANCIERO',
      items: [
        'Fondo de tranquilidad para imprevistos (12 meses)',
        'Inversión periódica en activos productivos e indexados',
        'Sendas doradas que alimentan el resto de la ciudad',
        'Independencia de fuentes únicas de ingreso',
      ],
    },
  },
  {
    id: 3,
    numberStr: '03',
    title: 'VIAJES Y HORIZONTES',
    subtitle: 'Descubrir el mundo con calma',
    badge: 'SECTOR 03 — AEROPUERTO COSTERO',
    detailImage: '/diorama_viajes.jpg',
    icon: Plane,
    primaryQuote: 'Conocer lugares nuevos.',
    secondaryQuotes: [
      'Coleccionar experiencias, no cosas materiales.',
      'Ver el mundo con calma, sin la prisa de vacaciones contadas.',
      'Viajar cuando quiero y el tiempo que decida.',
    ],
    macroNote: 'PISTA DE DESPEGUE & EXPEDICIONES',
    focal: { x: 18, y: 42 },
    details: {
      tag: 'EXPERIENCIAS GLOBALES',
      items: [
        'Avión listo en la pista costera de despegue',
        'Mapamundi y maleta vintage de explorador',
        'Viajar como aprendiz cultural sin pedir permiso',
        'Nuevos idiomas, culturas y memorias imborrables',
      ],
    },
  },
  {
    id: 4,
    numberStr: '04',
    title: 'PLAYA Y DESCONEXIÓN',
    subtitle: 'Calma sin la ansiedad de un lunes',
    badge: 'SECTOR 04 — BAHÍA & PLAYA TROPICAL',
    detailImage: '/diorama_playa.jpg',
    icon: Sun,
    primaryQuote: 'También quiero tiempo para disfrutar.',
    secondaryQuotes: [
      'Trabajar para vivir. Nunca vivir para trabajar.',
      'La calma de escuchar el mar un martes por la mañana sin alarmas.',
      'Espacio mental para contemplar y descansar.',
    ],
    macroNote: 'AGUA DE RESINA & ARENA BLANCA',
    focal: { x: 48, y: 82 },
    details: {
      tag: 'DESCONEXIÓN CONSCIENTE',
      items: [
        'Agua turquesa modelada en resina y arena fina',
        'Hamaca, palmeras y lectura junto a las olas',
        'Paz mental sin alarmas, notificaciones ni presiones',
        'Equilibrio restaurador para la mente',
      ],
    },
  },
  {
    id: 5,
    numberStr: '05',
    title: 'SALUD Y VITALIDAD',
    subtitle: 'La verdadera riqueza del ser humano',
    badge: 'SECTOR 05 — PARQUE CENTRAL & SALUD',
    detailImage: '/diorama_salud.jpg',
    icon: Heart,
    primaryQuote: 'Cuidar mi salud.',
    secondaryQuotes: [
      'Disfrutar el camino con energía y plenitud.',
      'De nada sirve la libertad si el cuerpo y la mente se desgastan.',
      'Movimiento diario, buena nutrición y descanso de calidad.',
    ],
    macroNote: 'CIRCUITO NATURAL & CICLISMO',
    focal: { x: 66, y: 58 },
    details: {
      tag: 'BIENESTAR FÍSICO',
      items: [
        'Bicicleta de ruta en sendero verde arbolado',
        'Laguna central y espacios de entrenamiento al aire libre',
        'Longevidad para vivir con plenitud cada año ganado',
        'Claridad mental a través del ejercicio constante',
      ],
    },
  },
  {
    id: 6,
    numberStr: '06',
    title: 'FAMILIA Y PRESENCIA',
    subtitle: 'Momentos auténticos que el dinero no compra',
    badge: 'SECTOR 06 — BARRIO RESIDENCIAL',
    detailImage: '/diorama_familia.jpg',
    icon: Coffee,
    primaryQuote: 'Estar presente.',
    secondaryQuotes: [
      'Compartir más tiempo con quienes de verdad importan.',
      'No perderme los almuerzos largos, las risas ni los cumpleaños.',
      'Brindar tranquilidad, respaldo y serenidad a los míos.',
    ],
    macroNote: 'TERRAZA FAMILIAR BAJO GUIRNALDAS',
    focal: { x: 84, y: 54 },
    details: {
      tag: 'HOGAR & CONVIVENCIA',
      items: [
        'Casas en la ladera con jardines y terrazas cálidas',
        'Mesa comunal con comida casera bajo luces doradas',
        'Tiempo de calidad sin mirar el reloj ni el teléfono',
        'Apoyo incondicional a los seres queridos',
      ],
    },
  },
  {
    id: 7,
    numberStr: '07',
    title: 'NATURALEZA Y EXPLORACIÓN',
    subtitle: 'La perspectiva ante la inmensidad del paisaje',
    badge: 'SECTOR 07 — SIERRA & MONTAÑAS',
    detailImage: '/diorama_naturaleza.jpg',
    icon: Trees,
    primaryQuote: 'Reconectar con la tierra.',
    secondaryQuotes: [
      'Caminar entre bosques y respirar aire puro en las cumbres.',
      'Retos físicos elegidos por pasión, no por obligación.',
      'Silencio y perspectiva ante la majestuosidad de la montaña.',
    ],
    macroNote: 'PICOS NEVADOS & BOSQUE DE PINOS',
    focal: { x: 76, y: 18 },
    details: {
      tag: 'AVENTURA ALPINA',
      items: [
        'Montañas escarpadas y bosque de pinos verdes',
        'Puente colgante de madera sobre río cristalino',
        'Senderismo y campamentos bajo cielos estrellados',
        'Desconexión total para recargar el espíritu',
      ],
    },
  },
  {
    id: 8,
    numberStr: '08',
    title: 'PROYECTOS Y CURIOSIDAD',
    subtitle: 'Crear con total libertad artística e intelectual',
    badge: 'SECTOR 08 — BARRIO CREATIVO',
    detailImage: '/diorama_proyectos.jpg',
    icon: Code,
    primaryQuote: 'Crear porque quiero.',
    secondaryQuotes: [
      'Aprender porque puedo, no solo por sobrevivir.',
      'Escribir código, componer música o explorar ideas sin prisa.',
      'El placer puro de construir proyectos por vocación.',
    ],
    macroNote: 'TALLER DE ARTE, MÚSICA & CÓDIGO',
    focal: { x: 34, y: 56 },
    details: {
      tag: 'CREATIVIDAD LIBRE',
      items: [
        'Guitarra acústica, cuadernos de bocetos y librero',
        'Espacio para proyectos de software de código abierto',
        'Exploración intelectual sin ataduras comerciales',
        'Tiempo dedicado a la curiosidad y al aprendizaje continuo',
      ],
    },
  },
  {
    id: 9,
    numberStr: '09',
    title: 'EL VERDADERO OBJETIVO ES EL TIEMPO',
    subtitle: 'La ciudad completa interconectada',
    badge: 'SECTOR 09 — PLAZA DEL RELOJ CENTRAL',
    detailImage: '/diorama_tiempo.jpg',
    icon: Clock,
    primaryQuote: 'No se trata de tener más.',
    secondaryQuotes: [
      'Se trata de tener libertad para vivir más.',
      'Tiempo para elegir.',
      'Tiempo para vivir con propósito cada día.',
    ],
    macroNote: 'RELOJ ARQUITECTÓNICO CENTRAL',
    focal: { x: 50, y: 48 },
    details: {
      tag: 'CIUDAD INTEGRADA',
      items: [
        'Torre de reloj dorada como corazón neurálgico',
        'Todas las sendas de la ciudad costera unificadas',
        'La libertad financiera como dueña de tu propio tiempo',
        'La culminación de un proyecto de vida equilibrado',
      ],
    },
  },
];

export default function App() {
  // isIntro: true displays the large full-screen title with blurred city diorama
  const [isIntro, setIsIntro] = useState(true);
  const [activeSector, setActiveSector] = useState<SectorDef | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  // Handle clicking a number pin
  const handleSelectSector = (sector: SectorDef) => {
    setIsIntro(false);
    setActiveSector(sector);
  };

  // Handle clicking "Retroceder"
  const handleGoBack = () => {
    setActiveSector(null);
  };

  // Keyboard navigation: Escape to go back, Left/Right arrows to cycle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showInfo) {
          setShowInfo(false);
        } else if (activeSector) {
          handleGoBack();
        } else if (!isIntro) {
          setIsIntro(true);
        }
      } else if (activeSector) {
        if (e.key === 'ArrowRight') {
          const nextIdx = activeSector.id % SECTORS.length;
          handleSelectSector(SECTORS[nextIdx]);
        } else if (e.key === 'ArrowLeft') {
          const prevIdx = (activeSector.id - 2 + SECTORS.length) % SECTORS.length;
          handleSelectSector(SECTORS[prevIdx]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSector, showInfo, isIntro]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0a111a] select-none text-slate-100 font-sans">
      {/* ----------------- LAYER 1: FULL SCREEN COASTAL CITY DIORAMA ----------------- */}
      <div
        className="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out overflow-hidden"
        style={{
          transformOrigin: activeSector
            ? `${activeSector.focal.x}% ${activeSector.focal.y}%`
            : '50% 50%',
          transform: activeSector ? 'scale(3.2)' : 'scale(1)',
          // When in intro: background is blurred heavily. When exploring: crisp sharp blur(0px). When in detail: darkened blur(4px).
          filter: isIntro
            ? 'blur(16px) brightness(0.55)'
            : activeSector
            ? 'blur(4px) brightness(0.35)'
            : 'blur(0px) brightness(1)',
        }}
      >
        <img
          src={MASTER_CITY_IMAGE}
          alt="Ciudad costera diorama general"
          className="w-full h-full object-cover filter contrast-[1.06]"
          draggable={false}
        />

        {/* Ambient Vignette Overlay */}
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
      </div>

      {/* ----------------- INTRO VIEW: TITULO GRANDE CON FONDO BORROSO ----------------- */}
      {isIntro && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          {/* Subtle top indicator */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-mono uppercase tracking-[0.25em] mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>PROYECTO DE VIDA</span>
          </div>

          {/* TITULO GRANDE: "Mi meta" */}
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-black tracking-tight text-white uppercase leading-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
            Mi meta
          </h1>

          {/* SUBTITULO: "Libertad Financiera" */}
          <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.25em] text-emerald-300 uppercase drop-shadow-[0_10px_30px_rgba(52,211,153,0.5)] mt-4 md:mt-6">
            Libertad Financiera
          </p>

          <p className="max-w-xl text-xs sm:text-sm md:text-base text-slate-300 font-light mt-6 leading-relaxed">
            Una ciudad costera que representa la vida que elijo construir: tiempo,
            estabilidad, salud, experiencias y libertad de elegir.
          </p>

          {/* BOTON PARA EXPLORAR LA CIUDAD COSTERA */}
          <button
            onClick={() => setIsIntro(false)}
            className="group mt-10 flex items-center space-x-3 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-sm tracking-widest uppercase shadow-[0_0_30px_rgba(52,211,153,0.6)] hover:shadow-[0_0_50px_rgba(52,211,153,0.9)] transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            <span>EXPLORAR LA CIUDAD COSTERA</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      )}

      {/* ----------------- NUMBERS / HOTSPOT PINS ON FULL-SCREEN CITY ----------------- */}
      {/* Visible only when viewing the sharp city map (activeSector === null and !isIntro) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 ${
          !isIntro && !activeSector ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {SECTORS.map((s) => (
          <div
            key={s.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            style={{
              left: `${s.focal.x}%`,
              top: `${s.focal.y}%`,
            }}
          >
            <button
              onClick={() => handleSelectSector(s)}
              className="relative group cursor-pointer flex items-center justify-center p-2 focus:outline-none"
              title={`Clic para ver: ${s.title}`}
            >
              {/* Outer Pulsing Radar Ring */}
              <span className="absolute w-10 h-10 rounded-full bg-emerald-400/40 animate-ping" />

              {/* Glowing Aura Ring */}
              <span className="absolute w-8 h-8 rounded-full bg-emerald-500/30 group-hover:scale-125 transition-transform duration-300" />

              {/* Main Number Button Badge */}
              <div className="relative w-8 h-8 rounded-full bg-slate-950/90 group-hover:bg-emerald-500 border-2 border-emerald-400 text-white group-hover:text-black font-mono font-bold text-xs flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.7)] group-hover:shadow-[0_0_25px_rgba(52,211,153,1)] transition-all duration-300 group-hover:scale-110">
                {s.numberStr}
              </div>

              {/* Interactive Tooltip Card on Hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:flex flex-col items-center bg-slate-950/95 p-2 rounded-xl border border-emerald-400/50 shadow-2xl backdrop-blur-md pointer-events-none z-50 whitespace-nowrap animate-fade-in">
                <div className="flex items-center space-x-1.5 text-emerald-400 mb-0.5">
                  <s.icon className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase">
                    SECTOR {s.numberStr}
                  </span>
                </div>
                <span className="text-xs font-semibold text-white">
                  {s.title}
                </span>
                <span className="text-[9px] text-slate-400 font-mono tracking-tight">
                  Haz clic para ver esta imagen
                </span>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* ----------------- LAYER 2: SECTOR DETAILED VIEW (WHEN A NUMBER IS CLICKED) ----------------- */}
      <div
        className={`absolute inset-0 z-30 transition-all duration-700 flex flex-col justify-between p-4 md:p-8 pointer-events-none ${
          activeSector && !isIntro ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {activeSector && (
          <>
            {/* Top Bar in Detail View: RETROCEDER BUTTON + SECTOR TITLE */}
            <div className="flex items-center justify-between w-full pointer-events-auto z-40">
              {/* BOTÓN DE RETROCEDER */}
              <button
                onClick={handleGoBack}
                className="group flex items-center space-x-2.5 px-4 py-2.5 rounded-full bg-slate-950/85 hover:bg-emerald-500 text-white hover:text-slate-950 border border-emerald-400/40 hover:border-emerald-400 shadow-2xl backdrop-blur-md transition-all duration-300 transform hover:-translate-x-1 cursor-pointer"
                title="Volver a la ciudad costera (Escape)"
              >
                <ArrowLeft className="w-4 h-4 text-emerald-400 group-hover:text-slate-950 transition-colors" />
                <span className="text-xs font-mono font-bold tracking-wider uppercase">
                  VOLVER A LA CIUDAD COSTERA
                </span>
              </button>

              {/* Prev / Next Quick Arrows */}
              <div className="flex items-center space-x-2 bg-slate-950/80 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                <button
                  onClick={() => {
                    const prevIdx =
                      (activeSector.id - 2 + SECTORS.length) % SECTORS.length;
                    handleSelectSector(SECTORS[prevIdx]);
                  }}
                  className="p-1 rounded-full hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer"
                  title="Sector anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-emerald-400 font-bold px-2">
                  {activeSector.numberStr} / 09
                </span>
                <button
                  onClick={() => {
                    const nextIdx = activeSector.id % SECTORS.length;
                    handleSelectSector(SECTORS[nextIdx]);
                  }}
                  className="p-1 rounded-full hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer"
                  title="Sector siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Central Stage: The Sector Image + Lateral Narrative Information */}
            <div className="relative flex-1 w-full flex items-center justify-center pointer-events-auto my-4 overflow-hidden">
              {/* Pedestal Frame with the Sector Image */}
              <div className="relative w-full max-w-4xl aspect-[16/10] max-h-[68vh] rounded-2xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.9)] border-2 border-emerald-400/40 bg-slate-950 transition-all duration-500">
                <img
                  src={activeSector.detailImage}
                  alt={activeSector.title}
                  className="w-full h-full object-cover filter contrast-[1.05]"
                  draggable={false}
                />

                {/* Subtle Cinematic Overlay on Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 pointer-events-none" />

                {/* Badge on the Image */}
                <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-400/40 text-white">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-300 font-semibold">
                    {activeSector.macroNote}
                  </span>
                </div>

                {/* Title & Badge on bottom of image (WITHOUT ANY COORDINATES BADGE) */}
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                    {activeSector.badge}
                  </span>
                  <h2 className="text-xl md:text-3xl font-bold text-white font-sans">
                    {activeSector.title}
                  </h2>
                </div>
              </div>

              {/* LEFT LATERAL PANEL (NARRATIVE PHILOSOPHY) */}
              <div className="hidden xl:block absolute left-4 top-1/2 -translate-y-1/2 max-w-xs pointer-events-auto">
                <div className="p-5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/10 shadow-2xl space-y-3">
                  <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                    <activeSector.icon className="w-3.5 h-3.5" />
                    <span>{activeSector.numberStr} // PROPÓSITO</span>
                  </div>

                  <p className="text-sm text-emerald-200/90 font-light italic border-l-2 border-emerald-400 pl-3">
                    "{activeSector.primaryQuote}"
                  </p>

                  <div className="pt-1 space-y-2">
                    {activeSector.secondaryQuotes.map((q, i) => (
                      <p
                        key={i}
                        className="text-xs text-slate-300 flex items-start space-x-2 leading-relaxed"
                      >
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{q}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT LATERAL PANEL (SPECIFICATIONS) */}
              <div className="hidden xl:block absolute right-4 top-1/2 -translate-y-1/2 max-w-xs pointer-events-auto">
                <div className="p-5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/10 shadow-2xl space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold">
                      // {activeSector.details.tag}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">
                      SECTOR {activeSector.numberStr}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {activeSector.details.items.map((it, i) => (
                      <li
                        key={i}
                        className="text-xs text-slate-300 flex items-start space-x-2 leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Quick Switcher Between All 9 Sectors */}
            <div className="flex items-center justify-between w-full pointer-events-auto z-40 bg-slate-950/80 p-2.5 rounded-2xl border border-white/10 backdrop-blur-md">
              <div className="flex items-center space-x-1.5 overflow-x-auto">
                {SECTORS.map((s) => {
                  const isCurrent = s.id === activeSector.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleSelectSector(s)}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                          : 'bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white'
                      }`}
                    >
                      <span>{s.numberStr}</span>
                      <span className="hidden md:inline text-[11px] font-sans font-medium">
                        {s.title.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Return to Map shortcut button */}
              <button
                onClick={handleGoBack}
                className="shrink-0 flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-black text-xs font-mono font-semibold transition-all ml-2 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">VER MAPA COMPLETO</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* ----------------- TOP NAVBAR WHEN ON CITY MAP ----------------- */}
      {!isIntro && !activeSector && (
        <>
          <header className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md border-b border-white/10 bg-[#070e17]/60">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsIntro(true)}
                className="flex items-center space-x-2 text-slate-400 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                title="Volver a la portada"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
                <span>Portada</span>
              </button>

              <div className="h-4 w-px bg-white/20" />

              <div>
                <h1 className="text-xs md:text-sm tracking-[0.25em] font-semibold text-white uppercase font-sans">
                  Mi meta
                </h1>
                <p className="text-[10px] md:text-xs tracking-wider text-slate-400 font-light">
                  Libertad Financiera · Ciudad Costera
                </p>
              </div>
            </div>

            {/* Instruction banner */}
            <div className="hidden md:flex items-center space-x-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-black/60 backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-emerald-300 font-mono tracking-wide">
                HAZ CLIC EN CUALQUIER NÚMERO (01 - 09) PARA VER LA IMAGEN
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowInfo(true)}
                className="flex items-center space-x-2 px-3 py-1.5 text-xs text-slate-300 hover:text-white rounded-full border border-white/10 hover:border-emerald-400/50 bg-white/5 backdrop-blur-md transition-all cursor-pointer"
              >
                <Info className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Concepto</span>
              </button>
            </div>
          </header>

          {/* Bottom Bar on City Overview */}
          <footer className="absolute bottom-0 inset-x-0 z-30 flex items-center justify-between px-6 py-3 md:px-12 backdrop-blur-md border-t border-white/10 bg-[#070e17]/70">
            <div className="flex items-center space-x-2 overflow-x-auto py-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mr-2 hidden lg:inline">
                SECTORES:
              </span>
              {SECTORS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelectSector(s)}
                  className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/60 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 border border-white/10 hover:border-emerald-400 text-xs font-mono transition-all group cursor-pointer"
                  title={s.title}
                >
                  <span className="text-emerald-400 group-hover:text-slate-950 font-bold">
                    {s.numberStr}
                  </span>
                  <span className="hidden sm:inline text-[11px] font-sans">
                    {s.title.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsIntro(true)}
              className="text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              PORTADA
            </button>
          </footer>
        </>
      )}

      {/* ----------------- CONCEPT INFO MODAL ----------------- */}
      {showInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setShowInfo(false)}
        >
          <div
            className="relative max-w-lg w-full bg-[#0f1924] border border-white/20 p-6 md:p-8 rounded-2xl shadow-2xl text-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowInfo(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-wide">
                La Ciudad Costera de la Libertad
              </h3>
            </div>

            <p className="text-sm leading-relaxed text-slate-300 mb-4">
              Esta experiencia representa visualmente una meta de vida:{' '}
              <strong className="text-white">Libertad Financiera</strong>.
            </p>
            <p className="text-xs leading-relaxed text-slate-400 mb-4">
              La imagen principal es una{' '}
              <strong className="text-emerald-300">ciudad costera completa en miniatura</strong>.
              Cada número (01 al 09) ubicado sobre el mapa corresponde a un pilar
              esencial: desarrollo de software, ahorro e inversión, viajes, descanso en
              la playa, vitalidad física, momentos familiares, naturaleza, proyectos
              creativos y el tiempo.
            </p>
            <p className="text-xs leading-relaxed text-slate-400 mb-6">
              Haz clic en cualquiera de los números para explorar esa imagen en detalle con
              toda su información, y pulsa el botón{' '}
              <strong className="text-emerald-400">"VOLVER A LA CIUDAD COSTERA"</strong>{' '}
              (o tecla Esc) para regresar en cualquier momento.
            </p>

            <button
              onClick={() => setShowInfo(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs tracking-wider transition-colors cursor-pointer"
            >
              ENTENDIDO · CONTINUAR EXPLORANDO
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
