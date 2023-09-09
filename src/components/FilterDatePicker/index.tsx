import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import React from "react";
import { DATETIME_FORMAT } from "../../constants/datetime";

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
        value={value === undefined ? null : moment(value, DATETIME_FORMAT.API)}
        format={DATETIME_FORMAT.picker}
        slotProps={{
          textField: {
            helperText: DATETIME_FORMAT.picker,
          },
          actionBar: {
            actions: ["clear"],
          },
        }}
        onChange={(newValue: Moment | null) => {
          onChange(
            newValue === null ? undefined : newValue.format(DATETIME_FORMAT.API)
          );
        }}
      />
    </LocalizationProvider>
  );
};

export default FilterDatePicker;
