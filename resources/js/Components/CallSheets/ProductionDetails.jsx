import CardContainer from '@/Components/Containers/CardContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {  faCalendarDays } from '@fortawesome/free-solid-svg-icons';


import Weather from '@/Components/CallSheets/Weather';


export default function ProductionDetails({ data, onEditProductionDetails }){

 
    function formatDateWithDay(dateString) {
        const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const date = data.call_sheet_date;
    const city = data.locations.length > 0 ? data.locations[0].city : '';
    const street_address = data.locations.length > 0 ? data.locations[0].street_address : '';
    const zip_code = data.locations.length > 0 ? data.locations[0].zip_code : '';
    const country = data.locations.length > 0 ? data.locations[0].country : '';


    const productionDetailsList = () => [
        { 
            label: 'Edit Production Details', 
            onClick: () => onEditProductionDetails(),
        },
    ];
 
 
    return(

        <CardContainer className="" header="Production Date" showButtonIcon={true} menuItems={productionDetailsList()} >
            <div className="flex flex-col gap-4">
                <div className="text-2xl primary-color flex flex-row gap-4 font-semibold">
                    <FontAwesomeIcon icon={faCalendarDays} className="primary-green-color my-auto" />
                    <p className='primary-color'>{formatDateWithDay(data.call_sheet_date)}</p>
                </div>
                <div className='bg-slate-50 p-6 rounded-2xl secondary-color h-full min-h-[9.5rem] w-full'>
                    <Weather street_address="5657 W Blackhawk Dr" zip_code={zip_code} date={date} country={country} />
                </div>
            </div>
        </CardContainer>

    );

}

