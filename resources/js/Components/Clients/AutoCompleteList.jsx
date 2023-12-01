import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import { inputGroupClass } from '@/Components/Scripts/Form';
import Autocomplete, { createFilterOptions } from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Add from '@mui/icons-material/Add';

const filter = createFilterOptions();

export default function AutoCompleteList({ user, onNewOptionAdded, setExistingClient }) {
  const clients = user.clients || [];
  const [value, setValue] = React.useState(null);

 
  return (
    <FormControl className={inputGroupClass}>
      <h4>Add or Create a New Client</h4>
      <p className='text-sm'>Type their company name and the list will populate for existing clients. If they don't exist, you will have the option to add them</p>
      <Autocomplete
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setExistingClient({
              title: newValue,
            });
            setValue({
              title: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Inform the parent that a new option is being added
            onNewOptionAdded(newValue.inputValue);
          } else if (newValue && newValue.title && newValue.title.startsWith('Add "')) {
            // Handle the case where the user selects the "Add" option
            const newClientName = newValue.title.slice(5, -1); // Extract the value without the "Add " prefix
            onNewOptionAdded(newClientName);
            setValue({
              title: newValue.inputValue,
            });
          } else {
            setExistingClient(newValue);
            setValue(newValue);
          }
        }}
        
        placeholder="Create or choose an existing client"
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
            // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option.title);
            if (inputValue !== '' && !isExisting) {
              filtered.push({
                inputValue,
                title: `Add "${inputValue}"`,
              });
            }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        freeSolo
        options={clients}
        getOptionLabel={(option) => {
          // When the option is a string, return it directly (this could be the inputValue for new options)
          if (typeof option === 'string') {
            return option;
          }
          // For options that are objects, check if they have 'inputValue' property, which is used for newly added options
          if (option.inputValue) {
            return option.inputValue;
          }
          // Return the full label for existing options with first_name and last_name
          return `${option.first_name} ${option.last_name}${option.companies ? ' - ' + option.companies.map(company => company.name).join(', ') : ''}`;
        }}
        
        renderOption={(props, option) => (
          <AutocompleteOption {...props}>
            {option.title?.startsWith('Add "') && (
              <ListItemDecorator>
                <Add />
              </ListItemDecorator>
            )}

            {option.inputValue 
              ? `Add "${option.inputValue}"`
              : `${option.first_name} ${option.last_name}${option.companies ? ' - Company: ' + option.companies.map(company => company.name).join(', ') : ''}`
            }

          </AutocompleteOption>
        )}
        sx={{ width: 300 }}
      />
    </FormControl>
  );
}

