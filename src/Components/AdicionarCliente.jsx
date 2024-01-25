import React, {useState, useEffect} from 'react';
import axios from 'axios';
//JSX responsável por adicionar cliente conforme informaçoes contidas no Formulário das linhas 64 a 108
const AdicionarCliente = () => {
    const [formData, setFormData] = useState(
        {nome: '', email: '', telefone: '', coordenada_x: 0, coordenada_y: 0}
    );

    const [mensagem, setMensagem] = useState('');
    const [mostrarAlerta, setMostrarAlerta] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:5000/clientes', formData)
            .then(response => {
                if (response.data != null) {
                    setMensagem(`Cliente ${formData.nome} cadastrado com sucesso!`);
                    setMostrarAlerta(true);
                    setFormData(
                        {nome: '', email: '', telefone: '', coordenada_x: 0, coordenada_y: 0}
                    );
                }
            })
            .catch(error => {
                console.error('Erro ao cadastrar cliente:', error);
                setMensagem('Erro ao cadastrar cliente. Tente novamente.');
                setMostrarAlerta(true);
            });
    };
        //Efeito que dá 5 segundo até o fechamento da mensagem
    useEffect(() => {
        const timer = setTimeout(() => {
            setMostrarAlerta(false);
            setMensagem('');
        }, 5000);
        return() => clearTimeout(timer);
    }, [mostrarAlerta]);

    return (
        <div className='text-center'>

            <h3>Adicionar Novo Cliente</h3>
            {
                mostrarAlerta && (
                    <div
                        className={`alert ${mensagem.includes('sucesso')
                            ? 'alert-success'
                            : 'alert-danger'}`}
                        role="alert">
                        {mensagem}
                    </div>
                )
            }
            
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <br/>
                    <input type="text" name="nome" value={formData.nome} onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Email:
                    <br/>
                    <input type="text" name="email" value={formData.email} onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Telefone:
                    <br/>
                    <input
                        type="text"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Coordenada X:
                    <br/>
                    <input
                        type="number"
                        name="coordenada_x"
                        value={formData.coordenada_x}
                        onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Coordenada Y:
                    <br/>
                    <input
                        type="number"
                        name="coordenada_y"
                        value={formData.coordenada_y}
                        onChange={handleChange}/>
                </label>
                <br/>
                <button className="mt-2 btn btn-primary" type="submit">Adicionar Cliente</button>
            </form>
        </div>
    );
};

export default AdicionarCliente;