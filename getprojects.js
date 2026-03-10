#!/usr/bin/env node
require('dotenv').config();
const http = require('http');
const https = require('https');

const apiUrl = process.env.API_URL || `http://localhost:${process.env.PORT || 4000}/api/projects`;
try {
  const url = new URL(apiUrl);
  const lib = url.protocol === 'https:' ? https : http;

  const options = {
    hostname: url.hostname,
    port: url.port || (url.protocol === 'https:' ? 443 : 80),
    path: url.pathname + url.search,
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  };

  const req = lib.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => (data += chunk));
    res.on('end', () => {
      if (!data) {
        console.log('No response body');
        process.exit(0);
      }
      try {
        const json = JSON.parse(data);
        console.log(JSON.stringify(json, null, 2));
        process.exit(0);
      } catch (err) {
        console.error('Error parsing JSON response:', err.message);
        console.error('Raw response:', data);
        process.exit(1);
      }
    });
  });

  req.on('error', (err) => {
    console.error('Request error:', err.message);
    process.exit(1);
  });

  req.end();
} catch (err) {
  console.error('Invalid URL:', apiUrl);
  console.error(err.message);
  process.exit(1);
}
