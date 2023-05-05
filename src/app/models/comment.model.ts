import { SessionUser } from "./session-user.model";

export interface Comment {
  id: string;
  createdAt: Date;
  userId: string;
  postId: string;
  content: string;
  parentId?: string;
}

export interface CommentShow {
  metadata: Partial<Comment>,
  author: Partial<SessionUser>,
}
