import { useState } from 'react';
import { Card, Button, Row, Col, Form, ListGroup, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLocations } from '../hooks/useLocation';
import '../css/QuickSearch.css';

export default function QuickSearch() {
  const navigate = useNavigate();

  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery]     = useState('');
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo]     = useState(null);
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo]     = useState(false);

  const { data: fromResults, isLoading: fromLoading } = useLocations(fromQuery);
  const { data: toResults,   isLoading: toLoading }   = useLocations(toQuery);

  const handleSwap = () => {
    setSelectedFrom(selectedTo);
    setSelectedTo(selectedFrom);
    setFromQuery(toQuery);
    setToQuery(fromQuery);
  };

  const handleSearch = () => {
    if (!selectedFrom || !selectedTo) return;
    navigate(
      `/plan?from=${selectedFrom.id}&to=${selectedTo.id}` +
      `&fromName=${encodeURIComponent(selectedFrom.name)}` +
      `&toName=${encodeURIComponent(selectedTo.name)}`
    );
  };

  return (
    <Card className="quick-search-card">
      <Card.Header>
        <h5 className="fw-bold text-white m-0">Quick Search</h5>
      </Card.Header>
      <Card.Body className="p-3">
        <Row className="g-3">

          <Col xs={12} md={5}>
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
          </Col>

          <Col xs={12} md={2} className="d-flex align-items-end justify-content-center">
            <Button variant="outline-primary" className="swap-btn" onClick={handleSwap}>⇄</Button>
          </Col>

          <Col xs={12} md={5}>
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
          </Col>

          <Col xs={12}>
            <Button variant="primary" className="btn-lg" onClick={handleSearch}>
              Search Connections
            </Button>
          </Col>

        </Row>
      </Card.Body>
    </Card>
  );
}