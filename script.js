// ============================================
// CHOLOS QUALITY BARBER - JAVASCRIPT PRINCIPAL
// ============================================

// Datos de servicios y precios
const servicios = {
    corte: { nombre: 'Corte de Cabello', precio: 8000, duracion: 45 },
    afeitado: { nombre: 'Afeitado Premium', precio: 12000, duracion: 60 },
    barba: { nombre: 'Arreglo de Barba', precio: 10000, duracion: 40 },
    completo: { nombre: 'Servicio Completo', precio: 25000, duracion: 90 },
    tratamiento: { nombre: 'Tratamiento Capilar', precio: 15000, duracion: 60 },
    cejas: { nombre: 'Diseño de Cejas', precio: 5000, duracion: 20 },
    lavado: { nombre: 'Lavado Premium', precio: 6000, duracion: 25 }
};

// Datos de paquetes
const paquetes = {
    'paquete-basico': { nombre: 'Paquete Básico', precio: 5000 },
    'paquete-premium': { nombre: 'Paquete Premium', precio: 20000 },
    'paquete-vip': { nombre: 'Paquete VIP', precio: 35000 }
};

// ============================================
// NAVEGACIÓN MÓVIL
// ============================================
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ============================================
// ANIMACIONES AL HACER SCROLL
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elementos a animar
    const elementsToAnimate = document.querySelectorAll(
        '.animate-on-scroll, .service-card, .package-card, .animate-service, .animate-package'
    );

    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// COTIZADOR DE SERVICIOS (PÁGINA PRINCIPAL)
// ============================================
function initCotizador() {
    const form = document.getElementById('cotizadorForm');
    const resultado = document.getElementById('resultado-cotizacion');

    if (form && resultado) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo').value;
            const servicioSeleccionado = document.getElementById('servicio').value;

            if (!servicioSeleccionado) {
                mostrarError(resultado, 'Por favor selecciona un servicio');
                return;
            }

            const servicio = servicios[servicioSeleccionado];
            const descuento = Math.random() > 0.5 ? 0.1 : 0; // 10% descuento aleatorio
            const precioFinal = servicio.precio * (1 - descuento);

            const html = `
                <div class="cotizacion-resultado">
                    <h3>¡Cotización Lista, ${nombre}!</h3>
                    <div class="servicio-info">
                        <h4>${servicio.nombre}</h4>
                        <p><strong>Precio base:</strong> ₡${servicio.precio.toLocaleString()}</p>
                        ${descuento > 0 ? `<p class="descuento">🎉 <strong>Descuento especial:</strong> ${(descuento * 100)}%</p>` : ''}
                        <p class="precio-final"><strong>Precio final:</strong> ₡${precioFinal.toLocaleString()}</p>
                        <p><strong>Duración estimada:</strong> ${servicio.duracion} minutos</p>
                    </div>
                    <div class="contacto-info">
                        <p>Hemos enviado los detalles a: <strong>${correo}</strong></p>
                        <p>Llámanos al +506 2234-5678 para confirmar tu cita</p>
                    </div>
                </div>
            `;

            resultado.innerHTML = html;
            resultado.style.display = 'block';

            // Scroll suave al resultado
            resultado.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// ============================================
// CALCULADORA DE SERVICIOS (PÁGINA SERVICIOS)
// ============================================
function initCalculadoraServicios() {
    const calcularBtn = document.getElementById('calcular');
    const resultado = document.getElementById('resultado-calculo');

    if (calcularBtn && resultado) {
        calcularBtn.addEventListener('click', () => {
            const servicioSelect = document.getElementById('servicioTipo');
            const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked');

            if (!servicioSelect.value) {
                mostrarError(resultado, 'Por favor selecciona un servicio principal');
                return;
            }

            const servicioBase = servicios[servicioSelect.value];
            let total = servicioBase.precio;
            let serviciosIncluidos = [servicioBase.nombre];

            // Sumar servicios adicionales
            checkboxes.forEach(checkbox => {
                total += parseInt(checkbox.value);
                serviciosIncluidos.push(checkbox.parentElement.textContent.trim());
            });

            const html = `
                <div class="calculo-resultado">
                    <h3>Total de tu Servicio</h3>
                    <div class="servicios-incluidos">
                        <h4>Servicios incluidos:</h4>
                        <ul>
                            ${serviciosIncluidos.map(servicio => `<li>${servicio}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="total-precio">
                        <strong>Total: ₡${total.toLocaleString()}</strong>
                    </div>
                    <p>Duración estimada: ${servicioBase.duracion + (checkboxes.length * 15)} minutos</p>
                    <a href="contacto.html" class="btn btn-primary">Reservar Ahora</a>
                </div>
            `;

            resultado.innerHTML = html;
            resultado.style.display = 'block';
        });
    }
}

// ============================================
// FORMULARIO DE CONTACTO
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const resultado = document.getElementById('resultado-contacto');

    if (form && resultado) {
        // Establecer fecha mínima (hoy)
        const fechaInput = document.getElementById('fecha');
        if (fechaInput) {
            const hoy = new Date().toISOString().split('T')[0];
            fechaInput.min = hoy;
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const datos = Object.fromEntries(formData);

            // Validar datos
            if (!validarFormularioContacto(datos)) {
                mostrarError(resultado, 'Por favor completa todos los campos requeridos');
                return;
            }

            // Simular envío exitoso
            const servicioInfo = obtenerInfoServicio(datos.servicio);

            const html = `
                <div class="contacto-exito">
                    <h3>¡Reserva Recibida!</h3>
                    <div class="reserva-detalles">
                        <h4>Detalles de tu Reserva:</h4>
                        <p><strong>Nombre:</strong> ${datos.nombre}</p>
                        <p><strong>Servicio:</strong> ${servicioInfo.nombre}</p>
                        <p><strong>Precio:</strong> ₡${servicioInfo.precio.toLocaleString()}</p>
                        ${datos.fecha ? `<p><strong>Fecha solicitada:</strong> ${formatearFecha(datos.fecha)}</p>` : ''}
                        ${datos.hora ? `<p><strong>Hora solicitada:</strong> ${datos.hora}</p>` : ''}
                    </div>
                    <div class="siguiente-paso">
                        <p>Te contactaremos en las próximas 2 horas para confirmar tu cita</p>
                        <p>Revisa tu correo: <strong>${datos.correo}</strong></p>
                        <p>WhatsApp: +506 8765-4321</p>
                    </div>
                    <div class="preparacion">
                        <h4>Antes de tu cita:</h4>
                        <ul>
                            <li>Llega 10 minutos antes</li>
                            <li>Trae una foto de referencia (opcional)</li>
                            <li>Menciona cualquier alergia o sensibilidad</li>
                        </ul>
                    </div>
                </div>
            `;

            resultado.innerHTML = html;
            resultado.style.display = 'block';
            form.reset();

            // Scroll al resultado
            resultado.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// ============================================
// GENERADOR DE PAQUETES DINÁMICOS
// ============================================
function initGenerarPaquetes() {
    const btn = document.getElementById('generar-paquetes');
    const container = document.getElementById('paquetes-dinamicos');

    if (btn && container) {
        btn.addEventListener('click', () => {
            const paquetesDinamicos = generarPaquetesAleatorios();

            const html = paquetesDinamicos.map(paquete => `
                <div class="paquete-dinamico">
                    <div class="paquete-header">
                        <h4>${paquete.nombre}</h4>
                        <span class="precio-especial">₡${paquete.precio.toLocaleString()}</span>
                        <span class="ahorro">Ahorra ₡${paquete.ahorro.toLocaleString()}</span>
                    </div>
                    <div class="paquete-servicios">
                        <ul>
                            ${paquete.servicios.map(servicio => `<li>${servicio}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="paquete-validez">
                        <p>Oferta válida hasta: <strong>${paquete.validez}</strong></p>
                    </div>
                    <a href="contacto.html" class="btn btn-primary">Reservar Oferta</a>
                </div>
            `).join('');

            container.innerHTML = `
                <div class="paquetes-especiales">
                    <h3>Ofertas Especiales Generadas</h3>
                    <div class="paquetes-grid">
                        ${html}
                    </div>
                </div>
            `;

            container.style.display = 'block';
            btn.textContent = 'Generar Nuevos Paquetes';
        });
    }
}

// ============================================
// ITINERARIO DINÁMICO (PÁGINA PRINCIPAL)
// ============================================
function initItinerario() {
    const btn = document.getElementById('generar-itinerario');
    const lista = document.getElementById('itinerario-lista');

    if (btn && lista) {
        btn.addEventListener('click', () => {
            const itinerario = [
                { paso: 1, titulo: 'Bienvenida y Consulta', descripcion: 'Te recibimos y conversamos sobre el estilo que deseas', duracion: '5 min' },
                { paso: 2, titulo: 'Preparación', descripcion: 'Preparamos las herramientas y tu zona de trabajo', duracion: '5 min' },
                { paso: 3, titulo: 'Lavado Premium', descripcion: 'Lavado relajante con productos de alta calidad', duracion: '10 min' },
                { paso: 4, titulo: 'Corte Profesional', descripcion: 'Realizamos tu corte con técnicas profesionales', duracion: '25 min' },
                { paso: 5, titulo: 'Acabados', descripcion: 'Detalles finales y styling personalizado', duracion: '10 min' },
                { paso: 6, titulo: 'Resultado Final', descripcion: 'Revisión final y consejos de mantenimiento', duracion: '5 min' }
            ];

            const html = `
                <div class="proceso-atencion">
                    <h3>Nuestro Proceso de Atención</h3>
                    <div class="itinerario-pasos">
                        ${itinerario.map(item => `
                            <div class="paso-item">
                                <div class="paso-numero">${item.paso}</div>
                                <div class="paso-contenido">
                                    <h4>${item.titulo}</h4>
                                    <p>${item.descripcion}</p>
                                    <span class="paso-duracion"> ${item.duracion}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="tiempo-total">
                        <p><strong> Tiempo total estimado: 60 minutos</strong></p>
                    </div>
                </div>
            `;

            lista.innerHTML = html;
            btn.style.display = 'none';
        });
    }
}

// ============================================
// TESTIMONIOS DINÁMICOS
// ============================================
function initTestimonios() {
    const btn = document.getElementById('generar-testimonios');
    const container = document.getElementById('testimonios-dinamicos');

    if (btn && container) {
        btn.addEventListener('click', () => {
            const testimonios = generarTestimoniosAleatorios();

            const html = testimonios.map(testimonio => `
                <div class="testimonio-card">
                    <div class="testimonio-rating">
                        ${'⭐'.repeat(testimonio.rating)}
                    </div>
                    <p class="testimonio-texto">"${testimonio.texto}"</p>
                    <div class="testimonio-autor">
                        <h4>${testimonio.nombre}</h4>
                        <span>${testimonio.servicio}</span>
                        <small>${testimonio.fecha}</small>
                    </div>
                </div>
            `).join('');

            container.innerHTML = html;
            btn.textContent = 'Generar Más Testimonios';

            // Animar entrada
            setTimeout(() => {
                container.querySelectorAll('.testimonio-card').forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }, 100);
        });
    }
}

// ============================================
// HORARIOS DINÁMICOS (PÁGINA SERVICIOS)
// ============================================
function initHorarios() {
    const btn = document.getElementById('generar-horarios');
    const container = document.getElementById('horarios-dinamicos');

    if (btn && container) {
        btn.addEventListener('click', () => {
            const horarios = generarHorariosDisponibles();

            const html = `
                <div class="disponibilidad-horarios">
                    <h3>📅 Disponibilidad Esta Semana</h3>
                    <div class="horarios-semana">
                        ${horarios.map(dia => `
                            <div class="dia-horarios">
                                <h4>${dia.dia}</h4>
                                <div class="fecha">${dia.fecha}</div>
                                <div class="slots-disponibles">
                                    ${dia.slots.map(slot => `
                                        <div class="slot ${slot.disponible ? 'disponible' : 'ocupado'}">
                                            <span class="hora">${slot.hora}</span>
                                            <span class="estado">${slot.disponible ? '✅ Disponible' : '❌ Ocupado'}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="horarios-nota">
                        <p>💡 <strong>Tip:</strong> Los horarios de la mañana suelen tener más disponibilidad</p>
                        <a href="contacto.html" class="btn btn-primary">Reservar Tu Cita</a>
                    </div>
                </div>
            `;

            container.innerHTML = html;
            btn.style.display = 'none';
        });
    }
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

function mostrarError(elemento, mensaje) {
    elemento.innerHTML = `
        <div class="error-mensaje">
            <h3>⚠️ Error</h3>
            <p>${mensaje}</p>
        </div>
    `;
    elemento.style.display = 'block';
}

function validarFormularioContacto(datos) {
    return datos.nombre && datos.correo && datos.servicio;
}

function obtenerInfoServicio(servicioKey) {
    if (servicios[servicioKey]) {
        return servicios[servicioKey];
    }
    if (paquetes[servicioKey]) {
        return paquetes[servicioKey];
    }
    return { nombre: 'Servicio seleccionado', precio: 0 };
}

function formatearFecha(fecha) {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function generarPaquetesAleatorios() {
    const nombres = ['Combo Flash', 'Oferta Weekend', 'Especial Express', 'Pack Ejecutivo'];
    const serviciosBase = [
        ['Corte + Lavado', 'Arreglo de barba básico'],
        ['Corte premium', 'Afeitado', 'Styling'],
        ['Servicio completo', 'Tratamiento capilar'],
        ['Corte + Barba', 'Lavado premium', 'Diseño cejas']
    ];

    return nombres.map((nombre, index) => {
        const precioBase = 15000 + (index * 5000);
        const ahorro = 3000 + (index * 2000);
        const validez = new Date();
        validez.setDate(validez.getDate() + 7 + index);

        return {
            nombre,
            precio: precioBase,
            ahorro,
            servicios: serviciosBase[index],
            validez: validez.toLocaleDateString('es-ES')
        };
    });
}

function generarTestimoniosAleatorios() {
    const testimonios = [
        {
            nombre: 'Carlos Mendez',
            rating: 5,
            texto: 'Excelente atención y profesionalismo. Mi corte quedó perfecto, exactamente como lo quería.',
            servicio: 'Corte Premium',
            fecha: 'Hace 2 días'
        },
        {
            nombre: 'Roberto Silva',
            rating: 5,
            texto: 'El mejor lugar para arreglar la barba. Muy recomendado, ambiente agradable y precios justos.',
            servicio: 'Diseño de Barba',
            fecha: 'Hace 1 semana'
        },
        {
            nombre: 'Alejandro Rojas',
            rating: 4,
            texto: 'Servicio rápido y de calidad. Los barberos saben lo que hacen y te aconsejan muy bien.',
            servicio: 'Paquete Básico',
            fecha: 'Hace 3 días'
        },
        {
            nombre: 'Daniel Vargas',
            rating: 5,
            texto: 'Primera vez que vengo y ya es mi barbería favorita. Atención personalizada y resultado increíble.',
            servicio: 'Servicio VIP',
            fecha: 'Hace 5 días'
        }
    ];

    return testimonios.sort(() => Math.random() - 0.5).slice(0, 3);
}

function generarHorariosDisponibles() {
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const horas = ['9:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

    return dias.map((dia, index) => {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() + index + 1);

        return {
            dia,
            fecha: fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
            slots: horas.map(hora => ({
                hora,
                disponible: Math.random() > 0.3 // 70% probabilidad de estar disponible
            }))
        };
    });
}

// ============================================
// SMOOTH SCROLLING PARA ENLACES INTERNOS
// ============================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// EFECTOS DE HOVER PARA CARDS
// ============================================
function initCardEffects() {
    const cards = document.querySelectorAll('.service-card, .package-card, .gallery-item');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ============================================
// INICIALIZACIÓN GLOBAL
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    console.log('🔧 Inicializando Cholos Quality Barber JavaScript...');

    // Inicializar todas las funcionalidades
    initMobileNavigation();
    initScrollAnimations();
    initCotizador();
    initCalculadoraServicios();
    initContactForm();
    initGenerarPaquetes();
    initItinerario();
    initTestimonios();
    initHorarios();
    initSmoothScrolling();
    initCardEffects();

    console.log('✅ JavaScript inicializado correctamente');

    // Mostrar mensaje de bienvenida en consola
    console.log(`
    🎉 ¡Bienvenido a Cholos Quality Barber!
    📱 Sitio web totalmente funcional
    💻 JavaScript desarrollado por IA
    ✂️ Tu barbería de confianza
    `);
});

// ============================================
// MANEJO DE ERRORES GLOBAL
// ============================================
window.addEventListener('error', function (e) {
    console.error('Error en el sitio:', e.error);
});

// Prevenir errores de formularios
document.addEventListener('submit', function (e) {
    const form = e.target;
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#e74c3c';
        } else {
            field.style.borderColor = '';
        }
    });

    if (!isValid) {
        e.preventDefault();
        alert('Por favor completa todos los campos requeridos');
    }

});
