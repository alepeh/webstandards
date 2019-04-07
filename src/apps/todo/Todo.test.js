import Todo from './Todo';

const TODO_INCOMPLETE_WITH_PRIORITY = new Todo().parse('(A) 2019-04-07 I am a todo with priority.');
const TODO_COMPLETE = new Todo().parse('x 2019-04-10 2019-04-07 I am finished todo.');

test('Extract priority from incomplete todo with priority', () => {
    expect(TODO_INCOMPLETE_WITH_PRIORITY.priority()).toBe('(A)');
})

test('Extract Creation Date from incomplete todo with priority', () => {
    expect(TODO_INCOMPLETE_WITH_PRIORITY.creationDate()).toBe('2019-04-07');
})

test('Extract Creation Date from finished todo', () => {
    expect(TODO_COMPLETE.creationDate()).toBe('2019-04-07');
})

test('Extract Completion Date from finished todo', () => {
    expect(TODO_COMPLETE.completionDate()).toBe('2019-04-10');
})

test('Extract description from incomplete todo with priority', () => {
    expect(TODO_INCOMPLETE_WITH_PRIORITY.description()).toBe('I am a todo with priority.');
})

test('Extract description from finished todo', () => {
    expect(TODO_COMPLETE.description()).toBe('I am finished todo.');
})