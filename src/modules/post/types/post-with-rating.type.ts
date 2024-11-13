import { WithRating } from './with-rating.type.js';

import { PostEntity } from '../entities/post.entity.js';

export type PostWithRating = PostEntity & WithRating;
