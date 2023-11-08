import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Checkbox from '@/Components/Forms/Checkbox';


export default function LoginForm({ canResetPassword, onUpdateLoginInfo }) {

    const { data, setData, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);


    const handleChange = (field, value) => {
        setData(field, value);
    
        // Notify the parent about the updated login info
        onUpdateLoginInfo({
            ...data,
            [field]: value,
        });
    };



    return (
        <div>
            <div>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder='Email Address'
                    value={data.email}
                    autoComplete="email"
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                />
            </div>
            <div className="mt-4">

                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder='Password'
                    value={data.password}
                    autoComplete="current-password"
                    onChange={(e) => handleChange('password', e.target.value)}
                    required
                />

            </div>
            <div className="block mt-4 flex justify-between items-center">
                <div className="flex items-center">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => handleChange('remember', e.target.checked)}
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

        </div>

    );
}