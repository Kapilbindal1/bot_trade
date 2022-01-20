const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');  
const swaggerUI = require('swagger-ui-express');  

const UserController = require('./user');
const bodyParser = require('body-parser');


require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));


// Swagger Configuration  
const swaggerOptions = {
  swaggerDefinition: {  
      info: {  
          title:'API',  
          version:'1.0.0'  
      }  
  },  
  apis:['server.js'],  
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);  
app.use('/tmp/docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs)); 


/** 
 * @swagger 
 * /user/averagePrice: 
 *   post: 
 *     description: get average buy and sell price 
 *     parameters: 
 *     - name: Data
 *       in: body 
 *       required: true 
 *       schema:
 *        type: object
 *        properties:
 *          asset:
 *            type: string
 *          base:
 *            type: string
 *          tmp:
 *            type: string
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */  
app.post('/user/averagePrice', UserController.averagePrice);


const port = process.env.PORT || 8000;
app.listen(port, function () {  
  console.log('App listening at: ', port);  
});