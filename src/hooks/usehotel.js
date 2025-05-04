import { useEffect, useState } from 'react';
import { obtenerHoteles } from '../api/hoteles';

export default function useHoteles() {
  const [hoteles, setHoteles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerHoteles()
      .then(setHoteles)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { hoteles, loading, error };
}
