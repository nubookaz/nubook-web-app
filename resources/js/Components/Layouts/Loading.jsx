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
                            
                <Card variant="outlined" sx={{ height: '100vh', width: '4.5rem' , borderRadius: 0, '--Card-radius': 0  }}>
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

                <div id="banner-skeleton" >
                    <div className='w-full'>
                        <Card variant="outlined" sx={{ height: 220, borderRadius: 0, '--Card-radius': 0  }}>
                            <div className='absolute w-full'>
                                <div className='flex flex-row gap-8 justify-between pl-20 pr-10'>
                                    <Stack spacing={4} useFlexGap>
                                        <AspectRatio ratio="50/4" sx={{ width: 500 }}>
                                            <Skeleton variant="overlay" />
                                        </AspectRatio>                    
                                        <div className='flex flex-row gap-8'>
                                            <Skeleton variant="circular" width={180} height={180} />
                                            <CardContent sx={{ gap: 0.5, mt: 3 }}>
                                                <Skeleton level="body-xs" variant="text" width="92%" />
                                                <Skeleton level="body-xs" variant="text" width="99%" />
                                                <Skeleton level="body-xs" variant="text" width="96%" />
                                            </CardContent>
                                        </div>
                                    </Stack>
                                    <div className='flex flex-col gap-8'>
                                        <div className='flex flex-row gap-8 justify-end'>
                                            <Skeleton variant="rectangular" sx={{ my: 'auto', width:180, height: 20 }} />
                                            <Skeleton variant="rectangular" sx={{ width:200, height: 40, borderRadius: '100px'}} />
                                        </div>
                                        <div className='flex flex-row gap-20 mt-[5.5rem] mr-[10rem] justify-start'>
                                            <Skeleton variant="rectangular" width={60} height={60} />      
                                            <Skeleton variant="rectangular" width={60} height={60} />      
                                            <Skeleton variant="rectangular" width={60} height={60} />      
                                            <Skeleton variant="rectangular" width={60} height={60} />      
                                            <Skeleton variant="rectangular" width={60} height={60} />      
                                        </div>         
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {currentUrl.includes('/dashboard') ? (

                    <DashboardSkeleton />

                ):null }

            </div>


        </>
        
    );





    function DashboardSkeleton() {
        return (
            <div className="portal-body w-full h-full pt-6 pb-8 pl-[12.5rem] pr-[7rem]">
                <div id="dashboard-skeleton" className='flex flex-row w-full mt-10 gap-6'>
                    <Skeleton variant="rectangular" sx={{ height: "900px" }}/>
                    <Skeleton variant="rectangular" sx={{ height: "900px" }}/>     
                    <Skeleton variant="rectangular" sx={{ height: "900px" }}/>
                    <Skeleton variant="rectangular" sx={{ height: "900px" }}/>
                </div>
            </div>

          
        );
      }



}