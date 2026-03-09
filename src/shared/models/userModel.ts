interface Progress {
  courseId: string;
  completedLessons: string[];
}

interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  createdAt: Date;
}

interface UserWithProgress extends User {
  progress: Progress[];
}

export type { Progress, UserWithProgress, User };
