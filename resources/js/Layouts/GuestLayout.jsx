import CardContainer from '@/Components/Containers/CardContainer';
import ImageContainer from '@/Components/Containers/ImageContainer';
import ApplicationName from "@/Components/Branding/ApplicationName";
import MovieFacts from '@/Components/Layouts/MovieFacts';

export default function Guest({ children, auth }) {





    return (



        

        <div className="min-h-screen">
           <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: 'url("/images/background_images/guest_image_1.jpg")' }}>
                <div className="overlay">
                    <div className='floating-form flex flex-row justify-center items-center h-full'>

                        <ImageContainer isPoster={true}>
                            <div className='flex flex-col gap-4 h-full w-full'>
                                <h2 className="">
                                    Did you know?
                                </h2>
                                <ImageContainer isPoster={false} className="h-full grow" backgroundImage="/images/background_images/bg_image_2.jpg">
                                    {/* Your content here */}
                                </ImageContainer>
                                <MovieFacts></MovieFacts>
                            </div>
                        </ImageContainer>

                        <CardContainer className="form-container !gap-2 justify-between flex flex-col">
                            <ApplicationName />
                            <p className="secondary-color text-base">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, aliquam tenetur consequuntur earum dignissimos corporis voluptates tempore perferendis laborum.</p>

                            <h1 className="primary-color mb-4 text-4xl">Welcome! Sign up for an account.</h1>

                            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                            
                            <div className='grow'>
                                 {children.form}
                            </div>

                            
                            <div className='justify-end'>
                                {children.footer}
                            </div>

                        </CardContainer>

                    </div>
                </div>
            </div>
        </div>







    );
}
