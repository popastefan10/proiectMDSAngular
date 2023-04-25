export interface Comment {
  id: string;
  createdAt: Date;
  userId: string;
  postId: string;
  content: string;
  parentId?: string;
}
