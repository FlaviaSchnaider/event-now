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
      <p className='question'>Pergunta:</p>
      <input
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
          type="text"
          placeholder={`Opção ${i + 1}`}
          value={opt}
          onChange={(e) => handleOptionChange(i, e.target.value)}
        />
      ))}
      <div className="form-buttons">
        <button onClick={addOption}>+ Opção</button>
        <button onClick={removeOption}>Refazer Opção</button>
      </div>
    </div>
  );
}