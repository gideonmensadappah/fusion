import { FormControl, MenuItem, Select } from "@mui/material";
import { formType } from "./formInterface";
import { FC } from "react";

interface SelectProps {
  selectedValue: formType;
  onSelectChange: (val: formType) => void;
}
export const SelectOption: FC<SelectProps> = ({
  onSelectChange,
  selectedValue,
}) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Select
        labelId='demo-controlled-open-select-label'
        id='demo-controlled-open-select'
        label='Account Type'
        value={selectedValue}
        onChange={(e) => {
          onSelectChange(e.target.value as formType);
        }}
      >
        <MenuItem value={formType.ADVANCED}>{formType.ADVANCED}</MenuItem>
        <MenuItem value={formType.MANUAL}>{formType.MANUAL}</MenuItem>
      </Select>
    </FormControl>
  );
};
