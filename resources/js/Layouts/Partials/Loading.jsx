import Card from '@mui/joy/Card';
import Skeleton from '@mui/joy/Skeleton';
import Stack from '@mui/joy/Stack';
import AspectRatio from '@mui/joy/AspectRatio';
import CardContent from '@mui/joy/CardContent';

export default function Loading() {

    const currentUrl = window.location.href;

    return (
        <>
            <div id="surface-layer" className="absolute z-50 w-full">
                            
                <Card variant="outlined" sx={{ margin: '1.3rem 0rem 0rem 1.5rem', height: '96vh', width: '4.5rem' , borderRadius: '10px'  }}>
                    <div className='flex flex-col gap-4 justify-between h-full'>
                        <Skeleton variant="rectangular" width={40} height={40} /> 
                        <div className='flex flex-col gap-8'>
                            <Skeleton variant="rectangular" width={40} height={40} /> 
                            <Skeleton variant="rectangular" width={40} height={40} /> 
                            <Skeleton variant="rectangular" width={40} height={40} /> 
                        </div>
                        <Skeleton variant="circular" width={40} height={40} /> 
                    </div>
                </Card>

            </div>




            <div className="flex flex-col w-full h-screen overflow-hidden">

                {currentUrl.includes('/dashboard') ? (

                    <DashboardSkeleton />

                ):null }

            </div>


        </>
        
    );





    function DashboardSkeleton() {
        return (
            <div className="portal-body w-full h-full pt-6 pb-8 pl-[12.5rem] pr-[7rem]">
                <div id="dashboard-skeleton" className='flex flex-col w-full h-full gap-4'>
                    <Skeleton variant="rectangular" className='rouned-xl' sx={{ width: "100%", height: '250px' }}/>
                    <div className='flex flex-row gap-6 h-full'>
                        <Skeleton variant="rectangular" sx={{ height: "100%" }}/>     
                        <Skeleton variant="rectangular" sx={{ height: "100%" }}/>
                        <Skeleton variant="rectangular" sx={{ height: "100%" }}/>
                    </div>

                </div>
            </div>

          
        );
      }



}