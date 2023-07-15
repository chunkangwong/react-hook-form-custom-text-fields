# react-hook-form-custom-text-fields

This project demonstrates on how to dynamically create an array of `string` inputs in a `useForm`-enabled Form component.

The `customValues` in `defaultValues` is initialized with an array of empty strings based on the `customTextFields` prop.

```tsx
const CustomForm = ({ customTextFields }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      customValues: customTextFields.map(() => ""),
    },
  });
  ...
}
```

The `customTextFields` prop is used to determine the number of `string` inputs to render.

```tsx
customTextFields.map((customTextField, index) => (
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
));
```

The `onChange` handler of each `input` element is used to update the `customValues` array in the `useForm` hook based on their index.

```tsx
onChange={(e) => {
  const newValues = [...field.value];
  newValues[index] = e.target.value;
  field.onChange(newValues);
}}
```
