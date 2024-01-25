import React, {useState} from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import {Modal} from 'react-bootstrap';
import ClientList from './Components/ListarClientes';
import AddClientForm from './Components/AdicionarCliente';
import Header from './Components/Header';
import RotaMapa from './Components/RotaMapa';

//Implantei duas formas de modal 

const App = () => {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mostrarRotaMapa, setMostrarRotaModal] = useState(false);

    const abrirModal = () => {
        setMostrarFormulario(true);
    };

    const fecharModal = () => {
        setMostrarFormulario(false);
    };
    const abrirRotaModal = () => {
        setMostrarRotaModal(true);
    };

    const fecharRotaModal = () => {
        setMostrarRotaModal(false);
    }
    return (
        <div className='d-flex flex-column'>
            <Header/>
            <div>
                <div className='shadow rounded-4 p-3 w-50 m-auto'>
                    <ClientList/>
                </div>
                <div className='text-center h-50'>
                    <button onClick={abrirModal} className='btn btn-primary button-cad m-3 shadow'>
                        Cadastrar Cliente
                    </button>
                    <button onClick={abrirRotaModal} className='btn btn-success button-calc-rota m-3 shadow'>
                        Calcular Rota
                    </button>
                </div>
                <Modal show={mostrarFormulario} onHide={fecharModal} centered="centered">
                    <Modal.Header closeButton="closeButton">
                        <Modal.Title>Cadastrar Cliente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddClientForm/>
                    </Modal.Body>
                </Modal>

            </div>
            <RotaMapa mostrar={mostrarRotaMapa} fecharModal={fecharRotaModal}/>
        </div>
    );
};

export default App;