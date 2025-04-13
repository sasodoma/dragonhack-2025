import { MongoClient } from 'mongodb';
import { LearningContract } from '../contracts/learning';

async function migrate() {
    // Connect to MongoDB
    const mongoUri = "your-mongodb-uri";
    const client = new MongoClient(mongoUri);
    
    try {
        await client.connect();
        const db = client.db("braille_learning_app");
        
        // Initialize Midnight contract
        const learningContract = new LearningContract();
        
        // Migrate challenges
        const challenges = await db.collection("challenges").find({}).toArray();
        for (const challenge of challenges) {
            await learningContract.addChallenge(challenge);
        }
        
        // Migrate braille codes
        const brailleCodes = await db.collection("braille_codes").find({}).toArray();
        for (const code of brailleCodes) {
            await learningContract.addBrailleCode(code);
        }
        
        console.log("Migration completed successfully");
    } finally {
        await client.close();
    }
}

migrate().catch(console.error);