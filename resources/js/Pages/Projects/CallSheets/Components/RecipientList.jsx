import { useModal } from '@/Components/Contexts/ModalContext';

import CardContainer from '@/Components/Containers/CardContainer';
import Avatar from '@mui/joy/Avatar';


export default function RecipientList({

    className

}){
    const { toggleDrawer } = useModal();
    const handleRecipientListClick = () => {
        toggleDrawer('recipientForm');  
    };

    return(
        <CardContainer className={` ${className} h-full flex flex-col`} header="Recipients" onClick={handleRecipientListClick} >
            <div className='flex flex-row gap-2 items-center py-2 px-6 shadow-sm rounded-lg bg-white justify-between'>
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
                <div className='text-left grow ml-4 text-md font-bold flex flex-col w-full justify-start text-slate-500'>
                    Levi Elizaga
                </div> 
                <div className='leading-[1.15rem] text-md font-bold flex flex-col text-slate-500'>   
                    <span className='text-xs font-normal text-slate-400'>Position</span>
                    Director
                </div>
                <div className='leading-[1.15rem] shrink w-full justify-end text-right text-md font-bold flex flex-col text-slate-500'>   
                    <span className='text-xs font-normal text-slate-400'>Call Time</span>
                    4:00 PM
                </div>
                <div className='text-emerald-500 w-full justify-end text-right text-md font-bold flex flex-col'>   
                    Confirmed
                </div>
            </div>
        </CardContainer>
    );

}