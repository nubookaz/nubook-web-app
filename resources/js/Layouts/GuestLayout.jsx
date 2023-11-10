import CardContainer from '@/Components/Containers/CardContainer';
import ImageContainer from '@/Components/Containers/ImageContainer';


export default function Guest({ children, auth }) {





    return (



        

        <div className="min-h-screen">
           <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: 'url("/images/background_images/guest_image_1.jpg")' }}>
                <div className="overlay">
                    <div className='floating-form flex flex-row justify-center items-center h-full'>

                        <ImageContainer isPoster={true} className="my-auto">
                                <h2 className="mb-4">
                                    Did you know?
                                </h2>
                                <ImageContainer isPoster={false} className="mb-4 !h-[28rem]" backgroundImage="/images/background_images/bg_image_2.jpg">
                                    {/* Your content here */}
                                </ImageContainer>
                                <h3>
                                    TARS, the AI machine in Interstellar, is real.
                                </h3>
                                <p className="p-base mt-2">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos beatae fugiat doloribus, provident aperiam, atque qui optio illum earum vel quasi molestiae est veniam mollitia fuga et, ipsum dicta sunt!
                                </p>
                        </ImageContainer>

                        <CardContainer className="form-container !gap-2 justify-between">
                            <h2 className="logo-name">Nubook</h2>
                            <p className="secondary-color text-base">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, aliquam tenetur consequuntur earum dignissimos corporis voluptates tempore perferendis laborum.</p>

                            <h1 className="primary-color mb-4 text-4xl">Welcome! Sign up for an account.</h1>

                            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                            
                            <div className='mt-6 min-h-[23rem]'>
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
