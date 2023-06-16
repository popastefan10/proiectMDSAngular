import { Comment } from './comment.model';

export interface CommentCreate extends Omit<Comment, 'id' | 'createdAt' | 'userId'> {}
