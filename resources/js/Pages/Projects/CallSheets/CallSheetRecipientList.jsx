import Avatar from '@mui/joy/Avatar';

 import Checkbox from '@mui/joy/Checkbox';


export default function CallSheetRecipientList(){

    return(
        <div className='flex flex-col gap-4'>
            <table style={{ width: '100%' }} >
                <thead >
                    <tr className='text-slate-300 mb-4'>
                        <th colSpan="2" className='text-left'>Recipient</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Call Time</th>
                        <th>Documents</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='cursor-pointer shadow-sm overflow-hidden bg-white duration-500 text-slate-400 font-semibold hover:bg-slate-200'>
                        <td className='py-2 pl-6 rounded-tl-lg w-[2.5rem] rounded-bl-lg'>
                            <Checkbox 
                                label=" " 
                                variant="soft"
                                className=''
                                slotProps={{
                                    root: {
                                        sx: {
                                            display: 'flex',
                                            width: '2rem',
                                        }
                                    }
                                }}
                            />
                        </td>
                        <td className='py-2 px-4'>
                            <Avatar
                                slotProps={{
                                    root: {
                                        sx: {
                                            margin: '0 !important',
                                        }
                                    },
                                    fallback: {
                                        sx: {
                                            color: 'red',
                                        }
                                    }
                                }}
                            />
                        </td>
                        <td className='text-center'>
                            Director
                        </td>
                        <td className='text-center'>
                            elizagalevi23@gmail.com
                        </td>
                        <td className='text-center'>
                            (480) 773-1753
                        </td>
                        <td className='text-center'>
                            4:00 PM
                        </td>
                        <td className='rounded-tr-lg rounded-br-lg'>

                        </td>
                    </tr>
                </tbody>
            </table> 
            <div className='bg-slate-50 duration-500 transition-all cursor-pointer hover:bg-slate-200 group border-2 border-dashed hover:border-slate-300 h-[4rem] rounded-xl flex justify-center items-center'>
                <p className='duration-500 transition-all text-slate-300 group-hover:text-slate-500 font-semibold'>Add a recipient</p>
            </div> 
        </div>       

    );

}