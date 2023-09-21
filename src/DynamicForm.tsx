import { useState } from "react";
import { FormData, useDynamicForm } from "./useDynamicForm"; // Import the custom hook from the separate file
import { useForm } from "react-hook-form"; // Import React Hook Form for form handling

import Button from "@mui/material/Button";
import { CheckboxControl } from "./CheckboxControl";
import { SelectOption } from "./SelectOption";
import { formType } from "./formInterface";
import { errObj, initialUser, regexMap } from "./consts";

const DynamicForm = () => {
  const { handleSubmit, register, formState, reset, clearErrors, setError } =
    useForm();
  const { handleSubmit: submitForm } = useDynamicForm();
  // State to hold the selected value from SelectOption
  const [selectedValue, setSelectedValue] = useState(formType.MANUAL);
  const [useSSL, setUseSSL] = useState(false);
  const onSelectChange = (value: formType) => {
    setSelectedValue(value); // Update the selected value in the parent
  };
  const handleChange = (checked: boolean) => {
    setUseSSL(checked);
  };
  const resetForm = () => {
    reset(initialUser);
    setUseSSL(false);
    setSelectedValue(formType.MANUAL);
    clearErrors("");
  };

  const onSubmit = async (data: FormData) => {
    const isUsernameFilled = formState.dirtyFields.username;
    const isPasswordFilled = formState.dirtyFields.password;
    const isServerPathFilled = formState.dirtyFields.serverPath;
    const isserverAddressFilled = formState.dirtyFields.serverAddress;

    if (!isUsernameFilled) {
      setError("username", errObj);
      return;
    }
    if (!isPasswordFilled) {
      setError("password", errObj);
      return;
    }
    if (!isserverAddressFilled) {
      setError("serverAddress", errObj);
      return;
    }
    if (!isServerPathFilled) {
      setError("serverPath", errObj);
      return;
    }

    // Check if there are any form validation errors
    if (formState.errors && Object.keys(formState.errors).length) {
      // Handle the errors, display messages, or perform other actions
      console.log("Form has validation errors:", formState.errors);
    }

    // Pass the form data to submitForm function from useDynamicForm
    await submitForm({ ...data, formType: selectedValue, useSSL });
    console.log({ ...data, formType: selectedValue });
    resetForm();
  };

  return (
    <div className='container'>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            Account Type:
            <SelectOption
              selectedValue={selectedValue}
              onSelectChange={onSelectChange}
            />
          </div>
          <div>
            <label>Username: </label>
            <input
              className={
                formState.errors.username?.message ? "input-error" : ""
              }
              type='text'
              placeholder='name@example.com'
              {...register("username", {
                pattern: {
                  value: regexMap.username,
                  message: "Invalid email format",
                },
              })}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type='password'
              placeholder='Required'
              className={
                formState.errors.password?.message ? "input-error" : ""
              }
              {...register("password", {
                pattern: {
                  value: regexMap.passowrd,
                  message: "Invalid password format",
                },
              })}
            />
          </div>
          <div>
            <label>Server Address: </label>
            <input
              type='text'
              placeholder='example.com'
              className={
                formState.errors.serverAddress?.message ? "input-error" : ""
              }
              {...register("serverAddress", {
                pattern: {
                  value: regexMap.serverAddress,
                  message: "Invalid serverAddress format",
                },
              })}
            />
          </div>

          {formType.ADVANCED === selectedValue && (
            <>
              <div>
                Server Path:
                <input
                  type='text'
                  placeholder='/calenders/user/'
                  className={
                    formState.errors.serverPath?.message ? "input-error" : ""
                  }
                  {...register("serverPath", {
                    pattern: {
                      value: regexMap.serverPath,
                      message: "Invalid serverPath format",
                    },
                  })}
                />
              </div>
              <div>
                port:
                <input
                  type='number'
                  placeholder='Port'
                  required
                  {...register("port", {
                    pattern: {
                      value: regexMap.port,
                      message: "Invalid port number",
                    },
                  })}
                  id='port'
                  min='0'
                  max='10000'
                  step='1'
                />
                <CheckboxControl value={useSSL} handleChange={handleChange} />
              </div>
            </>
          )}
          <Button variant='contained' type='submit'>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DynamicForm;
