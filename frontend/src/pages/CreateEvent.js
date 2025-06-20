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
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: uuidv4(), text: '', multi: false, options: [''] }
    ]);
  };

  const removeQuestion = () => {
    if (questions.length > 0) {
      const newQuestions = [...questions];
      newQuestions.pop();
      setQuestions(newQuestions);
    }
  };

  const handleQuestionChange = (index, updated) => {
    const newQuestions = [...questions];
    newQuestions[index] = updated;
    setQuestions(newQuestions);
  };

  const createEvent = async () => {
    try {
      const formattedQuestions = questions.map(q => ({
        id: q.id,
        text: q.text,
        multi: q.multi,
        options: q.options.map((opt, i) => ({
          _id: String(i),
          text: opt
        }))
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
    }
  };


  return (
    <div className="create-event">
      <h1>Criar Evento</h1>

      <input className='title-description'
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea className='title-description'
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {questions.map((q, i) => (
        <QuestionForm key={q.id} question={q} index={i} onChange={handleQuestionChange} />
      ))}

      <div className="form-buttons">
        <button onClick={addQuestion}>+ Pergunta</button>
        <button onClick={removeQuestion}>Refazer pergunta</button>
        <button onClick={createEvent}>Criar Evento</button>
      </div>

    </div>
  );
}