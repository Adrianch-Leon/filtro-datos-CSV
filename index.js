/*
Este script permite filtrar un archivo csv en javascript colocando el directorio del archivo a analizar, 
la columna a filtrar y el valor deseado para filtrar en cada una de las variables para ello
*/


const fs = require('fs');
const csv = require('csv-parser');





//variable que contiene la respuesta final
const results = [];
// variable que contiene el directorio del archivo a trabajar
const pathToFile = './resources/archivo.csv';
// variable que contiene la ubicación de la columna a examinar
const posicion = 4;
//variable que contiene el valor a comparar para filtrar
const valorFiltrar = '1';






fs.createReadStream(pathToFile)
  .pipe(csv())
  .on('data', (data) => {

    
    if (procesarCSV(data) === valorFiltrar) {
      results.push(data);
    }
  })
  .on('end', () => {
    console.log('archivo CSV correctamente procesado');
    console.log(results);
    saveFilteredResults(results);
  });

// función para salvar los resultados en un archivo
function saveFilteredResults(data) {
  const { stringify } = require('csv-stringify');
  stringify(data, {
    header: true
  }, (err, output) => {
    if (err) throw err;
    fs.writeFile('./resources/filtered_data.csv', output, (err) => {
      if (err) throw err;
      console.log('filtered_data.csv saved.');
    });
  });
}

// Función para procesar el contenido del archivo CSV
function procesarCSV(objeto) {

  let csvContent = JSON.stringify(objeto);
  var line = csvContent.split(':')[1];

  // Dividir la línea en valores usando ';' como separador
  const values = line.split(';');

  // Comprobar si la línea tiene suficientes valores
  if (values.length >= 4) {
    const borrar = values[posicion-1].trim(); // Obtener el valor correspondiente a 'borrar'
    return borrar;
  }
}