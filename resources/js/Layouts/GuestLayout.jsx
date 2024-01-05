import CardContainer from '@/Components/Containers/CardContainer';
import ImageContainer from '@/Components/Containers/ImageContainer';
import ApplicationName from "@/Components/Branding/ApplicationName";
import MovieFacts from '@/Components/Layouts/MovieFacts';

export default function Guest({ children, auth }) {





    return (


        <div className="min-h-screen">
           <div className='absolute z-50'>
                {children.surface}
           </div>
           <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: 'url("/images/background_images/guest_image_1.jpg")' }}>
                <div className="absolute h-full w-full z-40 bg-black/50"></div>

                <div className='absolute floating-form flex flex-row justify-center items-center h-full z-50 w-full m-auto'>

                    <CardContainer className='!bg-black max-w-[32rem] py-8 pl-6 pr-14 -mr-8'>
                        <div className='flex flex-col gap-4 h-full w-full text-center'>
                            <h2 className="text-white">
                                Did you know?
                            </h2>
                            <ImageContainer isPoster={false} className="w-full h-[30rem] max-w-[20rem] justify-center mx-auto" backgroundImage="/images/background_images/bg_image_2.jpg">
                                {/* Your content here */}
                            </ImageContainer>
                            <MovieFacts></MovieFacts>
                        </div>
                    </CardContainer>

                    <CardContainer className="form-container !gap-2 justify-between flex flex-col">
                        <ApplicationName />
 
                        <h1 className="primary-color mb-4 text-4xl">Welcome! Sign up for an account.</h1>

                        {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                        
                        <div className='grow h-full'>
                                {children.form}
                        </div>

                        
                        <div className='justify-end'>
                            {children.footer}
                        </div>

                    </CardContainer>

                </div>
            </div>
        </div>







    );
}
