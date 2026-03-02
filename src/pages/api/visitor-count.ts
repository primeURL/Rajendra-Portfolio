import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'visitors.json');

// Memory cache to avoid excessive file I/O
let cache: { total: number; ips: string[] } | null = null;

async function loadData() {
  if (cache) return cache;
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    cache = JSON.parse(data);
  } catch (e) {
    // If file doesn't exist, start fresh
    cache = { total: 0, ips: [] };
  }
  return cache!;
}

async function saveData(data: { total: number; ips: string[] }) {
  cache = data;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('Error saving visitor data:', e);
  }
}

export const prerender = false;

export const GET: APIRoute = async ({ clientAddress }) => {
  const data = await loadData();
  const ip = clientAddress || 'unknown';

  // Check if IP is already in history
  if (!data.ips.includes(ip)) {
    data.ips.push(ip);
    data.total += 1;
    await saveData(data);
  }

  return new Response(JSON.stringify({ total: data.total }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
    }
  });
};
