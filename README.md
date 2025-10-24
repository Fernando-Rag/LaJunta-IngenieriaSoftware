
# LaJunta-IngenieriaSoftware
aplicacion mobil para android y appel  para crear una reunion en la sede inacap, con la principal funcion de juntar a las personas para ir a tomar el trasporte publico acompañado

## Descripcion Breve: ##

Este proyecto tiene como idea principal crear una apliacion mobil para nuestra institucion inacap, la aplicacion consiste en que los estudiantes maestros y trabajadores de la sede puedan acceder y crear una reunion a su hora de salida de la sede, esta reunion o junta puede ser en cualquier lugar de la institucion y a cualquier hora, el proposito de la aplicacion es que luego de que se junten las personas vayan al paradero del trasporte publico acompañados, por lo que obvio deberia contar con filtros como, donde se dirige la persona y a que hora sale de su clase o de su horario laboral teniendo chats como de 3pm a 4pm de 4pm a 5pm  teniendo chat global de la hora seleccionada de los que salen a esa hora preguntando quien sale a esa hora para ir a tomar el paradero en comun juntos, dejando que cualquiera responda y dandole click a la respuesta se le puede mandar un mensaje privado permitiendo decidir donde juntarse y a que hora exacta.


## Funciones principales ##

1-Registro y autenticación

-Acceso mediante correo institucional para validar usuarios
    -El IdP (Proveedor de Identidad) de INACAP esServicios de federación de Active Directory (AD FS) de Microsoft.
-Perfil básico: nombre, rol (estudiante, maestro, trabajador), sede, destino usual.
    -estos los tendra que agregar en el perfil una vez inicie sesion con el correo de inacap por lo que el resgistro como tal no es necesario pero si se necesita un correo en la institucion de inacap

2-Chats y filtros

-Selecciona destino (paradero específico) mediante la seleccion del mapa
-Selecciona hora del chat
-Chats para cada hora del dia tomando encuenta el  paradero seleccionado 
-Chat privado entre usuarios (para coordinar detalles)

3-Notificaciones y recordatorios

-Avisos cuando la hora de la reunion se aproxima
    notificacion para avisar
-Notificaciones de nuevos mensajes o respuestas

4-Seguridad y privacidad:

-Permitir ocultar ciertos datos personales
    -menos correo y rol(Estudiante, docente, etc.)

-Reportar usuarios o mensajes inapropiados
    - se puede reportar a los usuarios por la aplicacion esta funcion requiere un screenshot para evidencia
    - no se van a poder enviar imagenes por la aplicacion para evitar mensajes pasados de contexto


## Flujo de uso principal ##

-El usuario ingresa a la aplicacion, Selecciona el paradero al que se dirige con las micros que le sirven 
-Selecciona un chat global segun su  horario de salida.
-Puede ver en los chat globales y informarse quien más sale a esa hora y va al mismo Paradero(anterior mente seleccionado).
-Puede publicar una “Reunnion” en el chat global y privado o unirse a otras en el chat global 
-Puede enviar mensajes privados para acordar detalles (lugar exacto, hora, etc.).
-Se reúnen en la sede en el punto acordado y van juntos al paradero(Las reuniones solo pueden ser dentro del perimetro de la sede)



## Requerimientos funcionales y no funcionales identificados por el grupo

## Funcionales:

1-Registro y Autenticación

-El sistema debe permitir el acceso de usuarios mediante correo institucional no es necesario un registro
-El sistema debe autenticar usuario
    -No abra diferencia si son maestro, estudiantes o trabajadores ya que esta es una aplicacion para mantener la seguridad de la personas no hacer vida social. mantener la integridad y seguridad de los usuarios es la prioridad numero 1, de todas formas si los profesores quieren irse con profesores o los estudiantes solo con estudiantes pueden ver el rol en el perfil para decidir si quieren ir o no con esa persona. es a criterio de cada persona.

2-Gestión de Perfil

-El usuario debe poder editar su perfil, incluyendo su nombre, rol(Estudiante,Docente,Trabajador, etc.), sede,
 pero el correo institucional no se puede editar ya que tiene que tener el correo de inacap para poder acceder


3-Creación y Gestión de Reuniones/Juntas

-El sistema debe permitir crear una reunión indicando lugar de encuentro

    - Esta reunion se hace en la sede, para evitar exponer a los usuarios fuera de la sede
    - Tambien se pueden hacer mediante un acuerdo por un chat privado, Ejemplo: boton de crear reunion, muestra los campos lugar de reunion y hora de reunion, esta funcion tambien estara para los chats globales
    - Tambien lococar el punto de la reunion ocupando Ubicación precisa/exacta (GPS y otros sensores activos), para que los usuarios puedan llegar usando el servicio seleccionado en este caso MapBox, esta funcion se llamara "Punto de encuentro con GPS" esta funcion tambien estara para los chats privados y globales, una vez se seleccione el lugar de encuentro tienen que poner la hora de encuentro ejemplo: UbicacioS Reunion por gps y Hora de reunion
    

-El sistema debe mostrar una lista de reuniones disponibles filtradas por hora de salida y destino

4-Filtros y Búsqueda, Chat Global y por Destino

-El usuario debe poder filtrar reuniones por hora y destino
-El sistema debe permitir buscar reuniones activas en el rango horario deseado

    -Usuario abre "Seleccionar destino / paradero".
    -Se abre un modal o pantalla con mapa centrado en la sede INACAP y marcadores de paraderos cercanos (radio configurable: p.ej. 400m).
    -Usuario:
    -puede tocar un marcador para ver tarjeta del paradero (nombre, distancia, ID).
    -en la tarjeta hay botón "Ver micros" (o al tocar el marcador se abre directamente).
    -Se abre una vista lista de micros que pasan por ese paradero (ej: 307, 301, B28) con casillas de selección (multi-select).
    -Usuario selecciona 1 o varias micros y confirma "Usar estas micros".
    -La app guarda la selección como destino filtrado y abre la pantalla de chats del paradero:
    -Barra superior: botones para alternar entre cada micro seleccionada (si más de una).
    -Sub-barra/segmented control: selección de hora (08:00–09:00, 09:00–10:00, ... hasta 23:00–24:00).
    -Lista de mensajes del chat correspondiente a (paradero, micro, hora).
    -El usuario puede:
    -publicar convocatoria en ese chat,
    -responder y abrir chat privado,
    -cambiar micro con los botones superiores,
    -cambiar hora con el control horario.

    UX adicional:
    -Si el usuario no seleccionó micros: mostrar "Chats globales del paradero" (agrupar por hora pero sin filtrar por micro).
    -Mostrar contador de participantes por chat (nº usuarios activos/suscritos) si se puede.
    -Guardar micro(s) por defecto en perfil para atajo (opcional).

5-Chat Privado

-El usuario debe poder enviar mensajes privados a otros usuarios.
-El usuario debe poder crear una "reunion" (con las opciones anteriomente mencionadas)

6-Notificaciones

-El sistema debe enviar notificaciones cuando se acerca la hora de la reunion

7-Gestión de Seguridad

-El sistema debe permitir reportar usuarios o mensajes inapropiados
-El usuario debe poder bloquear o evitar interacción con otros usuarios

8-Privacidad

-El usuario debe poder decidir qué datos personales aparecen en su perfil visible, todos menos su rol(Estudiante, Docente, Etc)
 y su correo institucional 

## No Funcionales:

1-Usabilidad

-La aplicación debe tener una interfaz intuitiva y fácil de usar para todos los perfiles de usuario

2-Rendimiento

-La respuesta de la app debe ser baja en todas las operaciones principales (login, carga de reuniones, envío de mensajes)

3-Compatibilidad

-La app debe ser compatible con dispositivos Android e iOS

4-Seguridad

-Toda la información personal y de mensajes debe transmitirse cifrada
-El sistema debe cumplir con la protección de datos personales según normativas locales

5-Disponibilidad

-El sistema debe estar disponible 24/7, con un uptime mínimo del 99%

6-Escalabilidad

-El backend debe soportar el crecimiento en número de usuarios y mensajes sin pérdida de rendimiento

7-Mantenibilidad o actualizacion

-El código debe estar documentado y la arquitectura debe permitir agregar nuevas funcionalidades fácilmente

8-Soporte y Actualizaciones

-El sistema debe permitir actualizaciones regulares sin afectar la experiencia del usuario

9-Backup y Recuperación

-El sistema debe realizar respaldos automáticos de la base de datos y permitir la recuperación ante fallos


## Notas para el desarrollo ##


El IdP (Proveedor de Identidad) de INACAP esServicios de federación de Active Directory (AD FS) de Microsoft. 
Esto se puede deducir a través de los siguientes indicadores:
Dominio de inicio de sesión : Cuando los usuarios inician sesión en servicios de INACAP que utilizan autenticación única (SSO), como el correo institucional de Office 365, son redirigidos al dominio adfs.inacap.cl.
Página de inicio de sesión : La página de inicio de sesión única tiene un formato característico del sistema de AD FS.
Integración con servicios de Microsoft : La federación de identidad se utiliza para gestionar el acceso a productos de Microsoft como Office 365, lo que confirma la implementación de AD FS para este propósito. 
En resumen, AD FS permite a INACAP proporcionar un inicio de sesión única (SSO) seguro para sus estudiantes y colaboradores, utilizando sus credenciales institucionales para acceder a diversas plataformas. 

-Nunca pedir ni almacenar la contraseña institucional en el backend/app si existe un IdP: siempre redirigir al IdP (SSO).
-Usar OAuth2/OIDC con PKCE en móviles.
-Almacenar tokens en almacenamiento seguro: Keychain (iOS) / EncryptedSharedPreferences o Keystore (Android).
-Usar HTTPS en todas las comunicaciones.
-Implementar refresh tokens con rotación o delegar refresh token al backend para mayor seguridad.
-Validar servidor-side que el email tiene dominio INACAP y opcionalmente validar roles/atributos via claims.
-Log de accesos y posibilidad de revocar tokens.


##  Para el desarrollo de Multi Plataforma


Flutter (Google)
Pros: alto rendimiento, UI consistente, excelente para dispositivos iOS/Android con una sola base de código, buena documentación, hot reload, comunidad grande.
Plugins: flutter_appauth (OIDC/OAuth), firebase_messaging (notificaciones), flutter_secure_storage (almacenamiento seguro).
Ideal si priorizas UI nativa-like y desarrollo rápido.
React Native
Pros: amplio ecosistema JS, plugins para autenticación (react-native-app-auth), buena para equipos con experiencia JS/React.
Cons: a veces hay que escribir módulos nativos para funcionalidades complejas.
Xamarin / MAUI o Kotlin Multiplatform
Pros: opciones para C# o reuse de lógica Kotlin; menos comunidad que Flutter/React Native.
Recomendación: si empiezas desde cero y quieres mejor rendimiento y experiencia nativa, recomiendo Flutter; si el equipo es JS-heavy, React Native.


## Publicación y requisitos

iOS: cuenta Apple Developer (pago anual), provisioning profiles, certificados, cumplimiento App Store guidelines (privacidad, permisos).
Android: Google Play Console (cuenta desarrollador), firma de APK/AAB.
TestFlight para iOS, Google Play internal testing / alpha/beta tracks para Android.
Certificados y gestión de versiones (build, CI/CD).


## Para la base de datos voy a ocupar SupaBase

-Recomendaciones arquitectónicas concretas con Supabase

-Usa la Auth de Supabase + tabla profiles (relacionada con auth.users).
-Activa PostGIS en la base de datos y almacena stops como geography(Point, 4326) o geometry(Point,4326) para ST_DWithin y ST_Distance.
-Usa la tabla chat_messages como fuente de verdad; suscripciones realtime se pueden hacer filtrando por stop_id, bus_number y hour_bucket.
-Para notificaciones push: crea un worker/Edge Function que se dispare cuando se inserte un mensaje (trigger → NOTIFY → worker, o escucha Realtime) y llame a FCM/APNs.
-En el flujo de registro, restringe por dominio institucional con una Edge Function o con una política (ver ejemplo abajo).
