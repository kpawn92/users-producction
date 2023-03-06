"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_ctrl_1 = require("../services/controllers/auth.ctrl");
const schema_validate_midd_1 = require("../services/middleware/schema.validate.midd");
const moderator_midd_1 = require("../services/middleware/moderator.midd");
const verifyJwt_midd_1 = require("../services/middleware/verifyJwt.midd");
const auth_schema_1 = require("../services/schemas/auth.schema");
const verify_email_midd_1 = require("../services/middleware/verify.email.midd");
const verify_params_midd_1 = require("../services/middleware/verify.params.midd");
const router = (0, express_1.Router)();
/**
 * @swagger
 *  tags:
 *      name: Auth
 *      description: Rutas para manejar informacion relacionada con autenticacion y autorizacion de los usuarios
 */
/**
 * @swagger
 *  components:
 *      parameters:
 *          keyToken:
 *              name: auth-token
 *              in: header
 *              description: Token de acceso
 *          Reference:
 *              in: path
 *              name: ref
 *              required: true
 *              schema:
 *                  type: string
 *              description: Nombre de usuario del sponsor
 *      schemas:
 *          BodySubscriberPost:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: Nombre(s) del usuario
 *                  lastname:
 *                      type: string
 *                      description: Apellidos del usuario
 *                  email:
 *                      type: string
 *                      description: correo electronico del usuario, debe ser unico
 *                  password:
 *                      type: string
 *                      description: Contraseña del usuario min_caracteres 6
 *              required:
 *                  - name
 *                  - lastname
 *                  - email
 *                  - password
 *              example:
 *                  name: Francisco
 *                  lastname: T. Schulz
 *                  email: franc@gmail.com
 *                  password: test123456
 *          BodyModeratorPost:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: Nombre(s) del usuario
 *                  lastname:
 *                      type: string
 *                      description: Apellidos del usuario
 *                  email:
 *                      type: string
 *                      description: correo electronico del usuario, debe ser unico
 *                  password:
 *                      type: string
 *                      description: Contraseña del usuario min_caracteres 6
 *                  role:
 *                      type: string
 *                      description: Privilegio
 *              required:
 *                  - name
 *                  - lastname
 *                  - email
 *                  - password
 *              example:
 *                  name: Francisco
 *                  lastname: T. Schulz
 *                  email: franc@gmail.com
 *                  password: test123456
 *                  role: moderator
 *          BodyLogin:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      description: Correo para acceder
 *                  password:
 *                      type: string
 *                      description: Contraseña para acceder
 *              required:
 *                  - email
 *                  - password
 *              example:
 *                  email: admin@admin.com
 *                  password: admin123456
 */
/**
 * @swagger
 *  /auth/register:
 *      post:
 *          tags:
 *          - Auth
 *          summary: El admin crea las cuentas con privilegios moderador
 *          parameters:
 *          - $ref: '#/components/parameters/keyToken'
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BodyModeratorPost'
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
router.post('/register', verifyJwt_midd_1.verifyToken, verifyJwt_midd_1.isRoot, (0, schema_validate_midd_1.schemaValidition)(auth_schema_1.signUpSchema), verify_email_midd_1.verifyEmail, moderator_midd_1.accountMod);
/**
 * @swagger
 *  /auth/signup:
 *      post:
 *          tags:
 *          - Auth
 *          summary: Autenticacion para acceder
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BodySubscriberPost'
 *          required: true
 *          responses:
 *              200:
 *                  description: Usuario autenticado
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
 *              500:
 *                  description: Error interno servidor
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 */
router.post('/signup', (0, schema_validate_midd_1.schemaValidition)(auth_schema_1.signUpSchema), verify_email_midd_1.verifyEmail, auth_ctrl_1.signup);
/**
 * @swagger
 *  /auth/signup/{ref}:
 *      post:
 *          tags:
 *          - Auth
 *          summary: Autenticacion por referencia
 *          parameters:
 *          - $ref: '#/components/parameters/Reference'
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BodySubscriberPost'
 *          required: true
 *          responses:
 *              200:
 *                  description: Usuario autenticado
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
router.post('/signup/:ref', (0, schema_validate_midd_1.schemaValidition)(auth_schema_1.signUpSchema), verify_params_midd_1.verifyParams, verify_email_midd_1.verifyEmail, auth_ctrl_1.signup);
/**
 * @swagger
 *  /auth/signin:
 *      post:
 *          tags:
 *          - Auth
 *          summary: Autorizacion para acceder
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BodyLogin'
 *          responses:
 *              200:
 *                  description: Usuario autorizado
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
router.post('/signin', (0, schema_validate_midd_1.schemaValidition)(auth_schema_1.signInSchema), auth_ctrl_1.signin);
/**
 * @swagger
 *  /auth/profile:
 *      get:
 *          tags:
 *          - Auth
 *          summary: Perfil del usuario
 *          parameters:
 *          - $ref: '#/components/parameters/keyToken'
 *          responses:
 *              200:
 *                  description: Usuario autorizado
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
router.get('/profile', verifyJwt_midd_1.verifyToken, auth_ctrl_1.profile);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map