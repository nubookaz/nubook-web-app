import React, { useState } from 'react';
import { router } from '@inertiajs/react';

import Autocomplete, { createFilterOptions } from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';



const filter = createFilterOptions();

export default function ServiceTypeSelector({ serviceTypes, setServiceTypes, projectData, handleChange }) {

    const [value, setValue] = useState(projectData.service_types);
    const [open, toggleOpen] = useState(false);

    // Adjust as per your service type object structure
    const [dialogValue, setDialogValue] = useState({
        name: '', // Initialize with an empty string
        description: '',
    });

    const handleClose = () => {
        setDialogValue({ name: '',  description: '' });
        toggleOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await router.post(route('projects.create'), dialogValue);
            console.log(response.data); // Handle the response as needed
    
            // Optionally update local state or context to reflect the change
            // ...
    
            handleClose(); // Close the modal after successful submission
        } catch (error) {
            console.error("Error saving new service type:", error);
            // Handle errors (e.g., show error message to the user)
        }
    };
    

  
    return (
        <>
        <FormControl>
             <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        setTimeout(() => {
                            toggleOpen(true);
                            setDialogValue({ name: newValue, description: '' });
                            setServiceTypes({ name: newValue, description: '' });
                        });
                    } else if (newValue && newValue.inputValue) {
                        toggleOpen(true);
                        setDialogValue({ name: newValue.inputValue, description: '' });
                        setServiceTypes({ name: newValue.inputValue, description: '' });

                    } else {
                        setValue(newValue);
                    }
                }}
                
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: params.inputValue,
                            name: `Add "${params.inputValue}"`,
                        });
                    }
                    return filtered;
                }}
                
                options={serviceTypes}
                getOptionLabel={(option) => {
                    if (!option) return '';
                    if (Array.isArray(option) && option.length === 0) return '';
                    if (typeof option === 'object' && option.name) return option.name;
                    return option.toString();
                }}
                
                
                renderOption={(props, option) => (
                    <AutocompleteOption {...props}>{option.name}</AutocompleteOption>
                )}
                freeSolo
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                sx={{ width: 300 }}
            />
        </FormControl>

        <Modal open={open} onClose={handleClose}>
            <ModalDialog>
                <form onSubmit={handleSubmit}>
                    <Typography component="h2" level="inherit" fontSize="1.25em" mb="0.25em">
                        Add a New Service Type
                    </Typography>

                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel htmlFor="service-type-name">Service Type Name</FormLabel>
                            <Input
                                id="service-type-name"
                                type="text"
                                value={dialogValue.name || ''}
                                onChange={(event) => setDialogValue({ ...dialogValue, name: event.target.value })}
                                autoFocus
                            />
                        </FormControl>

                        {/* Include other fields as needed */}
                        {/* Example: Description Field */}
                        <FormControl>
                            <FormLabel htmlFor="service-type-description">Description</FormLabel>
                            <Input
                                id="service-type-description"
                                type="text"
                                value={dialogValue.description || ''}
                                onChange={(event) => setDialogValue({ ...dialogValue, description: event.target.value })}
                            />
                        </FormControl>

                        <Stack direction="row" justifyContent="flex-end" spacing={2}>
                            <Button variant="plain" color="neutral" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit">Add</Button>
                        </Stack>
                    </Stack>
                </form>
            </ModalDialog>
        </Modal>

    </>
    );
}

