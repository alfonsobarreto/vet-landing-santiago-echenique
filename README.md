# Santiago Echenique — Asistencia Veterinaria (Landing Page Digital)

Una página de aterrizaje interactiva y **mobile-first** pensada como tarjeta de presentación digital para **Santiago Echenique**, estudiante avanzado de Medicina Veterinaria en la **UNSM**. El servicio se orienta a **asistencia veterinaria a domicilio** en **Tarapoto y alrededores**, enlazando la capacidad profesional con el respeto por el instinto natural de los animales.

---

## Tabla de contenidos

- [Arquitectura del proyecto](#arquitectura-del-proyecto)
- [Tecnologías](#tecnologías)
- [Características principales](#características-principales)
- [Identidad visual](#identidad-visual)
- [Estructura de archivos](#estructura-de-archivos)
- [Instalación local](#instalación-local)
- [Configuración (WhatsApp)](#configuración-whatsapp)
- [Despliegue en Heroku](#despliegue-en-heroku)
- [Decisiones de diseño](#decisiones-de-diseño)

---

## Arquitectura del proyecto

La aplicación es una **SPA estática** (HTML, CSS y JS) servida por un **único proceso HTTP** en Node.js:

1. **Express** expone la carpeta raíz del proyecto como contenido estático (`express.static`).
2. **`index.html`** se sirve como documento por defecto al acceder a `/`.
3. **Heroku** asigna el puerto mediante la variable de entorno `PORT`; en local se usa **3000** por defecto.

No hay API REST ni base de datos: el foco es **presentación**, **contacto** (WhatsApp) y **mensajes educativos** sobre zoonosis y salud pública.

```text
Cliente (navegador)
        │
        ▼
   Heroku / localhost
        │
        ▼
   Express (server.js)
        │
        ▼
   Archivos estáticos: index.html, styles.css, script.js
```

---

## Tecnologías

| Capa | Elección | Notas |
|------|-----------|--------|
| **Frontend** | HTML5 semántico, CSS3 puro (variables en `:root`), JavaScript sin framework | Sin Bootstrap, Tailwind ni bundlers |
| **Interacción** | JavaScript “vanilla” | Acordeón de servicios, enlace dinámico a WhatsApp |
| **Backend** | Node.js + **Express.js** | Servidor mínimo para archivos estáticos |
| **Despliegue** | **Heroku** | `Procfile` + script `npm start` |

---

## Características principales

- **Diseño responsivo**: layouts y tipografía escalables desde móvil a escritorio (enfoque mobile-first).
- **Acordeón de servicios**: al expandir cada tarjeta se muestran el detalle del procedimiento, el mensaje de **zoonosis / salud pública** y el precio orientativo de estudiante (donde aplica).
- **Integración con WhatsApp**: botón en el bloque de contacto y **FAB** (Floating Action Button) fijo; ambos abren `wa.me` con un texto predefinido (el número se configura en código; ver sección [Configuración](#configuración-whatsapp)).
- **Sección de apoyo / donaciones**: bloque informativo para aportes (Yape / Plin como botones de demostración) destinados a material académico y formación en la UNSM.

---

## Identidad visual

La paleta se define en **variables CSS** (`:root` en `styles.css`) para mantener consistencia y facilitar ajustes futuros.

| Rol | Nombre | Hex |
|-----|--------|-----|
| Primario | Slate Plum | `#6D5B71` |
| Fondo | White Bone | `#F1EFE7` |
| Acento (salud / acción) | Verde Esmeralda | `#16A085` |
| Acento (alerta / impacto) | Terracota | `#D35400` |
| Texto | Gris lectura | `#475569` |
| Superficies | Blanco | `#FFFFFF` |

**Tipografía (Google Fonts)**:

- **Poppins** (400, 700): encabezados.
- **Lato** (400, 700): cuerpo y textos generales.

---

## Estructura de archivos

```text
.
├── index.html      # Marcado semántico y contenido de la landing
├── styles.css      # Estilos globales, layout y componentes
├── script.js       # Acordeón de servicios y URL de WhatsApp
├── server.js       # Servidor Express y archivos estáticos
├── package.json    # Dependencias y script "start"
├── package-lock.json
├── Procfile        # Comando web para Heroku
└── README.md
```

Los estáticos se sirven desde el **directorio raíz** del repositorio (no se usa una carpeta `public/` en esta versión).

---

## Instalación local

Requisitos: **Node.js** (el proyecto declara `engines.node`: `22.x` en `package.json`; puede funcionar con versiones cercanas según tu entorno).

```bash
git clone <URL_DEL_REPOSITORIO>
cd <nombre-del-proyecto>
npm install
npm start
```

Abre el navegador en:

```text
http://localhost:3000
```

El servidor escucha en `0.0.0.0` y en el puerto definido por `PORT` si existe (comportamiento alineado con Heroku).

---

## Configuración (WhatsApp)

En `script.js`, la constante **`WHATSAPP_NUMBER`** debe ser el número en **formato internacional sin signos `+` ni espacios** (por ejemplo, Perú: código país `51` + dígitos del celular).

Sustituye el valor de marcador antes de publicar en producción para que los enlaces `https://wa.me/...` apunten a la línea correcta.

---

## Despliegue en Heroku

1. Crea una aplicación en [Heroku](https://www.heroku.com/) y conecta el repositorio de **GitHub** (o usa el CLI con `heroku git:remote`).
2. Verifica que existan:
   - **`Procfile`** en la raíz con: `web: node server.js`
   - **`package.json`** con el script: `"start": "node server.js"`
3. Despliega la rama principal (habitualmente **`main`**).
4. Tras el build, Heroku ejecutará `npm install` y arrancará el proceso web definido en el `Procfile`.

Opcional: define variables de entorno solo si en el futuro amplías el servidor (por ejemplo, claves u orígenes permitidos). Para esta landing estática no son obligatorias.

---

## Decisiones de diseño

- **Sin frameworks CSS/JS**: menor superficie de dependencias, código más fácil de mantener y de auditar para una landing pequeña.
- **Mobile-first**: estilos base pensados para pantallas estrechas; los media queries amplían el layout hacia tablet y escritorio.
- **Variables CSS**: colores, espaciados y tipografías centralizados en `:root` para coherencia con la marca.
- **Acordeón en servicios**: prioriza escaneo rápido (título + icono) y revela el detalle bajo demanda, evitando páginas largas sin jerarquía.
- **Express como capa fina de despliegue**: Heroku espera un proceso HTTP; servir estáticos con Express cumple ese contrato sin añadir complejidad de build.

---

## Licencia y contacto

Este repositorio es **privado** según `package.json`. Para consultas comerciales o coordinación de asistencia, el canal previsto en la landing es **WhatsApp** una vez configurado el número real.
