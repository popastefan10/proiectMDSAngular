export interface Post {
  id: string;
  createdAt: string;
  userId: string;
  description?: string;
  picturesURLs: string[];
}
