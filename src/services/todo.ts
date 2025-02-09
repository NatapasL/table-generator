import { getToken } from '../authentication';
import { deleteData, getData, patchData, postData } from '../helpers';
import type {
  CreateTodoResponse,
  CustomResponse,
  DeleteTodoResponse,
  GetAllTodoResponse,
  RawTodoResponse,
  TodoBody,
  TodoResponse,
  UpdateTodoResponse,
} from '../types';

const parseRawTodoResponse = (
  rawTodo: Partial<RawTodoResponse>
): TodoResponse => {
  return {
    createdAt: rawTodo.created_at ?? ``,
    createdBy: {
      id: rawTodo.created_by?.id ?? ``,
      username: rawTodo.created_by?.username ?? ``,
    },
    updatedAt: rawTodo.updated_at ?? ``,
    description: rawTodo.description ?? ``,
    id: rawTodo.id ?? ``,
    title: rawTodo.title ?? ``,
  };
};

export const getAllTodo = async (): Promise<
  CustomResponse<GetAllTodoResponse<TodoResponse>> | undefined
> => {
  try {
    const token = getToken();
    const response = await getData<GetAllTodoResponse<RawTodoResponse>>({
      path: `/todo`,
      token: token ?? ``,
    });

    return {
      ...response,
      data: {
        isSuccess: response.data?.isSuccess ?? false,
        data: (response.data?.data ?? [])?.map((rawTodo) =>
          parseRawTodoResponse(rawTodo)
        ),
      },
    };
  } catch (error) {
    return undefined;
  }
};

export const createTodo = async (
  body: TodoBody
): Promise<CustomResponse<CreateTodoResponse<TodoResponse>> | undefined> => {
  try {
    const token = getToken();
    const response = await postData<CreateTodoResponse<RawTodoResponse>>({
      path: `/todo`,
      body: JSON.stringify(body),
      token: token ?? ``,
    });

    return {
      ...response,
      data: {
        isSuccess: response.data?.isSuccess ?? false,
        data: parseRawTodoResponse(response.data?.data ?? {}),
      },
    };
  } catch (error) {
    return undefined;
  }
};

export const updateTodo = async <
  Keys extends keyof Partial<TodoBody>,
  Body extends Pick<TodoBody, Keys>
>(
  id: string,
  body: Body
): Promise<CustomResponse<UpdateTodoResponse<Keys>> | undefined> => {
  try {
    const token = getToken();
    return await patchData({
      path: `/todo/${id}`,
      body: JSON.stringify(body),
      token: token ?? ``,
    });
  } catch (error) {
    return undefined;
  }
};

export const deleteTodo = async (
  id: string
): Promise<CustomResponse<DeleteTodoResponse> | undefined> => {
  try {
    const token = getToken();
    return await deleteData({
      path: `/todo/${id}`,
      token: token ?? ``,
    });
  } catch (error) {
    return undefined;
  }
};
