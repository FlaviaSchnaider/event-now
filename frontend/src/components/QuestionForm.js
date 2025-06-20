import { useState, useEffect } from 'react';

export default function QuestionForm({ question, index, onChange }) {
  const [localQuestion, setLocalQuestion] = useState(question);

  useEffect(() => {
    onChange(index, localQuestion);
  }, [localQuestion]);

  const handleChange = (field, value) => {
    setLocalQuestion({ ...localQuestion, [field]: value });
  };

  const handleOptionChange = (i, value) => {
    const newOptions = [...localQuestion.options];
    newOptions[i] = value;
    handleChange('options', newOptions);
  };

  const addOption = () => {
    handleChange('options', [...localQuestion.options, '']);
  };

  const removeOption = () => {
    const updated = [...localQuestion.options];
    updated.pop();
    handleChange('options', updated);
  };

  return (
  <div className="question-box">
    <div className="question-label">
      <span className="question-number">{index + 1}</span>
      <span className="question-text">Pergunta:</span>
    </div>

    <input
      className="title-description"
      type="text"
      placeholder="Faça sua pergunta"
      value={localQuestion.text}
      onChange={(e) => handleChange('text', e.target.value)}
    />

    <label className="checkbox-label">
      <input
        type="checkbox"
        checked={localQuestion.multi}
        onChange={(e) => handleChange('multi', e.target.checked)}
      />
      Permitir múltiplas respostas
    </label>

    {localQuestion.options.map((opt, i) => (
      <input
        key={i}
        className="title-description"
        type="text"
        placeholder={`Opção ${i + 1}`}
        value={opt}
        onChange={(e) => handleOptionChange(i, e.target.value)}
      />
    ))}

    <div className="option-buttons">
      <button
        type="button"
        className="btn-secondary"
        onClick={addOption}
      >
        Adicionar Opção
      </button>

      {localQuestion.options.length > 1 && (
        <button
          type="button"
          className="btn-secondary btn-remove"
          onClick={removeOption}
        >
          Remover Opção
        </button>
      )}
    </div>
  </div>
);

}
