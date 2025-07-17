import XlsxPopulate from "xlsx-populate";
import fs from "fs";
import path from "path";

export const crearExcel = async (nombreArchivo, datos, columnas, carpeta = "private/excel") => {
  const folder = path.join(process.cwd(), carpeta);

  // Crear carpeta si no existe
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
    console.log(`Carpeta '${carpeta}' creada en:`, folder);
  }

  const filePath = path.join(folder, nombreArchivo);

  const workbook = await XlsxPopulate.fromBlankAsync();
  const sheet = workbook.sheet(0);

  // Insertar encabezados
  columnas.forEach((col, index) => {
    sheet.cell(1, index + 1).value(col);
  });

  // Insertar datos
  datos.forEach((fila, rowIndex) => {
    fila.forEach((valor, colIndex) => {
      sheet.cell(rowIndex + 2, colIndex + 1).value(valor);
    });
  });

  await workbook.toFileAsync(filePath);
  return filePath;
};
