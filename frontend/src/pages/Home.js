import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [particles, setParticles] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Criar partículas animadas
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 4
    }));
    setParticles(newParticles);

    // Animação de entrada
    setTimeout(() => setIsVisible(true), 100);

    // Adicionar efeito de scroll suave para os cards
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    button.style.setProperty('--mouse-x', `${x}px`);
    button.style.setProperty('--mouse-y', `${y}px`);
  };
  
  return (
    <div className="page-wrapper">
      {/* Partículas de fundo */}
      <div className="background-particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>

      {/* Elementos decorativos */}
      <div className="decorative-blob blob-1"></div>
      <div className="decorative-blob blob-2"></div>
      <div className="decorative-blob blob-3"></div>

      <div className={`home-container ${isVisible ? 'fade-in' : ''}`}>
        <div className="hero-section">
          <h1 className="main-title">
            Chega de conversas infinitas.
          </h1>
          <h1 className="main-title">
            <span className="highlight">Decidam juntos!</span>
          </h1>

          <p className="home-description">
            O Event Now centraliza as preferências do grupo através de votações inteligentes.
            Criem o evento perfeito para todos em um minuto.
          </p>

          <button
            className="home-button"
            onClick={() => navigate("/create")}
            onMouseMove={handleMouseMove}
          >
            <span className="button-text">Criar Evento</span>
            <div className="button-shine"></div>
          </button>
        </div>

        <div className="benefits-section">
          <h2 className="section-title">Como o Event Now resolve seus problemas</h2>

          <div className="card-grid">
            <div className="card">
              <h3>Votação estruturada</h3>
              <p>Sistema de perguntas inteligentes que guia o grupo através de escolhas organizadas: casa ou fora, tipo de evento, preferências específicas.</p>
              <div className="card-glow"></div>
            </div>

            <div className="card">
              <h3>Decisão Democrática</h3>
              <p>Todos participam igualmente. O sistema analisa as respostas e sugere a melhor opção para o grupo, ou usa uma roleta quando há empate.</p>
              <div className="card-glow"></div>
            </div>

            <div className="card">
              <h3>Link Compartilhável</h3>
              <p>Crie um evento e compartilhe o link privado. Cada pessoa vota no seu tempo, e você acompanha o progresso em tempo real.</p>
              <div className="card-glow"></div>
            </div>
          </div>
        </div>
      </div>

      <footer class="footer fade-in">
        <div class="footer-content">
          <span className="footer-text">Event Now</span>
          <span className="footer-separator">—</span>
          <span className="footer-tagline">Transformando indecisões em momentos incríveis</span>
        </div>
      </footer>
    </div>
  );
}