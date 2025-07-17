import { Router } from 'express'
import { buildPDF }  from '../libs/pdf.js'
/*
ruta : 
http://localhost:3000/pdf/invoice */
const router = Router()

router.get("/invoice", async (req, res) => {
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=reporte.pdf',

    });


buildPDF(
    (data)=>
    stream.write(data),
    () => stream.end()

);

res.send("invoice");
});
export default router

