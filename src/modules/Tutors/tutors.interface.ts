export interface TutorProfileInput {
  bio: string;
  hourlyRate: number;
  experience: number;
  categoryId?: string;
}

export interface TutorAvailabilityInput {
  dayOfWeek: number; // 0-6
  startTime: Date;
  endTime: Date;
}

export interface TutorFilters {
  categoryId?: string;
  minRating?: number;
  maxRate?: number;
}
