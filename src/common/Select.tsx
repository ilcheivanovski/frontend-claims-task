import { ErrorMessage, Field, useField, useFormikContext } from "formik";
import ReactSelect from "react-select";
import type Styles from "react-select";

export const DEFAULT_SELECT_STYLE: Partial<Styles> = {
  valueContainer: (provided: any, state: any) => ({
    ...provided,
    height: "100%",
  }),
  container: (provided: any, state: any) => ({
    ...provided,
    width: "180px",
    height: "38px",
    border: "1px solid #ced0da !important",
    borderRadius: "3px",
    marginTop: "7px",
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    boxShadow: "none",
    border: "none",
    width: "100%",
    height: "34px",
    minHeight: "34px",
  }),
  placeholder: (provided: any, state: any) => ({
    ...provided,
  }),
  singleValue: (provided: any, state: any) => ({
    ...provided,
    color: "#474F58",
  }),
  input: (provided: any, state: any) => ({
    ...provided,
    margin: 0,
    padding: "0 10px",
  }),
  indicatorSeparator: () => null,
  menu: (provided: any) => ({
    ...provided,
    width: "300px",
  }),
};

interface ExtendedProps {
  id?: string;
  label: string;
  name: string;
  options: any[];
}

export const Select = (props: any) => <ReactSelect {...props} />;

export const SelectInputField = ({
  label,
  name,
  id,
  ...props
}: ExtendedProps) => {
  const [field, meta] = useField(name);
  return (
    <div>
      {label && (
        <label htmlFor={id || name} id={id}>
          {label}
        </label>
      )}

      <Select
        value={field.value}
        name={field.name}
        error={meta.touched && meta.error}
        styles={DEFAULT_SELECT_STYLE}
        onChange={(option: any) => {
          field.onChange({ target: { name: field.name, value: option } });
        }}
        onBlur={() => {
          field.onBlur({ target: { name: field.name } });
        }}
        {...props}
        isClearable={true}
      />
      {meta.touched && meta.error ? (
        <div className="error" style={{ color: "red" }}>
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};
