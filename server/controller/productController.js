const Product = require("../models/Product");

exports.createProduct = async (req, res) =>{
    try{
        let product;
        product = new Product(req.body);
        await product.save(product);

        res.send(product);
    }
    catch(error){
        console.warn(error);
        res.status(500).send('Hubo un error');
    }
}

exports.delete = async (req, res) =>{
    try{
        const { name, category, location, price } = req.body;
        let product = await Product.findById(req.params.id);

        if( !product ){
            res.status(404).send('No existe');
        }

        await Product.findOneAndRemove({_id:req.params.id});
        res.send({
            msg: 'Producto eliminado con éxito'
        });
    }
    catch(error){
        console.warn(error);
        res.status(500).send('Hubo un error');
    }
}

exports.detail = async (req, res) =>{
    try{
        const { name, category, location, price } = req.body;
        let product = await Product.findById(req.params.id);

        if( !product ){
            res.status(404).send('No existe');
        }

        res.send(product);
    }
    catch(error){
        console.warn(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getAll = async (req, res) =>{
    try{
        let products = await Product.find();

        res.send(products);
    }
    catch(error){
        console.warn(error);
        res.status(500).send('Hubo un error');
    }
}

exports.update = async (req, res) =>{
    try{
        const { name, category, location, price } = req.body;
        let product = await Product.findById(req.params.id);

        if( !product ){
            res.status(404).send('No existe');
        }

        product.name = name;
        product.category = category;
        product.location = location;
        product.price = price;

        product = await Product.findOneAndUpdate({
            _id:req.params.id
        }, product, { new:string});

        res.send(product);
    }
    catch(error){
        console.warn(error);
        res.status(500).send('Hubo un error');
    }
}