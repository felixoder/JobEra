import React, { useState, useEffect } from "react";
import questions, { Question } from "./questions";

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);

  // Fetch 5 random questions when the component mounts
  useEffect(() => {
    const randomQuestions = getRandomQuestions(5);
    setQuizQuestions(randomQuestions);
  }, []);

  const handleAnswerOptionClick = (option: string) => {
    if (option === quizQuestions[currentQuestion]?.answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);

    const randomQuestions = getRandomQuestions(5);
    setQuizQuestions(randomQuestions);
  };

  const getRandomQuestions = (count: number): Question[] => {
    const shuffled = questions.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const handleStartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);

    const randomQuestions = getRandomQuestions(5);
    setQuizQuestions(randomQuestions);
  };

  if (showScore) {
    if (score >= 3) {
      // Show congratulations message with fireworks
      return (
        <div className="score-section text-center">
          <h2 className="text-green-600 font-bold text-5xl mt-5">Congratulations!</h2>
          <p>You scored {score} out of {quizQuestions.length}</p>
          {/* Add fireworks animation or celebration here */}
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={handleStartQuiz}>
            Retry
          </button>
        </div>
      );
    } else {
      // Show normal score if less than 3
      return (
        <div className=" text-center">
          <h2 className="text-green-600 font-bold text-5xl mt-5">You scored {score} out of {quizQuestions.length}</h2>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={handleResetQuiz}>
            Retry
          </button>
        </div>
      );
    }
  }

  return (
    <>
    <h1 className="text-center font-bold text-2xl underline">Practise Quiz</h1>
    <div className="quiz max-w-md mx-auto mt-8 p-4 border rounded shadow-lg">
      
      <div className="question-section mb-4">
        
        <div className="question-count text-lg font-bold">
          <span>Question {currentQuestion + 1}</span>/{quizQuestions.length}
        </div>
        <div className="question-text text-xl mt-2">
          {quizQuestions[currentQuestion]?.question}
        </div>
      </div>
      <div className="answer-section">
        {quizQuestions[currentQuestion]?.options.map((option, index) => (
          <button
            key={index}
            className="block w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={() => handleAnswerOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
    </>
  );
};

export default Quiz;
