import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete, { createFilterOptions } from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Add from '@mui/icons-material/Add';

const filter = createFilterOptions();

export default function AutoCompleteList({ auth, onNewOptionAdded }) {
  const [value, setValue] = React.useState(null);


console.log(auth.clients);
const clients = auth.clients;

  return (
    <FormControl id="free-solo-with-text-demo">
      <FormLabel>Client</FormLabel>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
              setValue({
                title: newValue,
              });
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              setValue({
                title: newValue.inputValue,
              });
  
              // Inform the parent that a new option is being added
              onNewOptionAdded(newValue.inputValue);
            } else {
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
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.title;
        }}
        renderOption={(props, option) => (
          <AutocompleteOption {...props}>
            {option.title?.startsWith('Add "') && (
              <ListItemDecorator>
                <Add />
              </ListItemDecorator>
            )}

            {option.title}
          </AutocompleteOption>
        )}
        sx={{ width: 300 }}
      />
    </FormControl>
  );
}

