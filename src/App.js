import React,{useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Container, TextField, Typography } from '@mui/material';
import fields from './fields';

const App = () => {
  const { control, handleSubmit,reset } = useForm();

  const onSubmit = (data) => {
    console.log('Form data submitted:', data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container sx={{ marginTop: '40px' }}>
        {fields.map((field, index) => (
          <Controller
            key={index}
            name={field.name}
            control={control}
            defaultValue={field.defaultValue || ""}
            rules={field.controller && field.controller.rules}
            render={({ field: controllerField, fieldState }) => (
              <>
                <TextField
                  {...controllerField}
                  type={field.type}
                  placeholder={field.placeholder}
                  helperText={field.helper_text}
                  variant={field.variant}
                  fullWidth={field.filters.fullWidth}
                  autoFocus={field.filters.auto_focus}
                  margin="normal"
                  error={!!fieldState.error}
                  
                />
          
                {fieldState.error && (
                  <Typography color="error">
                    {fieldState.error.message}
                  </Typography>
                )}
              </>
            )}
          />
        ))}
        <Button type="submit" variant="contained">Submit</Button>
      </Container>
    </form>
  );
};

export default App;
