import {readFile, writeFile} from 'node:fs/promises'


const file = await readFile('../db/prueba.json', 'utf-8')
console.log(typeof(file));

console.log(JSON.parse(file))

