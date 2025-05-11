import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import QRCode from 'react-qr-code';
import Wifi from './Wifi';

function App() {
  const [qrText, setQrText] = useState('');
  return (
    <Container className="mx-auto">
      <h1 className="my-4">QR Code Generator</h1>
      {qrText.length > 0 && <QRCode value={qrText} />}
      <h4 className="my-3">Choose QR-Code type</h4>
      <Tab.Container defaultActiveKey="text">
        <Row sm={3}>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="wifi">Wifi</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="wifi">
                <Wifi setQrText={setQrText} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default App;
