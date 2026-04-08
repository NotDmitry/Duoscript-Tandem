import { useCallback, useRef, useState } from 'react';
import { completeLesson } from '@api/progress.api';
import type { LessonView } from '@models/lessonModel';
import { useUI } from '@hooks/useUI';

export function useCompleteLesson(uid: string, courseTitle: string) {
  const { showToast } = useUI();
  const [isLoading, setIsLoading] = useState(false);
  const completedRef = useRef(false);

  const onComplete = useCallback(
    async (lesson: LessonView) => {
      if (completedRef.current || !uid) return;
      completedRef.current = true;

      setIsLoading(true);
      try {
        await completeLesson({ uid, lesson, courseTitle });
        showToast('Lesson completed!', 'success');
      } catch (err) {
        completedRef.current = false;
        const message =
          err instanceof Error ? err.message : 'Failed to save progress';
        showToast(message, 'error');
      } finally {
        setIsLoading(false);
      }
    },
    [uid, courseTitle, showToast]
  );

  return { onComplete, isLoading };
}
