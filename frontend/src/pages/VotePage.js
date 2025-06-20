import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import './VotePage.css';

export default function VotePage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/events/${id}`);
      setEvent(res.data);
    };
    fetchData();
  }, [id]);

  const handleChange = (qid, value) => {
    setAnswers(prev => ({ ...prev, [qid]: value }));
  };

  const handleMultiChange = (qid, value) => {
    const prevValues = answers[qid] || [];
    const exists = prevValues.includes(value);
    const updated = exists
      ? prevValues.filter(v => v !== value)
      : [...prevValues, value];
    setAnswers(prev => ({ ...prev, [qid]: updated }));
  };

  const submit = async () => {
    const unanswered = event.questions.some(q => {
      const answer = answers[q.id];
      return q.multi ? !answer || answer.length === 0 : !answer;
    });

    if (unanswered) {
      alert("Por favor, responda todas as perguntas antes de enviar.");
      return;
    }

    try {
      await api.post(`/events/${id}/vote`, { answers });
      alert("Voto enviado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar voto. Tente novamente.");
    }
  };


  if (!event) return <p>Carregando...</p>;

  return (
    <div className="vote-page">
      <h1>{event.title}</h1>
      <p className="vote-description">{event.description}</p>

      {event.questions.map(q => (
        <div key={q.id} className="vote-card">
          <p className="vote-question">{q.text}</p>
          <div className="vote-options">
            {q.options.map(opt => (
              <label key={opt._id} className="vote-option">
                <input
                  type={q.multi ? "checkbox" : "radio"}
                  name={q.id}
                  value={opt._id}
                  checked={
                    q.multi
                      ? (answers[q.id] || []).includes(opt._id)
                      : answers[q.id] === opt._id
                  }
                  onChange={() => {
                    q.multi
                      ? handleMultiChange(q.id, opt._id)
                      : handleChange(q.id, opt._id);
                  }}
                />
                <span>{opt.text}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="vote-buttons">
        <button className="vote-submit" onClick={submit}>Enviar Votos</button>
        <button className="vote-secondary" onClick={() => navigate(`/event/${id}/results`)}>
          Ver Resultados
        </button>
      </div>
    </div>
  );
}