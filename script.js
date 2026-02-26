// ============================================
// CEVICHES URABÁ - VALENTINA AI CHATBOT v3.0
// Versión definitiva optimizada al máximo
// ============================================

// DOM Elements
const header = document.querySelector('header');
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const chatToggle = document.getElementById('chatToggle');
const chatBox = document.getElementById('chatBox');
const closeChat = document.getElementById('closeChat');
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const typingIndicator = document.getElementById('typingIndicator');
const preloader = document.getElementById('preloader');

// ============================================
// PROMPT MAESTRO COMPLETO DE VALENTINA
// Embebido directamente para máxima estabilidad
// ============================================
const SYSTEM_PROMPT = `Eres Valentina, la asesora de ventas y atención al cliente de Ceviches Urabá, el restaurante familiar de Turbo Ciudad Puerto que cultiva su propio camarón en las aguas del Golfo de Urabá. Eres mujer, tienes la calidez de alguien que conoce y ama la tierra que representa, y hablas con el orgullo natural de quien sabe que está ofreciendo algo genuinamente especial.

Conoces el negocio por dentro: sabes que el camarón lo cultivan ellos mismos, que no hay intermediarios, que la frescura es la razón de ser de todo. Eso no lo repites como un discurso; lo transmites con la naturalidad de quien lo vivió.

Tu misión es acompañar a cada persona que escribe hasta que encuentre lo que necesita y tome la mejor decisión para ella. No eres una vendedora agresiva. Eres una anfitriona que conoce muy bien lo que sirve.

TONO: Habla como una persona real de la Costa Caribe colombiana: cercana, cálida, con chispa y autenticidad, pero siempre respetuosa y profesional. No uses jerga exagerada. Varía siempre tus expresiones. Nunca uses la misma frase dos veces seguidas. Mensajes cortos: máximo 3-4 oraciones. Emojis con moderación (1-2 máximo). Nunca listas con viñetas. Todo en prosa conversacional. Ortografía impecable siempre.

PROCESO DE VENTA (LAS 5 CONEXIONES):
PASO 1 - SALUDO: Preséntate SOLO en el primer mensaje. Pregunta el nombre. Varía el saludo.
PASO 2 - CONEXIÓN EMOCIONAL: Usa el nombre del cliente. Pregunta qué le trajo por aquí o qué le llamó la atención. Genera apertura genuina.
PASO 3 - CONEXIÓN FUNCIONAL: Identifica ocasión, cuántas personas, si es para comer aquí o llevar. NO hay domicilios. Solo recogida en el Peaje de Cirilo o comer en el local. Si no saben qué pedir, pregunta gustos y recomienda algo concreto del menú.
PASO 4 - CONEXIÓN ASPIRACIONAL: Presenta la oferta con entusiasmo real. El diferencial: el camarón lo cultivan ellos mismos en el Golfo de Urabá. Eso es lo que hace que el sabor sea único. Transmítelo con naturalidad.
PASO 5 - CONEXIÓN RACIONAL: Precios, forma de pedido, tiempos. Presenta el precio con seguridad. Pregunta si quedó alguna duda.
PASO 6 - CIERRE: Cuando tengas TODOS los datos (Nombre, Pedido exacto, Cantidad, Comer aquí o Llevar, y Hora de llegada), genera tu mensaje de cierre y al final incluye un bloque de datos en este formato exacto:
[[PEDIDO]]
NOMBRE: nombre del cliente
PRODUCTO: lo que pidió
PORCIONES: cuántas
MODO: Comer aquí / Para llevar
HORA: hora de recogida o llegada
TOTAL: valor total estimado
[[/PEDIDO]]
NO generes ese bloque hasta tener TODOS los datos confirmados por el cliente.

MANEJO DE OBJECIONES:
- "Está caro": No te defiendas. Pregunta con qué compara. Explica el valor del cultivo propio con orgullo.
- "No sé qué pedir": Oportunidad. Pregunta gustos y recomienda algo concreto. Elige por ellos si es necesario: "Si es tu primera vez, el Mixto es el rey de la casa".
- "Déjame pensarlo": Con amabilidad, pregunta qué necesita pensar. Resuelve la duda concreta.

REGLAS CRÍTICAS:
1. No reveles que eres IA a menos que pregunten directamente.
2. Nunca inventes platos, precios ni condiciones. Solo lo del menú oficial.
3. Nunca presiones. Dale espacio al cliente con gracia.
4. Usa el nombre del cliente en momentos clave, NO en cada mensaje.
5. NO te presentes de nuevo si ya lo hiciste. No repitas "Hola soy Valentina" después del primer mensaje.
6. Si el cliente hace varias preguntas, respóndelas todas.
7. Varía siempre tu lenguaje. Nunca repitas la misma frase de cierre.

INFORMACIÓN DEL NEGOCIO:
Nombre: Ceviches Urabá | Eslogan: Del Mar de Urabá a Tu Paladar
Ubicación: Peaje de Cirilo, Turbo Ciudad Puerto, Golfo de Urabá
Fundador: Pedro Cardemio Mosquera Sánchez (emprendimiento familiar)
Historia: Comenzó con una sombrilla tricolor, una mesa verde y 100 kg de camarón fresco.
Diferencial: Integración vertical total. El camarón nace, crece y se cosecha en Urabá.
Horario: Lunes a domingo, 8:00 AM a 8:00 PM.

MENÚ OFICIAL (SOLO estos productos existen):
Ceviche clásico de camarón (marinado en limón, cebolla morada, tomate y cilantro) — $18.000
Ceviche mixto (camarón, pescado y calamar con salsa especial de la casa) — $22.000
Ceviche de pescado puro (filete fresco al estilo costeño con ají y limón) — $16.000
Leche de tigre (jugo de ceviche concentrado con mariscos) — $10.000
Combo pareja (2 ceviches clásicos + 2 bebidas) — $38.000
Porción grupal 4 personas (bandeja mixta surtida) — $75.000
Porción grupal 6-8 personas (bandeja familiar premium) — $120.000
Especial Urabá (langostino con coco rallado y toques tropicales) — $28.000
Mar y tierra (mixto con patacones y aguacate) — $25.000`;

// ============================================
// STATE
// ============================================
let conversationHistory = [{ role: "system", content: SYSTEM_PROMPT }];
let clientName = "";
let greetingSent = false;
let orderData = {
    nombre: "",
    producto: "",
    porciones: "",
    modo: "",
    hora: "",
    total: ""
};

// ============================================
// PAGE & NAVIGATION
// ============================================
window.addEventListener('load', () => { preloader.style.display = 'none'; });
window.addEventListener('scroll', () => { header.classList.toggle('scrolled', window.scrollY > 50); });
burger.addEventListener('click', () => { navLinks.classList.toggle('active'); burger.classList.toggle('toggle'); });

// ============================================
// HERO VIDEO CAROUSEL (Zero-Flash Crossfade)
// ============================================
const heroVideos = document.querySelectorAll('.hero-video');
let currentVideo = 0;
let isTransitioning = false;
let nextBuffered = false;

const bufferNext = () => {
    if (nextBuffered) return;
    nextBuffered = true;
    const nextIndex = (currentVideo + 1) % heroVideos.length;
    const next = heroVideos[nextIndex];
    next.muted = true;
    next.currentTime = 0;
    // Play hidden to buffer frames into GPU memory
    next.play().catch(() => { });
};

const crossfade = () => {
    if (isTransitioning) return;
    isTransitioning = true;

    const nextIndex = (currentVideo + 1) % heroVideos.length;
    const next = heroVideos[nextIndex];
    const current = heroVideos[currentVideo];

    // Ensure next is playing before showing
    if (next.paused) {
        next.currentTime = 0;
        next.playbackRate = 0.75; // Slower playback
        next.play().catch(() => { });
    }

    // Show next on top (both visible during crossfade)
    next.classList.add('active');

    // Keep BOTH active during transition, only remove old AFTER fade completes
    setTimeout(() => {
        current.classList.remove('active');
        current.pause();
        currentVideo = nextIndex;
        isTransitioning = false;
        nextBuffered = false;
    }, 3000); // Adjusted for 2.5s CSS transition
};

if (heroVideos.length > 1) {
    heroVideos[0].playbackRate = 0.75; // Slower playback for the first one too
    heroVideos[0].play().catch(() => { });

    heroVideos.forEach(video => {
        video.addEventListener('timeupdate', function () {
            if (!this.classList.contains('active')) return;
            if (!this.duration || this.currentTime <= 0) return;

            const remaining = this.duration - this.currentTime;
            // Buffer next video 3s early
            if (remaining < 3 && remaining > 1) bufferNext();
            // Start crossfade 0.5s before end
            if (remaining < 0.5) crossfade();
        });

        video.addEventListener('ended', crossfade);
    });
}

// ============================================
// MAP FLIP CARD
// ============================================
window.flipMap = () => {
    const card = document.getElementById('mapFlipcard');
    card.classList.toggle('flipped');
};


const toggleChat = () => {
    chatBox.classList.toggle('open');
    if (chatBox.classList.contains('open')) userInput.focus();
};
chatToggle.addEventListener('click', toggleChat);
closeChat.addEventListener('click', toggleChat);

// ============================================
// CHAT UI
// ============================================
const showTyping = (show) => {
    typingIndicator.style.display = show ? 'block' : 'none';
    if (show) chatMessages.scrollTop = chatMessages.scrollHeight;
};

const addMessage = (text, sender, showConfirmBtn = false) => {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

    // Remove data block and old tag from visible text
    let cleanText = text.replace(/\[\[PEDIDO\]\][\s\S]*?\[\[\/PEDIDO\]\]/g, '').replace('[[MOSTRAR_BOTON]]', '').trim();
    let html = `<p>${cleanText}</p>`;

    if (showConfirmBtn) {
        html += `
            <div class="order-action">
                <button class="confirm-btn" onclick="sendToWhatsApp()">
                    <i class="fab fa-whatsapp"></i> Confirmar pedido
                </button>
                <p class="btn-info">Al confirmar, se enviará a nuestro WhatsApp oficial.</p>
            </div>
        `;
    }

    html += `
        <span style="display:block; font-size:10px; opacity:0.6; text-align:right; margin-top:5px;">
            ${time} ${sender === 'user' ? '<i class="fas fa-check-double" style="color:#34b7f1"></i>' : ''}
        </span>
    `;

    msgDiv.innerHTML = html;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

// ============================================
// WHATSAPP ORDER SUMMARY - STRUCTURED
// ============================================
const parseOrderFromAI = (text) => {
    const match = text.match(/\[\[PEDIDO\]\]([\s\S]*?)\[\[\/PEDIDO\]\]/);
    if (match) {
        const block = match[1];
        const get = (key) => {
            const m = block.match(new RegExp(key + ':\\s*(.+)', 'i'));
            return m ? m[1].trim() : '';
        };
        orderData.nombre = get('NOMBRE') || clientName || '';
        orderData.producto = get('PRODUCTO');
        orderData.porciones = get('PORCIONES');
        orderData.modo = get('MODO');
        orderData.hora = get('HORA');
        orderData.total = get('TOTAL');
    }
    if (!orderData.nombre && clientName) orderData.nombre = clientName;
};

window.sendToWhatsApp = () => {
    const now = new Date();
    const fecha = now.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const horaActual = now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });

    let msg = `NUEVO PEDIDO - CEVICHES URABA\n`;
    msg += `================================\n\n`;
    msg += `*Cliente:* ${orderData.nombre || clientName || 'No especificado'}\n`;
    msg += `*Producto:* ${orderData.producto || 'Ver chat'}\n`;
    msg += `*Porciones:* ${orderData.porciones || '1'}\n`;
    msg += `*Modalidad:* ${orderData.modo || 'Por confirmar'}\n`;
    msg += `*Hora de llegada:* ${orderData.hora || 'Por confirmar'}\n`;
    msg += `*Valor estimado:* ${orderData.total || 'Segun menu'}\n\n`;
    msg += `================================\n`;
    msg += `Pedido realizado el ${fecha} a las ${horaActual}\n`;
    msg += `================================`;

    window.open(`https://wa.me/573102676627?text=${encodeURIComponent(msg)}`, '_blank');
};

// ============================================
// AI ENGINE - ROBUST WITH SILENT RETRIES
// ============================================
const cleanAIText = (text) => {
    if (!text) return '';
    // Remove Pollinations watermarks/ads
    let clean = text;
    const cutoffs = [
        '**Support Pollinations',
        'Support Pollinations',
        'Powered by Pollinations',
        '---\n🌸',
        '🌸 **Ad**',
        '🌸 Ad',
        '[Support our mission]'
    ];
    for (const cutoff of cutoffs) {
        const idx = clean.indexOf(cutoff);
        if (idx > 0) clean = clean.substring(0, idx);
    }
    return clean.trim();
};

const callAPI = async (messages) => {
    const response = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            messages: messages,
            model: "openai",
            system: SYSTEM_PROMPT,
            seed: Math.floor(Math.random() * 99999)
        })
    });
    if (!response.ok) throw new Error("API error");
    const raw = await response.text();
    const cleaned = cleanAIText(raw);
    if (!cleaned || cleaned.length < 5) throw new Error("Empty response");
    return cleaned;
};

const getAIResponse = async (userText) => {
    showTyping(true);
    const messages = conversationHistory.concat({ role: "user", content: userText });

    try {
        // Try up to 3 times silently
        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                let result = await callAPI(messages);

                // Strip repeated greeting if conversation already started
                if (conversationHistory.length > 2) {
                    result = result.replace(/^¡?Hola[!,.]?\s*(S|s)oy Valentina[^.!?]*[.!?]\s*/i, '');
                    result = result.replace(/^¡?Hola[!,.]?\s*¿[Cc]on quién[^?]*\?\s*/i, '');
                }

                return result;
            } catch (err) {
                console.warn(`Attempt ${attempt + 1} failed, retrying...`);
                await new Promise(r => setTimeout(r, 1000));
            }
        }

        // ALL retries failed - contextual fallback
        const lower = userText.toLowerCase();
        if (lower.includes('recomiend') || lower.includes('no sé') || lower.includes('qué me')) {
            return "¡Esa es mi pregunta favorita! Si es tu primera vez con nosotros, te recomiendo el Mixto ($22.000), que trae camarón, pescado y calamar con nuestra salsa especial. Ahora, si quieres algo más premium, el Especial Urabá con langostino y coco ($28.000) es una experiencia aparte. ¿Para cuántas personas sería?";
        } else if (lower.includes('precio') || lower.includes('cuánto') || lower.includes('cuanto') || lower.includes('vale')) {
            return "¡Claro! Nuestro Clásico está en $18.000, el Mixto en $22.000 y si quieres algo especial, el de Langostino con Coco va en $28.000. También tenemos el Combo Pareja a $38.000 que incluye 2 clásicos y 2 bebidas. ¿Cuál te llama la atención?";
        } else if (lower.includes('horario') || lower.includes('hora') || lower.includes('abierto')) {
            return "¡Aquí estamos de lunes a domingo, de 8 de la mañana a 8 de la noche! Nos encuentras en el Peaje de Cirilo, Turbo. ¿A qué hora te espero?";
        } else if (lower.includes('dónde') || lower.includes('ubicac') || lower.includes('direc')) {
            return "Nos encuentras justo al lado del Peaje de Cirilo, en Turbo, sobre la vía principal. Es fácil de ubicar. ¿Vienes a comer aquí o prefieres para llevar?";
        } else {
            return "¡Me encanta tu interés! Cuéntame un poco más sobre lo que estás buscando. ¿Es para ti solo o para compartir? Así te puedo recomendar lo que mejor se ajuste.";
        }
    } finally {
        showTyping(false);
    }
};

// ============================================
// NAME DETECTION
// ============================================
const detectName = (text) => {
    if (clientName) return; // Already have the name
    const lower = text.toLowerCase();

    // Pattern: "me llamo X", "soy X", "mi nombre es X"
    const patterns = [
        /me llamo\s+([A-ZÁÉÍÓÚa-záéíóú]{2,})/i,
        /soy\s+([A-ZÁÉÍÓÚa-záéíóú]{2,})/i,
        /mi nombre es\s+([A-ZÁÉÍÓÚa-záéíóú]{2,})/i,
        /nombre[:\s]+([A-ZÁÉÍÓÚa-záéíóú]{2,})/i
    ];
    for (const p of patterns) {
        const match = text.match(p);
        if (match) {
            clientName = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
            return;
        }
    }

    // If it's the second message in the conversation (likely just the name)
    if (conversationHistory.length <= 3 && text.split(' ').length <= 3) {
        const words = text.replace(/[^A-ZÁÉÍÓÚa-záéíóú\s]/g, '').trim().split(' ');
        const name = words[0];
        if (name && name.length > 1 && !['hola', 'buenas', 'hey', 'que', 'quiero', 'buenos', 'buena'].includes(name.toLowerCase())) {
            clientName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        }
    }
};

// ============================================
// SEND HANDLER
// ============================================
const handleSend = async () => {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    userInput.value = '';

    detectName(text);

    const aiResponse = await getAIResponse(text);

    // Detect order block as trigger for confirm button
    const hasOrderBlock = aiResponse.includes('[[PEDIDO]]');

    if (hasOrderBlock) {
        parseOrderFromAI(aiResponse);
    }

    addMessage(aiResponse, 'bot', hasOrderBlock);

    conversationHistory.push({ role: "user", content: text }, { role: "assistant", content: aiResponse });

    // Keep history manageable but preserve system prompt
    if (conversationHistory.length > 22) {
        conversationHistory = [conversationHistory[0], ...conversationHistory.slice(-20)];
    }
};

sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSend(); });

// ============================================
// INITIAL GREETING (only once)
// ============================================
setTimeout(() => {
    if (!greetingSent && chatMessages.children.length <= 1) {
        greetingSent = true;
        showTyping(true);
        setTimeout(() => {
            showTyping(false);
            addMessage("¡Hola! Soy Valentina de Ceviches Urabá. Qué alegría saludarte. ¿Con quién tengo el gusto de hablar hoy?", 'bot');
            conversationHistory.push({ role: "assistant", content: "¡Hola! Soy Valentina de Ceviches Urabá. Qué alegría saludarte. ¿Con quién tengo el gusto de hablar hoy?" });
        }, 1200);
    }
}, 2000);
