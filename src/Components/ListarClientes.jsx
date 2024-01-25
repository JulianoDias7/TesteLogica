import React, {useState, useEffect} from 'react';
import axios from 'axios';
// Componente responsável pela listagem dos clientes
const ListarClientes = () => {
    const [clients, setClients] = useState([]);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:5000/clientes')
            .then(response => {
                setClients(response.data);
            })
            .catch(error => {
                console.error('Erro ao obter clientes:', error);
            });
    }, []);
    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    const clientesFiltrados = clients.filter(
        cliente => cliente.nome.toLowerCase().includes(filtro.toLowerCase())
    );

    return (

        <div className='d-flex flex-column align-items-center p-2 text-center'>
            <h2>Lista de Clientes</h2>
            <div className='p-2'>
                <label className='me-2'>Filtrar por nome:</label>
                <input type="text" value={filtro} onChange={handleFiltroChange}/>
            </div>
            {/* Aqui já estamos utilizando a lista filtrada com uma classe criada no CSS para limitar o tamanho da lista */}
            <ul className='list-group lista-scroll'>
                {
                    clientesFiltrados.map(cliente => (
                        <li className='list-group-item' key={cliente.id}>{cliente.nome}
                            - {cliente.email}
                            - {cliente.telefone}</li>
                    ))
                }
            </ul>
        </div>
    );
};

export default ListarClientes;