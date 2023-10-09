import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import CardContainer from '@/Components/Containers/CardContainer';
import ImageContainer from '@/Components/Containers/ImageContainer';

import RegistrationEmail from '@/Pages/Auth/Registration/RegistrationEmail';

import { faEnvelope, faKey, faUser } from '@fortawesome/free-solid-svg-icons';






export default function Register() {
    const [isValidStepOne, setIsValidStepOne] = useState(false);
    const [registrationComplete, setRegistrationComplete] = useState(false);
    const { data: formData, setData: setFormData } = useForm({
        email: '',
        password: '',
        password_confirmation: '',
        // other fields...
    });
    const [errorText, setErrorText] = useState('');

    const handleVerification = async () => {
        try {
          await verifyEmail();
        } catch (error) {
          setErrorText(error);
        }
    };

    const verifyEmail = () => {
        return new Promise((resolve, reject) => {
          let errorMessage = '';
      
          axios
            .post(route('register'), {
              email: formData.email,
              password: formData.password,
              password_confirmation: formData.password_confirmation,
            })
            .then((response) => {
              console.log('Registration response:', response);
              if (response.data.success) {
                setRegistrationComplete(true);
                resolve('Verification email sent successfully');
              } else {
                errorMessage = response.data.error || 'Error during registration';
                console.error('Error:', errorMessage);
                reject(errorMessage);
              }
            })
            .catch((error) => {
              errorMessage = 'Error during registration';
              console.error('Error registering user:', error);
              reject(errorMessage);
            });
        });
    };
      
    



    
    // const prevStep = () => {
    //     setCurrentStep((prevStep) => prevStep > 1 ? prevStep - 1 : prevStep);
    // };

    // const submitForm = () => {
    //     // Add your logic to submit the form data
    //     // For example, you can call an API endpoint here
    //     console.log('Form submitted!');
    // };


    // const buttonText = currentStep === 4 ? 'Register' : 'Next';












    return (
        <GuestLayout>

             <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: 'url("./images/background_images/guest_image_1.jpg")' }}>
                <div className="overlay">
                    <div className='floating-form flex flex-row justify-center items-center h-full'>

                        <ImageContainer isPoster={true} className="my-auto">
                                <h2 className="mb-4">
                                    Did you know?
                                </h2>
                                <ImageContainer isPoster={false} className="mb-4 !h-[28rem]" backgroundImage="./images/background_images/bg_image_2.jpg">
                                    {/* Your content here */}
                                </ImageContainer>
                                <h3>
                                    TARS, the AI machine in Interstellar, is real.
                                </h3>
                                <p className="p-base mt-2">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos beatae fugiat doloribus, provident aperiam, atque qui optio illum earum vel quasi molestiae est veniam mollitia fuga et, ipsum dicta sunt!
                                </p>
                        </ImageContainer>

                        <CardContainer className="form-container flex flex-col justify-between">
                            <h2 className="logo-name">Nubook</h2>

                            <p className="secondary-color text-base">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, aliquam tenetur consequuntur earum dignissimos corporis voluptates tempore perferendis laborum, rem iste at, eligendi totam doloremque tempora esse illum perspiciatis autem.</p>

                            <h1 className="primary-color mb-4 text-4xl">Welcome! Sign up for an account.</h1>

                            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                            
                            <div className='min-h-[20rem]'>
                                {registrationComplete ? (
                                    <div>
                                        <p>Please check your email to complete the registration process.</p>
                                        {/* You can add more details or instructions here */}
                                    </div>
                                ) : (
                                    <RegistrationEmail formData={formData} setFormData={setFormData} setIsValidStepOne={setIsValidStepOne} verifyEmail={verifyEmail} />
                                    {errorText && <div style={{ color: 'red' }}>{errorText}</div>}

                                )}
                            </div>

                            <div className='justify-end'>
                                <div className="justify-end">
                                    <SecondaryButton onClick={verifyEmail} disabled={!isValidStepOne}>
                                        Register
                                    </SecondaryButton>
                                </div>
                            </div>

                            <div>
                                    <Link
                                        href={route('login')}
                                        className="text-sm secondary-color"
                                    >
                                        Already registered?
                                    </Link>
                            </div>

                        </CardContainer>

                    </div>
                </div>
            </div>

            
        </GuestLayout>
    );
}
