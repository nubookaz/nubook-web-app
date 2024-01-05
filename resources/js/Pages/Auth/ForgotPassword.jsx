import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/Forms/InputError';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import TextInput from '@/Components/Forms/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>

            {{

                form:(

                    <>
                        {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                        <label htmlFor="email" value="email" className='text-gray-400 text-sm'> Email Address * </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </>

                ),
                footer:(
                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ml-4" disabled={processing}>
                            Email Password Reset Link
                        </PrimaryButton>
                    </div>
                )

            }}
        
        </GuestLayout>
    );
}
