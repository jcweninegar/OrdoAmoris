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

async function readJSON(file: string) {
  await ensureDataDir();
  try {
    const data = await fs.readFile(path.join(dataDir, file), 'utf8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
}

async function writeJSON(file: string, data: any) {
  await ensureDataDir();
  await fs.writeFile(path.join(dataDir, file), JSON.stringify(data, null, 2));
}

export async function getUserByEmail(email: string) {
  const users = await readJSON('users.json');
  return (users as any[]).find((u) => u.email === email);
}

export async function createUser(user: any) {
  const users = await readJSON('users.json');
  (users as any[]).push(user);
  await writeJSON('users.json', users);
  return user;
}

export async function getReflections() {
  const reflections = await readJSON('reflections.json');
  return reflections;
}

export async function addReflection(reflection: any) {
  const reflections = await readJSON('reflections.json');
  (reflections as any[]).push(reflection);
  await writeJSON('reflections.json', reflections);
  return reflection;
}
