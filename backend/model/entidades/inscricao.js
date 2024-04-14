const Database = require("../database");

const banco = new Database
class Inscricao {
    cand_cpf;
    vaga_codigo;
    data_inscricao;
    constructor(cand_cpf,vaga_codigo,data_inscricao) {
        this.cand_cpf= cand_cpf;
        this.vaga_codigo = vaga_codigo;
        this.data_inscricao = data_inscricao;
    }

    async getAll() {
        const inscricoes = await banco.ExecutaComando('SELECT * FROM inscricao')
        return inscricoes;
    }

    async filtrar({ cpf }) {
        try {
            const sql = `SELECT * FROM inscricao WHERE cand_cpf = ?`;
            let matricula = await banco.ExecutaComando(sql, [cpf]);
          
            return matricula;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async create(dadosInscricao) {
        await banco.ExecutaComandoNonQuery('insert into inscricao set ?', dadosInscricao)
    }

    async update(cpf, dadosInscricao) {
        await banco.ExecutaComandoNonQuery('update inscricao set ? where cand_cpf = ?', [dadosInscricao, cpf])
    }

    async deleteInscricao(cpf) {
        await banco.ExecutaComandoNonQuery('DELETE FROM inscricao WHERE cand_cpf = ?', [cpf])
    }
}

module.exports = Inscricao

