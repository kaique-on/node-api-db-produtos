import bodyParser from "body-parser";
import express from "express";
import sql from "msnodesqlv8";

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
const connectionString = "server=DSN119-003;Database=produtos;Trusted_Connection=Yes;Driver={Sql Server Native Client 11.0}";

app.listen(PORT, ()=> {
    console.log(`Server rodando na porta ${PORT}`);
})

app.get("/produtos", (req, res)=> {
    sql.query(connectionString, "SELECT * FROM produto", (err, rows) => {
        if(err){
            res.status(500).json("Erro Interno do Servidor", err);
        } else {
            res.status(200).json(rows);
        }
    });
});

//Escrita
app.post("/produtos", (req, res) => {
    const { nome, descricao, custo, preco } = req.body;
    sql.query(
        connectionString,
        `INSERT INTO  produto VALUES ('${nome}', '${descricao}', '${custo}', '${preco}')`, (erro, rows) => {
            if(erro){
                res.status(500).json("Erro Interno do Servidor");
            } else {
                res.status(201).json("Cadastrado com sucesso!");
            }}
    )
});

//Navegação
app.get("/produtos/:id", (req, res) =>{
    const {id} = req.params;
    sql.query(connectionString, `SELECT * FROM produto WHERE id = ${id}`, (erro, rows) =>{
        if(erro){
            res.status(500).json("Erro interno do servidor");
        } else {
            res.status(200).json(rows)
        }
    });
});

//Atualizar
app.put("/produtos/:id",(req, res) => {
    const{id} = req.params;
    const {nome, descricao, custo, preco} = req.body;
    sql.query(
        connectionString,
        `UPDATE produto SET nome = '${nome}', descricao = '${descricao}', custo = ${custo}, preco = ${preco} WHERE id = ${id};`,
        (erro, rows) => {
            if(erro){
                res.status(500).json("Erro Interno do servidor");
            } else {
                res.status(201).json("Atualizado com sucesso");
            }
        }
    )
});

//Deleta
app.delete("/produtos/:id", (req,res) => {
    const{id} = req.params;
    sql.query(
        connectionString,
        `DELETE FROM produto WHERE id=${id}`,
        (erro, rows) => {
            if(erro){
                res.status(500).json("Erro Interno do Servidor")
            } else {
                res.status(201).json("Deletado com sucesso")
            }
        }
    )
});