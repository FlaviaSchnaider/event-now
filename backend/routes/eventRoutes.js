const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventController');

router.post('/events', controller.createEvent);
router.get('/events/:id', controller.getEvent);
router.post('/events/:id/votes', controller.submitVote);
router.get('/events/:id/results', controller.getResults);
router.post('/events/:id/vote', controller.voteEvent);
router.get('/:id/results', controller.getResults); 


module.exports = router;