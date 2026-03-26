import { useState, useEffect } from 'react';
import { Card, Badge, Spinner } from 'react-bootstrap';
import { useDepartures } from '../hooks/useDepartures';
import { useNearbyStops } from '../hooks/useNearbyStops';
import { getUserLocation, formatTime, getDelayMinutes, formatDelay, getProductIcon, getDelayBadgeVariant } from '../utils/transportUtils';
import '../css/LiveDeparturesPreview.css';

export default function LiveDeparturesPreview() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getUserLocation()
      .then(({ lat, lon }) => setLocation({ lat, lon }))
      .catch(() => {});
  }, []);

  const { data: nearbyData } = useNearbyStops(location?.lat, location?.lon, 1000, !!location);

  const nearbyStop = nearbyData?.[0];
  const stopId   = nearbyStop?.id   || '900003200';
  const stopName = nearbyStop?.name || 'Berlin Hbf';

  const { data, isLoading, error } = useDepartures(stopId, { duration: 60 });

  if (isLoading) return <Spinner animation="border" />;
  if (error)     return <p className="text-muted">Could not load departures.</p>;

  const departures = data?.departures || [];

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center text-white">
        <h5 className="fw-bold mb-0">Live Departures — {stopName}</h5>
        <Badge bg="success">● Live</Badge>
      </Card.Header>

      {departures.length === 0 ? (
        <Card.Body>
          <p className="text-white-50 mb-0">No departures found.</p>
        </Card.Body>
      ) : (
        departures.map((dep) => {
          const delay       = getDelayMinutes(dep.plannedWhen, dep.when);
          const plannedTime = formatTime(dep.plannedWhen);
          const actualTime  = formatTime(dep.when);

          return (
            <div className="departure-row" key={dep.tripId || dep.when}>
              <div className="departure-icon">{getProductIcon(dep.line?.product)}</div>

              <div className="flex-grow-1">
                <div className="departure-name">{dep.line?.name || dep.tripId}</div>
                <div className="departure-direction">{dep.direction}</div>
              </div>

              <div className="text-end">
                <div className={`departure-time ${delay > 0 ? 'delayed' : ''}`}>{plannedTime}</div>
                {delay > 0 && <div className="departure-time-actual">{actualTime}</div>}
                <Badge bg={getDelayBadgeVariant(delay)}>{formatDelay(delay)}</Badge>
                {dep.platform && <Badge bg="secondary" className="ms-1">Pl. {dep.platform}</Badge>}
              </div>
            </div>
          );
        })
      )}
    </Card>
  );
}