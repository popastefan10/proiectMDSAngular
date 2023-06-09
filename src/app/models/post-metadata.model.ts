import { Post } from './post.model';

export interface PostMetadata extends Omit<Post, 'picturesURLs'> {}
