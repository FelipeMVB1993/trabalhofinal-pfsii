import "./TabelaInscricoes.css";
import InscricaoService from '../../SERVICES/inscricoesService.js';
import { useState, useEffect } from 'react';
import InscreverCandidato from "./InscreverCandidato.jsx";


const inscricaoService = new InscricaoService();

function TabelaInscricoes({ isMenuExpanded }) {
  const [inscricoes, setInscricoes] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [candidatos, setCandidatos] = useState(
    [{
      cpf: 0,
      nome: "Nenhum aluno encontrado"
    }]
  );
  const [vagas, setVagas] = useState(
    [{
      codigo: 0,
      cargo: "Nenhuma turma encontrada"
    }]
  );

  useEffect(() => {
    buscarAlunos();
    buscarTurmas();
    buscarInscricoes();
  }, []);

  const fetchWithErrorHandling = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch");
      return data;
    } catch (error) {
      console.error("Fetch error:", error.message);
      throw error;
    }
  };

  function buscarAlunos() {
    fetchWithErrorHandling('http://localhost:3001/candidatos')
      .then(data => setCandidatos(data.listaCandidatos || []))
      .catch(error => {
        setError("Erro ao recuperar candidatos: " + error.message);
        setCandidatos([]);
      });
  }

  function buscarTurmas() {
    fetchWithErrorHandling('http://localhost:3001/vagas')
      .then(data => setVagas(data.listaVagas || []))
      .catch(error => {
        setError("Erro ao recuperar vagas: " + error.message);
        setVagas([]);
      });
  }

  function buscarInscricoes() {
    fetchWithErrorHandling('http://localhost:3001/inscricoes')
      .then(data => setInscricoes(data.listaInscricoes || []))
      .catch(error => {
        setError("Erro ao recuperar inscrições: " + error.message);
        setInscricoes([]);
      });
  }
  


  // Função para restaurar a tabela de matrículas
  const handleRestaurarTabela = async () => {
    setSearchInput(''); // Limpar o campo de pesquisa
    // Recarregar todas as matrículas
    buscarInscricoes();
  };


  const handleFiltrar = async () => {
    try {
      console.log('Input Pesquisar:', searchInput);

      if (!searchInput) {
        console.log('Sem input pesquisar. Carregar todos alunos.');
        buscarInscricoes();
        return;
      }

      const matriculasFiltradas = await inscricaoService.filtrar({ cpf: searchInput });

      if (matriculasFiltradas.length === 0) {
        setError('Candidato não encontrado. Verifique o cpf e tente novamente.');
        setTimeout(() => {
          setError(null);
        }, 5000);
      } else {
        setInscricoes(matriculasFiltradas);
      }
    } catch (error) {
      console.error('Erro ao filtrar matriculas:', error);
      setError('Erro ao filtrar matriculas. Tente novamente mais tarde.');
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <div id="formularioAluno" className={isMenuExpanded ? "expanded" : ""}>
      <div className="main--content">
        <div className="form--wrapper">
          <InscreverCandidato></InscreverCandidato>
          <div id='mensagem'>
            {successMessage && (
              <div className="alert alert-success" role="alert">
                <div className='centraliza'>
                  {successMessage}
                </div>
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group borda-form mt-5">
                <label htmlFor="pesquisar">
                  <i className="bi bi-search"></i> Pesquisar:
                </label>
                <div className="input-group flex-nowrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Informe o cpf do candidato"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                    name="cpf"
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div id='pesquisar'>
              <button
                className="btn btn-primary btn-gradient"
                id="pesquisar"
                type="button"
                onClick={handleFiltrar}
              >
                Pesquisar
              </button>
            </div>
            <div id='restaurar'>
              <button
                className="btn btn-primary btn-gradient"
                id="pesquisar"
                type="restaurar"
                onClick={handleRestaurarTabela}
              >
                Restaurar Tabela
              </button>
            </div>
            {error && <div className="alert alert-danger ml-4" role="alert">{error}</div>}
            {inscricoes.length === 0 ? (
              <div className="alert alert-danger ml-4 text-center mx-auto" role="alert">
                ERRO: Não foi possível buscar a lista de inscritos no backend!
              </div>

            ) : (
              <table className="table table-hover">
                <thead class="azul">
                  <tr>
                    <th scope="col">CPF</th>
                    <th scope="col">Candidato</th>
                    <th scope="col">Vaga</th>
                    <th scope="col">Salário</th>
                    <th scope="col">Data da inscrição</th>
                  </tr>
                </thead>
                <tbody>
                {inscricoes.map(inscricao => (
              <tr key={inscricao.cand_cpf}>
                <td className="texto">{inscricao.cand_cpf}</td>
                <td className="texto">{candidatos.find(c => c.cpf === inscricao.cand_cpf)?.nome || 'Desconhecido'}</td>
                <td className="texto">{vagas.find(v => v.codigo === inscricao.vaga_codigo)?.cargo || 'Desconhecido'}</td>
                <td className="texto">R$ {vagas.find(v => v.codigo === inscricao.vaga_codigo)?.salario || 'Desconhecido'}</td>
                <td className="texto">{inscricao.data_inscricao}</td>
              </tr>
            ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabelaInscricoes;