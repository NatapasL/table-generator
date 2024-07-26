import { FormEvent, ReactElement, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { ButtonType } from "../constants";
import { Todo, TodoFormValues } from "../types";
import { Button } from "./Button";
import { Input } from "./Input";
import { Textarea } from "./Textarea";

const FormConfig = {
  Title: {
    LABEL: `Title`,
    NAME: `title`,
    MAX_LENGTH: 16,
    REQUIRED: true,
  },
  Description: {
    LABEL: `Description`,
    NAME: `description`,
    MAX_LENGTH: 100,
    REQUIRED: true,
  },
} as const;

export interface TodoFormProps {
  todo?: Todo;
  submitButtonText: string;
  onSubmit: (formValues: TodoFormValues) => void | Promise<void>;
  onCancel: () => void | Promise<void>;
}

export const TodoForm = ({
  todo,
  onSubmit,
  submitButtonText,
}: TodoFormProps): ReactElement => {
  const form = useForm();

  const preventDefault = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };
  const handleSubmit = useCallback(
    form.handleSubmit((formValues) => {
      onSubmit({
        id: todo?.id,
        title: formValues[FormConfig.Title.NAME],
        description: formValues[FormConfig.Description.NAME],
      });
    }),
    [onSubmit]
  );

  return (
    <StyledTodoForm>
      <FormProvider {...form}>
        <form onSubmit={preventDefault} noValidate>
          <Input
            label={FormConfig.Title.LABEL}
            name={FormConfig.Title.NAME}
            maxLength={FormConfig.Title.MAX_LENGTH}
            required={FormConfig.Title.REQUIRED}
          />
          <Textarea
            label={FormConfig.Description.LABEL}
            name={FormConfig.Description.NAME}
            maxLength={FormConfig.Description.MAX_LENGTH}
            required={FormConfig.Description.REQUIRED}
          />

          <div>
            <Button
              text="Cancel"
              onClick={handleSubmit}
              type={ButtonType.SECONDARY}
            ></Button>

            <Button
              text={submitButtonText}
              onClick={handleSubmit}
              type={ButtonType.PRIMARY}
            ></Button>
          </div>
        </form>
      </FormProvider>
    </StyledTodoForm>
  );
};

const StyledTodoForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
