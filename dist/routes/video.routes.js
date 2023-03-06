"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const video_ctrl_1 = require("../services/controllers/video.ctrl");
const schema_validate_midd_1 = require("../services/middleware/schema.validate.midd");
const verifyJwt_midd_1 = require("../services/middleware/verifyJwt.midd");
const film_schema_1 = require("../services/schemas/film.schema");
/**
 * TODO: Taks
 *   Gestionar las querys
 */
const router = (0, express_1.Router)();
/**
 * @swagger
 *  tags:
 *      name: Films
 *      description: Rutas para manejar informacion relacionada con las peliculas
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          BodyFilmPost:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: Titulo de la pelicula
 *                  year:
 *                      type: string
 *                      description: Año de lanzamiento
 *                  runtime:
 *                      type: string
 *                      description: Duracion
 *                  genre:
 *                      type: string
 *                      description: Genero(s)
 *                  director:
 *                      type: string
 *                      description: Director de la pelicula
 *                  actors:
 *                      type: string
 *                      description: Actores principales
 *                  plot:
 *                      type: string
 *                      description: Sinopsis
 *                  poster:
 *                      type: string
 *                      description: Url de la imagen portada
 *                  currency_code:
 *                      type: string
 *                      description: Moneda a cobrar USD | EUR | etc
 *                  value:
 *                      type: string
 *                      description: Precio
 *              required:
 *                  - title
 *                  - year
 *                  - runtime
 *                  - genre
 *                  - director
 *                  - actors
 *                  - plot
 *                  - poster
 *                  - currency_code
 *                  - value
 *              example:
 *                  title: 'The Lord of the Rings: The Fellowship of the Ring'
 *                  year: '2001'
 *                  runtime: 178 min
 *                  genre: Action, Adventure, Drama
 *                  director: Peter Jackson
 *                  actors: Elijah Wood, Ian McKellen, Orlando Bloom
 *                  plot: A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.
 *                  poster: https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg
 *                  currency_code: USD
 *                  value: '15.56'
 */
/**
 * @swagger
 *  /film:
 *      get:
 *          tags:
 *          - Films
 *          summary: El subscriber obtiene las peliculas
 *          parameters:
 *          - $ref: '#/components/parameters/keyToken'
 *          responses:
 *              200:
 *                  description: Usuario autorizado
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              202:
 *                  description: Peticion aceptada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              400:
 *                  description: Solicitud incorrecta
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              404:
 *                  description: Usuario no encontrado
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              500:
 *                  description: Error interno servidor
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 */
router.get('/', verifyJwt_midd_1.verifyToken, verifyJwt_midd_1.isSubs, video_ctrl_1.getFilms);
/**
 * @swagger
 *  /film:
 *      post:
 *          tags:
 *          - Films
 *          summary: El admin crea los registros de las peliculas
 *          parameters:
 *          - $ref: '#/components/parameters/keyToken'
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BodyFilmPost'
 *          required: true
 *          responses:
 *              200:
 *                  description: Usuario autorizado
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              202:
 *                  description: Peticion aceptada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              400:
 *                  description: Solicitud incorrecta
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              404:
 *                  description: Usuario no encontrado
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              500:
 *                  description: Error interno servidor
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 */
router.post('/', verifyJwt_midd_1.verifyToken, verifyJwt_midd_1.isRoot, (0, schema_validate_midd_1.schemaValidition)(film_schema_1.filmBodySchema), video_ctrl_1.setFilm);
exports.default = router;
//# sourceMappingURL=video.routes.js.map