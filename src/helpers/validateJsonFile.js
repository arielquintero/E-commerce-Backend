import { promises as fs } from 'node:fs'

const validateJsonFile = async(filePath, validateFn) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(data);
    return validateFn(jsonData);
  } catch (error) {
    console.error(`Error precessing ${filePath}`, error.message);
    throw new Error(`Error verifying data in ${filePath}`);
  }
}

export { validateJsonFile }