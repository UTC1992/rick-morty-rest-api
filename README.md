# RickMorty API
## Development server
  Para arrancar en desarrollo
  1.- Ejecutar en la consola `npm i`
  2.- Crear el archivo ` .env ` y añadir la información del ` .env.example `
  3.- Descargar un contenerdor con ` mongodb ` o añadir una cadena de conexión valida al archivo ` .env ` 
  2.- Ejecutar en la consola `npm run dev`
  3.- La aplicación estara corriendo en el puerto 8080 `http://localhost:8080/`

## Running unit tests
  Para correr los test
  1.- Ejecutar en la consola `npm run test`
  2.- Se esta utilizando test de ` integración ` para probar los servicios REST con una base de datos de prueba

## ORM Mongoose
  Se utilizó un ORM para facilitar la manipulación de operaciones en al base de datos

## JWT
  Se añadió la autenticación con JWT

## Cors
  Se añadió el middleware para permitir llamadas de todos los origenes para el desarrollo

##  Multer to upload files
  Se utilizón MULTER para obtener el archivo enviado desde el front y almacenarlo en un direcctorio

## Estructura de Directorios
  Se organizón por carpetas tratando de que se pudiera acceder facilmente

## Se instalo Eslint 
  Se utilizó eslint para evitar ciertos errores al momento de escribir el codigo y de esta forma se puede mantener el formato en el código
