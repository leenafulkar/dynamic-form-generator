import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, 
  Container, 
  TextField, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel, 
  FormHelperText, 
  Switch, 
  FormControlLabel,
  Checkbox,
  Slider,
  Autocomplete,
  Rating,
  Radio,
  RadioGroup
} from '@mui/material';
import fields from './fields';

const App = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = field.default_value || '';
      return acc;
    }, {}),
  });

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
            defaultValue={field.default_value || ""}
            rules={field.controller && field.controller.rules}
            render={({ field: controllerField, fieldState, field: { onChange } }) => ( 
              <>
                {field.field_is === 'text_fields' ? (
                  <FormControl fullWidth={field.filters.fullWidth} margin="normal" variant={field.variant} error={!!fieldState.error}>
                    <TextField
                      {...controllerField}
                      label={field.label}
                      type={field.type}
                      placeholder={field.placeholder}
                      helperText={fieldState.error ? fieldState.error.message : field.helper_text}
                      variant={field.variant || "outlined"}
                      fullWidth={field.filters.fullWidth}
                      autoFocus={field.filters.auto_focus}
                      margin="normal"
                      error={!!fieldState.error}
                    />
                  </FormControl>
                ) : field.field_is === 'selector' ? (
                  <FormControl fullWidth={field.filters.fullWidth} margin="normal" variant={field.variant} error={!!fieldState.error}>
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                      {...controllerField}
                      label={field.label}
                      value={controllerField.value}
                      onChange={onChange} 
                    >
                      {field.options.map((option, optIndex) => (
                        <MenuItem key={optIndex} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{fieldState.error ? fieldState.error.message : field.helper_text}</FormHelperText>
                  </FormControl>
                ) : field.field_is === 'toggle_button' ? (
                  <FormControlLabel
                    control={
                      <Switch
                        {...controllerField}
                        checked={!!controllerField.value}
                        color="primary"
                        onChange={(e) => onChange(e.target.checked)} 
                      />
                    }
                    label={field.label}
                  />
                ) : field.field_is === 'autocomplete' ? (
                  <div>
                  <Autocomplete
                    {...controllerField}
                    options={field.options}
                    getOptionLabel={(option) => option.label || ''}
                    renderInput={(params) => <TextField {...params} label={field.label} sx={{ color: 'red' }} />} 
                    onChange={(e, value) => onChange(value)}
                    value={field.options.find((opt) => opt.value === controllerField.value) || null}
                  />
                  <FormHelperText sx={{ color: 'red' }}>{fieldState.error ? fieldState.error.message : field.helper_text}</FormHelperText> 
                </div>
                ) : field.field_is === 'checkbox' ? (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...controllerField}
                        checked={!!controllerField.value}
                        onChange={(e) => onChange(e.target.checked)}
                      />
                    }
                    label={field.label}
                  />
                ) : field.field_is === 'slider' ? (
               
                <Slider
               {...controllerField}
               value={parseInt(controllerField.value, 10)} // Convert the value to a number
               aria-labelledby="sliderLabel"
               valueLabelDisplay="auto"
               step={field.options.step}
               min={field.options.min}
               max={field.options.max}
               onChange={(event, newValue) => onChange(newValue)}
              />

            ) : field.field_is === 'rating' ? (
              <FormControl fullWidth={field.filters.fullWidth} margin="normal" error={!!fieldState.error}>
                <InputLabel>{field.label}</InputLabel>
                <Rating
                  {...controllerField}
                  value={parseFloat(controllerField.value) || field.default_value}
                  precision={field.options.precision}
                  onChange={(e, value) => onChange(value)}
                />
                <FormHelperText>{fieldState.error ? fieldState.error.message : field.helper_text}</FormHelperText>
              </FormControl>
            ) : field.field_is === 'radio_group' ? (
              <FormControl fullWidth={field.filters.fullWidth} margin="normal" error={!!fieldState.error}>
                <InputLabel>{field.label}</InputLabel>
                <RadioGroup
                  {...controllerField}
                  value={controllerField.value}
                  onChange={(e) => onChange(e.target.value)}
                >
                  {field.options.map((option, index) => (
                    <FormControlLabel key={index} value={option.value} control={<Radio />} label={option.label} />
                  ))}
                </RadioGroup>
                <FormHelperText>{fieldState.error ? fieldState.error.message : field.helper_text}</FormHelperText>
              </FormControl>
           ) : field.field_is === 'datetime_picker' ? (
            <FormControl fullWidth={field.filters.fullWidth} margin="normal" error={!!fieldState.error}>
              <InputLabel>{field.label}</InputLabel>
              <TextField
                {...controllerField}
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => onChange(e.target.value)}
              />
              <FormHelperText>{fieldState.error ? fieldState.error.message : field.helper_text}</FormHelperText>
            </FormControl>
            
          ) : null}
              </>
            )}
          />
        ))} <br/>
        <Button type="submit" variant="contained">Submit</Button>
      </Container>
    </form>
  );
};

export default App;
