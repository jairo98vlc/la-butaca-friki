# 🎬 CineStream - Web de Pel&iacute;culas y Series

Web est&aacute;tica de cat&aacute;logo de pel&iacute;culas, series y novedades de cine que se actualiza en tiempo real usando APIs gratuitas.

## 🚀 Subir a GitHub Pages

### Paso 1: Crear repositorio en GitHub

1. Ve a [github.com](https://github.com/) e inicia sesi&oacute;n (o crea una cuenta gratis).
2. Haz clic en el bot&oacute;n **"+"** (arriba a la derecha) y selecciona **"New repository"**.
3. Nombre del repositorio: `cine-web` (o el que quieras).
4. Marca **"Public"**.
5. **NO** marques "Initialize this repository with a README" (deja todo desmarcado).
6. Haz clic en **"Create repository"**.

### Paso 2: Subir los archivos

#### Opci&oacute;n A: Desde la web de GitHub (m&aacute;s f&aacute;cil)

1. En tu repositorio reci&eacute;n creado, haz clic en **"uploading an existing file"**.
2. Arrastra estos 4 archivos:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `config.js`
3. En "Commit changes", escribe: "Primera versi&oacute;n de CineStream".
4. Haz clic en **"Commit changes"**.

#### Opci&oacute;n B: Desde terminal (si usas Git)

```bash
# Navega a la carpeta de tu proyecto
cd ruta/a/tu/carpeta/cine-web

# Inicializa Git
git init

# A&ntilde;ade todos los archivos
git add .

# Haz el primer commit
git commit -m "Primera versi&oacute;n de CineStream"

# Cambia la rama a main
git branch -M main

# A&ntilde;ade el repositorio remoto (cambia TU_USUARIO por tu usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/cine-web.git

# Sube los archivos
git push -u origin main
```

### Paso 3: Activar GitHub Pages

1. En tu repositorio de GitHub, ve a la pesta&ntilde;a **"Settings"** (configuraci&oacute;n).
2. En el men&uacute; lateral izquierdo, haz clic en **"Pages"**.
3. En **"Build and deployment"**, bajo **Source**, selecciona **"Deploy from a branch"**.
4. En **Branch**, selecciona:
   - Rama: `main`
   - Carpeta: `/(root)`
5. Haz clic en **"Save"**.

### Paso 4: &iexcl;Listo!

Espera 1-2 minutos. Tu web estar&aacute; disponible en:

```
https://TU_USUARIO.github.io/cine-web/
```

Puedes ver el estado del despliegue en la pesta&ntilde;a **"Actions"** o **"Pages"** de tu repositorio.

---

## 🔑 Configurar API Key de TMDB

1. Ve a [themoviedb.org](https://www.themoviedb.org/) y crea una cuenta gratis.
2. Ve a **Configuraci&oacute;n → API** y solicita una API Key (es gratis para uso no comercial).
3. Copia tu **API Key**.
4. En GitHub, edita el archivo `config.js`:
   - Ve a tu repositorio → `config.js` → l&aacute;piz (editar).
   - Reemplaza `TU_API_KEY_AQUI` por tu clave real.
   - Haz clic en **"Commit changes"**.
5. GitHub Pages actualizar&aacute; autom&aacute;ticamente tu web en 1-2 minutos.

---

## 📚 Estructura del proyecto

```
cine-web/
├── index.html      # Página principal
├── styles.css      # Estilos y diseño
├── script.js       # L&oacute;gica y peticiones a APIs
├── config.js       # Configuraci&oacute;n (API Keys)
└── README.md       # Este archivo
```

---

## 🎯 Caracter&iacute;sticas

- ✅ Cat&aacute;logo de pel&iacute;culas populares (TMDB)
- ✅ Cat&aacute;logo de series populares (TMDB + TVmaze)
- ✅ Novedades de cine (pr&oacute;ximos estrenos)
- ✅ Disponibilidad por plataforma de streaming (Netflix, Disney+, HBO, etc.)
- ✅ **Actualizaci&oacute;n autom&aacute;tica cada 5 minutos**
- ✅ Dise&ntilde;o responsive (m&oacute;vil y escritorio)
- ✅ HTTPS incluido (gratis con GitHub Pages)

---

## 🔧 APIs utilizadas (todas gratuitas)

| API | Prop&oacute;sito | L&iacute;mite gratis |
|-----|------------------|----------------------|
| **TMDB** | Pel&iacute;culas, series, disponibilidad | 200.000 peticiones/d&iacute;a |
| **TVMaze** | Series adicionales | Ilimitado (sin API key) |

---

## 📝 Actualizar tu web

Cada vez que modifiques un archivo y hagas commit en GitHub, Pages actualizar&aacute; tu web autom&aacute;ticamente:

```bash
git add .
git commit -m "Descripci&oacute;n de los cambios"
git push
```

O simplemente edita los archivos desde la web de GitHub y haz commit.

---

## ⚠️ Importante

- **No compartas tu API Key** en repositorios p&uacute;blicos. Si quieres mantenerla privada, considera usar un backend o variables de entorno (GitHub Secrets).
- GitHub Pages tiene un l&iacute;mite de **100 GB/mes de tr&aacute;fico** y **10 builds/hora**, m&aacute;s que suficiente para un proyecto personal.

---

## 🎨 Personalizaci&oacute;n

Puedes modificar:

- **Colores**: Edita `styles.css` (busca `#e94560` para el color principal).
- **Intervalo de actualizaci&oacute;n**: En `config.js`, cambia `UPDATE_INTERVAL` (en milisegundos).
- **N&uacute;mero de resultados**: En `script.js`, cambia `.slice(0, 20)` por el n&uacute;mero que quieras.

---

## 📞 &iquest;Problemas?

- Si la web no carga, revisa la consola del navegador (F12) para ver errores.
- Aseg&uacute;rate de que `config.js` tenga tu API Key correcta.
- GitHub Pages puede tardar 1-2 minutos en actualizar tras un commit.

---

**&iexcl;Disfruta de tu web de cine!** 🎬🍿