const express = require("express");
const cors = require("cors");
const app = express();
const porta = 3001;
app.use(express.json());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
const candidatoRoutes = require("./routes/candidatoRoutes");
app.use("/candidatos", candidatoRoutes);
const vagaRoutes = require("./routes/vagaRoutes");
app.use("/vagas", vagaRoutes);
const inscricaoRoutes = require("./routes/inscricaoRoutes");
app.use("/inscricoes", inscricaoRoutes);


app.listen(porta, () => {
  console.log("Servidor escutando na porta:", porta);
});
