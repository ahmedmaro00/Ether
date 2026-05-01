const { PrismaClient } = require('@prisma/client');
console.log(process.env.DATABASE_URL);
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || "file:./dev.db"
    }
  }
});
prisma.user.findMany().then(console.log).catch(console.error);
