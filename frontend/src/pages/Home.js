import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <div className="home-container">
        <h1> Chega de conversas infinitas. </h1>
        <h1><span className="highlight">Decidam juntos!</span></h1>

        <p className="home-description">
          O Event Now centraliza as preferências do grupo através de votações inteligentes.
          Criem o evento perfeito para todos em um minuto.
        </p>

        <button className="home-button" onClick={() => navigate("/create")}>
          Criar Evento
        </button>

        <h2>Como o Event Now resolve seus problemas</h2>

        <div className="card-grid">
          <div className="card">
            <h3>Votação estruturada</h3>
            <p>Sistema de perguntas inteligentes que guia o grupo através de escolhas organizadas: casa ou fora, tipo de evento, preferências específicas.</p>
          </div>
          <div className="card">
            <h3>Decisão Democrática</h3>
            <p>Todos participam igualmente. O sistema analisa as respostas e sugere a melhor opção para o grupo, ou usa uma roleta quando há empate.</p>
          </div>
          <div className="card">
            <h3>Link Compartilhável</h3>
            <p>Crie um evento e compartilhe o link privado. Cada pessoa vota no seu tempo, e você acompanha o progresso em tempo real.</p>
          </div>
        </div>
      </div>

      <footer>
        Event Now — Transformando indecisões em momentos incríveis
      </footer>
    </div>
  );
}