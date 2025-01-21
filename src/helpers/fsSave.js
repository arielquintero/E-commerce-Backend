import fs from 'node:fs';

const fsSave = async (path, object) => {
  try {
    
    // CONVERTIR EL OBJ A JSON
    const jsonData = JSON.stringify(object, null, 2);

    await fs.promises.writeFile(
      path,
      jsonData, 'utf-8');

      console.log(`File saved successfully! at ${path}`);
  } catch (error) {

    console.error('Error saving file: ', error.message);
    throw new Error('Failed to save file');
  }
}

export { fsSave }