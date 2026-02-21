import fs from 'fs/promises';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data/content.json');

export async function getContent() {
    try {
        const file = await fs.readFile(dataPath, 'utf8');
        return JSON.parse(file);
    } catch (error) {
        console.error("Error reading content.json:", error);
        return null;
    }
}

export async function updateContent(newData: any) {
    try {
        await fs.writeFile(dataPath, JSON.stringify(newData, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error("Error writing content.json:", error);
        return false;
    }
}
