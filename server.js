import app from './src/app.js';
import { initDatabase } from './src/config/db.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
  await initDatabase();

  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
