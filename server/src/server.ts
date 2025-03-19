import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';  
import { Request, Response, NextFunction } from 'express';
import db from './config/connection.js';
import { typeDefs } from './schemas/typeDefs.js';
import { resolvers } from './schemas/resolvers.js';
import { authenticateToken } from './middleware/auth.js';

dotenv.config(); 

const startServer = async () => {
  
  const app = express();
  app.use(cors());
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  
  try {
    await db();
    console.log('✅ Successfully connected to MongoDB');
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err);
    process.exit(1);
  }

  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  
  await server.start();
  const context = async ({ req }: { req: Request }) => {
    try {
      const user = await authenticateToken(req);  // Only pass req
      return { user };  
    } catch (err) {
      return { user: null };
    }
  };
  
  app.use(
    '/graphql',
    expressMiddleware(server, { context }) // Pass correct context
  );

  
  if (process.env.NODE_ENV === 'production') {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }

  
  app.get('/', (_req, res) => {
    res.send('✅ GraphQL API is running.');
  });

  
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 GraphQL available at http://localhost:${PORT}/graphql`);
  });
};


startServer();