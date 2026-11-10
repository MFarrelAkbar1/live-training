import type { ComponentType } from 'react';

// Your work (starter files you edit)
import Starter01 from '../practice-exercises/01-search/SearchExercise';
import Starter02 from '../practice-exercises/02-status-filter/StatusFilterExercise';
import Starter03 from '../practice-exercises/03-sorting/SortingExercise';
import Starter04 from '../practice-exercises/04-pagination/PaginationExercise';
import Starter05 from '../practice-exercises/05-user-card/UserCardExercise';
import Starter06 from '../practice-exercises/06-add-user-form/AddUserExercise';
import Starter07 from '../practice-exercises/07-edit-user/EditUserExercise';
import Starter08 from '../practice-exercises/08-delete-user/DeleteUserExercise';
import Starter09 from '../practice-exercises/09-fetch-users/FetchUsersExercise';
import Starter10 from '../practice-exercises/10-loading-error-states/LoadingErrorExercise';

// Reference solutions (only shown when you flip the toggle)
import Solution01 from '../solutions/01-search/SearchExercise';
import Solution02 from '../solutions/02-status-filter/StatusFilterExercise';
import Solution03 from '../solutions/03-sorting/SortingExercise';
import Solution04 from '../solutions/04-pagination/PaginationExercise';
import Solution05 from '../solutions/05-user-card/UserCardExercise';
import Solution06 from '../solutions/06-add-user-form/AddUserExercise';
import Solution07 from '../solutions/07-edit-user/EditUserExercise';
import Solution08 from '../solutions/08-delete-user/DeleteUserExercise';
import Solution09 from '../solutions/09-fetch-users/FetchUsersExercise';
import Solution10 from '../solutions/10-loading-error-states/LoadingErrorExercise';

export type Difficulty = 'Easy' | 'Easy–Medium' | 'Medium' | 'Medium–Hard';

export interface Exercise {
  id: string;
  title: string;
  difficulty: Difficulty;
  file: string;
  Starter: ComponentType;
  Solution: ComponentType;
}

export const EXERCISES: Exercise[] = [
  { id: '01', title: 'Search', difficulty: 'Easy', file: 'practice-exercises/01-search/SearchExercise.tsx', Starter: Starter01, Solution: Solution01 },
  { id: '02', title: 'Status filter', difficulty: 'Easy', file: 'practice-exercises/02-status-filter/StatusFilterExercise.tsx', Starter: Starter02, Solution: Solution02 },
  { id: '03', title: 'Sorting', difficulty: 'Easy–Medium', file: 'practice-exercises/03-sorting/SortingExercise.tsx', Starter: Starter03, Solution: Solution03 },
  { id: '04', title: 'Pagination', difficulty: 'Medium', file: 'practice-exercises/04-pagination/PaginationExercise.tsx', Starter: Starter04, Solution: Solution04 },
  { id: '05', title: 'UserCard component', difficulty: 'Easy', file: 'practice-exercises/05-user-card/UserCardExercise.tsx', Starter: Starter05, Solution: Solution05 },
  { id: '06', title: 'Add User form', difficulty: 'Medium', file: 'practice-exercises/06-add-user-form/AddUserExercise.tsx', Starter: Starter06, Solution: Solution06 },
  { id: '07', title: 'Edit User', difficulty: 'Medium', file: 'practice-exercises/07-edit-user/EditUserExercise.tsx', Starter: Starter07, Solution: Solution07 },
  { id: '08', title: 'Delete User', difficulty: 'Easy–Medium', file: 'practice-exercises/08-delete-user/DeleteUserExercise.tsx', Starter: Starter08, Solution: Solution08 },
  { id: '09', title: 'Fetch from REST API', difficulty: 'Medium', file: 'practice-exercises/09-fetch-users/FetchUsersExercise.tsx', Starter: Starter09, Solution: Solution09 },
  { id: '10', title: 'Loading & error states', difficulty: 'Medium–Hard', file: 'practice-exercises/10-loading-error-states/LoadingErrorExercise.tsx', Starter: Starter10, Solution: Solution10 },
];
