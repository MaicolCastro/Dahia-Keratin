# Dahia Keratin — experiencia digital (prototipo Angular)

Propuesta de experiencia web independiente para presentar una posible evolución de la atención digital de Dahia Keratin. Construida con Angular standalone + TypeScript, HTML y CSS responsive.

## Requisitos
- Node.js 20.19+ o 22.12+
- npm

## Ejecutar localmente
```bash
npm install
npm start
```
Abre la URL que indique Angular CLI (normalmente http://localhost:4200).

## Compilar para producción
```bash
npm run build
```
La salida queda en `dist/dahia-keratin/browser`.

## Publicar en Vercel
1. Sube esta carpeta a un repositorio propio de GitHub.
2. En Vercel, importa ese repositorio.
3. Framework Preset: Angular.
4. Build Command: `npm run build`.
5. Output Directory: `dist/dahia-keratin/browser`.
6. Deploy.

El archivo `vercel.json` incluye una regla de fallback para navegación de una sola página.

## Qué incluye
- Página responsive con navegación móvil.
- Presentación de marca, servicios, sedes y preguntas frecuentes.
- Filtros por categoría y modal de detalle para cada tratamiento.
- Formulario que prepara una solicitud y la envía al WhatsApp oficial al abrir el enlace.
- Asistente demostrativo con respuestas predefinidas.
- Datos y contacto contrastados con el sitio público de la marca a la fecha de elaboración.

## Límites importantes de esta prueba
- No es el sitio oficial ni está afiliado o aprobado por Dahia Keratin.
- No incluye backend, base de datos, CRM, calendario ni integración con WhatsApp Business API.
- El asistente no usa IA ni conserva conversaciones.
- El formulario no reserva ni confirma citas; abre WhatsApp con un texto preparado.
- La galería incluye una imagen publicada en el sitio oficial de Dahia Keratin y fotografías editoriales de Unsplash como recursos ilustrativos. Antes de publicar, reemplazar las imágenes ilustrativas por fotografías propias autorizadas por la empresa y confirmar permisos para reutilizar cualquier activo de marca.
- Revisar con Dahia Keratin textos, precios (no se publican), protocolos, afirmaciones, horarios y direcciones antes de producción.

## Fuente pública consultada
https://dahiakeratin.com/
