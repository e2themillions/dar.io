var mongoose = require("mongoose");


/************************************** DAR **************************************/
var DarSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  closed: Boolean,
  assesment_parameters: [String],
  solution_contenders: [String],
  responses: [AnswerSchema]
  //responses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}]
});

/************************************** ANSWER **********************************/
var AnswerSchema = new mongoose.Schema({
  respondent_email: String,    
  param_weights: [Number],
  scores: [ScoreSchema]
});

/************************************** SCORE **********************************/
var ScoreSchema = new mongoose.Schema({
  score:[Number]
})




var Dar = mongoose.model('Dar', DarSchema);
var Answer = mongoose.model('Answer', AnswerSchema);
var Score = mongoose.model('Score', ScoreSchema);

module.exports = {
  Dar: Dar,
  Answer: Answer,
  Score: Score
}