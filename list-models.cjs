require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function run() {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
  const data = await response.json();
  console.log(JSON.stringify(data.models.map(m => m.name), null, 2));
}

run().catch(console.error);
