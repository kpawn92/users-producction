"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_ctrl_1 = require("../services/controllers/user.ctrl");
const schema_validate_midd_1 = require("../services/middleware/schema.validate.midd");
const verify_role_midd_1 = require("../services/middleware/verify.role.midd");
const verify_sponsor_midd_1 = require("../services/middleware/verify.sponsor.midd");
const verify_user_midd_1 = require("../services/middleware/verify.user.midd");
const verifyJwt_midd_1 = require("../services/middleware/verifyJwt.midd");
const user_schema_1 = require("../services/schemas/user.schema");
const router = (0, express_1.Router)();
/**
 * @swagger
 *  tags:
 *      name: Users
 *      description: Rutas para manejar informacion relacionada con los usuarios
 */
/**
 * @swagger
 *  components:
 *      parameters:
 *          Roles:
 *              in: query
 *              name: role
 *              required: true
 *              schema:
 *                  type: string
 *              description: Privilegio del usuario
 *          idReference:
 *              in: path
 *              name: ref
 *              required: true
 *              schema:
 *                  type: string
 *              description: Id del sponsor
 *          idUser:
 *              in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *              description: ID del Subscriber | UserID del Moderator
 *          Month:
 *              in: query
 *              name: month
 *              schema:
 *                  type: string
 *              description: Index del mes para obtener los afiliados ingresados
 */
/**
 * @swagger
 *  /user:
 *      get:
 *          tags:
 *          - Users
 *          summary: El admin obtiene los usuarios por privilegio
 *          parameters:
 *          - $ref: '#/components/parameters/Roles'
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
router.get('/', verifyJwt_midd_1.verifyToken, verifyJwt_midd_1.isRoot, (0, schema_validate_midd_1.schemaValidition)(user_schema_1.usersSchema), verify_role_midd_1.verifyRole, user_ctrl_1.getUsers);
/**
 * @swagger
 *  /user/affilies/{ref}:
 *      get:
 *          tags:
 *          - Users
 *          summary: El admin obtiene los afiliados por referencia
 *          parameters:
 *          - $ref: '#/components/parameters/idReference'
 *          - $ref: '#/components/parameters/Month'
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
 *              406:
 *                  description: No se encuentra ningun contenido segun lo solicitado
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
router.get('/affilies/:ref', verifyJwt_midd_1.verifyToken, verifyJwt_midd_1.isRoot, (0, schema_validate_midd_1.schemaValidition)(user_schema_1.affiliesSchema), verify_sponsor_midd_1.verifySponsor, user_ctrl_1.getUsersAffilies);
/**
 * @swagger
 *  /user/get/{id}:
 *      get:
 *          tags:
 *          - Users
 *          summary: El admin obtiene los datos del Subscriber || Moderator
 *          parameters:
 *          - $ref: '#/components/parameters/idUser'
 *          - $ref: '#/components/parameters/Roles'
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
 *              406:
 *                  description: No se encuentra ningun contenido segun lo solicitado
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
router.get('/get/:id', verifyJwt_midd_1.verifyToken, verifyJwt_midd_1.isRoot, (0, schema_validate_midd_1.schemaValidition)(user_schema_1.userSchema), verify_user_midd_1.verifyUserID, user_ctrl_1.getUserDataById);
/**
 * @swagger
 *  /user/{id}:
 *      delete:
 *          tags:
 *          - Users
 *          summary: El admin invalida el usuario
 *          parameters:
 *          - $ref: '#/components/parameters/keyToken'
 *          - $ref: '#/components/parameters/idUser'
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
 *              406:
 *                  description: No se encuentra ningun contenido segun lo solicitado
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
router.delete('/:id', verifyJwt_midd_1.verifyToken, verifyJwt_midd_1.isRoot, (0, schema_validate_midd_1.schemaValidition)(user_schema_1.invalidUserSchema), verify_user_midd_1.verifyUserAccount, user_ctrl_1.invalidUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map