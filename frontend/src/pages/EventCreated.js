import { useParams, Link } from 'react-router-dom';
import './EventCreated.css';

export default function EventCreated() {
  const { id } = useParams();
  const link = `${window.location.origin}/event/${id}`;

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(link);
      alert('Link copiado!');
    } catch {
      alert('Erro ao copiar o link');
    }
  };

  return (
    <div className="created-container">
      <div className="created-card">
        <h1>✅ Evento criado com sucesso!</h1>
        <p>Compartilhe este link com seus amigos:</p>
        <div className="link-box">
          <input
            readOnly
            value={link}
            onClick={(e) => e.target.select()}
          />
          <button onClick={copiar}>Copiar</button>
        </div>

        <Link to={`/event/${id}`}>
          <button className="vote-link">Ir para votação</button>
        </Link>
      </div>
    </div>
  );
}