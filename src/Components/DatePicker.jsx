import { DatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangeSelector = ({ dateRange, onDateRangeChange }) => {
  return (
    <DatePicker
      selected={dateRange}
      startDate={dateRange}
      endDate={dateRange.end}
      onChange={(date) => onDateRangeChange(date)}
      selectsRange
      inline
    />
  );
};

export default DateRangeSelector;
