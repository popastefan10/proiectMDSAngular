export interface Post {
  id: string;
  createdAt: Date;
  userId: string;
  description?: string;
  picturesURLs: string[];
}
