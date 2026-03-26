import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';

export default function FavoriteRoutes({ favorites = [], onSelectRoute }) {
  const navigate = useNavigate();

  return (
    <div className="mb-4">
      <h4 className="mb-3 fw-bold">Your Favorites</h4>
      <Row className="g-3">
        {favorites.map((fav, idx) => (
          <Col md={4} key={idx}>
            <Card className="h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <div className="fw-bold">{fav.from.name}</div>
                    <div className="text-muted">→</div>
                    <div className="fw-bold">{fav.to.name}</div>
                  </div>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => onSelectRoute(fav)}
                    className="p-0"
                  >
                    🔄
                  </Button>
                </div>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="w-100"
                  onClick={() => navigate('/plan', {
                    state: { from: fav.from, to: fav.to }
                  })}
                >
                  View Connections
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}