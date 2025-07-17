import XlsxPopulate from "xlsx-populate";
import fs from "fs";
import path from "path";

export const generarExcel = async (req, res) => {
  try {
    // Ruta a la carpeta /private/excel dentro del proyecto
    const folder = path.join(process.cwd(), "private", "excel");

    // Crear la carpeta si no existe
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true }); // 'recursive' asegura que se creen subdirectorios si no existen
      console.log("Carpeta 'private/excel' creada en:", folder);
    }

    // Ruta completa al archivo Excel
    const filePath = path.join(folder, "Excel.xlsx");

    // Crear el libro de Excel
    const workbook = await XlsxPopulate.fromBlankAsync();

    const sheet = workbook.sheet(0);
    sheet.cell("A1").value("Nombre");
    sheet.cell("B1").value("Apellido");
    sheet.cell("C1").value("Edad");

    sheet.cell("A2").value("Andrés");
    sheet.cell("B2").value("Escobar");
    sheet.cell("C2").value("17");

    sheet.cell("A3").value("Felipe");
    sheet.cell("B3").value("Beltrán");
    sheet.cell("C3").value("17");

    // Guardar el archivo
    await workbook.toFileAsync(filePath);
    console.log("Archivo Excel guardado en:", filePath);

    // Descargar el archivo
    res.download(filePath, (err) => {
      if (err) {
        console.error("Error al enviar el archivo:", err);
        res.status(500).send("Error al descargar el archivo");
      } else {
        console.log("Archivo enviado correctamente");
      }
    });
  } catch (error) {
    console.error("Error general:", error);
    res.status(500).json({ error: "Error al generar el archivo Excel." });
  }
};
