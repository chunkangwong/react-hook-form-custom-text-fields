import { Controller, useForm } from "react-hook-form";

type TextField = {
  label: string;
};

type CustomFormProps = {
  customTextFields: TextField[];
};

type CustomFormValues = {
  customValues: string[];
};

const CustomForm = ({ customTextFields }: CustomFormProps) => {
  const { control, handleSubmit } = useForm<CustomFormValues>({
    defaultValues: {
      customValues: customTextFields.map(() => ""),
    },
  });

  const onSubmit = (data: CustomFormValues) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {customTextFields.map((customTextField, index) => (
        <span key={`custom-textField-${customTextField.label}`}>
          <label>{customTextField.label}</label>
          <Controller
            name="customValues"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                value={field.value[index]}
                onChange={(e) => {
                  const newValues = [...field.value];
                  newValues[index] = e.target.value;
                  field.onChange(newValues);
                }}
              />
            )}
          />
        </span>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default CustomForm;
