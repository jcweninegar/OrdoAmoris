import fs from 'fs/promises';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

async function ensureDataDir() {
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

async function readJSON(file) {
  await ensureDataDir();
  try {
    const data = await fs.readFile(path.join(dataDir, file), 'utf8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
}

async function writeJSON(file, data) {
  import fs from 'fs/promises';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

async function ensureDataDir() {
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

async function readJSON(file) {
  await ensureDataDir();
  try {
    const data = await fs.readFile(path.join(dataDir, file), 'utf8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
}

async function writeJSON(file, data) {
  await ensureDataDir();
  await fs.writeFile(path.join(dataDir, file), JSON.stringify(data, null, 2));
}

export async function getUserByEmail(email) {
  const users = await readJSON('users.json');
  return users.find(u => u.email === email);
}

export async function createUser(user) {
  const users = await readJSON('users.json');
  const newUser = { ...user, id: Date.now().toString() };
  users.push(newUser);
  await writeJSON('users.json', users);
  return newUser;
}

export async function getReflections(userId) {
  const reflections = await readJSON('reflections.json');
  return reflections.filter(r => r.userId === userId);
}

export async function addReflection(userId, content) {
  const reflections = await readJSON('reflections.json');
  const newReflection = { id: Date.now().toString(), userId, content, createdAt: new Date().toISOString() };
  reflections.push(newReflection);
  await writeJSON('reflections.json', reflections);
  return newReflection;
}
await ensureDataDir();
  await fs.writeFile(path.join(dataDir, file), JSON.stringify(data, null, 2));
}

export async function getUserByEmail(email) {
  const users = await readJSON('users.json');
  return users.find(u => u.email === email);
}

export async function createUser(user) {
  const users = await readJSON('users.json');
  const newUser = { ...user, id: Date.now().toString() };
  users.push(newUser);
  await writeJSON('users.json', users);
  return newUser;
}

export async function getReflections(userId) {
  const reflections = await readJSON('reflections.json');
  return reflections.filter(r => r.userId === userId);
}

export async function addReflection(userId, content) {
  const reflections = await readJSON('reflections.json');
  const newReflection = { id: Date.now().toString(), userId, content, createdAt: new Date().toISOString() };
  reflections.push(newReflection);
  await writeJSON('reflections.json', reflections);
  return newReflection;
}
