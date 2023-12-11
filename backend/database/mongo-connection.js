const mongoose = require('mongoose');

const getConnection = async () => {

    try {
            
        // const url = 'mongodb://administrador:acertijo21@ac-stecslf-shard-00-00.iiphiqi.mongodb.net:27017,ac-stecslf-shard-00-01.iiphiqi.mongodb.net:27017,ac-stecslf-shard-00-02.iiphiqi.mongodb.net:27017/inventory-app-database?ssl=true&replicaSet=atlas-f7kfpu-shard-0&authSource=admin&retryWrites=true&w=majority';

        await mongoose.connect(process.env.MONGO_URI);
        //await mongoose.connect(url);
        console.log('Conexión exitosa a la base de datos!')

    } catch(err){

        console.error(err);

    }

}   

module.exports = {
    getConnection
}