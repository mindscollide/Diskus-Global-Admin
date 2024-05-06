import React, { useRef, useCallback } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import moment from "moment";
import "./datepicker.css";
import Icon from "react-multi-date-picker/components/icon";

const MultiDatePicker = ({
  onChange,
  name,
  value,
  newValue,
  disabled,
  change,
  calendar,
  locale,
  check,
  refProp,
  spanClass,
  numberOfMonths,
}) => {
  let dateFormat = "DD/MM/YYYY";
  const calenderRef = useRef();
  console.log(calenderRef, "calenderRefcalenderRef");

  const handleClick = useCallback(() => {
    if (calenderRef.current.isOpen) {
      return calenderRef.current.closeCalendar();
    } else {
      return calenderRef.current.openCalendar();
    }
  }, [calenderRef]);

  return (
    <>
      <span className={spanClass}>
        <label className="f-0">
          <DatePicker
            render={<Icon />}
            onChange={onChange}
            inputClass="datepicker_input"
            format={dateFormat}
            minDate={moment().toDate()}
            className="datePickerTodoCreate2"
            disabled={disabled}
            name={name}
            onOpenPickNewDate={false}
            numberOfMonths={numberOfMonths}
            inputMode=""
            value={value}
            calendar={calendar}
            locale={locale}
            ref={refProp}
          />
        </label>
      </span>
    </>
  );
};

export default MultiDatePicker;
