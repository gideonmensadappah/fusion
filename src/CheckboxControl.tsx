import { FC } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface CheckboxProps {
  value: boolean;
  handleChange: (v: boolean) => void;
}
export const CheckboxControl: FC<CheckboxProps> = ({ handleChange, value }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value}
          onChange={(e) => handleChange(e.target.checked)}
        />
      }
      label='Use SSL'
    />
  );
};
