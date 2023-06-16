import { Post } from './post.model';

export interface PostMedia extends Pick<Post, 'picturesURLs'> {}
