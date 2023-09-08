import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import React from "react";

export interface DatePickerFieldProps {
  label: string;
  value: string | undefined;
  onChange: (date: string | undefined) => void;
}

const FilterDatePicker: React.FC<DatePickerFieldProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        sx={{ width: "15em" }}
        label={label}
        value={value === undefined ? null : moment(value, "YYYY-MM-DD")}
        format="DD/MM/YYYY"
        slotProps={{
          textField: {
            helperText: "DD/MM/YYYY",
          },
          actionBar: {
            actions: ["clear"],
          },
        }}
        onChange={(newValue: Moment | null) => {
          onChange(
            newValue === null ? undefined : newValue.format("YYYY-MM-DD")
          );
        }}
      />
    </LocalizationProvider>
  );
};

export default FilterDatePicker;
