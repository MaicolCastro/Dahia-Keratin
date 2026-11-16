import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Treatment = { name: string; category: 'Alisado' | 'Reparación' | 'Hidratación'; duration: string; description: string; detail: string; image: string; tag?: string };

@Component({
  selector: 'dk-root', standalone: true, imports: [CommonModule, FormsModule],
  template: `
  <div class="announcement">Belleza que se siente. Cuidado que se nota. <a href="#tratamientos">Descubre nuestros tratamientos <span>↗</span></a></div>
  <header class="nav" [class.scrolled]="scrolled">
    <a class="brand" href="#inicio" aria-label="Dahia Keratin inicio"><span class="brand-mark">D</span><span>DAHIA <i>KERATIN</i><small>EXPERIENCIA CAPILAR</small></span></a>
    <nav class="desktop-nav"><a href="#nosotros">Nosotros</a><a href="#tratamientos">Tratamientos</a><a href="#resultados">Resultados</a><a href="#sedes">Sedes</a><a href="#preguntas">Preguntas</a></nav>
    <a class="nav-cta" [href]="whatsApp('Hola, quiero recibir asesoría sobre sus tratamientos capilares.')" target="_blank" rel="noopener">Agenda tu asesoría <span>↗</span></a>
    <button class="menu-toggle" (click)="menuOpen = !menuOpen" aria-label="Abrir menú">☰</button>
  </header>
  <div class="mobile-menu" *ngIf="menuOpen"><a href="#nosotros" (click)="menuOpen=false">Nosotros</a><a href="#tratamientos" (click)="menuOpen=false">Tratamientos</a><a href="#resultados" (click)="menuOpen=false">Resultados</a><a href="#sedes" (click)="menuOpen=false">Sedes</a><a href="#preguntas" (click)="menuOpen=false">Preguntas</a></div>

  <main>
    <section class="hero" id="inicio">
      <div class="hero-copy"><p class="eyebrow"><span></span> TU CABELLO, TU ESENCIA</p><h1>Un cabello que<br>habla <em>de ti.</em></h1><p class="hero-lead">Tratamientos capilares profesionales para realzar tu belleza natural, cuidar cada hebra y ayudarte a sentirte increíble.</p><div class="hero-actions"><a class="btn btn-dark" href="#tratamientos">Explorar tratamientos <span>↗</span></a><a class="text-link" [href]="whatsApp('Hola, quisiera una asesoría personalizada.')" target="_blank" rel="noopener">Hablar con una asesora <span>↗</span></a></div><div class="hero-proof"><div class="proof-avatars"><span>✦</span><span>✦</span><span>✦</span></div><div><strong>Atención personalizada</strong><small>Tu cabello merece un plan pensado para ti</small></div></div></div>
      <div class="hero-visual"><div class="hero-image"></div><div class="image-stamp"><span>DK</span><small>BEAUTY<br>RITUAL</small></div><div class="hero-caption"><span>01 / 04</span><span>BRILLO · SUAVIDAD · CUIDADO</span></div></div>
      <div class="hero-vertical">DAHIA KERATIN · COLOMBIA</div>
    </section>

    <section class="trust-strip"><div><strong>6</strong><span>sedes en Colombia</span></div><i></i><div><strong>4.800+</strong><span>clientas satisfechas*</span></div><i></i><div><strong>7</strong><span>tratamientos capilares</span></div><i></i><div><strong>1:1</strong><span>asesoría personalizada</span></div><small>*Cifras publicadas por la marca en su sitio oficial.</small></section>

    <section class="intro section-pad" id="nosotros"><div class="intro-image"><img src="https://dahiakeratin.com/static/website/images/resultados.jpeg" alt="Resultado capilar publicado por Dahia Keratin" loading="lazy" (error)="useImageFallback($event)"><div class="image-note">CUIDADO PROFESIONAL<br><b>RESULTADOS QUE INSPIRAN</b></div></div><div class="intro-copy"><p class="eyebrow">01 — NUESTRA ESENCIA</p><h2>La belleza está en<br>los <em>detalles.</em></h2><p>En Dahia Keratin, cada cabello tiene una historia. Nuestra propuesta combina tratamientos especializados, productos profesionales y atención cercana para acompañarte a encontrar el cuidado que necesitas.</p><p>Más que un cambio de look, buscamos que disfrutes el proceso y te sientas segura con cada decisión.</p><a class="under-link" href="#sedes">Conoce nuestras sedes <span>↗</span></a><div class="signature">Dahia <span>Keratin</span></div></div></section>

    <section class="treatments section-pad" id="tratamientos"><div class="section-heading"><div><p class="eyebrow">02 — NUESTRO UNIVERSO</p><h2>Un ritual para cada<br><em>necesidad.</em></h2></div><p>Conoce las opciones disponibles y encuentra el punto de partida para conversar con nuestro equipo sobre tu cabello.</p></div>
      <div class="filters"><button *ngFor="let f of filters" [class.active]="activeFilter===f" (click)="activeFilter=f">{{f}}</button><span>{{filteredTreatments.length}} tratamientos</span></div>
      <div class="treatment-grid"><article class="treatment-card" *ngFor="let t of filteredTreatments; let i=index"><div class="treatment-photo"><img class="treatment-image" [src]="t.image" [alt]="'Imagen ilustrativa de '+t.name" loading="lazy" (error)="useImageFallback($event)"><span class="treatment-number">0{{i+1}}</span><span class="tag" *ngIf="t.tag">{{t.tag}}</span></div><div class="treatment-content"><div class="treatment-meta"><span>{{t.category}}</span><span>{{t.duration}}</span></div><h3>{{t.name}}</h3><p>{{t.description}}</p><button class="card-link" (click)="openTreatment(t)">Conocer tratamiento <span>↗</span></button></div></article></div>
      <div class="consult-banner"><div><p class="eyebrow">¿NO SABES CUÁL ELEGIR?</p><h3>Empecemos por escuchar<br><em>lo que tu cabello necesita.</em></h3></div><a class="btn btn-light" [href]="whatsApp('Hola, quiero ayuda para elegir el tratamiento ideal para mi cabello.')" target="_blank" rel="noopener">Quiero asesoría <span>↗</span></a></div>
    </section>

    <section class="results section-pad" id="resultados"><div class="results-head"><div><p class="eyebrow">03 — INSPIRACIÓN REAL</p><h2>El cuidado se nota.<br><em>El brillo también.</em></h2></div><p>Una muestra visual de la experiencia capilar que compartimos. Los resultados pueden variar según el cabello y el tratamiento realizado.</p></div><div class="gallery"><div class="gallery-main"><img src="https://dahiakeratin.com/static/website/images/resultados.jpeg" alt="Cabello largo y brillante en fotografía publicada por Dahia Keratin" loading="lazy" (error)="useImageFallback($event)"><span>RESULTADO COMPARTIDO POR DAHIA KERATIN</span></div><div class="gallery-side"><div class="gallery-editorial"><span>HAIR<br>CARE<br>IS A<br>RITUAL.</span><i>✳</i></div><div class="gallery-photo"><div></div><span>TEXTURA · MOVIMIENTO · LUZ</span></div></div></div></section>

    <section class="process section-pad"><div class="section-heading"><div><p class="eyebrow">04 — ASÍ COMIENZA</p><h2>Tu experiencia,<br><em>paso a paso.</em></h2></div><p>Una buena recomendación empieza conociendo el estado actual de tu cabello y lo que quieres conseguir.</p></div><div class="steps"><article><span>01</span><div class="step-icon">♡</div><h3>Cuéntanos</h3><p>Háblanos de tu cabello, tus objetivos y tus tratamientos anteriores.</p></article><article><span>02</span><div class="step-icon">⌕</div><h3>Te asesoramos</h3><p>Comparte una foto para iniciar una orientación personalizada por WhatsApp.</p></article><article><span>03</span><div class="step-icon">✧</div><h3>Define tu cita</h3><p>Consulta disponibilidad, sede y detalles directamente con el equipo.</p></article><article><span>04</span><div class="step-icon">✦</div><h3>Disfruta el cuidado</h3><p>Recibe las recomendaciones profesionales para tu tratamiento.</p></article></div></section>

    <section class="locations section-pad" id="sedes"><div class="section-heading"><div><p class="eyebrow">05 — CERCA DE TI</p><h2>Una experiencia,<br><em>seis destinos.</em></h2></div><p>Encuentra la sede que te quede mejor. Confirma horarios y disponibilidad con el equipo antes de visitarnos.</p></div><div class="location-layout"><div class="location-list"><button *ngFor="let loc of locations; let i=index" [class.selected]="selectedLocation===i" (click)="selectedLocation=i"><span>0{{i+1}}</span><b>{{loc.city}}</b><small>{{loc.area}}</small><i>↗</i></button></div><div class="location-detail"><div class="location-map-art"><span>DK</span><small>COLOMBIA<br>BEAUTY LOCATIONS</small><div class="map-dot dot-one"></div><div class="map-dot dot-two"></div><div class="map-dot dot-three"></div></div><div class="location-info"><p class="eyebrow">SEDE SELECCIONADA</p><h3>{{locations[selectedLocation].city}}</h3><p>{{locations[selectedLocation].address}}</p><small>{{locations[selectedLocation].area}}</small><a class="under-link" [href]="whatsApp('Hola, quiero información de la sede '+locations[selectedLocation].city+'.')" target="_blank" rel="noopener">Consultar esta sede <span>↗</span></a></div></div></div></section>

    <section class="faq section-pad" id="preguntas"><div class="faq-intro"><p class="eyebrow">06 — TE ACOMPAÑAMOS</p><h2>Preguntas que<br><em>vale la pena hacer.</em></h2><p>Si tienes una duda específica, nuestro equipo puede orientarte según las características de tu cabello.</p><a class="under-link" [href]="whatsApp('Hola, tengo una pregunta sobre sus tratamientos.')" target="_blank" rel="noopener">Escribir por WhatsApp ↗</a></div><div class="faq-list"><article *ngFor="let item of faqs; let i=index" [class.open]="openFaq===i"><button (click)="openFaq=openFaq===i?-1:i"><span>0{{i+1}}</span><b>{{item.q}}</b><i>{{openFaq===i?'−':'+'}}</i></button><p *ngIf="openFaq===i">{{item.a}}</p></article></div></section>

    <section class="booking section-pad" id="cita"><div class="booking-copy"><p class="eyebrow">07 — HABLEMOS DE TU CABELLO</p><h2>Tu próximo capítulo<br>empieza con una <em>conversación.</em></h2><p>Cuéntanos qué te gustaría mejorar y te ayudaremos a dar el siguiente paso.</p><div class="contact-line"><span>WHATSAPP</span><b>+57 323 297 0866</b></div><div class="contact-line"><span>INSTAGRAM</span><b>@dahiakeratin</b></div></div><form class="booking-form" (ngSubmit)="sendBooking()"><p class="eyebrow">SOLICITUD DE ASESORÍA</p><label>Tu nombre<input name="name" [(ngModel)]="booking.name" required placeholder="¿Cómo te llamas?"></label><label>¿Qué te gustaría realizar?<select name="treatment" [(ngModel)]="booking.treatment"><option value="">Aún no lo sé</option><option *ngFor="let t of treatments" [value]="t.name">{{t.name}}</option></select></label><label>Sede de preferencia<select name="location" [(ngModel)]="booking.location"><option value="">La que esté disponible</option><option *ngFor="let l of locations" [value]="l.city">{{l.city}}</option></select></label><label>Cuéntanos un poco más<textarea name="message" [(ngModel)]="booking.message" rows="3" placeholder="Tipo de cabello, tratamientos anteriores, disponibilidad..."></textarea></label><button class="btn btn-dark submit" type="submit">Enviar solicitud por WhatsApp <span>↗</span></button><small>Al enviar, se abrirá WhatsApp con el mensaje preparado. No se almacena información en esta demostración.</small></form></section>
  </main>

  <footer class="footer"><div class="footer-top"><a class="brand brand-footer" href="#inicio"><span class="brand-mark">D</span><span>DAHIA <i>KERATIN</i><small>EXPERIENCIA CAPILAR</small></span></a><p>Tu cabello es tu identidad.<br>Cuídalo como merece.</p><a class="footer-whatsapp" [href]="whatsApp('Hola Dahia Keratin, quiero información.')" target="_blank" rel="noopener">Hablemos ↗</a></div><div class="footer-bottom"><span>© 2026 Dahia Keratin · Concepto de demostración independiente.</span><div><a href="https://dahiakeratin.com/" target="_blank" rel="noopener">Sitio oficial ↗</a><a href="https://www.instagram.com/dahiakeratin/" target="_blank" rel="noopener">Instagram ↗</a></div></div><p class="disclaimer">Esta propuesta es un prototipo no oficial. Las fotografías, textos, tratamientos, sedes y datos de contacto deben ser revisados y autorizados por Dahia Keratin antes de cualquier publicación comercial.</p></footer>

  <button class="assistant-launcher" (click)="assistantOpen=!assistantOpen" aria-label="Abrir asistente">{{assistantOpen?'×':'✧'}}<span *ngIf="!assistantOpen">Asistente</span></button>
  <aside class="assistant" *ngIf="assistantOpen"><div class="assistant-head"><div><span class="assistant-avatar">DK</span><b>Asistente Dahia</b><small>Demostración interactiva</small></div><button (click)="assistantOpen=false">×</button></div><div class="assistant-body"><p class="bot-msg">¡Hola! ✨ Soy el asistente de demostración de Dahia Keratin. Puedo ayudarte a explorar los tratamientos o preparar una consulta por WhatsApp.</p><div class="quick-questions"><button (click)="assistantReply('tratamientos')">Ver tratamientos</button><button (click)="assistantReply('cita')">Quiero una cita</button><button (click)="assistantReply('sede')">Consultar sedes</button></div><p class="bot-msg" *ngIf="assistantAnswer">{{assistantAnswer}}</p><a *ngIf="assistantAnswer" class="assistant-wa" [href]="whatsApp('Hola, quisiera asesoría sobre los tratamientos de Dahia Keratin.')" target="_blank" rel="noopener">Continuar por WhatsApp ↗</a></div><div class="assistant-note">Respuestas predefinidas · No es una IA conectada ni confirma citas.</div></aside>

  <div class="modal-backdrop" *ngIf="selectedTreatment" (click)="selectedTreatment=null"><section class="treatment-modal" (click)="$event.stopPropagation()"><button class="modal-close" (click)="selectedTreatment=null">×</button><p class="eyebrow">DETALLE DEL TRATAMIENTO</p><h2>{{selectedTreatment.name}}</h2><p>{{selectedTreatment.detail}}</p><div class="modal-facts"><span>{{selectedTreatment.category}}</span><span>Duración orientativa: {{selectedTreatment.duration}}</span></div><a class="btn btn-dark" [href]="whatsApp('Hola, quiero recibir información sobre '+selectedTreatment.name+'.')" target="_blank" rel="noopener">Consultar por WhatsApp ↗</a><small>La recomendación final debe realizarla el equipo profesional tras valorar tu cabello.</small></section></div>
  `
})
export class AppComponent {
  menuOpen = false; assistantOpen = false; assistantAnswer = ''; openFaq = 0; selectedLocation = 4; selectedTreatment: Treatment | null = null; activeFilter = 'Todos'; scrolled = false;
  booking = { name: '', treatment: '', location: '', message: '' };
  readonly filters = ['Todos', 'Alisado', 'Reparación', 'Hidratación'];
  readonly treatments: Treatment[] = [
    {name:'Keratina Orgánica',category:'Alisado',duration:'3–5 meses',description:'Una opción de alisado que busca suavidad, control del frizz y movimiento natural.',detail:'La marca presenta este servicio como un alisado duradero con ingredientes orgánicos. La valoración profesional permite revisar si es adecuado para el estado actual de tu cabello.',image:'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85',tag:'Cuidado especializado'},
    {name:'Botox Capilar',category:'Reparación',duration:'2–3 meses',description:'Hidratación profunda para cabello con resequedad, frizz o aspecto opaco.',detail:'Tratamiento de hidratación profunda descrito por la marca para mejorar la apariencia del cabello dañado sin buscar un efecto de alisado.',image:'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=85'},
    {name:'Keratina Láser',category:'Alisado',duration:'4–6 meses',description:'Una alternativa de alisado con enfoque en suavidad y acabado natural.',detail:'La información pública de Dahia Keratin describe este tratamiento como un sellado con tecnología láser. Consulta con la sede los detalles técnicos y la valoración previa.',image:'https://dahiakeratin.com/static/website/images/resultados.jpeg'},
    {name:'Keratina Tradicional',category:'Alisado',duration:'Hasta 6 meses',description:'Para quienes buscan un efecto de alisado más intenso y control del volumen.',detail:'La marca la presenta como una opción de alisado intenso. El resultado depende del tipo, historial y condición del cabello, por eso es importante una valoración.',image:'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=85',tag:'Más consultada'},
    {name:'Aminoácidos de Seda',category:'Reparación',duration:'3–4 meses',description:'Una propuesta enfocada en mejorar la apariencia, suavidad y brillo de la fibra capilar.',detail:'Dahia Keratin destaca este servicio por su enfoque de reconstrucción capilar. Consulta con el equipo si se ajusta a tu cabello y a los procesos químicos previos.',image:'https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=900&q=85'},
    {name:'Nanoplastia',category:'Alisado',duration:'4–6 meses',description:'Un acabado natural y duradero, sujeto a la valoración de cada cabello.',detail:'La información pública de la marca describe la nanoplastia como una alternativa de alisado con nanotecnología. Solicita información sobre composición, cuidados y compatibilidad.',image:'https://dahiakeratin.com/static/website/images/resultados.jpeg'},
    {name:'Hidratación Profunda',category:'Hidratación',duration:'1–2 meses',description:'Un ritual de mantenimiento para devolver una sensación de suavidad y brillo.',detail:'La marca describe este tratamiento como una hidratación intensiva que no busca alisar. La frecuencia y el protocolo deben definirse según el estado del cabello.',image:'https://dahiakeratin.com/static/website/images/resultados.jpeg'}
  ];
  readonly locations = [
    {city:'Medellín',address:'Cra. 45 #76-09, Piso 2',area:'Manrique Central'},
    {city:'Medellín · La 80',address:'Cl. 52 #79-10',area:'Laureles – Estadio'},
    {city:'Bello',address:'Av. 33 #Diagonal 51-72',area:'Hermosa Provincia · Niquía'},
    {city:'Pereira',address:'Calle 25 #6-20',area:'El Lago · Centro'},
    {city:'Armenia',address:'Calle 10 #13-40',area:'Diagonal al Éxito Cristal'},
    {city:'Cali',address:'Calle 27 #34-21',area:'Barrio El Jardín'}
  ];
  readonly faqs = [
    {q:'¿Cómo sé qué tratamiento necesita mi cabello?',a:'Cada cabello tiene un historial y unas necesidades distintas. Puedes compartir una foto y contarle al equipo qué procesos has realizado para recibir una orientación inicial.'},
    {q:'¿Cuánto tiempo duran los resultados?',a:'La duración publicada varía según el tratamiento: aproximadamente de 1 a 6 meses. El resultado real depende del tipo de cabello, su condición y los cuidados posteriores.'},
    {q:'¿Puedo agendar directamente desde esta página?',a:'Esta es una demostración. El formulario prepara un mensaje y te dirige a WhatsApp; la fecha y la disponibilidad deben ser confirmadas por el equipo de Dahia Keratin.'},
    {q:'¿En qué ciudades tienen sedes?',a:'El sitio oficial publica seis sedes: Medellín, Medellín – La 80, Bello, Pereira, Armenia y Cali. Confirma dirección y disponibilidad antes de desplazarte.'}
  ];
  get filteredTreatments(): Treatment[] { return this.activeFilter === 'Todos' ? this.treatments : this.treatments.filter(t => t.category === this.activeFilter); }
  whatsApp(message: string): string { return 'https://wa.me/573232970866?text=' + encodeURIComponent(message); }
  useImageFallback(event: Event): void {
    const image = event.target as HTMLImageElement;
    const backupImage = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85';
    if (image.src.endsWith('/hair-fallback.svg')) return;
    // Keep photographic treatment cards if a third-party URL is unavailable.
    // Use the local SVG only when even the tested backup photograph fails.
    image.src = image.src === backupImage ? '/hair-fallback.svg' : backupImage;
  }
  openTreatment(t: Treatment): void { this.selectedTreatment = t; }
  sendBooking(): void {
    if (!this.booking.name.trim()) return;
    const message = `Hola Dahia Keratin, soy ${this.booking.name}. Quisiera solicitar asesoría. Tratamiento: ${this.booking.treatment || 'Por definir'}. Sede: ${this.booking.location || 'Por definir'}. Información adicional: ${this.booking.message || 'Sin comentarios'}.`;
    window.open(this.whatsApp(message), '_blank', 'noopener');
  }
  assistantReply(topic: string): void {
    const replies: Record<string,string> = {
      tratamientos: 'Tenemos opciones de alisado, reparación e hidratación: keratina orgánica, botox capilar, keratina láser, keratina tradicional, aminoácidos de seda, nanoplastia e hidratación profunda.',
      cita: '¡Claro! Puedes preparar tu solicitud en el formulario de esta página o escribirnos directamente. El equipo confirmará la disponibilidad y los detalles.',
      sede: 'Contamos con sedes publicadas en Medellín, Medellín – La 80, Bello, Pereira, Armenia y Cali. En la sección Sedes puedes consultar las direcciones.'
    };
    this.assistantAnswer = replies[topic] || '';
  }
  constructor() { window.addEventListener('scroll', () => this.scrolled = window.scrollY > 20, { passive: true }); }
}
