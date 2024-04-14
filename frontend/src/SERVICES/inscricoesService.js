const API_BASE_URL = 'http://localhost:3001';

class InscricaoService {

    async filtrar({ cpf }) {
        try {
            const response = await fetch(`${API_BASE_URL}/inscricoes/filtrar`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cpf: cpf })
            });
            if (!response.ok) {
                throw new Error('Erro ao filtrar');
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
    
}

export default InscricaoService