// ============================================
// CEVICHES URABÁ - VALENTINA AI CHATBOT v4.2
// Base original funcional + guardado progresivo
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
// PROMPT MAESTRO
// ============================================
const SYSTEM_PROMPT = `Eres Valentina, la asesora de ventas y atención al cliente de Ceviches Urabá, el restaurante familiar de Turbo Ciudad Puerto que cultiva su propio camarón en las aguas del Golfo de Urabá. Eres mujer, tienes la calidez de alguien que conoce y ama la tierra que representa, y hablas con el orgullo natural de quien sabe que está ofreciendo algo genuinamente especial.

Conoces el negocio por dentro: sabes que el camarón lo cultivan ellos mismos, que no hay intermediarios, que la frescura es la razón de ser de todo. Eso no lo repites como un discurso; lo transmites con la naturalidad de quien lo vivió.

Tu misión es acompañar a cada persona que escribe hasta que encuentre lo que necesita y tome la mejor decisión para ella. No eres una vendedora agresiva. Eres una anfitriona que conoce muy bien lo que sirve.

TONO: Habla como una persona real de la Costa Caribe colombiana: cercana, cálida, con chispa y autenticidad, pero siempre respetuosa y profesional. No uses jerga exagerada. Varía siempre tus expresiones. Nunca uses la misma frase dos veces seguidas. Mensajes cortos: máximo 3-4 oraciones. Emojis con moderación (1-2 máximo). Nunca listas con viñetas. Todo en prosa conversacional. Ortografía impecable siempre.

PROCESO DE VENTA (LAS 6 CONEXIONES):
PASO 1 - SALUDO Y CAPTURA: Preséntate SOLO en el primer mensaje. Pide amablemente cómo se llama (con el primer nombre es suficiente, NO pidas apellido) y su número de WhatsApp (explica que es para no perder el contacto y dar mejor atención).
PASO 2 - CONEXIÓN EMOCIONAL (MEMORIA): Usa el nombre del cliente. Si recibes un "CONTEXTO DE CLIENTE RECURRENTE", menciónale su plato favorito o último pedido con alegría. Pregunta qué le trae por aquí hoy.
PASO 3 - CONEXIÓN FUNCIONAL: Identifica ocasión, cuántas personas, si es para comer allí o llevar. NO hay domicilios. Solo recogida o local. Recomienda algo concreto si tienen dudas.
PASO 4 - CONEXIÓN ASPIRACIONAL: Presenta la oferta con entusiasmo real. El diferencial: el camarón lo cultivan ellos mismos en el Golfo de Urabá. Eso es lo que hace que el sabor sea único.
PASO 5 - CONEXIÓN RACIONAL: Precios, forma de pedido, tiempos. Presenta el precio con seguridad.
PASO 6 - CIERRE: Cuando tengas TODOS los datos (Nombre, Teléfono, Pedido exacto, Cantidad, Modo y Hora), genera tu mensaje de cierre con estas instrucciones (adáptalas a tu tono cálido, no las copies literal):
"¡Listo! Dale clic en *Confirmar pedido* aquí abajo, eso nos llegará directo por WhatsApp. Ya ahí te pedimos que realices la transferencia del valor a cualquiera de estos datos para dejar todo reservado:
• Ahorros Bancolombia: 959 0 0 0 0 0808
• Daviplata (llave): 310 533 24 74
Y nos envías el comprobante por ese mismo WhatsApp. ¡Con eso queda todo listo para cuando llegues!"
Luego incluye el bloque en este formato exacto:
[[PEDIDO]]
NOMBRE: nombre del cliente
TELÉFONO: número del cliente
PRODUCTO: lo que pidió
PORCIONES: cuántas
MODO: Comer aquí / Para llevar
HORA: hora de recogida o llegada
TOTAL: valor total estimado
[[/PEDIDO]]
NO generes ese bloque hasta tener TODOS los datos confirmados.

INFORMACIÓN DEL NEGOCIO:
Ubicación: Peaje de Cirilo, Turbo.
Horario: Lunes a viernes 9:00 AM - 8:00 PM. Sábados y domingos 8:00 AM - 9:00 PM.

MENÚ COMPLETO:

🦐 CEVICHE'S (Pequeño / Grande)
- Coctel (Salsa Rosada): $18.000 / $29.000
- Ceviche (Salsa Roja): $18.000 / $29.000
- Peruano (Leche de Tigre): $18.000 / $29.000
- Costeño (Suero y Maduro): $22.000 / $34.000
- Bomba (Mix de Mariscos): $35.000 solo pequeño
Adicionales: Patacón $5.000 · Suero $5.000 · Queso $5.000 · Entrada $12.000

🦐 KAMARÓN
- K. Frito 130g (entero con concha): $28.000
- K. Frito 230g (entero con concha): $38.000
- K. Al Ajillo (salsa blanca): $28.000
- K. Gratinado (con quesos): $33.000
- K. Apanado (envuelto en harinas): $33.000
- Arroz de Kamarón: $38.000
- Arroz de Mariscos: $48.000

⭐ ESPECIALES
- Bowl de Kamarón: $33.000
- Pasta con Kamarón: $33.000
- Pasta Marinera: $47.000
- Filete en Salsa de Kamarón: $47.000
- Cazuela de Kamarón: $47.000
- Mariscos: $47.000

🐟 PESCADOS
- Tilapia: $24.000
- Milanesita: $27.000 | Milanesa: $35.000
- Sierra: $30.000 | Sierra Mediana: $36.000 | Sierra Grande: $48.000
- Robalito Platero: $32.000 | Posta Robalo: $32.000 | Robalito Mediano: $38.000 | Robalito Grande: $48.000 | Robalito Extra G: $60.000
- Pargo Platero: $42.000 | Pargo Mediano: $54.000 | Pargo Grande: $68.000

🥩 CARNES
- Plancha/Asada Pequeña (Cerdo, Pechuga o Res): $24.000
- Plancha/Asada Mediana: $26.000 | Grande: $28.000
- Chorizo: $15.000 | Costilla Frita: $27.000 | Costilla BBQ: $33.000
- Salchipapa: $15.000 | Menú Infantil: $26.000

🍽️ MENÚ DEL DÍA: $20.000
Incluye arroz, ensalada, patacón, consomé y jugo.
Proteínas: Cerdo al Barril · Gallina Guisada en Coco · Pechuga en Salsa Marinera · Bagre en Salsa de Coco · Bagre Frito

🥤 BEBIDAS
- Gaseosa Mini $2.500 · Vidrio 350ml $3.500 · Plástico Personal $4.000 · 1.5L $8.000
- Energizantes: $3.500 / $4.500 / $7.000 | Mr. Té / Sabiloe / Malta: $3.500
- Chocolate y Café: $4.000 · Tintos: $2.000
- Agua Mini $1.000 · Agua $2.500 · Agua Litro $3.000 · Agua con Gas $3.500
- Jugo de la Casa: $3.500 · Jarra de Jugo: $14.000
- Micheladas: $8.000 (sabores: Frutos Verdes, Frutos Rojos, Frutos Amarillos, Infantil Engomado, Borde Dulce, Borde Salado)
- Jugos y Granizados en agua $6.000 / en leche $8.000: Frutos Rojos · Milo · Limonada · Borojo · Chontaduro · Guanábana · Naranja · Níspero · Maracuyá · Zapote
- Adicionales Michelada: Miel de Abeja $2.000 · Cola Granulada $500 · Cerebrina/Vitafer/Meromacho $2.000`;

// ============================================
// STATE & CONFIG
// ============================================
let conversationHistory = [{ role: "system", content: SYSTEM_PROMPT }];
let clientName = "";
let clientPhone = "";
let greetingSent = false;
let filaSesionCreada = false;
let productoActual = "";
const sessionID = "conv_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5);

const SHEET_URL = "https://script.google.com/macros/s/AKfycbzXa_4nIOwXlLRb_sQGAJoAUT5lQAjZA4VhYMkRHukaTCsdjxbK-8BP9j2ZnxrL3YO6/exec";

// ============================================
// PAGE LOGIC (Preloader, Videos, Scroll)
// ============================================
const hidePreloader = () => {
    if (preloader && !preloader.classList.contains('hide')) {
        preloader.classList.add('hide');
        if (typeof AOS !== 'undefined') setTimeout(() => { AOS.refresh(); }, 100);
    }
};
if (document.readyState === 'complete') hidePreloader();
else { setTimeout(hidePreloader, 1500); window.addEventListener('load', hidePreloader); }

window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
});

if (burger) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
}

const heroVideos = document.querySelectorAll('.hero-video');
let currentVideo = 0;
let isTransitioning = false;

const crossfade = () => {
    if (isTransitioning || heroVideos.length <= 1) return;
    isTransitioning = true;
    const nextIndex = (currentVideo + 1) % heroVideos.length;
    const current = heroVideos[currentVideo];
    const next = heroVideos[nextIndex];
    next.currentTime = 0;
    next.play().then(() => {
        next.classList.add('active');
        setTimeout(() => {
            current.classList.remove('active');
            current.pause();
            currentVideo = nextIndex;
            isTransitioning = false;
        }, 2500);
    }).catch(() => { isTransitioning = false; currentVideo = nextIndex; });
};

if (heroVideos.length > 1) {
    heroVideos[0].play().catch(() => { });
    heroVideos.forEach((video) => {
        video.addEventListener('timeupdate', function () {
            if (this.classList.contains('active') && !isTransitioning) {
                if (this.duration - this.currentTime < 1.2) crossfade();
            }
        });
    });
}

// ============================================
// INTEGRATION - Historial (Igual que ejemplo.js)
// ============================================
async function consultarHistorial(telefono) {
    try {
        const res = await fetch(`${SHEET_URL}?telefono=${encodeURIComponent(telefono)}`);
        if (res.ok) return await res.json();
    } catch (e) { console.error("History error", e); }
    return { status: "nuevo" };
}

function generarContexto(historial) {
    if (!historial || historial.status === "nuevo" || !historial.nombre) {
        return ""; // Cliente nuevo, no inyectar nada
    }

    if (historial.status === "conocido" || !historial.pedidos || historial.pedidos.length === 0) {
        return `CONTEXTO DE CLIENTE CONOCIDO (usa esto en tu próxima respuesta):
- Conocemos a este cliente. Su nombre es: ${historial.nombre}.
- Salúdalo por su nombre con alegría.
- NO le vuelvas a pedir su nombre ni su teléfono, ya los tienes.`;
    }

    const ultimo = historial.ultimoPedido || (historial.pedidos && historial.pedidos.length > 0 ? historial.pedidos[historial.pedidos.length - 1] : null);
    if (!ultimo || !ultimo.producto) return `CONTEXTO DE CLIENTE CONOCIDO: Su nombre es ${historial.nombre}.`;

    return `CONTEXTO DE CLIENTE RECURRENTE (usa esto en tu próxima respuesta):
- El cliente ya nos ha comprado antes. Su nombre es: ${historial.nombre}.
- Su último pedido fue: ${ultimo.producto} (${ultimo.porciones || "1"} porción, ${ultimo.modalidad || "comer aquí"}).
- Salúdalo por su nombre con mucha alegría, menciónale su último pedido y pregúntale si quiere lo mismo de siempre o quiere probar algo diferente hoy.
- NO le vuelvas a pedir su nombre ni su teléfono, ya los tienes.`;
}

// ============================================
// INTEGRATION - Guardado progresivo en Sheets
// ============================================
async function enviarASheets(payload) {
    try {
        await fetch(SHEET_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        console.log("✅ Sheets:", payload.accion);
    } catch (e) { console.error("Sheet error:", e); }
}

// MOMENTO 1 — Guarda en cuanto llega el primer dato (nombre o teléfono)
// Si la fila ya existe, actualiza el campo que faltaba
async function guardarContacto() {
    if (!clientName && !clientPhone) return; // nada que guardar aún

    if (!filaSesionCreada) {
        filaSesionCreada = true;
        await enviarASheets({
            accion: "contacto",
            idConversacion: sessionID,
            fecha: new Date().toLocaleString("es-CO"),
            cliente: clientName || "",
            telefono: clientPhone || "",
            producto: "", porciones: "", modalidad: "",
            horaLlegada: "", valorEstimado: "",
            pedidoConfirmado: "No",
            conversacion: ""
        });
    } else if (clientName && clientPhone) {
        // Fila ya creada — actualizar nombre y teléfono si ya tenemos ambos
        await enviarASheets({
            accion: "actualizar_contacto",
            idConversacion: sessionID,
            cliente: clientName,
            telefono: clientPhone
        });
    }
}

// MOMENTO 2 — Cuando el agente menciona un producto, actualiza solo esa celda
async function actualizarProducto(productoDetectado) {
    if (!filaSesionCreada) return;
    if (productoDetectado === productoActual) return;
    productoActual = productoDetectado;
    await enviarASheets({
        accion: "actualizar",
        idConversacion: sessionID,
        producto: productoDetectado
    });
}

// MOMENTO 3 — Al confirmar el pedido (WhatsApp), completa toda la fila
async function guardarCierreCompleto(textoResumen) {
    const bloqueMatch = textoResumen.match(/\[\[PEDIDO\]\]([\s\S]*?)\[\[\/PEDIDO\]\]/i);
    const bloque = bloqueMatch ? bloqueMatch[1] : textoResumen;
    const get = (etiqueta) => {
        const m = bloque.match(new RegExp(`${etiqueta}[:\\s]+([^\\n]+)`, 'i'));
        return (m && m[1].trim()) ? m[1].trim() : "";
    };
    const conversacion = conversationHistory
        .filter(m => m.role !== "system")
        .map(m => `${m.role === 'user' ? '👤 Cliente' : '🤖 Valentina'}: ${m.content}`)
        .join("\n\n---\n\n");

    await enviarASheets({
        accion: "cierre",
        idConversacion: sessionID,
        fecha: new Date().toLocaleString("es-CO"),
        cliente: clientName || get("NOMBRE"),
        telefono: clientPhone || get("TELÉFONO") || get("TELEFONO"),
        producto: get("PRODUCTO"),
        porciones: get("PORCIONES"),
        modalidad: get("MODO"),
        horaLlegada: get("HORA"),
        valorEstimado: get("TOTAL"),
        pedidoConfirmado: "Sí",
        conversacion
    });
}

// Detección de productos para el Momento 2
const PRODUCTOS_MENU = [
    "Coctel", "Ceviche", "Peruano", "Costeño", "Bomba",
    "K. Frito", "K. Al Ajillo", "Al Ajillo", "K. Gratinado", "Gratinado", "K. Apanado", "Apanado",
    "Arroz de Kamarón", "Arroz de Mariscos",
    "Bowl de Kamarón", "Bowl", "Pasta con Kamarón", "Pasta Marinera",
    "Filete en Salsa", "Cazuela de Kamarón", "Cazuela", "Mariscos",
    "Tilapia", "Milanesita", "Milanesa", "Sierra", "Robalo", "Robalito", "Pargo",
    "Plancha", "Asada", "Chorizo", "Costilla Frita", "Costilla BBQ", "Salchipapa", "Menú Infantil",
    "Menú del Día", "Menú del día"
];

function detectarProducto(texto) {
    for (const prod of PRODUCTOS_MENU) {
        if (texto.toLowerCase().includes(prod.toLowerCase())) return prod;
    }
    return null;
}

// ============================================
// CHAT UI & AI
// ============================================
const toggleChat = () => { chatBox.classList.toggle('open'); if (chatBox.classList.contains('open')) userInput.focus(); };
chatToggle.onclick = toggleChat;
closeChat.onclick = toggleChat;
window.flipMap = () => document.getElementById('mapFlipcard').classList.toggle('flipped');

const showTyping = (show) => {
    typingIndicator.style.display = show ? 'block' : 'none';
    if (show) chatMessages.scrollTop = chatMessages.scrollHeight;
};

const addMessage = (text, sender, showConfirmBtn = false) => {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    let cleanText = text.replace(/\[\[PEDIDO\]\][\s\S]*?\[\[\/PEDIDO\]\]/g, '').trim();
    let html = `<p>${cleanText}</p>`;
    if (showConfirmBtn) {
        html += `
            <div class="order-action">
                <button class="confirm-btn" onclick="sendToWhatsApp()">
                    <i class="fab fa-whatsapp"></i> Confirmar pedido
                </button>
            </div>`;
    }
    html += `<span style="display:block; font-size:10px; opacity:0.6; text-align:right; margin-top:5px;">${time} ${sender === 'user' ? '<i class="fas fa-check-double" style="color:#34b7f1"></i>' : ''}</span>`;
    msgDiv.innerHTML = html;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

// ============================================
// AI ENGINE & HANDLER
// ============================================
const callAPI = async (messages) => {
    const ahora = new Date();
    const dias = ["domingo", "lunes", "martes", `${"miércoles"}`, "jueves", "viernes", "sábado"];
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const fechaCtx = "CONTEXTO FECHA/HORA: Hoy es " + dias[ahora.getDay()] + ", " + ahora.getDate() + " de " + meses[ahora.getMonth()] + " de " + ahora.getFullYear() + ". Son las " + ahora.getHours() + ":" + String(ahora.getMinutes()).padStart(2, "0") + " hora Colombia. Horario: lunes-viernes hasta 8PM, sabados-domingos hasta 9PM. No aceptes pedidos fuera de horario.";

    const systemConFecha = messages[0].content + "\n\n" + fechaCtx;
    const msgsConFecha = [{ role: "system", content: systemConFecha }, ...messages.slice(1)];

    const response = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            messages: msgsConFecha,
            model: "openai",
            seed: Math.floor(Math.random() * 99999)
        })
    });
    if (!response.ok) throw new Error("API " + response.status);
    const raw = await response.text();
    if (!raw || raw.trim().length < 5) throw new Error("Respuesta vacia");
    return raw.split("---")[0].split("**Support")[0].trim();
};

const handleSend = async () => {
    const text = userInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    userInput.value = '';

    // ── Detección silenciosa de teléfono ──
    if (!clientPhone) {
        const textLimpio = text.replace(/[\s\-\.]/g, "");
        const pMatch = textLimpio.match(/(3\d{9})/);
        if (pMatch) {
            clientPhone = pMatch[1];
            // Consultar historial ANTES de llamar al API
            const hist = await consultarHistorial(clientPhone);
            const context = generarContexto(hist);
            if (context) conversationHistory.push({ role: "system", content: context });
            // Recuperar nombre si es cliente conocido (NO bloquear filaSesionCreada)
            if (hist && hist.nombre && hist.nombre !== "" && hist.nombre !== "—") {
                clientName = hist.nombre;
            }
            // Siempre intentar crear fila — funciona para nuevos y recurrentes
            guardarContacto();
        }
    }

    // ── Detección silenciosa de nombre ──
    if (!clientName) {
        const EXCLUIR = /^(hola|buenas|bueno|buena|bien|ok|okey|sí|si|no|gracias|claro|perfecto|listo|quiero|deseo|hey|saludos|buen|hello|hi|mixto|clásico|clasico|pescado|langostino|combo|ceviche|para|llevar|aquí|aqui|aca|tarde|noche|mañana|dias|días)$/i;
        const nMatch = text.match(/(?:me llamo|soy|mi nombre es|me llaman|me dicen)\s+([A-ZÁÉÍÓÚÑa-záéíóúñ]{2,})/i)
            || (!EXCLUIR.test(text.trim()) && text.trim().split(/\s+/).length <= 2
                ? text.match(/^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]{2,})(?:\s[A-ZÁÉÍÓÚÑa-záéíóúñ]{2,})?$/)
                : null);
        if (nMatch) {
            clientName = nMatch[1].split(" ")[0];
            guardarContacto(); // dispara guardado si ya tiene teléfono
        }
    }

    // ── Si ya tenemos nombre pero acaba de llegar el teléfono, guardar ──
    // Cubre el caso: cliente nuevo que dio nombre primero y teléfono después
    if (clientName && clientPhone && !filaSesionCreada) {
        guardarContacto();
    }

    showTyping(true);
    let aiResponse = "";

    // Armar historial completo con el nuevo mensaje del usuario
    const mensajesParaAPI = conversationHistory.concat({ role: "user", content: text });

    try {
        // Hasta 5 reintentos con espera creciente — sin fallback que confunda
        for (let attempt = 0; attempt < 5; attempt++) {
            try {
                aiResponse = await callAPI(mensajesParaAPI);
                if (aiResponse && aiResponse.length > 5) break; // respuesta válida
            } catch (err) {
                console.warn(`Intento ${attempt + 1} fallido:`, err.message);
                if (attempt < 4) await new Promise(r => setTimeout(r, 1200 * (attempt + 1)));
            }
        }
        // Si después de 5 intentos no hay respuesta, mensaje neutro que no rompe el contexto
        if (!aiResponse || aiResponse.length < 5) {
            aiResponse = "Un momento, ya te respondo... 🙏";
        }
    } finally {
        const hasPedido = aiResponse.includes('[[PEDIDO]]');
        addMessage(aiResponse, 'bot', hasPedido);
        // Solo guardar en historial si la respuesta es real (no el mensaje de espera)
        if (aiResponse !== "Un momento, ya te respondo... 🙏") {
            conversationHistory.push({ role: "user", content: text }, { role: "assistant", content: aiResponse });
        }
        // Recortar historial preservando: [0]=system + todos los role:system + últimos mensajes de chat
        if (conversationHistory.length > 30) {
            const systemMsgs = conversationHistory.filter(m => m.role === "system");
            const chatMsgs = conversationHistory.filter(m => m.role !== "system").slice(-22);
            conversationHistory = [...systemMsgs, ...chatMsgs];
        }
        showTyping(false);

        // Detectar producto en respuesta del agente y actualizar la fila
        const prodDetectado = detectarProducto(aiResponse);
        if (prodDetectado) actualizarProducto(prodDetectado);
    }
};

window.sendToWhatsApp = () => {
    const lastBotMsg = conversationHistory.filter(m => m.role === 'assistant').slice(-1)[0].content;
    const get = (k) => { const m = lastBotMsg.match(new RegExp(`${k}:\\s*(.+)`, 'i')); return m ? m[1].trim() : "—"; };

    let msg = `NUEVO PEDIDO - CEVICHES URABA\n================================\n\n`;
    msg += `*Cliente:* ${get("NOMBRE")}\n*Teléfono:* ${get("TELÉFONO")}\n*Producto:* ${get("PRODUCTO")}\n*Porciones:* ${get("PORCIONES")}\n*Modalidad:* ${get("MODO")}\n*Hora:* ${get("HORA")}\n*Total:* ${get("TOTAL")}\n\n================================\n\n`;
    msg += `Para reservar, realiza la transferencia por el valor del pedido a:\n`;
    msg += `• Ahorros Bancolombia: *959 0 0 0 0 0808*\n`;
    msg += `• Daviplata (llave): *310 533 24 74*\n\n`;
    msg += `📸 Envía el comprobante por este chat para confirmar tu reserva.`;

    // MOMENTO 3 — Guardado final en Sheet
    guardarCierreCompleto(lastBotMsg);
    
    window.open(`https://wa.me/573102676627?text=${encodeURIComponent(msg)}`, '_blank');
};

// Initial Greeting
setTimeout(() => {
    if (!greetingSent) {
        greetingSent = true;
        addMessage("¡Hola! Soy Valentina de Ceviches Urabá. Qué alegría saludarte. Para poder atenderte mejor y no perder el contacto, ¿me regalas tu nombre y tu número de WhatsApp?", 'bot');
        conversationHistory.push({ role: "assistant", content: "¿Me regalas tu nombre y tu número de WhatsApp?" });
    }
}, 2000);

sendBtn.onclick = handleSend;
userInput.onkeypress = (e) => { if (e.key === 'Enter') handleSend(); };

// ============================================
// MENÚ COMPLETO - DINÁMICA DEL MODAL
// ============================================
(function () {
    const overlay = document.getElementById('fullMenuOverlay');
    const openBtn = document.getElementById('openFullMenu');
    const closeBtn = document.getElementById('closeFullMenu');
    const tabs = document.querySelectorAll('.menu-tab');
    const categories = document.querySelectorAll('.menu-category');

    if (!overlay || !openBtn || !closeBtn) return;

    // Abrir modal
    function openMenu() {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        overlay.scrollTop = 0;
    }

    // Cerrar modal
    function closeMenu() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        // Cerrar también el panel de carrito si está abierto al cerrar el menú
        const cartPanel = document.getElementById('cartPanel');
        if (cartPanel) cartPanel.classList.remove('open');
    }

    openBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

    // Cerrar al hacer clic en el fondo (overlay), no dentro del modal
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeMenu();
    });

    // Cerrar con Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('open')) closeMenu();
    });

    // Tab switching con animación
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const cat = this.getAttribute('data-cat');
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            categories.forEach(c => c.classList.remove('active'));
            const target = document.getElementById('cat-' + cat);
            if (target) {
                target.classList.add('active');
                target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    // Chat trigger desde el menú completo
    document.querySelectorAll('.chat-trigger').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            closeMenu();
            setTimeout(() => {
                if (chatBox && !chatBox.classList.contains('open')) {
                    chatBox.classList.add('open');
                    if (userInput) userInput.focus();
                }
            }, 350);
        });
    });
})();

// ============================================
// CART SYSTEM - Sistema de Carrito Completo
// ============================================
const CartSystem = (() => {
    // ── Estado ──────────────────────────────
    let items = [];

    // ── Helpers ─────────────────────────────
    const makeId = (name, size) =>
        (name + (size ? '_' + size : '')).toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');

    const fmtPrice = (n) =>
        '$' + n.toLocaleString('es-CO');

    const parsePrice = (str) =>
        parseInt((str || '').replace(/[^0-9]/g, '')) || 0;

    const getTotalQty = () => items.reduce((s, i) => s + i.qty, 0);
    const getTotal = () => items.reduce((s, i) => s + i.price * i.qty, 0);

    // ── DOM refs ─────────────────────────────
    let badgeMini, barCount, barTotal, stickyBar, barBtn;
    let cartPanel, cartPanelBack, cartItemsList, cartTotalEl, checkoutBtn;
    let sizeOverlay, sizeTitle, sizeOptions, sizeCancel;

    // ── Cart Operations ──────────────────────
    const add = (name, size, price, img) => {
        const id = makeId(name, size);
        const ex = items.find(i => i.id === id);
        if (ex) { ex.qty++; }
        else { items.push({ id, name, size, price, img: img || null, qty: 1 }); }
        updateUI();
        animateBarBtn();
    };

    const updateQty = (id, delta) => {
        const item = items.find(i => i.id === id);
        if (!item) return;
        item.qty = Math.max(0, item.qty + delta);
        if (item.qty === 0) items = items.filter(i => i.id !== id);
        updateUI();
    };

    // ── Update UI ────────────────────────────
    const updateUI = () => {
        const qty = getTotalQty();
        const total = getTotal();

        // Badge
        if (badgeMini) badgeMini.textContent = qty;
        const floatingBadge = document.getElementById('cartBadgeFloating');
        if (floatingBadge) floatingBadge.textContent = qty;

        // Sticky bar
        if (stickyBar) stickyBar.classList.toggle('visible', qty > 0);
        if (barCount) barCount.textContent = qty + (qty === 1 ? ' producto' : ' productos');
        if (barTotal) barTotal.textContent = fmtPrice(total);

        // Cart total
        if (cartTotalEl) cartTotalEl.textContent = fmtPrice(total);

        // Checkout btn state
        if (checkoutBtn) checkoutBtn.disabled = qty === 0;

        // Render cart items
        renderCartItems();

        // Sync inline controls
        syncInlineControls();
    };

    const renderCartItems = () => {
        if (!cartItemsList) return;
        if (items.length === 0) {
            cartItemsList.innerHTML = `
                <div class="cart-empty-state">
                    <span class="cart-empty-icon">🛒</span>
                    <p>Tu carrito está vacío</p>
                    <span>Agrega platos desde el menú</span>
                </div>`;
            return;
        }
        cartItemsList.innerHTML = items.map(item => `
            <div class="cart-item">
                ${item.img
                ? `<img src="${item.img}" alt="${item.name}" class="cart-item-img"
                           onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                       <div class="cart-item-img-ph" style="display:none">🍽️</div>`
                : `<div class="cart-item-img-ph">🍽️</div>`}
                <div class="cart-item-info">
                    <span class="cart-item-name">${item.name}${item.size ? ` <small>(${item.size})</small>` : ''}</span>
                    <span class="cart-item-price">${fmtPrice(item.price * item.qty)}</span>
                </div>
                <div class="cart-qty-ctrl">
                    <button class="cqc-btn minus" data-id="${item.id}" aria-label="Quitar">−</button>
                    <span class="cqc-num">${item.qty}</span>
                    <button class="cqc-btn plus" data-id="${item.id}" aria-label="Agregar">+</button>
                </div>
            </div>
        `).join('');

        // Bind cart panel buttons
        cartItemsList.querySelectorAll('.cqc-btn.minus').forEach(btn =>
            btn.addEventListener('click', () => updateQty(btn.dataset.id, -1)));
        cartItemsList.querySelectorAll('.cqc-btn.plus').forEach(btn =>
            btn.addEventListener('click', () => updateQty(btn.dataset.id, 1)));
    };

    const syncInlineControls = () => {
        document.querySelectorAll('.item-qty-ctrl[data-cart-id]').forEach(ctrl => {
            const id = ctrl.dataset.cartId;
            const item = items.find(i => i.id === id);
            const qty = item ? item.qty : 0;
            const numEl = ctrl.querySelector('.iqc-num');
            if (numEl) numEl.textContent = qty;
            ctrl.classList.toggle('active', qty > 0);
        });
    };

    const animateBarBtn = () => {
        if (!barBtn) return;
        barBtn.classList.remove('shake');
        void barBtn.offsetWidth; // reflow
        barBtn.classList.add('shake');
        setTimeout(() => barBtn.classList.remove('shake'), 500);
    };

    // ── Cart Panel ───────────────────────────
    const openCartPanel = () => { if (cartPanel) cartPanel.classList.add('open'); };
    const closeCartPanel = () => { if (cartPanel) cartPanel.classList.remove('open'); };

    // ── Size Picker ──────────────────────────
    const showSizePicker = (itemName, sizes, img) => {
        // sizes = [{ label, price }, ...]
        if (!sizeOverlay || !sizeTitle || !sizeOptions) return;
        sizeTitle.textContent = itemName;
        sizeOptions.innerHTML = sizes.map((s, i) => `
            <div class="size-picker-option" data-idx="${i}" data-price="${s.price}" data-label="${s.label}">
                <span class="size-picker-option-name">${s.label}</span>
                <span class="size-picker-option-price">${fmtPrice(s.price)}</span>
            </div>
        `).join('');
        sizeOptions.querySelectorAll('.size-picker-option').forEach(opt => {
            opt.addEventListener('click', () => {
                add(itemName, opt.dataset.label, parseInt(opt.dataset.price), img);
                closeSizePicker();
            });
        });
        sizeOverlay.classList.add('open');
    };

    const closeSizePicker = () => {
        if (sizeOverlay) sizeOverlay.classList.remove('open');
    };

    // ── Inyectar Controles en Menú Items ─────
    const injectControls = () => {
        // 1) TARJETAS (.menu-item)
        document.querySelectorAll('.menu-item').forEach(card => {
            const h4 = card.querySelector('h4');
            if (!h4) return;
            const name = (h4.childNodes[0]?.nodeValue || h4.textContent).trim();
            // Prefer data-img attribute, then actual img src
            const imgEl = card.querySelector('.item-img-wrap img');
            const img = card.getAttribute('data-img') || (imgEl ? imgEl.getAttribute('src') : null);
            const body = card.querySelector('.item-body');
            if (!body) return;

            const mainPrice = card.querySelector('.price-main');
            const priceSm = card.querySelector('.price-sm');
            const priceLg = card.querySelector('.price-lg');

            if (mainPrice) {
                // Precio único
                const price = parsePrice(mainPrice.textContent);
                const id = makeId(name, null);
                const ctrl = document.createElement('div');
                ctrl.className = 'item-qty-ctrl';
                ctrl.dataset.cartId = id;
                ctrl.innerHTML = `
                    <button class="iqc-btn minus" aria-label="Quitar">−</button>
                    <span class="iqc-num">0</span>
                    <button class="iqc-btn plus" aria-label="Agregar">+</button>`;
                body.appendChild(ctrl);
                ctrl.querySelector('.iqc-btn.plus').addEventListener('click', () => add(name, null, price, img));
                ctrl.querySelector('.iqc-btn.minus').addEventListener('click', () => updateQty(id, -1));

            } else if (card.querySelector('.item-prices-tri') || priceSm && priceLg) {
                // Multi-tamaño (2 o 3 opciones)
                const isTri = !!card.querySelector('.item-prices-tri');
                const triSpans = card.querySelectorAll('.price-tri');
                let sizes = [];

                if (isTri) {
                    sizes = Array.from(triSpans).map(sp => {
                        const txt = sp.textContent.trim();
                        const priceMatch = txt.match(/\$([\d.]+)/);
                        const price = priceMatch ? parseInt(priceMatch[1].replace(/\./g, '')) : 0;
                        const label = txt.replace(/\$[\d.]+/, '').replace(':', '').trim();
                        return { label, price };
                    });
                } else {
                    const pSmVal = parsePrice(priceSm.textContent);
                    const pLgVal = parsePrice(priceLg.textContent);
                    const smLabel = priceSm.textContent.trim().replace(/\$[\d.]+/, '').trim() || 'Pequeño';
                    const lgLabel = priceLg.textContent.trim().replace(/\$[\d.]+/, '').trim() || 'Grande';
                    sizes = [
                        { label: smLabel, price: pSmVal },
                        { label: lgLabel, price: pLgVal }
                    ];
                }

                const wrapper = document.createElement('div');
                wrapper.className = 'item-size-controls';

                sizes.forEach(sz => {
                    const id = makeId(name, sz.label);
                    const ctrl = document.createElement('div');
                    ctrl.className = 'item-qty-ctrl multi-size';
                    ctrl.dataset.cartId = id;
                    ctrl.dataset.size = sz.label.toLowerCase(); // For dynamic CSS coloring
                    ctrl.innerHTML = `
                        <span class="size-label">${sz.label} <span>$${sz.price.toLocaleString()}</span></span>
                        <button class="iqc-btn minus" aria-label="Quitar ${sz.label}">−</button>
                        <span class="iqc-num">0</span>
                        <button class="iqc-btn plus" aria-label="Agregar ${sz.label}">+</button>`;
                    wrapper.appendChild(ctrl);
                    ctrl.querySelector('.iqc-btn.plus').addEventListener('click', () => add(name, sz.label, sz.price, img));
                    ctrl.querySelector('.iqc-btn.minus').addEventListener('click', () => updateQty(id, -1));
                });

                body.appendChild(wrapper);
            }
        });

        // 2) FILAS DE LISTA (.list-item) — precio único
        document.querySelectorAll('.list-item:not(.compact-list):not(.multi)').forEach(row => {
            const nameEl = row.querySelector('.list-name');
            const priceEl = row.querySelector('.list-price');
            if (!nameEl || !priceEl) return;
            const name = (nameEl.childNodes[0]?.nodeValue || nameEl.textContent).trim().split('(')[0].trim();
            const price = parsePrice(priceEl.textContent);
            if (!price) return;
            const id = makeId(name, null);
            const ctrl = document.createElement('div');
            ctrl.className = 'item-qty-ctrl list-style';
            ctrl.dataset.cartId = id;
            ctrl.innerHTML = `
                <button class="iqc-btn minus" aria-label="Quitar">−</button>
                <span class="iqc-num">0</span>
                <button class="iqc-btn plus" aria-label="Agregar">+</button>`;
            row.appendChild(ctrl);
            ctrl.querySelector('.iqc-btn.plus').addEventListener('click', () => add(name, null, price, null));
            ctrl.querySelector('.iqc-btn.minus').addEventListener('click', () => updateQty(id, -1));
        });

        // 3) FILAS MULTI-PRECIO (.list-item.multi) — size picker
        document.querySelectorAll('.list-item.multi').forEach(row => {
            const nameEl = row.querySelector('.list-name');
            const multiSps = row.querySelectorAll('.list-prices-multi span');
            if (!nameEl || multiSps.length === 0) return;

            const fullName = (nameEl.childNodes[0]?.nodeValue || nameEl.textContent).trim();
            const names = fullName.split('/').map(n => n.trim());
            if (names.length !== multiSps.length) {
                // Si no coinciden, usar el nombre base con size picker
                const sizes = Array.from(multiSps).map((sp, i) => ({
                    label: names[i] || `Opción ${i + 1}`,
                    price: parsePrice(sp.textContent)
                }));
                const btn = document.createElement('button');
                btn.className = 'list-add-btn';
                btn.innerHTML = `<i class="fas fa-plus"></i> Agregar`;
                btn.addEventListener('click', () => showSizePicker(names[0], sizes, null));
                row.appendChild(btn);
            } else {
                const sizes = names.map((n, i) => ({
                    label: n,
                    price: parsePrice(multiSps[i].textContent)
                }));
                const btn = document.createElement('button');
                btn.className = 'list-add-btn';
                btn.innerHTML = `<i class="fas fa-plus"></i> Agregar`;
                btn.addEventListener('click', () => showSizePicker(names[0].split(' / ')[0] || names[0], sizes, null));
                row.appendChild(btn);
            }
        });

        // 4) TARJETAS DE PROTEÍNA (Menú del Día)
        document.querySelectorAll('.protein-card').forEach(card => {
            const spans = card.querySelectorAll('span');
            const nameEl = spans[spans.length - 1]; // last span = name
            if (!nameEl) return;
            const name = nameEl.textContent.trim();
            if (!name || name.length < 3) return;
            // Capturar imagen de la card
            const imgEl = card.querySelector('.protein-img-wrap img, img');
            const img = imgEl ? imgEl.getAttribute('src') : null;
            const id = makeId('Menú del Día - ' + name, null);
            const ctrl = document.createElement('div');
            ctrl.className = 'item-qty-ctrl protein-style';
            ctrl.dataset.cartId = id;
            ctrl.innerHTML = `
                <button class="iqc-btn minus" aria-label="Quitar">−</button>
                <span class="iqc-num">0</span>
                <button class="iqc-btn plus" aria-label="Agregar">+</button>`;
            card.appendChild(ctrl);
            ctrl.querySelector('.iqc-btn.plus').addEventListener('click', () =>
                add('Menú del Día – ' + name, null, 20000, img));
            ctrl.querySelector('.iqc-btn.minus').addEventListener('click', () =>
                updateQty(id, -1));
        });

        // 5) BEBIDAS — Michelada sabores (precio fijo)
        document.querySelectorAll('.sabor-tag').forEach(tag => {
            const sabor = tag.textContent.trim();
            tag.style.cursor = 'pointer';
            tag.title = 'Clic para agregar al carrito';
            tag.addEventListener('click', () => {
                add('Michelada ' + sabor, null, 8000, null);
                tag.style.transform = 'scale(1.15)';
                setTimeout(() => tag.style.transform = '', 300);
            });
        });

        // 5b) BEBIDAS — Michelada adicionales (botones .adicional-btn)
        document.querySelectorAll('.adicional-btn').forEach(btn => {
            const name = btn.getAttribute('data-name') || btn.textContent.trim();
            const price = parseInt(btn.getAttribute('data-price') || '0');
            // Usar imagen de michelada si existe cerca del botón
            const sectionImg = btn.closest('.bebida-section, .michelada-section')
                ? btn.closest('.bebida-section, .michelada-section').querySelector('img')
                : null;
            const img = sectionImg ? sectionImg.getAttribute('src') : null;
            btn.addEventListener('click', () => {
                add(name, null, price, img);
                btn.classList.add('added');
                setTimeout(() => btn.classList.remove('added'), 600);
            });
        });

        // 6) JUGOS (Sabores específicos)
        document.querySelectorAll('.sabor-item').forEach(btn => {
            const sabor = btn.textContent.trim();
            btn.addEventListener('click', () => {
                showSizePicker('Jugo de ' + sabor, [
                    { label: 'En Agua', price: 6000 },
                    { label: 'En Leche', price: 8000 }
                ], null);
            });
        });
    };

    // ── Formato Valentina ────────────────────
    const toValentinaContext = () => {
        if (items.length === 0) return '';
        let msg = `CONTEXTO DE PEDIDO PREVIO: El cliente ya escogió sus productos desde el menú digital. Tienes que ayudarle a confirmar. NO leas este contexto como si fuera texto, solo úsalo internamente.\n\nProductos en el carrito:\n`;
        items.forEach(item => {
            const size = item.size ? ` (${item.size})` : '';
            msg += `• ${item.qty}x ${item.name}${size} — ${fmtPrice(item.price)} c/u = ${fmtPrice(item.price * item.qty)}\n`;
        });
        msg += `\nTOTAL ESTIMADO: ${fmtPrice(getTotal())}\n\n`;
        msg += `El cliente acaba de seleccionar sus productos desde el menú digital. Salúdalo con mucha emoción y calidez, dile algo como "¡Súper, recibimos tu selección!" o similar, muéstrale el resumen de lo que pidió con el total, y pídele amablemente su nombre y número de WhatsApp para poder confirmar y tener todo listo. NO le preguntes qué quiere comer, ya lo eligió. Continúa con el proceso de cierre normalmente.`;
        return msg;
    };

    const toUserCartMessage = () => {
        const lines = items.map(i =>
            `${i.qty}x ${i.name}${i.size ? ` (${i.size})` : ''}`);
        return `Hola Valentina! Ya elegí mis platos desde el menú: ${lines.join(', ')}. El total es ${fmtPrice(getTotal())}. ¿Me ayudas a confirmar el pedido?`;
    };

    // ── Init ─────────────────────────────────
    const init = () => {
        badgeMini = document.getElementById('cartBadgeMini');
        barCount = document.getElementById('cartBarCount');
        barTotal = document.getElementById('cartBarTotal');
        stickyBar = document.getElementById('cartStickyBar');
        barBtn = document.getElementById('cartBarBtn');
        cartPanel = document.getElementById('cartPanel');
        cartPanelBack = document.getElementById('cartPanelBack');
        cartItemsList = document.getElementById('cartItemsList');
        cartTotalEl = document.getElementById('cartTotal');
        checkoutBtn = document.getElementById('cartCheckoutBtn');
        sizeOverlay = document.getElementById('sizePickerOverlay');
        sizeTitle = document.getElementById('sizePickerTitle');
        sizeOptions = document.getElementById('sizePickerOptions');
        sizeCancel = document.getElementById('sizePickerCancel');

        const floatToggle = document.getElementById('floatingCartToggle');
        if (floatToggle) {
            floatToggle.addEventListener('click', () => {
                if (cartPanel && cartPanel.classList.contains('open')) {
                    closeCartPanel();
                } else {
                    openCartPanel();
                }
            });
        }

        if (!stickyBar) return;

        // Barra → abrir panel
        if (barBtn) barBtn.addEventListener('click', openCartPanel);

        // Panel → volver al menú
        if (cartPanelBack) cartPanelBack.addEventListener('click', closeCartPanel);

        // Size picker → cancelar
        if (sizeCancel) sizeCancel.addEventListener('click', closeSizePicker);
        if (sizeOverlay) {
            sizeOverlay.addEventListener('click', e => {
                if (e.target === sizeOverlay) closeSizePicker();
            });
        }

        // Checkout → Valentina
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (items.length === 0) return;

                // 1. Inyectar contexto en conversación de Valentina
                const ctx = toValentinaContext();
                if (ctx && typeof conversationHistory !== 'undefined') {
                    conversationHistory.push({ role: 'system', content: ctx });
                }
                // Intentar guardar contacto si ya tenemos datos capturados
                if (typeof guardarContacto === 'function') guardarContacto();

                // 2. Cerrar menú y carrito
                const menuOverlay = document.getElementById('fullMenuOverlay');
                if (menuOverlay) menuOverlay.classList.remove('open');
                document.body.style.overflow = '';
                closeCartPanel();

                // 3. Abrir chat y auto-enviar mensaje del cliente
                setTimeout(() => {
                    const chatBoxEl = document.getElementById('chatBox');
                    const inputEl = document.getElementById('userInput');
                    if (chatBoxEl && !chatBoxEl.classList.contains('open')) {
                        chatBoxEl.classList.add('open');
                    }
                    if (inputEl) {
                        inputEl.value = toUserCartMessage();
                        inputEl.focus();
                        // Auto-send after a brief pause so the chat is visible
                        setTimeout(() => {
                            if (typeof handleSend === 'function') handleSend();
                        }, 600);
                    }
                }, 400);
            });
        }

        // Inyectar controles después de que el DOM del menú esté listo
        // Usamos MutationObserver para detectar cuando el menú se abre por primera vez
        let controlsInjected = false;
        const openBtn = document.getElementById('openFullMenu');
        if (openBtn) {
            openBtn.addEventListener('click', () => {
                if (!controlsInjected) {
                    setTimeout(() => {
                        injectControls();
                        updateUI();
                        controlsInjected = true;
                    }, 150);
                }
            });
        }

        // Fallback: inyectar también en DOMContentLoaded por si el menú ya está visible
        setTimeout(() => {
            if (!controlsInjected) {
                injectControls();
                updateUI();
                controlsInjected = true;
            }
        }, 1500);
    };

    return { init };
})();

// Inicializar el carrito
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CartSystem.init());
} else {
    CartSystem.init();
}
