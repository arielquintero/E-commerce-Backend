import fs from 'node:fs';

export const fsSave = async (path, object) => {
  try {
    await fs.promises.writeFile(
      path,
      JSON.stringify(object, null, 2), 'utf-8')
      console.log('Product saved successfully!');
  } catch (error) {
    console.log(error)
    console.error("Error on save file", error);
    throw error
  }
  return
}