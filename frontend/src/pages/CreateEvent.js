import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import QuestionForm from '../components/QuestionForm';
import { v4 as uuidv4 } from 'uuid';
import './CreateEvent.css';

export default function CreateEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([...questions, { id: uuidv4(), text: '', multi: false, options: [''] }]);
  };

  const removeQuestion = () => {
    if (questions.length > 0) {
      setQuestions(prev => prev.slice(0, -1));
    }
  };

  const handleQuestionChange = (index, updated) => {
    const newQuestions = [...questions];
    newQuestions[index] = updated;
    setQuestions(newQuestions);
  };

  const createEvent = async () => {
    if (!title.trim()) {
      alert("Por favor, adicione um título para o evento.");
      return;
    }
    if (questions.length === 0) {
      alert("Adicione pelo menos uma pergunta ao evento.");
      return;
    }
    setIsLoading(true);
    try {
      const formattedQuestions = questions.map(q => ({
        id: q.id,
        text: q.text,
        multi: q.multi,
        options: q.options.map((opt, i) => ({ _id: String(i), text: opt }))
      }));
      const res = await api.post('/events', {
        title,
        description,
        questions: formattedQuestions
      });
      navigate(`/evento-criado/${res.data.eventId}`);
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      alert("Ocorreu um erro ao criar o evento. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const canCreateEvent = title.trim() && questions.length > 0;

  return (
    <div className="page-container">
      <div className="create-event fade-in">
        <div className="header-section">
          <h1>Criar Evento</h1>
          <p className="subtitle">Configure as perguntas que ajudarão seu grupo a decidir</p>
        </div>

        <div className="form-section">
          <div className="input-group">
            <label htmlFor="title">Título do Evento</label>
            <input
              id="title"
              className="title-description"
              placeholder="Ex: Encontro do fim de semana"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
            />
          </div>

          <div className="input-group">
            <label htmlFor="description">Descrição (opcional)</label>
            <textarea
              id="description"
              className="title-description textarea"
              placeholder="Adicione mais detalhes sobre o evento..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={300}
              rows={3}
            />
          </div>
        </div>

        <div className="questions-section">
          <div className="questions-header">
            <h2>Perguntas</h2>
            <hr className="question-divider" />
          </div>

          <div className="questions-list">
            {questions.map((q, i) => (
              <div key={q.id} className="question-wrapper">
                <QuestionForm
                  question={q}
                  index={i}
                  onChange={handleQuestionChange}
                />
                <hr className="question-divider" />
              </div>
            ))}

            {questions.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <p>Nenhuma pergunta adicionada ainda</p>
                <p className="empty-subtitle">Clique em "Adicionar Pergunta" para começar</p>
              </div>
            )}
          </div>
        </div>

        <div className="form-buttons">
          <div className="question-buttons">
            <button
              type="button"
              className="btn-secondary"
              onClick={addQuestion}
            >
              ➕ Adicionar Pergunta
            </button>
            {questions.length > 0 && (
              <button
                type="button"
                className="btn-secondary btn-remove"
                onClick={removeQuestion}
              >
                🗑️ Remover Última
              </button>
            )}
          </div>

          <button
            type="button"
            className={`btn-primary ${!canCreateEvent ? 'btn-disabled' : ''}`}
            onClick={createEvent}
            disabled={!canCreateEvent || isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Criando...
              </>
            ) : (
              <> Criar Evento</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}