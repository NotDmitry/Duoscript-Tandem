/* @vitest-environment jsdom */
import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { useWidgetQuiz } from './useWidgetQuiz.ts';
import type {
  QuizProps,
  QuizType,
} from '@/features/WidgetQuiz/WidgetQuiz.types.ts';

const mockQuizData: QuizProps = {
  quizName: 'Test Quiz',
  questions: [
    {
      isText: true,
      question: 'Question 1?',
      answers: [
        [0, 'Answer A'],
        [1, 'Answer B'],
        [2, 'Answer C'],
      ],
    },
    {
      isText: true,
      question: 'Question 2?',
      answers: [
        [0, 'Answer X'],
        [1, 'Answer Y'],
      ],
    },
    {
      isText: true,
      question: 'Question 3?',
      answers: [
        [0, 'Answer 1'],
        [1, 'Answer 2'],
      ],
    },
  ],
  rightAnswers: [1, 0, 1],
};

vi.mock('@/api/widgetQuiz.api.ts', () => ({
  default: (): Promise<QuizProps> => Promise.resolve(mockQuizData),
}));

const quizType: QuizType = { type: 'html' };

describe('Hook useWidgetQuiz', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('Loads some quiz data and sets loading to false', async () => {
    const { result } = renderHook(() => useWidgetQuiz(quizType));
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.quizName).toBe('Test Quiz');
    expect(result.current.questionsCount).toBe(3);
    expect(result.current.currentQuestion).toEqual(mockQuizData.questions[0]);
  });

  it('Updates selected answer through handleAnswerSelect', async () => {
    const { result } = renderHook(() => useWidgetQuiz(quizType));
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.handleAnswerSelect(2);
    });

    expect(result.current.selectedAnswerIndex).toBe(2);
  });

  it('Go to the next question on the correct answer', async () => {
    const { result } = renderHook(() => useWidgetQuiz(quizType));
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.handleAnswerSelect(1);
    });
    act(() => {
      result.current.handleNext();
    });

    expect(result.current.currentQuestionIndex).toBe(1);
    expect(result.current.failedQuiz).toHaveLength(0);
    expect(result.current.selectedAnswerIndex).toBeNull();
  });

  it('Set skipped question as failed', async () => {
    const { result } = renderHook(() => useWidgetQuiz(quizType));
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.handleSkip();
    });

    expect(result.current.currentQuestionIndex).toBe(1);
    expect(result.current.failedQuiz).toHaveLength(1);
    expect(result.current.failedQuiz[0]).toEqual(mockQuizData.questions[0]);
  });

  it('Finishes quiz after all questions', async () => {
    const { result } = renderHook(() => useWidgetQuiz(quizType));
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    for (const answer of [1, 0, 1]) {
      act(() => {
        result.current.handleAnswerSelect(answer);
      });
      act(() => {
        result.current.handleNext();
      });
    }

    expect(result.current.isFinish).toBe(true);
    expect(result.current.failedQuiz).toHaveLength(0);
  });
});
