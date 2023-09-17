import { useMutation } from "react-query";
export interface FormData {}

const submitForm = async (formData: FormData) => {
  // Simulate an API call. Replace this with your actual API call.
  const response = await fetch("/api/submit", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Form submission failed");
  }

  return response.json();
};

export const useDynamicForm = () => {
  const { mutate, isSuccess, isError } = useMutation(submitForm);

  const handleSubmit = async (formData: FormData) => {
    try {
      await mutate(formData);
    } catch (error) {
      // Handle submission error
      console.error(error);
    }
  };

  return {
    handleSubmit,
    isSuccess,
    isError,
  };
};
