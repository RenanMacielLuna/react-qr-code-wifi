import { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

function Wifi({ setQrText }) {
  const [campoSenhaDesabilitada, setCampoSenhaDesabilitada] = useState(true);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [isError, setIsError] = useState(false);
  const [autenticacao, setAutenticacao] = useState('nopass');
  const [ssid, setSsid] = useState('');
  const [senha, setSenha] = useState('');
  const [oculta, setOculta] = useState(false);
  const [conteudoBotao, setConteudoBotao] = useState('Mostrar Senha');
  const { register, handleSubmit } = useForm();
  const autenticacoes = [
    {
      valor: 'nopass',
      nome: 'Sem Senha',
    },
    { valor: 'WEP', nome: 'WEP' },
    { valor: 'WPA', nome: 'WPA' },
  ];

  const onSubmit = (data) => {
    if (data.ssid.trim() === '') {
      setIsError(true);
    } else {
      setIsError(false);
      setQrText(
        `WIFI:T:${data.autenticacao};S:${data.ssid};${
          data.autenticacao !== 'nopass' ? `P:${data.senha};` : ''
        }H:${data.oculta};`,
      );
    }
  };

  const desabilitarHabilitarCampoSenha = (autenticacao) => {
    setSenha('');
    setSsid('');
    setOculta(false);
    setIsError(false);
    if (autenticacao === 'nopass') {
      setCampoSenhaDesabilitada(true);
    } else {
      setCampoSenhaDesabilitada(false);
    }
  };

  const mostrarEsconderSenha = () => {
    setMostrarSenha(!mostrarSenha);
    if (!mostrarSenha) {
      setConteudoBotao('Esconder Senha');
    } else {
      setConteudoBotao('Mostrar Senha');
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className='mb-3'>
        <Form.Select
          {...register('autenticacao')}
          value={autenticacao}
          aria-label='Autenticação'
          onChange={(e) => {
            setAutenticacao(e.target.value);
            desabilitarHabilitarCampoSenha(e.target.value);
          }}
        >
          {autenticacoes.map((autenticacao, index) => {
            return (
              <option key={index} value={autenticacao.valor}>
                {autenticacao.nome}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Nome da Rede (SSID)</Form.Label>
        <Form.Control
          {...register('ssid')}
          type='text'
          value={ssid}
          onChange={(e) => setSsid(e.target.value)}
        ></Form.Control>
        {isError ? (
          <Alert variant='danger'>Por favor, digite o nome da rede Wi-Fi</Alert>
        ) : (
          false
        )}
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Senha da Rede (Opcional)</Form.Label>
        <Form.Control
          disabled={campoSenhaDesabilitada}
          {...register('senha')}
          type={mostrarSenha ? 'text' : 'password'}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        ></Form.Control>
        {autenticacao !== 'nopass' ? (
          <Button variant='primary' onClick={mostrarEsconderSenha}>
            {conteudoBotao}
          </Button>
        ) : (
          false
        )}
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Rede Oculta?</Form.Label>
        <Form.Check
          {...register('oculta')}
          type={'checkbox'}
          checked={oculta}
          onChange={(e) => setOculta(e.target.checked)}
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Gerar QR Code
      </Button>
    </Form>
  );
}

export default Wifi;
