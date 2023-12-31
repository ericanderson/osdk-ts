import { ObjectTypeDefinition } from '@osdk/api';
import type { OntologyObject, SingleLink } from '@osdk/legacy-client';
import type { Person } from './Person';

/**
 * Its a todo item.
 */
export interface Todo extends OntologyObject {
  readonly __apiName: 'Todo';
  readonly __primaryKey: number;
  readonly id: number | undefined;
  /**
   * The text of the todo
   */
  readonly body: string | undefined;
  readonly complete: boolean | undefined;
  readonly Assignee: SingleLink<Person>;
}

export const Todo = {
  apiName: 'Todo',
  description: 'Its a todo item.',
  primaryKeyType: 'integer',
  links: {
    Assignee: {
      multiplicity: false,
      targetType: 'Person',
    },
  },
  properties: {
    id: {
      multiplicity: false,
      type: 'integer',
      nullable: true,
    },
    body: {
      multiplicity: false,
      description: 'The text of the todo',
      type: 'string',
      nullable: true,
    },
    complete: {
      multiplicity: false,
      type: 'boolean',
      nullable: true,
    },
  },
} satisfies ObjectTypeDefinition<'Todo', 'Person'>;
