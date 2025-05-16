import React, { useState } from "react";
import WeeklyCalendar, { calendarEvents } from "../components/WeeklyCalendar";
import { useTaskAnalytics } from "../utils/useTaskAnalytics";

export const PASSWORD_CalendarComprehension = "CALENDAR_MASTER_2024";
export const TASK_ID_CalendarComprehension = "calendar-comprehension";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const questions = [
  {
    id: 1,
    question: "How many total events are scheduled for Monday?",
    answer: "4",
  },
  {
    id: 2,
    question: "Which day has the longest single event (in hours)?",
    answer: "Tuesday",
  },
  {
    id: 3,
    question: "How many events start at 9:00 AM across all days?",
    answer: "3",
  },
  {
    id: 4,
    question: "What is the duration of the Team Building event (in hours)?",
    answer: "3",
  },
  {
    id: 5,
    question: "How many 30-minute events are there in total?",
    answer: "2",
  },
];

const CalendarComprehension: React.FC = () => {
  const { recordSuccess } = useTaskAnalytics(TASK_ID_CalendarComprehension);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [message, setMessage] = useState("");

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const checkAnswers = () => {
    const allCorrect = questions.every(
      (q) => answers[q.id]?.trim().toLowerCase() === q.answer.toLowerCase()
    );
    if (allCorrect) {
      setMessage(
        `Congratulations! All answers are correct! The password is: ${PASSWORD_CalendarComprehension}`
      );
      recordSuccess();
    } else {
      setMessage("Some answers are incorrect. Please try again.");
    }
    setShowResults(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Calendar Comprehension Challenge
      </h1>

      <WeeklyCalendar
        events={calendarEvents}
        days={days}
        startHour={9}
        endHour={18}
      />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Answer these questions about the calendar:
        </h2>

        {questions.map((q) => (
          <div key={q.id} className="mb-6">
            <p className="text-lg mb-2">{q.question}</p>
            <input
              type="text"
              className={`w-full p-2 border rounded-lg ${
                showResults &&
                answers[q.id]?.trim().toLowerCase() !== q.answer.toLowerCase()
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              value={answers[q.id] || ""}
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
            />
            {showResults &&
              answers[q.id]?.trim().toLowerCase() !==
                q.answer.toLowerCase() && (
                <p className="text-red-500 text-sm mt-1">Incorrect answer</p>
              )}
          </div>
        ))}

        <button
          onClick={checkAnswers}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Check Answers
        </button>

        {message && (
          <p
            className={`mt-4 ${
              message.includes("Congratulations")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CalendarComprehension;
