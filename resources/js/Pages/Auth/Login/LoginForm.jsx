
<form onSubmit={submit}>
                                 <div>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                        sx={{
                                            "--Input-focusedThickness": "1px",
                                            "--Input-minHeight": "56px",
                                            "--Input-paddingInline": "26px"
                                        }}
                                    />
                                </div>
                                <div className="mt-4">
                    
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            autoComplete="current-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />

                                </div>
                                <div className="block mt-4 flex justify-between items-center">
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

                                <div className="flex items-center justify-start my-16">

                                    <SecondaryButton className="ml-4" disabled={processing}>
                                        Log in
                                    </SecondaryButton>
                                </div>

                                <div>
                                    <Link href={route('register')} className="text-sm secondary-color">Don’t have an account? Sign up!</Link>
                                </div>
                            </form>