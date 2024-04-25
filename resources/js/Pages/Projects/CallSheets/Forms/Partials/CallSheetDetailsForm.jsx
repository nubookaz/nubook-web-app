import Input from '@/Components/Forms/Input';
import Time from '@/Pages/Profile/Forms/Time';
import DatePicker from 'react-datepicker';


export default function CallSheetDetailsForm({

    callSheetName,
    handleChange,
    handleDateChange,
    handleTimeChange,
    generalCallTime,
    startDate,

}){

    return (
        <>
            <Input
                required
                title="Call Sheet Name"
                label="Call Sheet Name"
                type="text"
                name="call_sheet_name"
                value={callSheetName}
                placeholder="Day 1 - Scenes 1,4,5 @ Ark"
                onChange={handleChange}
            />

            <div className='flex flex-row gap-6 h-full'>

                <div className='w-full flex flex-col gap-2 h-full'>
                    <label className='text-gray-400 text-sm'>Call Sheet Date</label>
                    <div className='w-full flex h-full'>
                        <DatePicker
                            selected={startDate}
                            onChange={handleDateChange}
                            dateFormat="MMM d, yyyy"
                            className='my-datepicker-class'
                        />
                    </div>
                </div>
                
                <div className='w-full flex flex-col gap-2 h-full max-w-[18rem]'>
                    <label className='text-gray-400 text-sm'>Call Time</label>
                    <Time initialTime={generalCallTime} onTimeChange={handleTimeChange} />
                </div>
            </div>
        </>
    );

}