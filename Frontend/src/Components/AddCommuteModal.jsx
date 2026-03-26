import { useState } from 'react';
import { Modal, Button, Form, ListGroup, Spinner } from 'react-bootstrap';
import { useLocations } from '../hooks/useLocation';

export default function AddCommuteModal({ show, onHide, onSave }) {
  const [name, setName] = useState('');
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery,   setToQuery]   = useState('');
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo,   setSelectedTo]   = useState(null);
  const [showFrom, setShowFrom] = useState(false);
  const [showTo,   setShowTo]   = useState(false);

  const { data: fromResults, isLoading: fromLoading } = useLocations(fromQuery);
  const { data: toResults,   isLoading: toLoading }   = useLocations(toQuery);

  const handleSave = () => {
    if (!name || !selectedFrom || !selectedTo) return;
    onSave({ name, from: selectedFrom, to: selectedTo });
    setName(''); setFromQuery(''); setToQuery('');
    setSelectedFrom(null); setSelectedTo(null);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className='text-white'>Add Commute</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Commute Name</Form.Label>
          <Form.Control
            placeholder="Home → Work"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>From</Form.Label>
          <div className="input-wrapper">
            <Form.Control
              placeholder="Origin station"
              value={fromQuery}
              onChange={(e) => { setFromQuery(e.target.value); setShowFrom(true); setSelectedFrom(null); }}
              autoComplete="off"
            />
            {fromLoading && <Spinner size="sm" className="mt-1" />}
            {showFrom && fromResults?.length > 0 && (
              <ListGroup className="suggestions-list">
                {fromResults.map((loc) => (
                  <ListGroup.Item key={loc.id} action
                    onClick={() => { setSelectedFrom(loc); setFromQuery(loc.name); setShowFrom(false); }}
                  >
                    {loc.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Label>To</Form.Label>
          <div className="input-wrapper">
            <Form.Control
              placeholder="Destination station"
              value={toQuery}
              onChange={(e) => { setToQuery(e.target.value); setShowTo(true); setSelectedTo(null); }}
              autoComplete="off"
            />
            {toLoading && <Spinner size="sm" className="mt-1" />}
            {showTo && toResults?.length > 0 && (
              <ListGroup className="suggestions-list">
                {toResults.map((loc) => (
                  <ListGroup.Item key={loc.id} action
                    onClick={() => { setSelectedTo(loc); setToQuery(loc.name); setShowTo(false); }}
                  >
                    {loc.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save Commute</Button>
      </Modal.Footer>
    </Modal>
  );
}