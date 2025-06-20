const Event = require('../models/Event');
const Vote = require('../models/Vote');

exports.createEvent = async (req, res) => {
  const event = await Event.create(req.body);
  res.json({ eventId: event._id });
};

exports.getEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.json(event);
};

exports.submitVote = async (req, res) => {
  await Vote.create({ eventId: req.params.id, answers: req.body.answers });
  res.json({ success: true });
};

exports.getResults = async (req, res) => {
  const event = await Event.findById(req.params.id).lean();
  const votes = await Vote.find({ eventId: req.params.id }).lean();

  const results = event.questions.map(q => {
    const counts = {};
    q.options.forEach(o => counts[o.text] = 0);
    votes.forEach(v => {
      const answer = v.answers.find(a => a.questionId === q.id);
      answer?.selectedIds.forEach(id => {
        const opt = q.options.find(o => o._id === id);
        if (opt) counts[opt.text]++;
      });
    });
    const max = Math.max(...Object.values(counts));
    const winners = Object.entries(counts)
      .filter(([, count]) => count === max)
      .map(([text, count]) => ({ text, count }));
    return { questionId: q.id, text: q.text, winners };
  });

  res.json({ title: event.title, results });
};

exports.voteEvent = async (req, res) => {
  const { id } = req.params;
  const { answers } = req.body;

  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ error: 'Evento não encontrado' });

    await Vote.create({
      eventId: id,
      answers
    });

    return res.status(200).json({ message: 'Voto registrado com sucesso' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao registrar voto' });
  }
};

exports.getResults = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ error: 'Evento não encontrado' });

    const votes = await Vote.find({ eventId: id });

    const resultMap = {};

    event.questions.forEach(q => {
      const counts = {};

      q.options.forEach(opt => {
        counts[opt._id] = 0;
      });

      votes.forEach(vote => {
        const selected = vote.answers.get(q.id);
        if (Array.isArray(selected)) {
          selected.forEach(optId => {
            if (counts[optId] !== undefined) counts[optId]++;
          });
        } else if (counts[selected] !== undefined) {
          counts[selected]++;
        }
      });

      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

      resultMap[q.id] = {
        question: q.text,
        options: q.options.map(opt => ({
          id: opt._id,
          text: opt.text,
          votes: counts[opt._id]
        })),
        winner: sorted[0] ? sorted[0][0] : null
      };
    });

    res.json({ eventId: id, title: event.title, results: resultMap });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar resultados' });
  }
};