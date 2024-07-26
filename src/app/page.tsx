import { ReactElement } from 'react';
import { AuthGate } from '../authentication/AuthGate';
import { TodoListContainer } from '../containers';
import { createTodo, deleteTodo, getAllTodo, updateTodo } from '../services';
import { Todo, TodoFormValues } from '../types';

const IndexPage = async (): Promise<ReactElement> => {
  const response = await getAllTodo();

  const handleCreateTodo = async (
    formValues: TodoFormValues
  ): Promise<void> => {
    'use server';

    await createTodo(formValues);
  };

  const handelUpdateTodo = async (
    id: string,
    formValues: TodoFormValues
  ): Promise<void> => {
    'use server';

    await updateTodo(id, formValues);
  };

  const handleDeleteTodo = async (id: string): Promise<void> => {
    'use server';

    await deleteTodo(id);
  };

  const todoList = (response?.data?.data ?? []).map((todoResponse): Todo => {
    return {
      id: todoResponse.id,
      title: todoResponse.title,
      description: todoResponse.description,
      updatedAt: todoResponse.updatedAt,
    };
  });

  return (
    <AuthGate>
      <TodoListContainer
        todoList={todoList}
        onCreateTodo={handleCreateTodo}
        onUpdateTodo={handelUpdateTodo}
        onDeleteTodo={handleDeleteTodo}
      ></TodoListContainer>
    </AuthGate>
  );
};

export default IndexPage;
