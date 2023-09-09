import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

export interface FilterSelectProps {
  label: string;
  value: string | undefined;
  options: { label: string; value: string | undefined }[];
  onChange: (event: SelectChangeEvent) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <FormControl sx={{ width: "10em" }}>
      <InputLabel id={`filter-${label.toLowerCase()}-label`}>
        {label}
      </InputLabel>
      <Select
        labelId={`filter-${label.toLowerCase()}-select-label`}
        id={`filter-${label.toLowerCase()}-select`}
        name={label.toLowerCase()}
        value={value ?? ""}
        label={label}
        onChange={onChange}
      >
        <MenuItem value={undefined}>None</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterSelect;
