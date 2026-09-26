// ==========================================================================
// EL DEV SOBERANO - LIBERTAD FINANCIERA ENGINE
// ==========================================================================

// --- CURRENCIES ---
const CURRENCIES = {
  USD: { symbol: '$', code: 'USD', locale: 'en-US', rate: 1 },
  EUR: { symbol: '€', code: 'EUR', locale: 'es-ES', rate: 0.92 },
  MXN: { symbol: '$', code: 'MXN', locale: 'es-MX', rate: 18.5 },
  COP: { symbol: '$', code: 'COP', locale: 'es-CO', rate: 4100 },
  ARS: { symbol: '$', code: 'ARS', locale: 'es-AR', rate: 1200 },
  CLP: { symbol: '$', code: 'CLP', locale: 'es-CL', rate: 940 },
};

// --- DEV CAREER STAGES DATA ---
const DEV_CAREER_STAGES = {
  1: {
    stage: 1,
    title: 'Fase 1: Developer Junior & Cimientos',
    tagline: 'Aprender a construir y forjar el hábito de ahorro',
    icon: '🌱',
    salaryRange: '$700 - $1,500/mes',
    typicalMonthlyContribution: 250,
    skills: ['JavaScript / TypeScript básico', 'HTML / CSS / Tailwind', 'Git & GitHub workflows', 'Consumo y creación de REST APIs'],
    financialStrategy: 'Destruir cualquier deuda de consumo o educación. Vivir frugalmente y crear el primer Búnker de Emergencia de 3 meses. Poner los primeros $150 - $300/mes en un ETF indexado.',
    mindset: 'Tu prioridad es acumular habilidad técnica. Cada hora invertida en aprender a programar limpio se multiplicará por 10 en tu siguiente salario.',
    simContribution: 300,
    simExpenses: 900,
  },
  2: {
    stage: 2,
    title: 'Fase 2: Developer Mid & Despegue Internacional',
    tagline: 'Apalancamiento remoto: ganar en USD y gastar en moneda local',
    icon: '🚀',
    salaryRange: '$2,500 - $4,500/mes (Remoto USD)',
    typicalMonthlyContribution: 1400,
    skills: ['Inglés técnico fluido (hablado y escrito)', 'Arquitecturas limpias & patrones de diseño', 'Docker, CI/CD, Cloud básico (AWS/GCP)', 'Resolución autónoma de problemas complejos'],
    financialStrategy: '¡CUIDADO CON LA INFLACIÓN DE ESTILO DE VIDA! Si pasas de ganar $800 a $3,500, no aumentes tus gastos a $3,000. Mantén tus gastos en $1,200 e invierte el 50% - 60% automáticamente en ETFs globales (VOO / VWRA).',
    mindset: 'Este es el punto de mayor aceleración. El diferencial entre tu salario en USD y el costo de vida local es tu catapulta hacia la libertad.',
    simContribution: 1600,
    simExpenses: 1400,
  },
  3: {
    stage: 3,
    title: 'Fase 3: Senior Dev / Staff & Ingresos Asimétricos',
    tagline: 'Liderazgo técnico, consultoría estratégica y capitalización masiva',
    icon: '⚡',
    salaryRange: '$5,000 - $9,000+/mes (Remoto B2B / USA)',
    typicalMonthlyContribution: 3500,
    skills: ['Diseño de sistemas a gran escala (System Design)', 'Liderazgo técnico y mentoría de equipos', 'Negociación B2B y optimización fiscal internacional', 'Impacto directo en métricas de negocio'],
    financialStrategy: 'Aportes mensuales masivos ($3,000 - $5,000/mes). El interés compuesto del portafolio empieza a generar en rendimientos anuales más dinero que el sueldo completo de un junior.',
    mindset: 'Ya no compites por escribir más líneas de código, sino por tomar mejores decisiones arquitectónicas y acumular la mayor cantidad de activos posibles.',
    simContribution: 3500,
    simExpenses: 2200,
  },
  4: {
    stage: 4,
    title: 'Fase 4: Software como Activo & Micro-SaaS',
    tagline: 'Desacoplar definitivamente las horas de trabajo del dinero',
    icon: '💎',
    salaryRange: 'Sueldo + $1,000 - $5,000+/mes en MRR pasivo',
    typicalMonthlyContribution: 4500,
    skills: ['Desarrollo de producto de punta a punta (Full-Stack)', 'Marketing para devs & SEO técnico', 'Sistemas de suscripción recurrente (Stripe, LemonSqueezy)', 'Automatización total de operaciones'],
    financialStrategy: 'Crear productos digitales propios (Micro-SaaS, plugins, APIs, plantillas) que generen ingresos recurrentes mientras duermes. El flujo pasivo complementa al portafolio de inversión.',
    mindset: 'Tu software se convierte en un empleado incansable que trabaja 24/7/365 para financiar tu libertad.',
    simContribution: 4500,
    simExpenses: 2500,
  },
  5: {
    stage: 5,
    title: 'Fase 5: El Desarrollador Soberano (FIRE Pleno)',
    tagline: 'Libertad financiera absoluta alcanzada: el tiempo te pertenece',
    icon: '👑',
    salaryRange: 'Renta Pasiva de Activos: $3,000 - $8,000+/mes',
    typicalMonthlyContribution: 0,
    skills: ['Maestría en programación y diseño de vida', 'Libertad de decir "NO" a cualquier trabajo', 'Desarrollo exclusivo de proyectos por pasión', 'Mentoría comunitaria y filantropía tecnológica'],
    financialStrategy: 'Tu patrimonio supera 300 veces tus gastos mensuales. Vives del 4% anual de tus rendimientos. Trabajar en código es ahora un arte, un pasatiempo y una contribución al mundo.',
    mindset: 'Despertar sin alarmas, programar cuando quieras, en lo que quieras, desde donde quieras.',
    simContribution: 0,
    simExpenses: 3000,
  },
};

// --- 24-HOUR DAY SIMULATOR DATA ---
const DAY_HOURS_DATA = {
  6: {
    trapped: { title: '06:00 AM - Despertar abrupto', desc: 'Alarma ruidosa tras dormir 5 horas. Ansiedad inmediata recordando los tickets pendientes de Jira y el despliegue roto de anoche.' },
    free: { title: '06:00 AM - Sueño profundo y natural', desc: 'Durmiendo sin alarmas forzadas. El cuerpo y la mente descansan las 8 horas completas necesarias para una regeneración celular óptima.' }
  },
  7: {
    trapped: { title: '07:00 AM - Prisa y estrés matutino', desc: 'Café bebido con apuro mientras revisas Slack desde el teléfono. Sensación de pesadez ante la jornada laboral obligatoria que empieza.' },
    free: { title: '07:00 AM - Despertar con la luz del sol', desc: 'Despertar tranquilo, estiramiento, vaso de agua con limón y café de especialidad molido al momento mientras lees un libro inspirador.' }
  },
  8: {
    trapped: { title: '08:00 AM - Conexión forzada o tráfico', desc: 'Fichando en el software de seguimiento de horas. Contestando mensajes pasivo-agresivos de clientes o gerentes de proyecto.' },
    free: { title: '08:00 AM - Conexión con la naturaleza o meditación', desc: 'Caminata matutina al aire libre escuchando las aves o tu podcast favorito. Tu mente está 100% en paz y en el momento presente.' }
  },
  9: {
    trapped: { title: '09:00 AM - La reunión diaria (Daily Standup)', desc: 'Justificando cada hora de tu día anterior ante el equipo. Presión por entregar features antes del viernes cueste lo que cueste.' },
    free: { title: '09:00 AM - Entrenamiento físico & vitalidad', desc: 'Sesión de gimnasio o natación sin prisas. No hay un jefe esperando; tu cuerpo es tu templo y le dedicas el mejor momento de la mañana.' }
  },
  11: {
    trapped: { title: '11:00 AM - Pelea con código legacy horrible', desc: 'Intentando arreglar bugs en un código espagueti de hace 7 años que nadie entiende. Frustración, dolor de cuello y ojos cansados.' },
    free: { title: '11:00 AM - Programación por puro arte y pasión', desc: 'Te sientas en tu setup soñado a trabajar en tu propio videojuego indie, tu app de código abierto o investigando nuevos modelos de IA por pura curiosidad.' }
  },
  13: {
    trapped: { title: '01:00 PM - Almuerzo exprés frente al teclado', desc: 'Comiendo comida rápida o recalentada en 15 minutos mientras respondes mensajes de urgencia en Teams. Cero digestión tranquila.' },
    free: { title: '01:00 PM - Almuerzo gourmet y nutritivo', desc: 'Cocinando con ingredientes frescos y disfrutando una comida con calma, compartiendo la mesa con tu familia o amigos sin pantallas.' }
  },
  15: {
    trapped: { title: '03:00 PM - La fatiga mental de la tarde', desc: 'Combatiendo el sueño con una tercera taza de café. Reuniones interminables que pudieron ser un email. Sensación de que el día se escapa sin vivirlo.' },
    free: { title: '03:00 PM - Aprendizaje profundo o siesta reparadora', desc: 'Una siesta de 20 minutos o una sesión de lectura sobre filosofía, diseño o ciencia. Aprendes por placer y no por miedo a quedar obsoleto.' }
  },
  17: {
    trapped: { title: '05:00 PM - La urgencia de última hora', desc: 'Un cliente reporta un bug crítico justo antes de salir. Te obligan a quedarte horas extras no pagadas para no "dejar tirado al equipo".' },
    free: { title: '05:00 PM - Paseo al atardecer en cualquier lugar del mundo', desc: 'Caminando por las calles de Tokio, una playa en México o un parque en tu ciudad. Tu laptop está cerrada. El resto del día es para vivir.' }
  },
  19: {
    trapped: { title: '07:00 PM - Llegada a casa con el cerebro drenado', desc: 'Demasiado agotado para hacer ejercicio, cocinar o programar ese proyecto personal que tanto soñabas. Te desplomas en el sillón a ver Netflix sin energía.' },
    free: { title: '07:00 PM - Hobbies, música y tiempo de calidad', desc: 'Tocando un instrumento musical, jugando videojuegos, compartiendo una cena deliciosa o teniendo conversaciones profundas con las personas que amas.' }
  },
  21: {
    trapped: { title: '09:00 PM - La ansiedad del domingo perpetuo', desc: 'Pensando con angustia en los problemas del trabajo de mañana. Dificultad para conciliar el sueño por el cortisol elevado.' },
    free: { title: '09:00 PM - Gratitud y serenidad absoluta', desc: 'Revisando tu portafolio donde tus inversiones ganaron dinero mientras tú vivías el día. Te vas a la cama en paz, sabiendo que mañana vuelve a ser tuyo.' }
  },
  23: {
    trapped: { title: '11:00 PM - Insomnio mirando pantallas', desc: 'Revisando redes sociales o Slack por si mandaron un correo de última hora. Círculo vicioso que se repetirá mañana.' },
    free: { title: '11:00 PM - Descanso profundo y reparador', desc: 'Apagas la luz en calma absoluta. Eres libre.' }
  }
};

// --- DEFAULT STATE ---
const DEFAULT_STATE = {
  profile: {
    name: 'Dev en Camino',
    currentAge: 27,
    targetAge: 40,
    currency: 'USD',
    soundEnabled: true,
  },
  financials: {
    currentNetWorth: 15000,
    monthlyContribution: 800,
    monthlyExpenses: 2500,
    annualReturn: 9.5,
    safeWithdrawalRate: 4.0,
    inflationRate: 3.0,
    adjustForInflation: false,
    horizonYears: 20,
  },
  cashflow: {
    sources: [
      { id: '1', name: 'Salario Dev / Contrato Remoto', amount: 3200, type: 'active', icon: '💼' },
      { id: '2', name: 'Consultoría Tech & Freelance', amount: 500, type: 'active', icon: '💻' },
      { id: '3', name: 'Dividendos ETFs (S&P 500 / Global)', amount: 95, type: 'passive', icon: '📈' },
      { id: '4', name: 'Cuentas de Alto Rendimiento (HYSA)', amount: 45, type: 'passive', icon: '🏦' },
      { id: '5', name: 'Micro-SaaS / Plantillas Tech', amount: 120, type: 'passive', icon: '✨' },
    ],
    allocations: {
      investments: 24,
      living: 45,
      emergency: 9,
      fun: 22,
    },
  },
  milestones: [
    {
      id: 'phase-1',
      title: 'Fase 1: Claridad & Cero Deudas Tóxicas',
      badge: 'Solvencia Absoluta',
      badgeIcon: '🛡️',
      description: 'Destruir deudas de alto costo (>8% TAE) y auditar cada gasto personal para tener flujo positivo.',
      tasks: [
        { id: 't1-1', text: 'Auditar gastos de los últimos 3 meses al milímetro', done: true },
        { id: 't1-2', text: 'Cero deudas en tarjetas de crédito de consumo', done: true },
        { id: 't1-3', text: 'Automatizar transferencia de ahorro el día de cobro', done: true },
      ],
    },
    {
      id: 'phase-2',
      title: 'Fase 2: El Búnker de Estabilidad (3-6 Meses)',
      badge: 'Paz Mental Blindada',
      badgeIcon: '⚓',
      description: 'Construir un fondo de emergencia líquido en cuentas de alto rendimiento o bonos para nunca malvender activos.',
      tasks: [
        { id: 't2-1', text: 'Calcular costo mensual de supervivencia estricta', done: true },
        { id: 't2-2', text: 'Acumular 3 meses de gastos en cuenta remunerada', done: true },
        { id: 't2-3', text: 'Extender el fondo a 6 meses de total serenidad', done: false },
      ],
    },
    {
      id: 'phase-3',
      title: 'Fase 3: Activación del Motor Compuesto',
      badge: 'Inversor Imparable',
      badgeIcon: '🚀',
      description: 'Superar la barrera de los primeros $10,000 / $25,000 invertidos en activos indexados globales de bajo costo.',
      tasks: [
        { id: 't3-1', text: 'Abrir cuenta en broker internacional de bajo costo (ej. IBKR)', done: true },
        { id: 't3-2', text: 'Configurar compra recurrente de ETF global (ej. VWRA / VOO)', done: true },
        { id: 't3-3', text: 'Superar los primeros $15,000 en portafolio de inversión', done: true },
        { id: 't3-4', text: 'Alcanzar los $50,000 (Punto de aceleración exponencial)', done: false },
      ],
    },
    {
      id: 'phase-4',
      title: 'Fase 4: Seguridad Financiera (Techo & Comida)',
      badge: 'Primer Bastión Libre',
      badgeIcon: '🏰',
      description: 'El rendimiento pasivo de tus inversiones paga el 100% de tu alquiler y tu comida básica.',
      tasks: [
        { id: 't4-1', text: 'Generar $500/mes en ingresos pasivos promedio', done: false },
        { id: 't4-2', text: 'Cubrir 100% de los gastos de vivienda con rendimientos', done: false },
        { id: 't4-3', text: 'Tener al menos 2 fuentes de ingresos pasivos no correlacionadas', done: false },
      ],
    },
    {
      id: 'phase-5',
      title: 'Fase 5: Libertad Financiera Plena (FIRE)',
      badge: 'Dueño Absoluto del Tiempo',
      badgeIcon: '👑',
      description: 'Tu Número de Libertad alcanzado. Tus rendimientos anuales al 4% cubren el 100% de tu estilo de vida soñado.',
      tasks: [
        { id: 't5-1', text: 'Patrimonio acumulado igual o superior a 300 veces tus gastos mensuales', done: false },
        { id: 't5-2', text: 'Vivir exclusivamente de rentas y rendimientos sin necesidad de salario', done: false },
        { id: 't5-3', text: 'Dedicar el 100% del tiempo a vocación, aprendizaje y seres queridos', done: false },
      ],
    },
    {
      id: 'phase-6',
      title: 'Fase 6: Abundancia & Legado Trascendente',
      badge: 'Mente Trascendente',
      badgeIcon: '🌌',
      description: 'Tus activos crecen más rápido de lo que puedes gastar. Creas impacto global, fundaciones y legado.',
      tasks: [
        { id: 't6-1', text: 'Patrimonio superior a 500 veces gastos anuales', done: false },
        { id: 't6-2', text: 'Crear un fondo de becas o mentoría para jóvenes programadores', done: false },
        { id: 't6-3', text: 'Financiar proyectos Open Source y preservar el patrimonio', done: false },
      ],
    }
  ]
};

// --- APP STATE LOAD & SAVE ---
let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem('mi_libertad_financiera_data_v1');
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_STATE));
    const parsed = JSON.parse(raw);
    return {
      profile: { ...DEFAULT_STATE.profile, ...(parsed.profile || {}) },
      financials: { ...DEFAULT_STATE.financials, ...(parsed.financials || {}) },
      cashflow: {
        sources: parsed.cashflow?.sources || DEFAULT_STATE.cashflow.sources,
        allocations: { ...DEFAULT_STATE.cashflow.allocations, ...(parsed.cashflow?.allocations || {}) },
      },
      milestones: parsed.milestones || DEFAULT_STATE.milestones,
    };
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
}

function saveState() {
  try {
    localStorage.setItem('mi_libertad_financiera_data_v1', JSON.stringify(state));
  } catch (e) {
    console.error('Save state error:', e);
  }
}

// --- SYNTHESIZED SOUND MANAGER (Web Audio API) ---
class SoundManager {
  constructor() {
    this.ctx = null;
  }
  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) this.ctx = new AC();
    }
  }
  playClick() {
    if (!state.profile.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(250, this.ctx.currentTime + 0.035);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch (e) {}
  }
  playMilestone() {
    if (!state.profile.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      freqs.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, this.ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.08);
        osc.stop(this.ctx.currentTime + i * 0.08 + 0.4);
      });
    } catch (e) {}
  }
}
const sound = new SoundManager();

// --- CONFETTI BURST ENGINE ---
function triggerConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#10b981', '#34d399', '#f59e0b', '#fbbf24', '#06b6d4', '#ec4899', '#ffffff'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height * 0.45 + (Math.random() - 0.5) * 50,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 1.2) * 16,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rSpeed: (Math.random() - 0.5) * 10,
      alpha: 1,
    });
  }

  let animationFrame;
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35;
      p.rotation += p.rSpeed;
      p.alpha -= 0.012;

      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        ctx.restore();
      }
    });

    if (alive) {
      animationFrame = requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }
  update();
}

// --- MONEY FORMATTER ---
function formatMoney(amount, compact = false) {
  const curr = CURRENCIES[state.profile.currency] || CURRENCIES.USD;
  const num = Number(amount) || 0;

  if (compact) {
    if (Math.abs(num) >= 1_000_000) return `${curr.symbol}${(num / 1_000_000).toFixed(2)}M`;
    if (Math.abs(num) >= 1_000) return `${curr.symbol}${(num / 1_000).toFixed(1)}k`;
  }

  return new Intl.NumberFormat(curr.locale, {
    style: 'currency',
    currency: curr.code,
    maximumFractionDigits: 0,
  }).format(num);
}

// --- CORE FIRE CALCULATIONS ---
function getFireNumber() {
  const annualExpenses = state.financials.monthlyExpenses * 12;
  const rateFraction = (state.financials.safeWithdrawalRate || 4) / 100;
  return Math.round(annualExpenses / rateFraction);
}

function calculateProjectionData(years = state.financials.horizonYears) {
  const fireNumber = getFireNumber();
  const nominalRate = state.financials.annualReturn / 100;
  const inflation = state.financials.inflationRate / 100;
  
  const effectiveRate = state.financials.adjustForInflation
    ? (1 + nominalRate) / (1 + inflation) - 1
    : nominalRate;

  const monthlyRate = Math.pow(1 + effectiveRate, 1 / 12) - 1;
  const totalMonths = years * 12;

  let balance = state.financials.currentNetWorth;
  let totalContributed = state.financials.currentNetWorth;
  let crossoverYear = null;
  let crossoverMonth = null;

  const points = [];
  points.push({
    year: 0,
    month: 0,
    balance: Math.round(balance),
    contributed: Math.round(totalContributed),
    interest: 0,
    passiveYield: Math.round((balance * (state.financials.safeWithdrawalRate / 100)) / 12),
  });

  for (let m = 1; m <= totalMonths; m++) {
    balance = balance * (1 + monthlyRate) + state.financials.monthlyContribution;
    totalContributed += state.financials.monthlyContribution;

    if (balance >= fireNumber && crossoverYear === null) {
      crossoverYear = Math.floor(m / 12);
      crossoverMonth = m % 12;
    }

    if (m % 12 === 0) {
      const yr = m / 12;
      points.push({
        year: yr,
        month: m,
        balance: Math.round(balance),
        contributed: Math.round(totalContributed),
        interest: Math.round(Math.max(0, balance - totalContributed)),
        passiveYield: Math.round((balance * (state.financials.safeWithdrawalRate / 100)) / 12),
      });
    }
  }

  return {
    fireNumber,
    points,
    crossoverYear,
    crossoverMonth,
    finalBalance: Math.round(balance),
    finalContributed: Math.round(totalContributed),
    finalInterest: Math.round(Math.max(0, balance - totalContributed)),
  };
}

// --- RENDER DEV STAGE DETAIL PANEL ---
let currentSelectedDevStage = 1;

function renderDevStageDetail(stageNum) {
  currentSelectedDevStage = stageNum;
  const data = DEV_CAREER_STAGES[stageNum] || DEV_CAREER_STAGES[1];
  const container = document.getElementById('devStageDetailPanel');
  if (!container) return;

  // Highlight selected node in UI
  document.querySelectorAll('.dev-tree-node').forEach(node => {
    if (parseInt(node.getAttribute('data-dev-stage')) === stageNum) {
      node.classList.add('selected');
    } else {
      node.classList.remove('selected');
    }
  });

  let skillsHTML = data.skills.map(s => `
    <li class="flex items-center gap-2 text-xs text-slate-200">
      <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
      <span>${s}</span>
    </li>
  `).join('');

  container.innerHTML = `
    <div class="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-white/10">
      <div class="flex items-center gap-3.5">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-emerald-400 flex items-center justify-center text-2xl font-bold border border-white/10">
          ${data.icon}
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h3 class="font-display font-bold text-lg text-white">${data.title}</h3>
            <span class="badge badge-emerald text-[10px]">${data.salaryRange}</span>
          </div>
          <p class="text-xs text-slate-300 mt-0.5">${data.tagline}</p>
        </div>
      </div>

      <button id="applyDevStageToSimBtn" class="btn btn-primary btn-sm">
        <span>⚡ Cargar al Simulador</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
      <!-- Col 1: Skills -->
      <div class="space-y-2">
        <h4 class="text-xs font-bold text-cyan-400 uppercase tracking-wider">Habilidades Técnicas Clave</h4>
        <ul class="space-y-2 bg-slate-900/50 p-3.5 rounded-xl border border-white/5">
          ${skillsHTML}
        </ul>
      </div>

      <!-- Col 2: Financial Strategy -->
      <div class="space-y-2">
        <h4 class="text-xs font-bold text-gold-400 uppercase tracking-wider">Estrategia Financiera en esta Fase</h4>
        <div class="bg-slate-900/50 p-3.5 rounded-xl border border-white/5 text-xs text-slate-300 leading-relaxed">
          ${data.financialStrategy}
          <div class="mt-2.5 pt-2 border-t border-white/10 text-[11px] text-emerald-400 font-mono">
            Aporte sugerido: <strong>${formatMoney(data.typicalMonthlyContribution)}/mes</strong>
          </div>
        </div>
      </div>

      <!-- Col 3: Mindset -->
      <div class="space-y-2">
        <h4 class="text-xs font-bold text-purple-400 uppercase tracking-wider">Mentalidad del Desarrollador</h4>
        <div class="bg-slate-900/50 p-3.5 rounded-xl border border-white/5 text-xs text-slate-300 leading-relaxed italic">
          "${data.mindset}"
        </div>
      </div>
    </div>
  `;

  // Apply to simulator listener
  const btn = document.getElementById('applyDevStageToSimBtn');
  if (btn) {
    btn.onclick = () => {
      state.financials.monthlyContribution = data.simContribution;
      state.financials.monthlyExpenses = data.simExpenses;
      const sContrib = document.getElementById('inputMonthlyContribution');
      const sExpenses = document.getElementById('inputMonthlyExpenses');
      if (sContrib) sContrib.value = data.simContribution;
      if (sExpenses) sExpenses.value = data.simExpenses;

      sound.playMilestone();
      triggerConfetti();
      saveState();
      updateUI();

      // Switch to simulator tab to see the change
      document.querySelector('.nav-tab[data-tab="simulator"]')?.click();
    };
  }
}

// --- 24-HOUR DAY SIMULATOR LOGIC ---
function renderDayComparison(hour) {
  const label = document.getElementById('hourSliderLabel');
  const box = document.getElementById('hourComparisonBox');
  if (!label || !box) return;

  const formattedHour = `${hour.toString().padStart(2, '0')}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
  label.textContent = formattedHour;

  // Find closest hour in dataset
  const availableHours = Object.keys(DAY_HOURS_DATA).map(Number);
  let closestHour = availableHours[0];
  let minDiff = 999;
  availableHours.forEach(h => {
    const diff = Math.abs(h - hour);
    if (diff < minDiff) {
      minDiff = diff;
      closestHour = h;
    }
  });

  const item = DAY_HOURS_DATA[closestHour];

  box.innerHTML = `
    <!-- Rutina Atrapada -->
    <div class="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
      <div class="flex items-center justify-between">
        <span class="badge badge-rose text-[9px]">EN LA CARRERA DE LA RATA</span>
        <span class="text-xs text-rose-400 font-mono">${formattedHour}</span>
      </div>
      <h4 class="text-sm font-bold text-white">${item.trapped.title}</h4>
      <p class="text-xs text-slate-300 leading-relaxed">${item.trapped.desc}</p>
    </div>

    <!-- Rutina en Libertad -->
    <div class="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 shadow-sm shadow-emerald-500/10 space-y-2">
      <div class="flex items-center justify-between">
        <span class="badge badge-emerald text-[9px]">EN PLENA LIBERTAD FINANCIERA</span>
        <span class="text-xs text-emerald-400 font-mono">${formattedHour}</span>
      </div>
      <h4 class="text-sm font-bold text-white">${item.free.title}</h4>
      <p class="text-xs text-slate-200 leading-relaxed">${item.free.desc}</p>
    </div>
  `;
}

// --- DOM REFRESH & MASTER HUD ---
function updateUI() {
  const proj = calculateProjectionData();
  const fireNumber = proj.fireNumber;

  // 1. HUD Metrics
  document.getElementById('heroFireNumber').textContent = formatMoney(fireNumber);
  
  if (proj.crossoverYear !== null) {
    const currentYear = new Date().getFullYear();
    const freedomYear = currentYear + proj.crossoverYear;
    const freedomAge = state.profile.currentAge + proj.crossoverYear;
    document.getElementById('heroFreedomYear').textContent = `Año ${freedomYear}`;
    document.getElementById('heroFreedomAge').textContent = `A tus ${freedomAge} años`;
    document.getElementById('heroYearsRemaining').textContent = `${(proj.crossoverYear + proj.crossoverMonth / 12).toFixed(1)} años`;
    document.getElementById('chartCrossoverLabel').textContent = `Año ${proj.crossoverYear}`;
  } else {
    document.getElementById('heroFreedomYear').textContent = `> ${state.financials.horizonYears} años`;
    document.getElementById('heroFreedomAge').textContent = `Requiere mayor aporte`;
    document.getElementById('heroYearsRemaining').textContent = `+${state.financials.horizonYears} años`;
    document.getElementById('chartCrossoverLabel').textContent = `Más de ${state.financials.horizonYears} años`;
  }

  // Progress Percentage & Radial Circle
  const progressPercent = Math.min(100, (state.financials.currentNetWorth / fireNumber) * 100);
  document.getElementById('heroProgressPercent').textContent = `${progressPercent.toFixed(1)}%`;
  document.getElementById('heroCurrentNetWorth').textContent = formatMoney(state.financials.currentNetWorth);
  
  const offset = 144.5 - (144.5 * Math.min(1, progressPercent / 100));
  const radialCircle = document.getElementById('heroRadialCircle');
  if (radialCircle) radialCircle.style.strokeDashoffset = offset;
  const radialLabel = document.getElementById('heroRadialLabel');
  if (radialLabel) radialLabel.textContent = `${Math.round(progressPercent)}%`;

  // Runway of Freedom
  const monthlyExp = state.financials.monthlyExpenses || 1;
  const runwayMonths = (state.financials.currentNetWorth / monthlyExp).toFixed(1);
  const heroRunway = document.getElementById('heroRunwayDisplay');
  if (heroRunway) {
    if (runwayMonths >= 12) {
      heroRunway.textContent = `${(runwayMonths / 12).toFixed(1)} Años`;
    } else {
      heroRunway.textContent = `${runwayMonths} Meses`;
    }
  }

  // 2. Sliders text values
  document.getElementById('valCurrentNetWorth').textContent = formatMoney(state.financials.currentNetWorth);
  document.getElementById('valMonthlyContribution').textContent = `${formatMoney(state.financials.monthlyContribution)}/mes`;
  document.getElementById('valMonthlyExpenses').textContent = `${formatMoney(state.financials.monthlyExpenses)}/mes`;
  document.getElementById('valAnnualExpenses').textContent = `${formatMoney(state.financials.monthlyExpenses * 12)} / año`;
  document.getElementById('valAnnualReturn').textContent = `${state.financials.annualReturn}%`;

  // 3. Breakdown Badges
  document.getElementById('sumTotalContributed').textContent = formatMoney(proj.finalContributed, true);
  document.getElementById('sumTotalInterest').textContent = `+${formatMoney(proj.finalInterest, true)}`;
  const currentPassiveYield = Math.round((state.financials.currentNetWorth * (state.financials.safeWithdrawalRate / 100)) / 12);
  document.getElementById('sumPassiveYield').textContent = `${formatMoney(currentPassiveYield)}/mes`;

  // 4. Update Profile Nav
  document.getElementById('profileNavName').textContent = state.profile.name || 'Dev en Camino';
  document.getElementById('profileNavAge').textContent = `(${state.profile.currentAge} años)`;
  document.getElementById('profileAvatarLetter').textContent = (state.profile.name || 'D')[0].toUpperCase();

  // 5. Render Canvas Chart
  renderChart(proj);

  // 6. Update Cashflow Engine
  updateCashflowEngine();

  // 7. Update Roadmap
  updateRoadmapUI();
}

// --- CANVAS EXPONENTIAL CHART RENDERER ---
function renderChart(proj) {
  const canvas = document.getElementById('projectionCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;
  ctx.clearRect(0, 0, w, h);

  const padding = { top: 30, right: 35, bottom: 40, left: 65 };
  const graphW = w - padding.left - padding.right;
  const graphH = h - padding.top - padding.bottom;

  const points = proj.points;
  const maxYear = state.financials.horizonYears;
  const maxVal = Math.max(proj.fireNumber * 1.15, proj.finalBalance * 1.05);

  function getX(yr) {
    return padding.left + (yr / maxYear) * graphW;
  }
  function getY(val) {
    return padding.top + graphH - (val / maxVal) * graphH;
  }

  // Draw Gridlines & Y-Axis Labels
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#64748b';
  ctx.font = '10px "Space Grotesk", sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';

  const ySteps = 5;
  for (let i = 0; i <= ySteps; i++) {
    const val = (maxVal / ySteps) * i;
    const y = getY(val);
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(w - padding.right, y);
    ctx.stroke();

    ctx.fillText(formatMoney(val, true), padding.left - 8, y);
  }

  // Draw X-Axis Year Labels
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  const xStep = maxYear <= 20 ? 5 : 10;
  for (let yr = 0; yr <= maxYear; yr += xStep) {
    const x = getX(yr);
    ctx.beginPath();
    ctx.moveTo(x, padding.top);
    ctx.lineTo(x, padding.top + graphH);
    ctx.stroke();

    ctx.fillText(`Año ${yr}`, x, padding.top + graphH + 8);
  }

  // 1. Target FIRE line
  const fireY = getY(proj.fireNumber);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(padding.left, fireY);
  ctx.lineTo(w - padding.right, fireY);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#f59e0b';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.font = 'bold 10px "Space Grotesk", sans-serif';
  ctx.fillText(`META FIRE: ${formatMoney(proj.fireNumber, true)}`, w - padding.right, fireY - 4);

  // 2. Savings-Only Curve
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.8;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  points.forEach((pt, i) => {
    const x = getX(pt.year);
    const y = getY(pt.contributed);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.setLineDash([]);

  // 3. Compound Growth Gradient Fill
  const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + graphH);
  gradient.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
  gradient.addColorStop(0.7, 'rgba(16, 185, 129, 0.08)');
  gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  points.forEach((pt, i) => {
    const x = getX(pt.year);
    const y = getY(pt.balance);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.lineTo(getX(maxYear), padding.top + graphH);
  ctx.lineTo(getX(0), padding.top + graphH);
  ctx.closePath();
  ctx.fill();

  // 4. Compound Growth Stroke
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 3;
  ctx.beginPath();
  points.forEach((pt, i) => {
    const x = getX(pt.year);
    const y = getY(pt.balance);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // 5. Crossover Beacon Pulse
  if (proj.crossoverYear !== null && proj.crossoverYear <= maxYear) {
    const crossX = getX(proj.crossoverYear + (proj.crossoverMonth || 0) / 12);
    const crossY = getY(proj.fireNumber);

    ctx.beginPath();
    ctx.arc(crossX, crossY, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(245, 158, 11, 0.35)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(crossX, crossY, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

// --- INTERACTIVE CHART TOOLTIP ---
function setupChartInteractivity() {
  const canvas = document.getElementById('projectionCanvas');
  const tooltip = document.getElementById('chartTooltip');
  if (!canvas || !tooltip) return;

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const padding = { left: 65, right: 35 };
    const graphW = rect.width - padding.left - padding.right;

    if (x < padding.left || x > rect.width - padding.right) {
      tooltip.classList.remove('visible');
      return;
    }

    const maxYear = state.financials.horizonYears;
    const hoverYear = Math.round(((x - padding.left) / graphW) * maxYear);

    const proj = calculateProjectionData();
    const pt = proj.points.find(p => p.year === hoverYear) || proj.points[proj.points.length - 1];

    if (!pt) return;

    const age = state.profile.currentAge + pt.year;
    document.getElementById('ttYear').textContent = `Año ${pt.year} (A tus ${age} años)`;
    document.getElementById('ttBalance').textContent = formatMoney(pt.balance);
    document.getElementById('ttContributed').textContent = formatMoney(pt.contributed);
    document.getElementById('ttInterest').textContent = `+${formatMoney(pt.interest)}`;
    document.getElementById('ttPassive').textContent = `${formatMoney(pt.passiveYield)}/mes`;

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${e.clientY - rect.top}px`;
    tooltip.classList.add('visible');
  });

  canvas.addEventListener('mouseleave', () => {
    tooltip.classList.remove('visible');
  });
}

// --- CASHFLOW ENGINE TAB ---
function updateCashflowEngine() {
  const container = document.getElementById('incomeSourcesList');
  if (!container) return;
  container.innerHTML = '';

  let totalIncome = 0;
  let totalPassive = 0;

  state.cashflow.sources.forEach(src => {
    totalIncome += src.amount;
    if (src.type === 'passive') totalPassive += src.amount;

    const div = document.createElement('div');
    div.className = 'flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-white/5 text-xs';
    div.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-base">${src.icon}</span>
        <div>
          <div class="font-semibold text-slate-200">${src.name}</div>
          <span class="badge ${src.type === 'passive' ? 'badge-emerald' : 'badge-cyan'} text-[9px]">
            ${src.type === 'passive' ? 'PASIVO' : 'ACTIVO'}
          </span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="font-mono font-bold ${src.type === 'passive' ? 'text-emerald-400' : 'text-slate-200'}">
          ${formatMoney(src.amount)}/m
        </span>
        <button data-delete-id="${src.id}" class="text-slate-500 hover:text-rose-400 px-1 text-sm">&times;</button>
      </div>
    `;
    container.appendChild(div);
  });

  document.getElementById('totalIncomeDisplay').textContent = `${formatMoney(totalIncome)}/mes`;

  const alloc = state.cashflow.allocations;
  const investAmt = Math.round((totalIncome * alloc.investments) / 100);
  const livingAmt = Math.round((totalIncome * alloc.living) / 100);
  const emergAmt = Math.round((totalIncome * alloc.emergency) / 100);
  const funAmt = Math.round((totalIncome * alloc.fun) / 100);

  document.getElementById('allocInvestDisplay').textContent = `${formatMoney(investAmt)} (${alloc.investments}%)`;
  document.getElementById('allocLivingDisplay').textContent = `${formatMoney(livingAmt)} (${alloc.living}%)`;
  document.getElementById('allocEmergencyDisplay').textContent = `${formatMoney(emergAmt)} (${alloc.emergency}%)`;
  document.getElementById('allocFunDisplay').textContent = `${formatMoney(funAmt)} (${alloc.fun}%)`;

  const savingsRate = Math.round(((investAmt + emergAmt) / (totalIncome || 1)) * 100);
  document.getElementById('savingsRateBadge').textContent = `${savingsRate}%`;

  const portfolioPassive = Math.round((state.financials.currentNetWorth * (state.financials.safeWithdrawalRate / 100)) / 12);
  const combinedPassive = portfolioPassive + totalPassive;
  document.getElementById('currentPassiveIncomeLoop').textContent = `${formatMoney(combinedPassive)}/mes`;

  const essentialCosts = livingAmt > 0 ? livingAmt : state.financials.monthlyExpenses;
  const coverage = Math.min(100, Math.round((combinedPassive / essentialCosts) * 100 * 10) / 10);
  document.getElementById('passiveCoveragePercent').textContent = `${coverage}%`;
  document.getElementById('passiveCoverageBar').style.width = `${coverage}%`;

  container.querySelectorAll('[data-delete-id]').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-delete-id');
      state.cashflow.sources = state.cashflow.sources.filter(s => s.id !== id);
      sound.playClick();
      saveState();
      updateUI();
    };
  });
}

// --- GAMIFIED ROADMAP ---
function updateRoadmapUI() {
  const container = document.getElementById('phasesContainer');
  if (!container) return;
  container.innerHTML = '';

  let highestUnlockedPhase = 1;

  state.milestones.forEach(phase => {
    const totalTasks = phase.tasks.length;
    const doneTasks = phase.tasks.filter(t => t.done).length;
    const isCompleted = totalTasks > 0 && doneTasks === totalTasks;

    if (isCompleted && phase.phase >= highestUnlockedPhase) {
      highestUnlockedPhase = Math.min(6, phase.phase + 1);
    }

    const card = document.createElement('div');
    card.className = `glass-card p-5 transition-all ${
      isCompleted
        ? 'border-emerald-500/50 bg-emerald-950/20'
        : 'border-white/5'
    }`;

    let tasksHTML = '';
    phase.tasks.forEach(t => {
      tasksHTML += `
        <label class="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer text-xs transition">
          <input type="checkbox" data-phase-id="${phase.id}" data-task-id="${t.id}" class="custom-checkbox" ${t.done ? 'checked' : ''}>
          <span class="${t.done ? 'line-through text-slate-400' : 'text-slate-200'}">${t.text}</span>
        </label>
      `;
    });

    card.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-white/5">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl ${isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'} flex items-center justify-center text-lg">
            ${phase.badgeIcon}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-display font-bold text-sm text-white">${phase.title}</h3>
              ${isCompleted ? '<span class="badge badge-emerald text-[9px]">COMPLETO</span>' : ''}
            </div>
            <p class="text-xs text-slate-400">${phase.description}</p>
          </div>
        </div>

        <div class="text-right">
          <span class="text-[10px] text-slate-400 font-mono">Progreso: ${doneTasks}/${totalTasks}</span>
          <div class="w-28 h-2 rounded-full bg-slate-900 border border-white/10 overflow-hidden mt-1">
            <div class="h-full bg-emerald-400 transition-all duration-300" style="width: ${(doneTasks / totalTasks) * 100}%;"></div>
          </div>
        </div>
      </div>

      <div class="space-y-1">
        ${tasksHTML}
      </div>
    `;
    container.appendChild(card);
  });

  const curPhase = state.milestones.find(p => p.phase === highestUnlockedPhase) || state.milestones[0];
  document.getElementById('currentPhaseBadgeIcon').textContent = curPhase.badgeIcon;
  document.getElementById('currentPhaseBadgeTitle').textContent = curPhase.title;

  container.querySelectorAll('[data-task-id]').forEach(cb => {
    cb.onchange = () => {
      const pId = cb.getAttribute('data-phase-id');
      const tId = cb.getAttribute('data-task-id');
      const phase = state.milestones.find(p => p.id === pId);
      if (phase) {
        const task = phase.tasks.find(t => t.id === tId);
        if (task) {
          task.done = cb.checked;
          sound.playClick();

          const allDone = phase.tasks.every(t => t.done);
          if (allDone && cb.checked) {
            sound.playMilestone();
            triggerConfetti();
          }

          saveState();
          updateUI();
        }
      }
    };
  });
}

// --- EVENT LISTENERS & SETUP ---
function setupEventListeners() {
  // Tabs Navigation
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.onclick = () => {
      sound.playClick();
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.add('hidden'));

      btn.classList.add('active');
      const targetId = `tab-${btn.getAttribute('data-tab')}`;
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.remove('hidden');

      if (btn.getAttribute('data-tab') === 'simulator') {
        renderChart(calculateProjectionData());
      }
    };
  });

  // Mirror of Realities View Mode
  const viewRatRaceBtn = document.getElementById('viewRatRaceBtn');
  const viewSovereignBtn = document.getElementById('viewSovereignBtn');
  const cardTrapped = document.getElementById('mirrorCardTrapped');
  const cardFree = document.getElementById('mirrorCardFree');

  if (viewRatRaceBtn && viewSovereignBtn) {
    viewRatRaceBtn.onclick = () => {
      sound.playClick();
      viewRatRaceBtn.classList.add('active');
      viewSovereignBtn.classList.remove('active');
      cardTrapped.classList.add('ring-2', 'ring-rose-500');
      cardFree.classList.remove('ring-2', 'ring-emerald-500');
    };
    viewSovereignBtn.onclick = () => {
      sound.playClick();
      viewSovereignBtn.classList.add('active');
      viewRatRaceBtn.classList.remove('active');
      cardFree.classList.add('ring-2', 'ring-emerald-500');
      cardTrapped.classList.remove('ring-2', 'ring-rose-500');
    };
  }

  // Dev Stages Tree Node click listener
  document.querySelectorAll('.dev-tree-node').forEach(node => {
    node.onclick = () => {
      sound.playClick();
      const stage = parseInt(node.getAttribute('data-dev-stage'));
      renderDevStageDetail(stage);
    };
  });

  // 24h Day Simulator slider
  const hourSlider = document.getElementById('hourDaySlider');
  if (hourSlider) {
    hourSlider.oninput = () => {
      const h = parseInt(hourSlider.value);
      renderDayComparison(h);
    };
  }

  // Currency select
  const currSelect = document.getElementById('currencySelect');
  if (currSelect) {
    currSelect.value = state.profile.currency;
    currSelect.onchange = () => {
      state.profile.currency = currSelect.value;
      sound.playClick();
      saveState();
      updateUI();
    };
  }

  // Sound toggle
  const soundBtn = document.getElementById('soundToggleBtn');
  const soundIconOn = document.getElementById('soundIconOn');
  const soundIconOff = document.getElementById('soundIconOff');

  function updateSoundIcon() {
    if (state.profile.soundEnabled) {
      soundIconOn.classList.remove('hidden');
      soundIconOff.classList.add('hidden');
    } else {
      soundIconOn.classList.add('hidden');
      soundIconOff.classList.remove('hidden');
    }
  }
  updateSoundIcon();

  if (soundBtn) {
    soundBtn.onclick = () => {
      state.profile.soundEnabled = !state.profile.soundEnabled;
      updateSoundIcon();
      sound.playClick();
      saveState();
    };
  }

  // Sliders input events
  const sNetWorth = document.getElementById('inputCurrentNetWorth');
  sNetWorth.value = state.financials.currentNetWorth;
  sNetWorth.oninput = () => {
    state.financials.currentNetWorth = parseFloat(sNetWorth.value);
    saveState();
    updateUI();
  };

  const sContrib = document.getElementById('inputMonthlyContribution');
  sContrib.value = state.financials.monthlyContribution;
  sContrib.oninput = () => {
    state.financials.monthlyContribution = parseFloat(sContrib.value);
    saveState();
    updateUI();
  };

  const sExpenses = document.getElementById('inputMonthlyExpenses');
  sExpenses.value = state.financials.monthlyExpenses;
  sExpenses.oninput = () => {
    state.financials.monthlyExpenses = parseFloat(sExpenses.value);
    saveState();
    updateUI();
  };

  const sReturn = document.getElementById('inputAnnualReturn');
  sReturn.value = state.financials.annualReturn;
  sReturn.oninput = () => {
    state.financials.annualReturn = parseFloat(sReturn.value);
    document.querySelectorAll('.pill-btn[data-return]').forEach(p => p.classList.remove('active'));
    saveState();
    updateUI();
  };

  // Return Presets
  document.querySelectorAll('.pill-btn[data-return]').forEach(btn => {
    btn.onclick = () => {
      sound.playClick();
      const r = parseFloat(btn.getAttribute('data-return'));
      state.financials.annualReturn = r;
      sReturn.value = r;
      document.querySelectorAll('.pill-btn[data-return]').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      saveState();
      updateUI();
    };
  });

  // Horizon Selectors
  document.querySelectorAll('.pill-btn[data-horizon]').forEach(btn => {
    btn.onclick = () => {
      sound.playClick();
      const yr = parseInt(btn.getAttribute('data-horizon'));
      state.financials.horizonYears = yr;
      document.querySelectorAll('.pill-btn[data-horizon]').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      saveState();
      updateUI();
    };
  });

  // Advanced settings accordion
  const advBtn = document.getElementById('toggleAdvancedSettings');
  const advBody = document.getElementById('advancedSettingsBody');
  const advChevron = document.getElementById('advancedChevron');
  if (advBtn) {
    advBtn.onclick = () => {
      advBody.classList.toggle('hidden');
      advChevron.innerHTML = advBody.classList.contains('hidden') ? '&darr;' : '&uarr;';
    };
  }

  const inputSWR = document.getElementById('inputSWR');
  if (inputSWR) {
    inputSWR.value = state.financials.safeWithdrawalRate;
    inputSWR.onchange = () => {
      state.financials.safeWithdrawalRate = parseFloat(inputSWR.value) || 4;
      saveState();
      updateUI();
    };
  }

  const toggleInflation = document.getElementById('toggleInflation');
  if (toggleInflation) {
    toggleInflation.checked = state.financials.adjustForInflation;
    toggleInflation.onchange = () => {
      state.financials.adjustForInflation = toggleInflation.checked;
      sound.playClick();
      saveState();
      updateUI();
    };
  }

  // Cashflow distribution sliders
  ['allocInvestSlider', 'allocLivingSlider', 'allocEmergencySlider', 'allocFunSlider'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.oninput = () => {
      state.cashflow.allocations = {
        investments: parseInt(document.getElementById('allocInvestSlider').value),
        living: parseInt(document.getElementById('allocLivingSlider').value),
        emergency: parseInt(document.getElementById('allocEmergencySlider').value),
        fun: parseInt(document.getElementById('allocFunSlider').value),
      };
      saveState();
      updateCashflowEngine();
    };
  });

  // Add Income Source
  const addIncomeBtn = document.getElementById('addIncomeSourceBtn');
  if (addIncomeBtn) {
    addIncomeBtn.onclick = () => {
      const name = prompt('Nombre de la fuente de ingreso (ej. Consultoría Remota, Micro-SaaS):');
      if (!name) return;
      const amtStr = prompt('Monto mensual promedio en tu moneda ($):', '300');
      const amount = parseFloat(amtStr);
      if (isNaN(amount) || amount <= 0) return;
      const isPassive = confirm('¿Es un ingreso PASIVO o de software automatizado? (Aceptar = Pasivo, Cancelar = Activo)');

      state.cashflow.sources.push({
        id: `inc-${Date.now()}`,
        name,
        amount,
        type: isPassive ? 'passive' : 'active',
        icon: isPassive ? '📈' : '💻',
      });

      sound.playMilestone();
      saveState();
      updateUI();
    };
  }

  // Profile Modal
  const profileModal = document.getElementById('profileModal');
  document.getElementById('openProfileBtn').onclick = () => {
    document.getElementById('modalProfileName').value = state.profile.name;
    document.getElementById('modalProfileCurrentAge').value = state.profile.currentAge;
    document.getElementById('modalProfileTargetAge').value = state.profile.targetAge;
    profileModal.classList.remove('hidden');
  };
  document.getElementById('closeProfileModal').onclick = () => profileModal.classList.add('hidden');
  document.getElementById('cancelProfileBtn').onclick = () => profileModal.classList.add('hidden');
  document.getElementById('saveProfileBtn').onclick = () => {
    state.profile.name = document.getElementById('modalProfileName').value.trim() || 'Dev en Camino';
    state.profile.currentAge = parseInt(document.getElementById('modalProfileCurrentAge').value) || 27;
    state.profile.targetAge = parseInt(document.getElementById('modalProfileTargetAge').value) || 40;
    profileModal.classList.add('hidden');
    sound.playClick();
    saveState();
    updateUI();
  };

  // Print button
  document.getElementById('printPlanBtn').onclick = () => {
    window.print();
  };

  setupChartInteractivity();
  setupDioramaInteractions();

  window.addEventListener('resize', () => {
    renderChart(calculateProjectionData());
  });
}

// --- 3D DIORAMA HOTSPOTS DICTIONARY & INTERACTIONS ---
const DIORAMA_HOTSPOTS = {
  grafica: {
    icon: '📈',
    title: 'Gráfica Ascendente',
    tag: 'Crecimiento Exponencial',
    desc: 'Representa el poder del interés compuesto y el crecimiento sistemático de los activos. Con el tiempo, la curva se vuelve vertical y el dinero trabaja más rápido que cualquier esfuerzo físico.',
  },
  ahorro: {
    icon: '🐷',
    title: 'Alcancía & Fondo de Ahorro',
    tag: 'Fondo de Emergencia',
    desc: 'Representa la disciplina y el fondo de reserva de 3 a 6 meses. Es el escudo que te brinda paz mental para no tener que endeudarte ni malvender tus inversiones ante imprevistos.',
  },
  monedas: {
    icon: '🪙',
    title: 'Monedas y Billetes Discretos',
    tag: 'Liquidez Sobria',
    desc: 'Flujo de dinero ordenado y sin saturación. Representa una vida estable y desahogada, sin caer en la trampa del consumismo desenfrenado ni la ostentación materialista.',
  },
  persona: {
    icon: '💻',
    title: 'Desarrollador en su Laptop',
    tag: 'Control del Trabajo',
    desc: 'Representa a la persona gestionando sus finanzas, inversiones y proyectos de software con calma. Trabajar guiado por curiosidad intelectual y vocación, no por la urgencia de pagar cuentas.',
  },
  portafolio: {
    icon: '💼',
    title: 'Portafolio de Inversión',
    tag: 'Rentas Pasivas',
    desc: 'Activos diversificados en fondos indexados globales (ETFs) y bienes que generan dividendos e ingresos pasivos continuos las 24 horas del día.',
  },
  casa: {
    icon: '🏡',
    title: 'Espacio Propio / Hogar',
    tag: 'Estabilidad y Raíces',
    desc: 'Símbolo de paz habitacional y tranquilidad de tener un techo seguro. Un espacio propio que brinda serenidad y bienestar para ti y tus seres queridos.',
  },
  bicicleta: {
    icon: '🚲',
    title: 'Bicicleta / Movilidad',
    tag: 'Independencia & Salud',
    desc: 'Representa la salud física, la movilidad limpia, el contacto con el aire libre y la independencia cotidiana para desplazarte a tu propio ritmo.',
  },
  calendario: {
    icon: '📅',
    title: 'Calendario con Tiempo Libre',
    tag: 'El Trofeo Supremo',
    desc: 'El verdadero significado de la libertad financiera: disponer de tus días. No tener que pedir vacaciones ni pedir permiso para vivir, aprender, descansar y compartir con quienes amas.',
  },
};

function setupDioramaInteractions() {
  const card = document.getElementById('dioramaCard');
  if (card) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPct = (x / rect.width) - 0.5;
      const yPct = (y / rect.height) - 0.5;
      const rotateX = -yPct * 12;
      const rotateY = xPct * 12;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  function selectHotspot(key) {
    const data = DIORAMA_HOTSPOTS[key];
    if (!data) return;

    sound.playClick();

    document.querySelectorAll('.hotspot-btn').forEach(btn => {
      if (btn.getAttribute('data-hotspot') === key) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const hsIcon = document.getElementById('hsIcon');
    const hsTitle = document.getElementById('hsTitle');
    const hsTag = document.getElementById('hsTag');
    const hsDesc = document.getElementById('hsDesc');

    if (hsIcon) hsIcon.textContent = data.icon;
    if (hsTitle) hsTitle.textContent = data.title;
    if (hsTag) hsTag.textContent = data.tag;
    if (hsDesc) hsDesc.textContent = data.desc;

    document.querySelectorAll('[data-select-hs]').forEach(item => {
      if (item.getAttribute('data-select-hs') === key) {
        item.classList.add('border-emerald-500', 'bg-emerald-950/30');
      } else {
        item.classList.remove('border-emerald-500', 'bg-emerald-950/30');
      }
    });
  }

  document.querySelectorAll('.hotspot-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = btn.getAttribute('data-hotspot');
      selectHotspot(key);
    });
  });

  document.querySelectorAll('[data-select-hs]').forEach(item => {
    item.addEventListener('click', () => {
      const key = item.getAttribute('data-select-hs');
      selectHotspot(key);
      document.getElementById('dioramaCard')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
}

// --- BOOTSTRAP INITIALIZATION ---
window.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  renderDevStageDetail(1);
  renderDayComparison(8);
  updateUI();
});

