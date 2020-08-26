import { connect } from 'mongoose'

export async function startConnection() {

    const uri = "mongodb://manuel:manuel@molinos-shard-00-00.93qfn.mongodb.net:27017,molinos-shard-00-01.93qfn.mongodb.net:27017,molinos-shard-00-02.93qfn.mongodb.net:27017/molinos?ssl=true&replicaSet=atlas-wxwpzt-shard-0&authSource=admin&retryWrites=true&w=majority";


    const db = await connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
        .then(() => console.log('Database is connected'))
        .catch(err => {
            console.log(`DB Connection Error: ${err.message}`);
        });

}
