import React,{useState} from 'react';
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
  RadioGroup,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListSubheader
} from '@mui/material';
import fields from './fields';

const TransferList = ({ sourceList, targetList, onChange }) => {
  const [sourceItems, setSourceItems] = useState(sourceList.items);
  const [targetItems, setTargetItems] = useState(targetList.items);

  const handleTransfer = (item, fromSource) => {
    if (fromSource) {
      const updatedSourceItems = sourceItems.filter(i => i !== item);
      setSourceItems(updatedSourceItems);
      setTargetItems([...targetItems, item]);
      // Pass the updated sourceItems and targetItems to the onChange function
      onChange({ sourceItems: updatedSourceItems, targetItems: [...targetItems, item] });
    } else {
      const updatedTargetItems = targetItems.filter(i => i !== item);
      setTargetItems(updatedTargetItems);
      setSourceItems([...sourceItems, item]);
      // Pass the updated sourceItems and targetItems to the onChange function
      onChange({ sourceItems: [...sourceItems, item], targetItems: updatedTargetItems });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Paper>
        <List subheader={<ListSubheader>{sourceList.label}</ListSubheader>}>
          {sourceItems.map((item) => (
            <ListItem button key={item} onClick={() => handleTransfer(item, true)}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Paper>
        <List subheader={<ListSubheader>{targetList.label}</ListSubheader>}>
          {targetItems.map((item) => (
            <ListItem button key={item} onClick={() => handleTransfer(item, false)}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};
const App = () => {
 
  const { control, handleSubmit, reset, setValue} = useForm({
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = field.default_value || '';
      return acc;
    }, {}),
  });
  const [resetTransferListKey, setResetTransferListKey] = useState(0); // Key to reset the TransferList

  const onSubmit = (data) => {
    console.log('Form data submitted:', data);
    reset();
    setResetTransferListKey((prevKey) => prevKey + 1); // Increment the key to reset the TransferList
  };

  const handleTransferChange = (name, value) => {
    setValue(name, value.targetItems); // Update the form value with the targetItems
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
                    renderInput={(params) => <TextField {...params} label={field.label} error={!!fieldState.error}  />} 
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
                error={!!fieldState.error}
                onChange={(e) => onChange(e.target.value)}
              />
              <FormHelperText>{fieldState.error ? fieldState.error.message : field.helper_text}</FormHelperText>
            </FormControl>
             ) : field.field_is === 'multiple_selector' ? (
              <FormControl fullWidth={field.filters.fullWidth} margin="normal" variant={field.variant} error={!!fieldState.error}>
                <InputLabel>{field.label}</InputLabel>
                <Select
                  {...controllerField}
                  label={field.label}
                  multiple
                  value={controllerField.value}
                  onChange={onChange}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {field.options.map((option, optIndex) => (
                    <MenuItem key={optIndex} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{fieldState.error ? fieldState.error.message : field.helper_text}</FormHelperText>
              </FormControl>
           ) : field.field_is === 'circular_integration' ? (
            <FormControl fullWidth={field.filters.fullWidth} margin="normal">
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
              {field.custom.circularProgress.integration && (
                <CircularProgress
                  color={field.custom.circularProgress.color}
                  size={field.custom.circularProgress.size}
                  thickness={field.custom.circularProgress.thickness}
                />
              )}
              {fieldState.error && (
                <FormHelperText error>
                  {fieldState.error.message}
                </FormHelperText>
              )}
            </FormControl>
         ) : field.field_is === 'password' ? (
          <FormControl fullWidth={field.filters.fullWidth} margin="normal" variant={field.variant} error={!!fieldState.error}>
            <InputLabel>{field.label}</InputLabel>
            <TextField
              {...controllerField}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              helperText={field.helper_text || (fieldState.error ? fieldState.error.message : '')}
              variant={field.variant || "outlined"}
              fullWidth={field.filters.fullWidth}
              autoFocus={field.filters.auto_focus}
              margin="normal"
              error={!!fieldState.error}
            />
           
          </FormControl>
          ) : field.field_is === 'email' ? (
            <FormControl fullWidth={field.filters.fullWidth} margin="normal" variant={field.variant} error={!!fieldState.error}>
            <InputLabel>{field.label}</InputLabel>
            <TextField
              {...controllerField}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              helperText={field.helper_text || (fieldState.error ? fieldState.error.message : '')}
              variant={field.variant || "outlined"}
              fullWidth={field.filters.fullWidth}
              autoFocus={field.filters.auto_focus}
              margin="normal"
              error={!!fieldState.error}
            />
           
          </FormControl>
          
          ) : field.field_is === 'message' ? (
            <FormControl fullWidth={field.filters.fullWidth} margin="normal" variant={field.variant} error={!!fieldState.error}>
            <InputLabel>{field.label}</InputLabel>
            <TextField
              {...controllerField}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              helperText={field.helper_text || (fieldState.error ? fieldState.error.message : '')}
              variant={field.variant || "outlined"}
              fullWidth={field.filters.fullWidth}
              autoFocus={field.filters.auto_focus}
              margin="normal"
              error={!!fieldState.error}
              multiline
              rows={5}
            />
           
          </FormControl>
          
        ) : field.field_is === 'transfer' ? (
          <TransferList
          key={resetTransferListKey} // Reset the TransferList when the key changes
          sourceList={fields.find((field) => field.field_is === 'transfer').source_list}
          targetList={fields.find((field) => field.field_is === 'transfer').target_list}
          onChange={(value) => handleTransferChange(fields.find((field) => field.field_is === 'transfer').name, value)}
        />
        
       
        ) : null}
      </>
    )}
  />
))}
<Button type="submit" variant="contained" color="primary" sx={{marginTop:'40px'}}>
  Submit
</Button>
</Container>
</form>
);
};

export default App;