import { useState, useEffect } from 'react';

function useFetch(fetcher, ...args) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const argsKey = JSON.stringify(args);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetcher(...args)
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [argsKey]);

  return { data, loading, error };
}

export default useFetch;
