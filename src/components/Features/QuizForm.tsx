import React, { useState } from "react";
import { Button } from "@/components/UI/Button";
import { AlertCircle, CheckCircle, HelpCircle } from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface QuizFormProps {
  questions: Question[];
  passingGrade: number;
  onSubmitResult: (score: number, passed: boolean) => void;
}

export function QuizForm({ questions, passingGrade, onSubmitResult }: QuizFormProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionChange = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers({
      ...answers,
      [questionId]: optionIndex,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(answers).length < questions.length) {
      alert("Mohon jawab semua pertanyaan terlebih dahulu.");
      return;
    }

    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / questions.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
    onSubmitResult(finalScore, finalScore >= passingGrade);
  };

  const handleReset = () => {
    setAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-4 mb-6">
        <HelpCircle className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-bold text-gray-900">Asesmen Akhir Bab</h3>
      </div>

      {isSubmitted ? (
        <div className="text-center space-y-4 py-6">
          <div className="inline-flex items-center justify-center rounded-full p-4 bg-gray-50">
            {score >= passingGrade ? (
              <CheckCircle className="h-16 w-16 text-green-500" />
            ) : (
              <AlertCircle className="h-16 w-16 text-red-500" />
            )}
          </div>
          <div>
            <h4 className="text-2xl font-bold text-gray-900">Skor Anda: {score} / 100</h4>
            <p className="text-sm text-gray-500 mt-1">Passing Grade Kelulusan: {passingGrade}%</p>
          </div>
          <p className={`text-base font-semibold ${score >= passingGrade ? "text-green-600" : "text-red-600"}`}>
            {score >= passingGrade
              ? "Selamat! Anda dinyatakan LULUS dalam kuis ini."
              : "Maaf, Anda belum mencapai batas minimal kelulusan."}
          </p>
          <div className="flex justify-center gap-3 pt-4">
            {score < passingGrade && (
              <Button onClick={handleReset}>Coba Lagi</Button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q, idx) => (
            <div key={q.id} className="space-y-3">
              <p className="text-sm font-semibold text-gray-900">
                {idx + 1}. {q.text}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => (
                  <label
                    key={optIdx}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                      answers[q.id] === optIdx ? "border-blue-500 bg-blue-50/20" : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      checked={answers[q.id] === optIdx}
                      onChange={() => handleOptionChange(q.id, optIdx)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-sm text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <Button type="submit" className="w-full mt-6 py-2.5">
            Kirim Jawaban
          </Button>
        </form>
      )}
    </div>
  );
}
