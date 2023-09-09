import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/Forms/InputError';
import InputLabel from '@/Components/Forms/InputLabel';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import TextInput from '@/Components/Forms/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import CardContainer from '@/Components/Containers/CardContainer';
import ImageContainer from '@/Components/Containers/ImageContainer';

import { faEnvelope, faKey, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

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

                        <CardContainer className="form-container">
                        <h2 className="logo-name mb-8">Nubook</h2>

                        <p className="secondary-color text-base mb-10">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, aliquam tenetur consequuntur earum dignissimos corporis voluptates tempore perferendis laborum, rem iste at, eligendi totam doloremque tempora esse illum perspiciatis autem.</p>

                        <h1 className="primary-color mb-10 text-4xl">Welcome! Sign up for an account.</h1>

                        {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                            
                        <form onSubmit={submit}>
                            <div>
                                <TextInput
                                    id="name"
                                    name="name"
                                    placeholder="Your Name"
                                    value={data.name}
                                    icon={faUser}
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />

                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={data.email}
                                    icon={faEnvelope}
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />

                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={data.password}
                                    icon={faKey}
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />

                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    placeholder="password_confirmation"
                                    value={data.password_confirmation}
                                    icon={faKey}
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />

                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-end mt-16">
                                <Link
                                    href={route('login')}
                                    className="underline text-sm text-gray-600 text-left hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Already registered?
                                </Link>

                                <PrimaryButton className="ml-4" disabled={processing}>
                                    Register
                                </PrimaryButton>
                            </div>
                        </form>

                        </CardContainer>

                    </div>

                </div>
            </div>

            
        </GuestLayout>
    );
}
