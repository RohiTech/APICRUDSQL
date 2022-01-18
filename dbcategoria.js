var config = require('./dbconfig'); // Instanciamos el archivo dbconfig
const sql = require('mssql'); // Se necesita paquete mssql

// Funcion Async : Asyncrona esta devuelve un objeto 
async function getCategoria() {
    try {
        let pool = await sql.connect(config);
        let categorias = await pool.request().query("SELECT * FROM TM_CATEGORIA");
        return categorias.recordsets;
    } catch(error) {
        console.log(error);
    }
}

async function getCategoriaxId(cat_id) {
    try {
        let pool = await sql.connect(config);
        let categorias = await pool.request()
        .input('input_parameter', sql.Int, cat_id)
        .query("SELECT * FROM TM_CATEGORIA WHERE CAT_ID = @input_parameter");
        return categorias.recordsets;
    } catch(error) {
        console.log(error);
    }
}

async function insertCategoria(categoria) {
    try {
        let pool = await sql.connect(config);
        let Insertcate = await pool.request();
        .input('cat_id', sql.Int, categoria.cat_id)
        .input('cat_nom', sql.VarChar, categoria.cat_nom)
        .input('cat_obs', sql.VarChar, categoria.cat_nom)
        .execute('SP_I_CATEGORIA_01');
        return Insertcate.recordsets;
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    getCategoria : getCategoria,
    getCategoriaxId : getCategoriaxId,
    insertCategoria: insertCategoria
}