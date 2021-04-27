const {MongoClient,ObjectID}=require('mongodb')

const connectionURL='mongodb+srv://mai:mai.2207@cluster0.gthna.mongodb.net/LmsDatabase?retryWrites=true&w=majority'




const client = new MongoClient(connectionURL);
 
 // The database to use
 const dbName = "LmsDatabase";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);
         
         
        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}
run().catch(console.dir);
