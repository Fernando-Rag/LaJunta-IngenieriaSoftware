# LaJunta-IngenieriaSoftware
aplicacion mobil para android y appel  para crear una reunion en la sede inacap, con la principal funcion de juntar a las personas para ir a tomar el trasporte publico acompañado

## Descripcion Breve: ##

Este proyecto tiene como idea principal crear una apliacion mobil para nuestra institucion inacap, la aplicacion consiste en que los estudiantes maestros y trabajadores de la sede puedan acceder y crear una reunion a su hora de salida de la sede, esta reunion o junta puede ser en cualquier lugar de la institucion y a cualquier hora, el proposito de la aplicacion es que luego de que se junten las personas vayan al paradero del trasporte publico acompañados, por lo que obvio deberia contar con filtros como, donde se dirige la persona y a que hora sale de su clase o de su horario laboral teniendo chats como de 3pm a 4pm de 4pm a 5pm  teniendo chat global de la hora seleccionada de los que salen a esa hora preguntando quien sale a esa hora para ir a tomar el paradero en comun juntos, dejando que cualquiera responda y dandole click a la respuesta se le puede mandar un mensaje privado permitiendo decidir donde juntarse y a que hora exacta.


## Funciones principales ##

1-Registro y autenticación

-Acceso mediante correo institucional para validar usuarios
-Perfil básico: nombre, rol (estudiante, maestro, trabajador), sede, horarios de salida, destino usual

2-Chats y filtros

-Selecciona destino (paradero específico)
-Selecciona hora de salida (según horario académico/laboral)
-Chats para cada hora del dia tomando encuenta el destino seleccionado o paradero
-Chat privado entre usuarios (para coordinar detalles)

3-Notificaciones y recordatorios

-Avisos cuando la hora de salida se aproxima
-Notificaciones de nuevos mensajes o respuestas

4-Seguridad y privacidad:

-Permitir ocultar ciertos datos personales
-Reportar usuarios o mensajes inapropiados


## Flujo de uso principal ##

-El usuario ingresa y selecciona su horario de salida y destino.
-Puede ver quién más sale a esa hora y va al mismo lugar.
-Puede publicar una “convocatoria” en el chat global o responder a otros.
-Puede enviar mensajes privados para acordar detalles (lugar exacto, hora, etc.).
-Se reúnen en la sede en el punto acordado y van juntos al paradero.



## Requerimientos funcionales y no funcionales identificados por el grupo

## Funcionales:

1-Registro y Autenticación

-El sistema debe permitir el registro de usuarios mediante correo institucional
-El sistema debe autenticar usuarios y permitir el acceso a la app según su rol (estudiante, maestro, trabajador)

2-Gestión de Perfil

-El usuario debe poder editar su perfil, incluyendo su nombre, rol, sede, hora de salida y destino habitual

3-Creación y Gestión de Reuniones/Juntas

-El sistema debe permitir crear una reunión indicando lugar de encuentro, hora y destino (paradero)
-El sistema debe mostrar una lista de reuniones disponibles filtradas por hora de salida y destino

4-Filtros y Búsqueda

-El usuario debe poder filtrar reuniones por hora y destino
-El sistema debe permitir buscar reuniones activas en el rango horario deseado

5-Chat Global y por Destino

-El sistema debe ofrecer seleccionar el destino o paradero para luego mostrar los chats globales
-El sistema debe ofrecer chats globales para usuarios que salen en el rango de horario seleccionado

6-Chat Privado

-El usuario debe poder enviar mensajes privados a otros usuarios.

7-Notificaciones

-El sistema debe enviar notificaciones cuando se acerca la hora de salida o cuando hay mensajes nuevos

8-Gestión de Seguridad

-El sistema debe permitir reportar usuarios o mensajes inapropiados
-El usuario debe poder bloquear o evitar interacción con otros usuarios

9-Privacidad

-El usuario debe poder decidir qué datos personales aparecen en su perfil visible


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

-Nunca pidas ni almacenes la contraseña institucional en tu backend/app si existe un IdP: siempre redirigir al IdP (SSO).
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

