// RotaModal.js
import React, {useState, useEffect} from 'react';
import {Modal, Button, Table} from 'react-bootstrap';
import axios from 'axios';
//JSX responsável pelo cauculo, utilizando um algoritimo brevemente inspirado no problema do caixeiro viajante.
const RotaMapa = ({mostrar, fecharModal}) => {
    const [clientesOrdenados, setClientesOrdenados] = useState([]);

    useEffect(() => {
        if (mostrar) {
            axios
                .get('http://localhost:5000/clientes')
                .then(response => {
                    const listaDeClientes = response.data;

                    // Calcula a distância para cada cliente e ordena conforme distancia do ponto 0,0
                    const clientesOrdenados = listaDeClientes.sort((a, b) => {
                        const distanciaA = Math.sqrt(
                            Math.pow(a.coordenada_x, 2) + Math.pow(a.coordenada_y, 2)
                        );
                        const distanciaB = Math.sqrt(
                            Math.pow(b.coordenada_x, 2) + Math.pow(b.coordenada_y, 2)
                        );
                        return distanciaA - distanciaB;
                    });

                    setClientesOrdenados(clientesOrdenados);
                })
                .catch(error => {
                    console.error('Erro ao calcular a rota:', error);
                });
        }
    }, [mostrar]);
    //Modal contendo tabela com os clientes dispostos em ordem crescent conforme distância.
    return (
        <div className='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
            <Modal show={mostrar} onHide={fecharModal}>
                <Modal.Header closeButton="closeButton">
                    <Modal.Title>Ordem de Visita dos Clientes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped="striped" bordered="bordered" hover="hover">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Coordenada X</th>
                                <th>Coordenada Y</th>
                                <th>Distância do ponto de referência (0,0)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clientesOrdenados.map(cliente => (
                                    <tr key={cliente.id}>
                                        <td>{cliente.nome}</td>
                                        <td>{
                                                cliente
                                                    .coordenada_x
                                                    .toFixed(2)
                                            }</td>
                                        <td>{
                                                cliente
                                                    .coordenada_y
                                                    .toFixed(2)
                                            }</td>
                                        <td>{
                                                Math
                                                    .sqrt(
                                                        Math.pow(cliente.coordenada_x, 2) + Math.pow(cliente.coordenada_y, 2)
                                                    )
                                                    .toFixed(2)
                                            }</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={fecharModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RotaMapa;
