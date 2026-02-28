export interface TutorProfileInput {
  bio?: string;          // optional
  pricePerHour: number;  // required
  experience: number;    // required
}

export interface AvailabilityInput {
  startTime: string;
  endTime: string;
}

export interface TutorFilters {
  categoryId?: string;
  minRating?: number;
  maxRate?: number;
}
