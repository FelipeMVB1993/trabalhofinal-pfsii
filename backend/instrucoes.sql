
CREATE TABLE candidato (
    cpf varchar(14) not null primary key,
    nome varchar(100) null,
    endereco varchar(100) null,
    telefone varchar(20) null
);

CREATE TABLE vaga (
    codigo INT NOT NULL AUTO_INCREMENT,
    cargo VARCHAR(100) NOT NULL,
    salario VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    quantidade VARCHAR(100) NOT NULL,
    CONSTRAINT pk_vaga PRIMARY KEY(codigo)
);

CREATE TABLE inscricao (
    cand_cpf VARCHAR(14),
    vaga_codigo INT,
    data_inscricao VARCHAR(100),
    PRIMARY KEY (cand_cpf, vaga_codigo),
    CONSTRAINT FOREIGN KEY (cand_cpf) REFERENCES candidato(cpf),
    CONSTRAINT FOREIGN KEY (vaga_codigo) REFERENCES vaga(Codigo)
);
