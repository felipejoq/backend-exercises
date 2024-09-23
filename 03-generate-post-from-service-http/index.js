import fs from 'node:fs/promises';
import axios from 'axios';
import path from 'node:path';

const API_URL = 'https://aves.ninjas.cl/api/birds';
const DELAY_TIME_MS = 5000;

// Función para obtener la lista de aves desde un archivo JSON
export const getBirds = async () => {
    const data = await fs.readFile('data/birds.json', 'utf-8');
    return JSON.parse(data);
};

// Función recursiva principal
const processBirdsRecursively = async (birds, index = 0) => {
    // Caso base: cuando ya hemos procesado todas las aves
    if (index >= birds.length) {
        console.log(`Todos los archivos Markdown han sido generados. ${birds.length} aves procesadas.`);
        return;
    }

    const bird = birds[index]; // Obtener el ave actual
    const birdData = await getBirdsFromAPIWithDelay({ selfUrl: bird?._links?.self }); // Obtener datos con delay
    await generateMarkdownFile(birdData); // Generar el archivo Markdown con la información obtenida

    // Llamada recursiva para procesar la siguiente ave
    await processBirdsRecursively(birds, index + 1);
};

// Función para obtener la información de cada ave con delay
export const getBirdsFromAPIWithDelay = async ({ selfUrl }) => {
    await new Promise((resolve) => setTimeout(resolve, DELAY_TIME_MS)); // Delay antes de la petición
    return getBirdsFromAPI({ selfUrl });
};

// Función para obtener datos de la API
export const getBirdsFromAPI = async ({ selfUrl }) => {
    const response = await axios.get(selfUrl);
    return response.data;
};

// Función para generar el archivo Markdown
export const generateMarkdownFile = async (bird) => {
    const fileName = `${bird.uid}.md`; // Nombre del archivo basado en el UID del ave
    const filePath = path.join('posts', fileName); // Ruta donde se guardará el archivo

    // Contenido del archivo Markdown
    const markdownContent = `
---
uid: "${bird.uid}"
spanish_name: "${bird?.name?.spanish}"
english_name: "${bird?.name?.english}"
latin_name: "${bird?.name?.latin}"
map_image: "${bird?.map?.image}"
map_title: "${bird?.map?.title}"
iucn_status: "${bird?.iucn?.title}"
iucn_description: "${bird?.iucn?.description}"
habitat: "${bird?.habitat}"
didyouknow: "${bird?.didyouknow}"
migration: ${bird?.migration}
dimorphism: ${bird?.dimorphism}
size: "${bird?.size}"
order: "${bird?.order}"
species: "${bird?.species}"
main_image: "${bird?.images?.main}"
audio_author: "${bird?.audio?.author}"
audio_file: "${bird?.audio?.file}"
---

# ${bird.name.spanish} (${bird.name.latin})

## Descripción

El **${bird.name.spanish}** (en inglés: *${bird.name.english}*) es una especie de ave nativa de Chile, perteneciente al orden **${bird.order}**. Se distribuye principalmente en ${bird.habitat}.

### Estado de conservación

Según la Unión Internacional para la Conservación de la Naturaleza (UICN), está catalogado como: **${bird.iucn.title}**. ${bird.iucn.description}

### Hábitat y comportamiento

Estas aves frecuentan ${bird.habitat}, donde son observadas en pequeños grupos o parejas. Comparten su entorno con otras aves como cisnes de cuello negro y canquenes. Además, se alimentan y anidan en zonas pantanosas y lagunas, utilizando islas de vegetación flotante para anidar.

### Curiosidades

Una curiosidad sobre esta especie es que su nombre, **Coscoroba**, proviene de una onomatopeya que imita el sonido emitido por las hembras como señal de alerta.

### Tamaño y características

Esta especie mide entre **${bird.size}** y no presenta dimorfismo sexual significativo. No realiza migraciones estacionales importantes.

## Imágenes

![Mapa de distribución](${bird.map.image})
> ${bird.map.title}

![${bird.name.spanish}](${bird.images.main})

## Audio

Puedes escuchar el canto del ${bird.name.spanish} grabado por ${bird.audio.author} en el siguiente [enlace](${bird.audio.file}).

---

Fuente: [${bird._links.self}](${bird._links.self})
`;

    try {
        await fs.writeFile(filePath, markdownContent); // Escribir el archivo de manera asíncrona
        console.log(`Archivo ${fileName} generado con éxito.`);
    } catch (err) {
        console.error(`Error al generar el archivo ${fileName}:`, err);
    }
};

// Función inicial que lee las aves y llama a la función recursiva
(async () => {
    const birds = await getBirds();
    await processBirdsRecursively(birds); // Iniciar el proceso recursivo
})();
