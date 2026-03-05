// ============================================
// CEVICHES URABÁ - VALENTINA AI CHATBOT v3.5
// Restauración de Integridad + Memoria + Sheets
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
// PROMPT MAESTRO ORIGINAL RECONSTRUIDO
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
PASO 6 - CIERRE: Cuando tengas TODOS los datos (Nombre, Teléfono, Pedido exacto, Cantidad, Modo y Hora), genera tu mensaje de cierre e incluye al final el bloque de datos en este formato exacto:
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
Ubicación: Peaje de Cirilo, Turbo. Horario: 8 AM - 8 PM.
Menú: Clásico ($18k), Mixto ($22k), Pescado ($16k), Langostino Especial ($28k), Mar y Tierra ($25k), Combo Pareja ($38k).`;

// ============================================
// STATE & CONFIG
// ============================================
let conversationHistory = [{ role: "system", content: SYSTEM_PROMPT }];
let clientName = "";
let clientPhone = "";
let greetingSent = false;
let orderData = { nombre: "", telefono: "", producto: "", porciones: "", modo: "", hora: "", total: "" };

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
// INTEGRATION (Sheets & History)
// ============================================
async function consultarHistorial(telefono) {
    try {
        const res = await fetch(`${SHEET_URL}?telefono=${encodeURIComponent(telefono)}`);
        if (res.ok) return await res.json();
    } catch (e) { console.error("History error", e); }
    return { status: "nuevo" };
}

function generarContexto(historial) {
    if (!historial || historial.status === "nuevo" || !historial.pedidos) return "Cliente nuevo detectado.";
    const ultimo = historial.ultimoPedido || historial.pedidos[historial.pedidos.length - 1];
    return `CONTEXTO DE CLIENTE RECURRENTE:
    - Nombre: ${historial.nombre}
    - Favorito a sugerir: lo que más pida según su historial (${ultimo.producto}).
    - Última vez pidió: ${ultimo.producto} hace poco.
    Salúdalo por su nombre y personaliza basándote en esto.`;
}

const generarID = () => "conv_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5);

const guardarEnSheets = async (textoResumen, mensajes) => {
    try {
        // Extrae el bloque [[PEDIDO]]...[[/PEDIDO]]
        const bloqueMatch = textoResumen.match(/\[\[PEDIDO\]\]([\s\S]*?)\[\[\/PEDIDO\]\]/i);
        const bloque = bloqueMatch ? bloqueMatch[1] : textoResumen;

        // Busca un campo por su etiqueta en el bloque del pedido
        const get = (etiqueta) => {
            const regex = new RegExp(`${etiqueta}[:\\s]+([^\\n]+)`, 'i');
            const match = bloque.match(regex);
            return (match && match[1].trim()) ? match[1].trim() : "—";
        };

        // ✅ TELÉFONO: primero usa clientPhone (capturado cuando el cliente escribió su número en el chat)
        // Solo si no existe, intenta buscarlo en el bloque del pedido
        const telefono = clientPhone
            || get("TELEFONO")
            || get("TELÉFONO")
            || get("CELULAR")
            || "—";

        // ✅ NOMBRE: primero clientName, luego el bloque
        const cliente = clientName || get("NOMBRE") || "—";

        const datos = {
            idConversacion: generarID(),
            fecha:         new Date().toLocaleString("es-CO"),
            cliente,
            telefono,
            producto:      get("PRODUCTO"),
            porciones:     get("PORCIONES"),
            modalidad:     get("MODO"),
            horaLlegada:   get("HORA"),
            valorEstimado: get("TOTAL")
        };

        const conversacion = mensajes
            .filter(m => m.role !== "system")
            .map(m => `${m.role === 'user' ? '👤 Cliente' : '🤖 Valentina'}: ${m.content}`)
            .join("\n\n---\n\n");

        console.log("📦 Guardando en Sheets:", datos);

        await fetch(SHEET_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...datos, conversacion })
        });

    } catch (e) { console.error("Sheet error", e); }
};

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
// AI ENGINE & ROBUST HANDLER
// ============================================
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
    return raw.split('---')[0].split('**Support')[0].trim();
};

const handleSend = async () => {
    const text = userInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    userInput.value = '';

    // Detección silenciosa de datos
    if (!clientPhone) {
        const pMatch = text.match(/(3\d{9})/);
        if (pMatch) {
            clientPhone = pMatch[1];
            const hist = await consultarHistorial(clientPhone);
            const context = generarContexto(hist);
            conversationHistory.push({ role: "system", content: context });
            if (hist.nombre) clientName = hist.nombre;
        }
    }
    if (!clientName) {
        // Acepta nombre solo (ej: "Ángela") o con frase (ej: "me llamo Juan")
        const nMatch = text.match(/(?:me llamo|soy|mi nombre es)\s+([A-ZÁÉÍÓÚÑa-záéíóúñ]{2,})/i)
                    || text.match(/^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]{2,})$/);
        if (nMatch) clientName = nMatch[1].split(" ")[0]; // Solo primer nombre
    }

    showTyping(true);
    let aiResponse = "";

    try {
        // Intentar hasta 3 veces silenciosamente por si hay micro-caídas (Error 502)
        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                aiResponse = await callAPI(conversationHistory.concat({ role: "user", content: text }));
                break;
            } catch (err) {
                if (attempt === 2) throw err;
                await new Promise(r => setTimeout(r, 1000));
            }
        }
    } catch (e) {
        // FALLBACK CONTEXTUAL: Valentina responde según palabras clave si la nube falla
        const low = text.toLowerCase();
        if (low.includes('recomiend') || low.includes('no sé') || low.includes('qué me')) {
            aiResponse = "¡Esa es mi parte favorita! Si es tu primera vez, el Mixto ($22k) es el rey de la casa, pero si quieres algo de otro mundo, el Especial Urabá con langostino y coco ($28k) te va a encantar. ¿Para cuántas personas sería?";
        } else if (low.includes('precio') || low.includes('cuanto') || low.includes('vale')) {
            aiResponse = "¡Claro que sí! Mira, nuestro Clásico está en $18k, el Mixto en $22k y el Especial de la casa en $28k. También tenemos combos para pareja. ¿Cuál te suena más?";
        } else if (low.includes('donde') || low.includes('ubicacion')) {
            aiResponse = "Nos encuentras justo al lado del Peaje de Cirilo en Turbo. Es muy fácil llegar por la vía principal. ¿Vienes a comer aquí o lo buscas para llevar?";
        } else {
            aiResponse = "¡Qué alegría tu interés! Cuéntame un poquito más sobre lo que buscas para poder darte la mejor recomendación de nuestra carta.";
        }
    } finally {
        const hasPedido = aiResponse.includes('[[PEDIDO]]');
        addMessage(aiResponse, 'bot', hasPedido);
        conversationHistory.push({ role: "user", content: text }, { role: "assistant", content: aiResponse });
        if (conversationHistory.length > 25) conversationHistory = [conversationHistory[0], ...conversationHistory.slice(-20)];
        showTyping(false);
    }
};

window.sendToWhatsApp = () => {
    const lastBotMsg = conversationHistory.filter(m => m.role === 'assistant').slice(-1)[0].content;
    const get = (k) => { const m = lastBotMsg.match(new RegExp(`${k}:\\s*(.+)`, 'i')); return m ? m[1].trim() : "—"; };

    let msg = `NUEVO PEDIDO - CEVICHES URABA\n================================\n\n`;
    msg += `*Cliente:* ${get("NOMBRE")}\n*Teléfono:* ${get("TELÉFONO")}\n*Producto:* ${get("PRODUCTO")}\n*Porciones:* ${get("PORCIONES")}\n*Modalidad:* ${get("MODO")}\n*Hora:* ${get("HORA")}\n*Total:* ${get("TOTAL")}\n\n================================`;

    guardarEnSheets(lastBotMsg, conversationHistory);
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
