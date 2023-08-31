import React, { useState } from 'react';
import quizData from '../data/quizData';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className={`score-section ${score >= 7 ? 'confetti' : ''}`}>
          <h2>Quiz Result</h2>
          {score >= 7 ? (
            <p>Congratulations! You passed the quiz with a score of {score} out of {quizData.length}.</p>
          ) : (
            <p>Your score is {score} out of {quizData.length}. You failed this quiz. Please restart to pass.</p>
          )}
          <button onClick={handleRestart}>Restart Quiz</button>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              Question {currentQuestion + 1}/{quizData.length}
            </div>
            <div className="question-text">{quizData[currentQuestion].question}</div>
          </div>
          <div className="answer-section">
            {quizData[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerClick(option)}>
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
