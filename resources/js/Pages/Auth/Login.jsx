import { useState, useEffect } from 'react';
import Checkbox from '@/Components/Forms/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';

import { Link } from '@inertiajs/react';

import { inputGroupClass } from '@/Components/Scripts/Form';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import Input from '@/Components/Forms/Input';


export default function Login({ canResetPassword }) {
    const [data, setData] = useState({
        email: '',
        password: '',
        remember: false,
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
    
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            console.log(response);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed. Please try again.');
            }
    
            const responseData = await response.json();
            localStorage.setItem('token', responseData.token);
            window.location.href = '/dashboard';
        } catch (error) {
            // Set a user-friendly error message
            setErrors({ general: error.toString().includes('Failed to fetch') 
                        ? 'Network error, please try again later.' 
                        : error.message });
        } finally {
            setProcessing(false);
        }
    };   
        
    useEffect(() => {
        return () => {
            setData(currentData => ({ ...currentData, password: '' }));
        };
    }, []);
    
    const greeting = ['Welcome', <br key="linebreak"/>, 'Back!'];

    return (
        <GuestLayout
            greeting={greeting}
            imgUrl = '/images/background_images/bg_image_2.jpg'
        >
        {{
            body: (
                <div className='flex flex-col gap-4 h-full justify-between'>
                    <div className='flex flex-col gap-8 items-center h-full'>
                        <div className='w-full h-full flex flex-col gap-4'>
                            <div className={inputGroupClass}>
                                    <label htmlFor="email" value="email" className='text-gray-400 text-sm'> Email Address * </label>
                                    <Input
                                        id="email"
                                        title='Email'
                                        type="email"
                                        name="email"
                                        placeholder="indy@indianajones.com"
                                        value={data.email}
                                        autoComplete="username"
                                        onChange={handleInputChange}
                                        sx={{
                                            "--Input-focusedThickness": "1px",
                                            "--Input-minHeight": "56px",
                                            "--Input-paddingInline": "26px"
                                        }}
                                    />
                                </div>
                                <div className={inputGroupClass}>
                                    <label htmlFor="password" value="password" className='text-gray-400 text-sm'> Password * </label>
                                    <Input
                                        id="password"
                                        title='Password'
                                        type="password"
                                        name="password"
                                        placeholder="********"
                                        value={data.password}
                                        autoComplete="current-password"
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="text-left justify-between w-full flex flex-row gap-4">
                                    <div className="flex items-center">
                                        <label className="flex items-center">
                                            <Checkbox
                                                name="remember"
                                                checked={data.remember}
                                                onChange={(e) => setData('remember', e.target.checked)}
                                            />
                                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                        </label>
                                    </div>
                                    {canResetPassword && (
                                        <div className="text-right secondary-color">
                                            <Link
                                                href={route('password.request')}
                                                className="underline text-sm hover:primary-color rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Forgot your password?
                                            </Link>
                                        </div>
                                    )}
                            </div>


                            {errors.email && (
                                <div className='text-red-600 text-center p-4 bg-red-50 rounded-xl mt-6'>{errors.email}</div>
                            )}
                            
                        </div>
                    
                    </div>

                    {errors.general && (
                        <div className='text-red-600 text-center p-4 bg-red-50 rounded-xl my-4'>{errors.general}</div>
                    )}

                    <div className='flex flex-col gap-4'>
                        <div>
                            <PrimaryButton onClick={handleSubmit} disabled={processing}>
                                Login
                            </PrimaryButton>
                        </div>

                        <div>
                            <Link
                                href={route('register')}
                                className="text-sm secondary-color"
                            >
                                Don't have an account? Sign up!
                            </Link>
                        </div>
                    </div>

                </div>                   
             ),
        }}            
    </GuestLayout>

    );
}
