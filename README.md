# Pecuaria · web offline sincronizada con GitHub

App web para gestionar gallinas, vacas y ovejas. Funciona sin internet y
sincroniza los datos y las fotos con un repositorio privado de GitHub.

## Cómo funciona

- Todo se guarda primero en el teléfono (IndexedDB), así que se puede
  registrar todo sin señal.
- Al haber internet, la app sincroniza sola: al abrirla, 2–3 segundos
  después de cada cambio, al recuperar la señal y cada 3 minutos. También
  puedes tocar el indicador de estado en la parte de arriba.
- Datos: `datos.json` en el repo de datos. Fotos: carpeta `fotos/`.
- Cada registro guarda la hora de su último cambio. Si dos teléfonos
  cambian cosas distintas, se conservan ambos cambios. Si cambian el mismo
  registro, gana el cambio más reciente. Los borrados no "reviven".

## Instalación (una sola vez)

### 1. Repositorio de la app: `AppPecuaria` (público, con GitHub Pages)
1. Ya contiene todos los archivos de la web (`index.html`, `sw.js`,
   `manifest.webmanifest`, íconos y `favicon`).
2. Settings → Pages → Branch: `main` / carpeta `/ (root)` → Save.
3. La app queda en `https://andygu444.github.io/AppPecuaria/`.

Este repo es público y no contiene datos ni contraseñas.
**Nunca uses `AppPecuaria` como repositorio de datos**: cualquiera podría verlos.

### 2. Repositorio de datos (privado)
1. Crea otro repo **privado**, por ejemplo `pecuaria-datos`.
2. Márcalo con "Add a README file" para que tenga la rama `main`.
3. No subas nada más: la app crea `datos.json` y `fotos/` por su cuenta.

### 3. Token de acceso (fine-grained)
1. GitHub → Settings → Developer settings → Personal access tokens →
   **Fine-grained tokens** → Generate new token.
2. Repository access: **Only select repositories** → `pecuaria-datos`.
3. Permissions → Repository permissions → **Contents: Read and write**.
4. Elige una fecha de vencimiento y copia el token.

### 4. En cada teléfono
1. Abre `https://andygu444.github.io/AppPecuaria/`.
2. Instálala:
   - Android/Chrome: menú ⋮ → "Instalar aplicación".
   - iPhone/Safari: Compartir → "Agregar a inicio".
3. Elige el usuario → **Más → Conectar con GitHub** → llena usuario,
   `pecuaria-datos`, `main`, el token y un nombre para el teléfono.
4. Primer teléfono: si el repo está vacío, elige **Empezar vacío** (datos
   reales) o **Subir los datos actuales** (los de ejemplo).
   Los demás teléfonos: **Descargar**.

## Facturas
- Al registrar una venta se abre su factura: número consecutivo, fecha y hora,
  datos del cliente, método y estado del pago, monto en letras y sellos
  PAGADO / ANULADA.
- Los datos del negocio se configuran en **Más → Perfil de facturación**
  (nombre, cédula, teléfono, correo, dirección, SINPE Móvil, IVA y mensaje).
- **Enviar imagen** o **Enviar PDF**: en el teléfono abre el menú de compartir
  (elige WhatsApp y el chat del cliente). En PC descarga el archivo y abre el
  chat del cliente en WhatsApp Web para adjuntarlo.
- WhatsApp no permite que una página envíe mensajes sola; el envío siempre
  requiere un toque final en WhatsApp.
- Es un comprobante de venta interno; no sustituye la factura electrónica de
  Hacienda si el negocio está obligado a emitirla.

## Etiquetas para huevos
- En **Más → Gestión → Etiquetas para huevos** (o desde el panel de Gallinas).
- Fecha de empaque: hoy por defecto. Mejor antes de: se calcula con los días
  de vida útil (15 por defecto). Las dos se pueden cambiar.
- Todo es editable: nombre de la granja, títulos, tipo, cantidad, grado,
  leyenda, rótulos, línea extra, ícono (gallina, logo o imagen propia) y colores.
- Hoja: Carta, A4 u Oficio; de 1 a 30 etiquetas por hoja o filas × columnas a
  gusto; tamaño automático o fijo en cm; márgenes, espacio, bordes de corte y
  cantidad de hojas.
- **Imprimir** envía directo a la impresora a tamaño real. También se puede
  guardar en **PDF** (todas las hojas) o como **imagen**.
- Al imprimir, usa escala **100 %** (o "Tamaño real") y sin márgenes extra del
  navegador para que las medidas en cm sean exactas.
- La plantilla se guarda y se sincroniza con los demás dispositivos.

## Actualizar la app
Sube el nuevo `index.html` y cambia `VERSION` en `sw.js`
(por ejemplo `pecuaria-v2`). Así los teléfonos descargan la versión nueva.

## Seguridad
- El token queda guardado en el navegador de cada teléfono. Si pierdes un
  teléfono, borra ese token en GitHub (Settings → Developer settings) y
  crea uno nuevo para los demás.
- El token solo tiene acceso al repo de datos, nunca a tus otros repos.
- No hay contraseñas por usuario: los roles organizan las pantallas, pero
  quien tenga un teléfono conectado puede ver y editar todo.

## Límites
- Pensado para una persona registrando por día desde varios dispositivos.
- Las fotos se reducen a 1024 px (~100–200 KB). GitHub recomienda repos
  de menos de 1 GB, lo que equivale a varios miles de fotos.
- El historial de commits del repo de datos sirve como respaldo: cada
  sincronización queda registrada con el nombre del dispositivo.
