import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());
/*lista todos*/

app.get("/cozinha", async (req, res) => {
  const result = await pool.query("SELECT * FROM cozinha ORDER BY prato");
  res.json(result.rows);
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando");
});
/*busca avançada*/
app.get("/cozinha/busca",async(req,res)=>{
  const{
    prato="",
    quantidade=""
  }=req.query;
  const r=await pool.query(
    `SELECT * FROM cozinha 
    WHERE prato ILIKE $1
     AND quantidade ILIKE $2
    ORDER BY id`,
    [
      `%${prato}%`,
      `%${quantidade}%`
    ]
  );
  res.json(r.rows);
})

