import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../utils/api';
import './ResultsPage.css';

export default function ResultsPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      const res = await api.get(`/events/${id}/results`);
      setData(res.data);
    };
    fetchResults();
  }, [id]);

  if (!data) return <p>Carregando resultados...</p>;

  return (
    <div className="results-page">
      <h1>{data.title}</h1>

      {Object.values(data.results).map((result, i) => (
        <div key={i} className="result-card">
          <h3>{result.question}</h3>
          <ul>
            {result.options.map(opt => (
              <li key={opt.id}>
                {opt.text} — <strong>{opt.votes} votos</strong>
                {opt.id === result.winner && <span> 🏆</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}