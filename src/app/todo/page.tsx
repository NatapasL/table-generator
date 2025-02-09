import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { TodoListContainer } from '../../containers';
import { createTodo, deleteTodo, getAllTodo, updateTodo } from '../../services';
import type { Todo, TodoFormValues } from '../../types';

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'Todo List',
  };
};

const TodoPage = async (): Promise<ReactElement> => {
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

  const response = await getAllTodo();
  const todoList = (response?.data?.data ?? []).map((todoResponse): Todo => {
    return {
      id: todoResponse.id,
      title: todoResponse.title,
      description: todoResponse.description,
      updatedAt: todoResponse.updatedAt,
    };
  });

  return (
    <TodoListContainer
      todoList={todoList}
      onCreateTodo={handleCreateTodo}
      onUpdateTodo={handelUpdateTodo}
      onDeleteTodo={handleDeleteTodo}
    ></TodoListContainer>
  );
};

export default TodoPage;
