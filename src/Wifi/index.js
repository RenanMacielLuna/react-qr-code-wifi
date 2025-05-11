import { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

function Wifi({ setQrText }) {
  const [fieldDisablePassword, setFieldDisablePassword] = useState(true);
  const [showPassowrd, setShowPassowrd] = useState(false);
  const [isError, setIsError] = useState(false);
  const [authentication, setAuthentication] = useState('nopass');
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [hidden, setHidden] = useState(false);
  const [buttonContent, setButtonContent] = useState('Show Password');
  const { register, handleSubmit } = useForm();
  const authentications = [
    {
      value: 'nopass',
      name: 'No Password',
    },
    { value: 'WEP', name: 'WEP' },
    { value: 'WPA', name: 'WPA' },
  ];

  const onSubmit = (data) => {
    if (data.ssid.trim() === '') {
      setIsError(true);
    } else {
      setIsError(false);
      setQrText(
        `WIFI:T:${data.authentication};S:${data.ssid};${
          data.authentication !== 'nopass' ? `P:${data.password};` : ''
        }H:${data.hidden};`
      );
    }
  };

  const desabilitarHabilitarCampoPassword = (authentication) => {
    setPassword('');
    setSsid('');
    setHidden(false);
    setIsError(false);
    if (authentication === 'nopass') {
      setFieldDisablePassword(true);
    } else {
      setFieldDisablePassword(false);
    }
  };

  const showHidePassword = () => {
    setShowPassowrd(!showPassowrd);
    if (!showPassowrd) {
      setButtonContent('Hide Password');
    } else {
      setButtonContent('Show Password');
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Select
          {...register('authentication')}
          value={authentication}
          aria-label="Autenticação"
          onChange={(e) => {
            setAuthentication(e.target.value);
            desabilitarHabilitarCampoPassword(e.target.value);
          }}
        >
          {authentications.map((authentication, index) => {
            return (
              <option key={index} value={authentication.value}>
                {authentication.name}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Wi-fi Network Name (SSID)</Form.Label>
        <Form.Control
          {...register('ssid')}
          type="text"
          value={ssid}
          onChange={(e) => setSsid(e.target.value)}
        ></Form.Control>
        {isError ? (
          <Alert variant="danger">Please, type the Wi-Fi SSID</Alert>
        ) : (
          false
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Network's Password (Optional)</Form.Label>
        <Form.Control
          disabled={fieldDisablePassword}
          {...register('password')}
          type={showPassowrd ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
        {authentication !== 'nopass' ? (
          <Button variant="primary" onClick={showHidePassword}>
            {buttonContent}
          </Button>
        ) : (
          false
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Hidden Network?</Form.Label>
        <Form.Check
          {...register('hidden')}
          type={'checkbox'}
          checked={hidden}
          onChange={(e) => setHidden(e.target.checked)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Generate QR Code
      </Button>
    </Form>
  );
}

export default Wifi;
