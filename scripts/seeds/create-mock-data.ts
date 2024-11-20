/* eslint-disable no-magic-numbers -- random numbers for seeder */
import { faker } from '@faker-js/faker';

import { CategoryEntity } from '../../src/modules/category/entities/category.entity.js';
import { CategoryStatus } from '../../src/modules/category/enum/category-status.enum.js';
import { CommentEntity } from '../../src/modules/comment/entities/comment.entity.js';
import { CommentStatus } from '../../src/modules/comment/enum/comment-status.enum.js';
import { dataSource } from '../../src/modules/db/datasource.js';
import { SearchHistoryEntity } from '../../src/modules/history/entities/search-history.entity.js';
import { PostEntity } from '../../src/modules/post/entities/post.entity.js';
import { PostStatus } from '../../src/modules/post/enum/post-status.enum.js';
import { RatingEntity } from '../../src/modules/rating/entities/rating.entity.js';
import { RatingEnum } from '../../src/modules/rating/enum/rating.enum.js';
import { UserEntity } from '../../src/modules/user/entities/user.entity.js';
import { UserRole } from '../../src/modules/user/enums/user-role.enum.js';

const USERS_AMOUNT = 100;
const CATEGORIES_AMOUNT = 20;
const POSTS_AMOUNT = 200;
const COMMENTS_AMOUNT = 500;
const RATINGS_AMOUNT = 300;
const SEARCH_HISTORIES_AMOUNT = 200;

async function seedDatabase(): Promise<void> {
  await dataSource.initialize();

  const userRepo = dataSource.getRepository(UserEntity);
  const categoryRepo = dataSource.getRepository(CategoryEntity);
  const postRepo = dataSource.getRepository(PostEntity);
  const commentRepo = dataSource.getRepository(CommentEntity);
  const ratingRepo = dataSource.getRepository(RatingEntity);
  const searchHistoryRepo = dataSource.getRepository(SearchHistoryEntity);

  const users = Array.from({ length: USERS_AMOUNT }).map(() =>
    userRepo.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      role: faker.helpers.arrayElement([UserRole.User, UserRole.Admin]),
    }),
  );

  await userRepo.save(users);

  const categories = Array.from({ length: CATEGORIES_AMOUNT }).map(() =>
    categoryRepo.create({
      title: faker.commerce.department(),
      status: CategoryStatus.Active,
    }),
  );

  await categoryRepo.save(categories);

  const posts = Array.from({ length: POSTS_AMOUNT }).map(() =>
    postRepo.create({
      author: faker.helpers.arrayElement(users),
      category: faker.helpers.arrayElement(categories),
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(3),
      status: faker.helpers.arrayElement([
        PostStatus.Active,
        PostStatus.Archived,
      ]),
    }),
  );

  await postRepo.save(posts);

  const comments = Array.from({ length: COMMENTS_AMOUNT }).map(() =>
    commentRepo.create({
      author: faker.helpers.arrayElement(users),
      post: faker.helpers.arrayElement(posts),
      body: faker.lorem.sentences(2),
      status: faker.helpers.arrayElement([
        CommentStatus.Active,
        CommentStatus.Archived,
        CommentStatus.Deleted,
      ]),
    }),
  );

  await commentRepo.save(comments);

  const ratings = Array.from({ length: RATINGS_AMOUNT }).map(() =>
    ratingRepo.create({
      author: faker.helpers.arrayElement(users),
      post: faker.helpers.arrayElement(posts),
      comment: faker.helpers.arrayElement(comments),
      rating: faker.helpers.arrayElement([
        RatingEnum.Upvote,
        RatingEnum.Downvote,
      ]),
    }),
  );

  await ratingRepo.save(ratings);

  const searchHistories = Array.from({ length: SEARCH_HISTORIES_AMOUNT }).map(
    () =>
      searchHistoryRepo.create({
        user: faker.helpers.arrayElement(users),
        query: faker.lorem.words(3),
      }),
  );

  await searchHistoryRepo.save(searchHistories);

  console.debug('Seeding completed with large dataset');
  await dataSource.destroy();
}

seedDatabase().catch((error) => console.error(error));
