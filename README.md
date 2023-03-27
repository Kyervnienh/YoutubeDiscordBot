## Youtube Discord Bot

Bot de discord para reproducir audio de youtube en un canal de voz, unicamente para uso personal.

Comandos:

- `/yhelp`: Muestra la lista de comandos.
- `/ypause`: Pausa la reproducción.
- `/yplay`: Reproduce un video de Youtube. Acepta un link o busqueda por palabras.
- `/yqueue`: Muestra la lista de reproducción.
- `/yresume`: Reanuda la reproducción.
- `/ystop`: Detiene la reproducción y sale del canal de voz.

Paqueterías utilizadas:

- [discord.js](https://discord.js.org): Librería para interactuar con API de discord.
- [googleapis](https://github.com/googleapis/google-api-nodejs-client): API de google.
- [play-dl](https://github.com/play-dl/play-dl): Librería para streamear contenido de Youtube, Spotify y SoundCloud.

## Descarga

Para hacer uso localmente del bot descarga este repositorio, puedes descargarlo ejecutando el siguiente comando en la terminal estando en la carpeta donde se usará:

```
git clone https://github.com/Kyervnienh/YoutubeDiscordBot.git
```

o puedes descargarlo manualmente, pulsa el botón "<> Code" seguido de "Download ZIP", una vez descargado descomprime los archivos en la carpeta donde se usará.

## Instalación de dependencias

1. Instalar [Node.js](https://nodejs.org/es) si no se encuentra instalado. Descarga la versión "LTS" correcta para tu sistema operativo [aqui](https://nodejs.org/es/download) y sigue el proceso de instalación.

Para comprobar que Node.js está instalado ejecuta el siguiente comando en una terminal:

```
node -v
```

Deberías ver en la terminal la versión instalada de Node (Ej. v.18.12.1).

2. Instalar [Yarn](https://yarnpkg.com/) si no se encuentra instalado. Para instalarlo abre una terminal y ejecuta el siguiente comando:

```
npm install --global yarn
```

Para comprobar que Yarn está instalado ejecuta el siguiente comando en una terminal:

```
yarn --version
```

Deberías ver en la terminal la versión instalada de Yarn (Ej. 1.22.19).

3. Abre una terminal en la carpeta del proyecto y ejecuta el siguiente comando:

```
yarn install
```

## Configurar variables de entorno

Para que el bot funcione correctamente debemos colocar las credenciales correctas en un archivo `.env`.

Clona el archivo `.env.example` y cambia el nombre a `.env`. Dentro encontraremos las siguientes variables:

#### 1. DISCORD_CLIENT_ID

Para obtener esta variable ve [aqui](https://discord.com/developers/applications) (inicia sesión si es necesario) y dale al botón de "New Application", coloca el nombre que le darás al bot (asegurate de tener un nombre único o puede salir un error en pasos posteriores) , acepta términos y da click a "Create". Una vez creado se abrirá una pantalla con el titulo "General information", busca "APPLICATION ID", click a copiar y lo reemplazas en el archivo `.env`.

#### 2. DISCORD_TOKEN

Para obtener el token ve a la sección "Bot" en la parte izquierda de la pantalla, se abrirá una nueva pantalla pulsa "Add Bot", una vez añadido se mostrará la información del bot, en donde dice "TOKEN" da click a "copiar" y reemplazalo en el archivo `.env`

#### 3. DISCORD_GUILD_ID

- Para obtenerlo ve a discord > configuración > avanzado y activa el modo desarrollador.
- Ve al servidor en donde estará el bot, pulsa click derecho en donde dice el nombre del servidor, click a "Copiar ID" y reemplazalo en el archivo `.env`

#### 4. DISCORD_VOICE_CHANNEL_ID

Para obtenerlo da click derecho sobre el canal de voz al que se unirá el bot, pulsa "Copiar ID" y reemplazalo en el archivo `.env`

#### 5. USE_YOUTUBE_API

Esta variable indica si se usará la API de Google para buscar videos en Youtube, coloca "true" si utilizarás la API de Google o "false" si usarás la busqueda de "play-dl".

#### 6. YOUTUBE_API_KEY

Reemplazala solo si `USE_YOUTUBE_API=true`.

Para obtenerla ve [aqui](https://console.cloud.google.com/)

- Inicia sesión o registrate
- [Crea un nuevo proyecto](https://cloud.google.com/resource-manager/docs/creating-managing-projects?hl=es-419)
- En el dashboard del proyecto da click en "Explore & Enable APIs"
- Ve a "YouTube Data API v3" dentro de "YouTube APIs"
- Habilita la API
- Crea una credencial.
- Copia la API key que te aparece en pantalla y reemplazala en el archivo `.env`.

Si no encuentras alguna sección o te aparece diferente busca como habilitar youtube API key en Google y sigue los pasos que se indican.

## Añadir Bot a discord

Ve a la sección "OAuth2", en "URL Generator" selecciona "BOT", se desplegará un nuevo menú, selecciona "Administrator", copia el link generado y pegalo en una nueva pestaña de tu navegador, sigue los pasas y añade el bot al servidor en que lo usarás.

## Encender el bot

Para empezar a usar el bot abre una terminal en la carpeta del proyecto y ejecuta el siguiente comando:

```
node deploy-commands.js
```

Este comando habilitará los comandos existentes en discord. (solo se debe ejecutar la primera vez o cada que se cambie el código del proyecto).

Para prender el bot ejecuta el siguiente comando en la terminal:

```
yarn start
```

Si todo salió bien debería aparecer el siguiente mensaje "Ready! Logged in as {nombre_de_tu_bot}"

Ahora todo lo que resta por hacer es ir a discord y escribir /yplay `{query}`

`query`: link o busqueda de Youtube.

Para detener el bot ve a la terminal donde se está ejecutando y pulsa "ctrl+c"
