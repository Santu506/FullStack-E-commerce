import {Router} from 'express'
import {addProduct,removeProduct,listProduct,singleProduct} from '../controller/product.controller.js'
import {upload} from '../middleware/multer.js'
import { adminAuth } from '../middleware/adminAuth.js';
const productRouter = Router();

productRouter.post('/add',adminAuth,upload.fields([{ name: 'image1', maxCount: 1 },{ name: 'image2', maxCount: 1 },{ name: 'image3', maxCount: 1 },{ name: 'image4', maxCount: 1 }]),addProduct);
productRouter.get('/list',listProduct);
productRouter.get('/single',adminAuth,singleProduct);
productRouter.delete('/remove',adminAuth,removeProduct);

export default productRouter