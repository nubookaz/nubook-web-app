import React, { useState, useEffect } from 'react';
import { useClients } from '@/Components/Contexts/ClientContext';  

import EmptyContent from '@/Components/Layouts/EmptyContent';
import Autocomplete, { createFilterOptions } from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import FormControl from '@mui/joy/FormControl';
import Address from '@/Pages/Profile/Forms/Address'; 
import Phone from '@/Pages/Profile/Forms/Phone';
import UserName from '@/Pages/Profile/Forms/UserName';

const filter = createFilterOptions();

const project_stages = ['Planning', 'Pre-production', 'Production', 'Post-production', 'Completed'];
const project_statuses = ['Active', 'On Hold', 'Cancelled', 'Completed'];
const currencyTypes = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'];
const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    AUD: 'A$',
    CAD: 'C$',
};

const formatBudget = (value, currency) => {
    let formattedValue = value.replace(/\D/g, '');
    if (currency === 'JPY') {
        formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
        formattedValue = (formattedValue / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    return formattedValue;
};

const VideoAdditionalDetails = ({ additionalVideoDetails, setAdditionalVideoDetails, selectedClientIds, setSelectedClientIds }) => {
    const { clients } = useClients();  
    const [value, setValue] = useState(null);
    const [currency, setCurrency] = useState('USD');
    const [isAddingNewClient, setIsAddingNewClient] = useState(false);  
    const [emptyFields, setEmptyFields] = useState({ first_name: false, last_name: false });

    const handleClientSelect = (clientId) => {
        setSelectedClientIds(prevSelectedClientIds => {
            if (prevSelectedClientIds.includes(clientId)) {
                return prevSelectedClientIds.filter(id => id !== clientId);
            } else {
                return [...prevSelectedClientIds, clientId];
            }
        });
    };

    useEffect(() => {
        setAdditionalVideoDetails(prevDetails => ({
            ...prevDetails,
            selectedClientIds: selectedClientIds
        }));
    }, [selectedClientIds, setAdditionalVideoDetails]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'projectBudget') {
          // Format the budget using the current currency or default to USD
          const formattedValue = formatBudget(value, currency || 'USD');
          setAdditionalVideoDetails(prev => ({
            ...prev,
            [name]: formattedValue,
            // Store the corresponding symbol for the current or default currency
            currencySymbol: currencySymbols[currency] || currencySymbols['USD'],
          }));
        } else {
          setAdditionalVideoDetails(prev => ({
            ...prev,
            [name]: value,
          }));
        }
    };
    
    const handleCurrencyChange = (e) => {
        const newCurrency = e.target.value || 'USD'; // Default to USD if no value
        setCurrency(newCurrency);
    
        // Update the project budget based on the new or default currency
        const formattedValue = formatBudget(additionalVideoDetails.projectBudget || '0', newCurrency);
        setAdditionalVideoDetails(prev => ({
          ...prev,
          projectBudget: formattedValue,
          // Store the corresponding symbol for the new or default currency
          currencySymbol: currencySymbols[newCurrency],
        }));
    };
    
    

      const handleChange = (event, newValue, reason) => {
        if (newValue && newValue.inputValue) {
            setIsAddingNewClient(true);
            setValue(newValue.inputValue); 
        } else if (reason === 'clear') {
            setIsAddingNewClient(false);
            setValue('');
        } else {
            setIsAddingNewClient(false);
            setValue(newValue ? `${newValue.first_name} ${newValue.last_name}` : '');
            setAdditionalVideoDetails(prev => ({
              ...prev,
              client: newValue ? `${newValue.first_name} ${newValue.last_name}` : '',
            }));
        }
    };

    const renderClientCards = () => {
        if (isAddingNewClient || !clients || clients.length === 0) return null;
    
        // Sort clients by first name, falling back to company name if the first name is not available
        const sortedClients = [...clients].sort((a, b) => {
            const nameA = a.first_name || a.company || '';
            const nameB = b.first_name || b.company || '';
            return nameA.localeCompare(nameB);
        });
    
        const recentlyAddedClients = sortedClients.slice(0, 4);
        const existingClients = sortedClients.slice(4);
    
        const renderCards = (clientList) => clientList.map((client, index) => (
            <div key={client.id || index}>
                <div
                    className={`w-full cursor-pointer px-4 py-[.5rem] rounded-xl duration-500 transition-all ${selectedClientIds.includes(client.id) ? 'border-emerald-500 border-2 shadow-md bg-emerald-50' : 'border-2 border-white bg-slate-50'}`}
                    onClick={() => handleClientSelect(client.id)}>
                    <div className='flex flex-row gap-8'>
                        <div className='rounded-full shadow-sm w-[4.2rem] h-[3rem] bg-white my-auto'><span className='font-light text-lg flex justify-center items-center text-center h-full'>JD</span></div>
                        <div className='flex flex-row gap-2 w-full my-auto'>
                            <div className='w-full'>
                                <h3 className={`text-lg font-semibold ${selectedClientIds.includes(client.id) ? 'text-emerald-500' : 'text-slate-400'}`}>{client.first_name ? `${client.first_name} ${client.last_name}` : client.company}</h3>
                                {client.first_name && <p className='text-sm'>{client.company}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
    
        return (
            <div className='relative'>
                <div className='text-center mb-6 '>
                    <h2 className='text-slate-500 text-xl'>Add a Client to your project</h2>
                    <p>Choose clients below to attach this project to</p>
                </div>
                <div className='mb-2 text-center'>
                    {recentlyAddedClients.length > 0 && <h2 className='text-slate-500 font-semibold'>Recently Added Clients</h2>}
                </div>
                <div className='grid grid-cols-2 gap-2 px-2 pb-2'>
                    {renderCards(recentlyAddedClients)}
                </div>
    
                {existingClients.length > 0 && (
                    <>
                        <div className='mb-2 text-center mt-4'>
                            <h2 className='text-slate-500 font-semibold'>Existing Clients</h2>
                        </div>
                        <div className='w-full h-[3rem] bottom-0 absolute z-10 bg-gradient-to-t from-white to transparent'></div>
                        <div className='max-h-[26rem] overflow-scroll grid grid-cols-2 gap-2 px-2 pb-[2.5rem]'>
                            {renderCards(existingClients)}
                        </div>
                    </>
                )}
            </div>
        );
    };
    

    const renderNewClientCard = (firstName) => {
        
        const handleNameChange = (updatedName) => {
            setAdditionalVideoDetails(prevDetails => ({
                ...prevDetails,
                client: updatedName.first_name, 
            }));
        };
    
        if (!firstName) {
            return null;
        }
        
        return (
            <div className=' w-full h-full relative'>
                <div className='rounded-full w-[7.5rem] h-[7.5rem] bg-slate-200 mx-auto absolute z-40 left-[50%] -translate-x-2/4 -top-[4rem] border-4 shadow-md border-white'></div>
                <div className='bg-white shadow-2xl flex flex-col gap-4 pt-[5rem] h-full w-full max-w-[30rem] mx-auto rounded-2xl px-6 py-2 mt-[3rem]'>
                    <UserName
                        data={{ first_name: firstName, middle_initial: '', last_name: '' }}
                        onNameChange={handleNameChange}
                        emptyFields={emptyFields}
                        setEmptyFields={setEmptyFields}
                        inputClassName={`!py-[.5rem]`}
                    />
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">Company</label>
                        <input 
                            type="text" 
                            name="company" 
                            placeholder="Company" 
                            value={additionalVideoDetails.clientTitle || ''} 
                            onChange={handleInputChange} 
                            className="w-full border border-gray-300 rounded-md !py-[.5rem]" 
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            placeholder="Title" 
                            value={additionalVideoDetails.clientTitle || ''} 
                            onChange={handleInputChange} 
                            className="w-full border border-gray-300 rounded-md !py-[.5rem]" 
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
                        <input 
                            type="text" 
                            name="email" 
                            placeholder="Email Address" 
                            value={additionalVideoDetails.clientEmail || ''} 
                            onChange={handleInputChange} 
                            className="w-full border border-gray-300 rounded-md !py-[.5rem]" 
                        />
                    </div>
                    <div>
                        <button>Cancel</button>
                    </div>
                </div>
            </div>
        );
    };
    
    const getOptionLabel = (option) => {
        if (option.inputValue) {
            return `Add "${option.inputValue}"`;
        }
        else if (option.first_name && option.last_name) {
            return `${option.first_name} ${option.last_name}`;
        }
        else if (typeof option === 'string') {
            return option;
        }
        return 'Unknown';
    };
    
    return (
        <div className='flex flex-row gap-10 w-full h-full'>
            <div className='w-[55%] my-auto'>
                {isAddingNewClient ? renderNewClientCard(value) : clients && clients.length > 0 ? renderClientCards() : (
                    <EmptyContent
                        className='saturate-0'
                        imageUrl='/client.svg'
                        svgClass='max-w-[12rem]'
                    >
                        {{
                            description: (
                                <p className='text-slate-300 max-w-[22rem]'>You have not entered a production schedule yet. Add one now!</p>
                            )
                        }}
                    </EmptyContent>
                )}
            </div>
            <div className="flex flex-col gap-6 w-[45%] justify-center">
                <div className='mb-6'>
                    <FormControl>
                        <label className="block text-gray-700 text-sm font-bold" htmlFor="clients">Client</label>
                        <p className='text-sm mb-2 text-slate-400'>Type a clients name to associate this project to a client or add a new one!</p>
                        <Autocomplete
                            value={value}
                            onChange={handleChange}
                            placeholder='Steve Jobs - Apple, Inc'
                            filterOptions={(options, params) => {
                                const filtered = filter(options, params);
                                const { inputValue } = params;

                                const isExisting = options.some(option => `${option.first_name} ${option.last_name}` === inputValue);
                                
                                if (inputValue !== '' && !isExisting) {
                                    filtered.push({
                                        inputValue,
                                        first_name: "Add",
                                        last_name: `"${inputValue}"`,
                                        id: `add-${inputValue}`,
                                    });
                                }
                                return filtered;
                            }}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            options={clients}
                            getOptionLabel={getOptionLabel}
                            renderOption={(props, option) => (
                                <AutocompleteOption {...props} key={option.id}>
                                    {option.first_name && option.last_name ? `${option.first_name} ${option.last_name}` : 'Unknown'}
                                </AutocompleteOption>
                            )}
                            freeSolo
                        />
                    </FormControl>
                </div>
                <div className='flex flex-row gap-4 w-full'>
                    <div className='w-1/2'>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="project_stage">Project Stage <span className='text-rose-500'>*</span></label>
                        <select 
                            name="project_stage" 
                            onChange={handleInputChange} 
                            value={additionalVideoDetails.project_stage || ''} 
                            className="w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="" disabled>Select a Project Stage</option>
                            {project_stages.map(stage => (
                                <option key={stage} value={stage}>{stage}</option>
                            ))}
                        </select>
                    </div>

                    <div className='w-1/2'>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="project_status">Project Status <span className='text-rose-500'>*</span></label>
                        <select 
                            name="project_status" 
                            onChange={handleInputChange} 
                            value={additionalVideoDetails.project_status || ''} 
                            className="w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="" disabled>Select a Project Status</option>
                            {project_statuses.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='w-full'>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="filmingDays">Filming Days</label>
                    <input 
                        type="number" 
                        name="filmingDays" 
                        placeholder="Filming Days" 
                        value={additionalVideoDetails.filmingDays || ''} // Controlled component
                        onChange={handleInputChange} 
                        className="w-full border border-gray-300 rounded-md" 
                    />
                </div>

                <div className='w-full flex flex-row gap-2 items-center mb-6'>
                    <div className="w-2/3">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectBudget">Project Budget</label>
                        <div className="flex">
                            <span className="items-center w-[3rem] justify-center flex text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                                {currencySymbols[currency]}
                            </span>
                            <input 
                                type="text" 
                                name="projectBudget" 
                                placeholder='2,000,000'
                                value={additionalVideoDetails.projectBudget || ''} 
                                onChange={handleInputChange} 
                                className="w-full border border-rose-300 rounded-r-2xl rounded-l-none"
                            />
                        </div>
                    </div>
                    <div className="w-1/3">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currency">Currency</label>
                        <select name="currency" value={currency} onChange={handleCurrencyChange} className="w-full border border-gray-300 rounded-md">
                            {currencyTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoAdditionalDetails;
