const { productSchema } = require('../model/product')

class productService {

    async createProduct(productInfo) {
        try {
            if (!productInfo) {
                throw new Error('product Details are required');
            }
            const savedProduct = await productSchema.create(productInfo);
            if (savedProduct) {
                return savedProduct;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async getAllProduct(body) {
        const { name, sort, fields, gender, category, brand,numericFilters, color, availability } = body;
        const productQuery = {};
        if(name){
            productQuery.name = name;
        }
        if (gender) {
            productQuery['productDetails.gender'] = gender;
        }
        if (brand) {
            productQuery['productDetails.brand'] = brand;
        }
        if (category) {
            console.log('category')
            productQuery.category = category;
        }
        if(color){
            productQuery['varients.color']= color;
        }
        let products = productSchema.find(productQuery);
        if (sort) {
            const sortList = sort.split(',').join(' ');
            products = products.sort(sortList);
        }
        if (fields) {
            const fieldList = fields.split(',').join(' ');
            products = products.select(fieldList);
        }
        if(availability){
            products = products.find({'varients.noOfProducts' :{$gt : 0}} ) ; 
        }
        const page = Number(body.page) || 1;
        const limit = Number(body.limit) || 24;
        const skip = (page - 1) * limit;
        products = products.skip(skip).limit(limit);
        const filterProduct = await products;
        return filterProduct;
    }

    async getOneProduct(productId) {
        try {
            if (!productId) {
                throw new Error('product id is require');
            }
            const product = await productSchema.findOne({ _id: productId });
            if (product) {
                return product;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }


    async deleteProduct(productId) {
        try {
            if (!productId) {
                throw new Error('product id is require');
            }
            const deleteProductInfo = await productSchema.findOneAndDelete({ _id: productId });
            if (deleteProductInfo) {
                return deleteProductInfo;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteVariant(productId, varientId) {
        try {
            if (!productId) {
                throw new Error('product id is require');
            }
           const deleteVariant= await productSchema.findOneAndUpdate({_id:productId},{$pull :{varients:{_id:varientId}}});
            if(deleteVariant){
                return deleteVariant;
            }else{
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(productId, bodyData) {
        try {
            if (!productId) {
                throw new Error('product id is require');
            };
            const updatedProduct = await productSchema.findOneAndUpdate({ _id: productId }, bodyData, {
                new: true,
                runValidators: true,
            });
            if (updatedProduct) {
                return updatedProduct;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = productService