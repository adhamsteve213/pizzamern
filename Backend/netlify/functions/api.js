const express = require('express');
const serverless = require('serverless-http');
const app = require('../server');

export default handler = serverless(app);
app.get("/api/data", (req, res) => {
  res.json({ msg: "Hello from Express on Vercel" });
});
