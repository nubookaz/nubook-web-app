import React from 'react';
import DrawerPanel from '@/Components/Layouts/DrawerPanel';


export default function PrivacyPolicy({

    ...props

}){

    const { isDrawerPanelOpen, toggleDrawerPanel } = props;

 

    return (

        <DrawerPanel
            isDrawerPanelOpen={isDrawerPanelOpen}
            toggleDrawerPanel={toggleDrawerPanel}
            anchor='bottom'
            size='lg'
            showCloseButton='true'
            sxCustom={[
                {
                    '--Drawer-verticalSize': 'clamp(500px, 98%, 100%)',
                }
            ]}
        >
            {{
                body:(

                    <div className='flex flex-col gap-4 w-full max-w-[60rem] mx-auto'>
                        <div className='text-center flex flex-col gap-2'>
                            <h1>Privacy Policy for Nubook</h1>
                            <p className='text-sm'>Last Updated: December 26th, 2023</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h2 className='text-md'>Introduction</h2>
                            <p className='text-md'>Welcome to <strong>Nubook</strong>. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our app. We are committed to protecting your privacy and handling your data in an open and transparent manner.</p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <h3 className='text-md'>Information We Collect</h3>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h4 className='text-lg'>Personal Information</h4>
                            <ul className='list-disc ml-10 text-md text-slate-400'>
                                <li>Name, email address, and contact details</li>
                                <li>Date of birth and gender</li>
                                <li>Geolocation data</li>
                                <li>Other personal details you choose to provide</li>
                            </ul>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h4 className='text-lg'>Technical and Usage Information</h4>
                            <ul className='list-disc ml-10 text-md text-slate-400'>
                                <li>IP address and device identifiers</li>
                                <li>App usage data and preferences</li>
                                <li>Browser type and operating system</li>
                                <li>Information collected via cookies and similar technologies</li>
                            </ul>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <h3 className='text-md'>How We Collect Information</h3>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h4 className='text-lg'>Information You Provide</h4>
                            <ul className='list-disc ml-10 text-md text-slate-400'>
                                <li>Account registration details</li>
                                <li>Profile setup and preferences</li>
                                <li>Customer service interactions</li>
                                <li>Participation in surveys or contests</li>
                            </ul>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h4 className='text-lg'>Automatically Collected Information</h4>
                            <ul className='list-disc ml-10 text-md text-slate-400'>
                                <li>Technical data from your device</li>
                                <li>Usage statistics and analytics</li>
                            </ul>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h4 className='text-lg'>Information from Third Parties</h4>
                            <ul className='list-disc ml-10 text-md text-slate-400'>
                                <li>Social media integrations</li>
                                <li>Data from advertising partners</li>
                            </ul>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <h3 className='text-md'>Use of Your Information</h3>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h4 className='text-lg'>We use the information collected to:</h4>
                            <ul className='list-disc ml-10 text-md text-slate-400'>
                                <li>Provide, maintain, and improve our app</li>
                                <li>Personalize your user experience</li>
                                <li>Communicate with you about updates and services</li>
                                <li>Conduct research and analytics</li>
                                <li>Enforce our terms, conditions, and policies</li>
                            </ul>
                        </div>


                        <div className='flex flex-col gap-2'>
                            <h3 className='text-md'>Sharing of Your Information</h3>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h4 className='text-lg'>We may share information with:</h4>
                            <ul className='list-disc ml-10 text-md text-slate-400'>
                                <li>Service providers and business partners</li>
                                <li>Affiliates and subsidiaries</li>
                                <li>In connection with a merger, acquisition, or asset sale</li>
                                <li>For legal reasons or in the event of a dispute</li>
                            </ul>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <h3 className='text-md'>International Data Transfers</h3>
                            <p className='text-md'>Your information may be transferred to, stored, and processed in countries other than your own. We ensure such transfers comply with legal requirements and are safeguarded appropriately.</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h3 className='text-md'>Data Security</h3>
                            <p className='text-md'>We implement robust security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. These include encryption, access controls, and secure data storage.</p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <h3 className='text-md'>Your Rights</h3>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h4 className='text-lg'>You have the right to:</h4>
                            <ul className='list-disc ml-10 text-md text-slate-400'>
                                <li>Access and update your personal information</li>
                                <li>Request deletion of your data</li>
                                <li>Opt-out of certain data uses</li>
                                <li>Withdraw consent where provided</li>
                            </ul>                        
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h3 className='text-md'>Children's Privacy</h3>
                            <p className='text-md'>Our app is not intended for children under the age of 16. We do not knowingly collect personal information from children without parental consent.</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h3 className='text-md'>Changes to This Privacy Policy</h3>
                            <p className='text-md'>We may update this policy periodically. We will notify you of any significant changes and obtain your consent where required.</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h3 className='text-md'>Contact Us</h3>
                            <p className='text-md'>For any questions or concerns about this privacy policy, please contact us at: info@nubook.io</p>
                        </div>
                    </div>
            
                ),
            }}

        </DrawerPanel>

    );

}