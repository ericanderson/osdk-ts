import type { ObjectTypeDefinition } from '@osdk/api';
import type { MultiLink, OntologyObject } from '@osdk/legacy-client';
import type { Todo } from './Todo';

/**
 * A person
 */
export interface Person extends OntologyObject {
  readonly __apiName: 'Person';
  readonly __primaryKey: string;
  readonly email: string | undefined;
  readonly Todos: MultiLink<Todo>;
  readonly Friends: MultiLink<Person>;
}

export const Person = {
  apiName: 'Person',
  description: 'A person',
  primaryKeyType: 'string',
  links: {
    Todos: {
      multiplicity: true,
      targetType: 'Todo',
    },
    Friends: {
      multiplicity: true,
      targetType: 'Person',
    },
  },
  properties: {
    email: {
      multiplicity: false,
      type: 'string',
      nullable: true,
    },
  },
} satisfies ObjectTypeDefinition<'Person', 'Todo' | 'Person'>;
