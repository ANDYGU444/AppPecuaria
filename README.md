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

### 1. Repositorio de la app (público, con GitHub Pages)
1. Crea un repo, por ejemplo `pecuaria`.
2. Sube estos archivos a la raíz: `index.html`, `sw.js`,
   `manifest.webmanifest`, `icon-192.png`, `icon-512.png`,
   `apple-touch-icon.png`.
3. Settings → Pages → Branch: `main` / carpeta `/ (root)` → Save.
4. La app queda en `https://TU_USUARIO.github.io/pecuaria/`.

Este repo no contiene datos ni contraseñas, así que puede ser público.

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
1. Abre `https://TU_USUARIO.github.io/pecuaria/`.
2. Instálala:
   - Android/Chrome: menú ⋮ → "Instalar aplicación".
   - iPhone/Safari: Compartir → "Agregar a inicio".
3. Elige el usuario → **Más → Conectar con GitHub** → llena usuario,
   `pecuaria-datos`, `main`, el token y un nombre para el teléfono.
4. Primer teléfono: si el repo está vacío, elige **Empezar vacío** (datos
   reales) o **Subir los datos actuales** (los de ejemplo).
   Los demás teléfonos: **Descargar**.

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
