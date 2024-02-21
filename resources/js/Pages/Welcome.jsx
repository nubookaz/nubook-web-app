import React from 'react';

import { Link, Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';

import { useState } from 'react';
import ApplicationName from "@/Components/Branding/ApplicationName";

import ImageContainer from '@/Components/Containers/ImageContainer';
import HeaderNavigation from '@/Components/Navigations/HeaderNavigation';
import PrimaryButton from "@/Components/Buttons/PrimaryButton";

import Drawer from '@mui/joy/Drawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCheckDouble } from '@fortawesome/free-solid-svg-icons';

import Skeleton from '@mui/joy/Skeleton';
import WebLayout from '@/Layouts/WebLayout';

import Modal from '@/Components/Modals/Modal';
import PrivacyPolicy from './Auth/Legal/PrivacyPolicy';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [open, setOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [privacyPolicyModal, setPrivacyPolicyModal] = useState(false);

     const handlePrivacyPolicyModal = () => {
        setPrivacyPolicyModal(true);
      };

    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        middle_initial: '',
        email: '',
        company_name: '',
        job_title: '',
        number_of_employees: '',
        referral: '',
    });

    const handleChange = (field, value) => {
        setData((prevData) => ({
          ...prevData,
          [field]: value,
        }));
    };

      const isCompanyInfoRequired = data.company_name !== '';


    const toggleNavicon = (inOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setOpen(inOpen);
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
          // Use the state directly from the callback
          await axios.post(route('website.beta.register'), {
            data: data,
          });
          // Additional logic after successful submission
          setIsSuccess(true);
      
          // Set a timer to reset isSuccess to false after 6000 milliseconds (6 seconds)
          setTimeout(() => {
            setIsSuccess(false);
          }, 4000);

          setData({
            first_name: '',
            last_name: '',
            middle_initial: '',
            email: '',
            company_name: '',
            job_title: '',
            number_of_employees: '',
            referral: '',
          });

        } catch (error) {
          console.error('Error submitting form:', error);
        } finally {
          // Set processing back to false regardless of success or failure
        }
      };
      


    return (
        <WebLayout>

            {{
                surface: (

                    <>

                        <Modal
                            show={privacyPolicyModal}
                            maxWidth='100%'
                            dialogPanelClass='h-full !bg-[#f6f4f1]'
                            childrenClassName='p-[4rem]'
                            onClose={setPrivacyPolicyModal}
                            showCloseButton='true'
                        >
                    
                            <PrivacyPolicy />
                            
                        </Modal>
        
                    </>

                ),
                body: (
                    <>
                         <ImageContainer
                        overlay={true}
                        className="!rounded-none !shadow-none h-[45rem] xl:h-[60rem] w-full"
                        backgroundImage="/images/set_images/set_image_3.jpg"
                        >
                        
                        <HeaderNavigation onClick={toggleNavicon(true)}/>
        
                        <div className="center-content text-center m-auto max-w-[90rem] p-4">
                            <h1 className='text-white font-bold text-[2.5rem] xl:text-[3rem] mb-4'>Welcome to Your Filmmaking Journey</h1>
                            <p className='text-white font-semibold text-[1.5rem] xl:text-[1.5rem]'>Where creativity meets the lens, and every frame tells a story.  Explore, create, and 
        collaborate with a community of passionate filmmakers. From script to screen, we’re 
        here to empower your vision. Start your cinematic adventure today.</p>
                        </div>
        
                    </ImageContainer>
        
                    <div className='p-8'>
                        <img className="w-full 2xl:max-w-[60%] -mt-[6rem] xl:-mt-[16rem] rounded-lg shadow-lg mx-auto" src="./images/app_images/dashboard.jpg" alt="" />
                    </div>
        
                    <div id="beta-form" className='p-8 mb-[4rem]'>
                        <div className='text-center m-auto p-8 mb-8 max-w-[75rem]'>
                            <h3 className='text-[2.5rem] mb-4'>Currently in Development!</h3>
                            <p className='font-semibold text-[1.65rem]'>Exciting News: Our app is very close to being in beta mode! Be among the first to experience it. Sign up below for exclusive access. Invites are limited! Current Beta release is slated for January 2024</p>
                        </div>
                        <form onSubmit={submit} className='w-full mx-auto relative xl:max-w-[60%] 2xl:max-w-[50%]'>
                            
                            {isSuccess ? (
                                <div className='place-content-center absolute w-full h-full flex'>
                                    <div className='z-10 text-center my-auto p-8 bg-white  m-auto rounded-xl shadow-xl w-[25rem]'>
                                        <FontAwesomeIcon icon={faCheckDouble} className='text-4xl primary-green-color mb-8'></FontAwesomeIcon>
                                        <h2 className='mb-2'>Registration Complete!</h2>
                                        <p>Once the app is ready for Beta you will receive an email with your invitation!</p>
                                    </div>
                                </div>
                            ):null }
        
        
                                
                            <div className={`asolute z-0 flex flex-col gap-6  ${isSuccess ? 'blur-sm pointer-events-none' : ''}`}>
                                <div className='flex flex-row gap-2 w-full'>
                                        <div className='flex flex-col gap-2 grow'>
                                            <label htmlFor="first_name" value="first_name" className='text-gray-400 text-sm'> First Name * </label>
                                            {isLoading ? (
                                                <Skeleton variant="rectangular" sx={{ height: "48px" }}/>
                                            ):(
                                            <input
                                                type="text"
                                                id="first_name"
                                                name="first_name"
                                                placeholder="Daniel"
                                                value={data.first_name}
                                                autoComplete="given-name"
                                                onChange={(e) => handleChange('first_name', e.target.value)}
                                                required
                                            />
                                            )}
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor="middle_initial" value="middle_initial" className='text-gray-400 text-sm'> M.I. </label>
                                            {isLoading ? (
                                                <Skeleton variant="rectangular" sx={{ height: "48px", width: "2.5rem" }}/>
                                            ):(
                                            <input
                                                type="text"
                                                id="middle_initial"
                                                className='max-w-[2.5rem]'
                                                name="middle_initial"
                                                placeholder="D"
                                                value={data.middle_initial}
                                                autoComplete="additional-name"
                                                maxLength={1} 
                                                onChange={(e) => handleChange('middle_initial', e.target.value)}
                                            />
                                            )}
                                            </div>
                                        <div className='flex flex-col gap-2 grow'>
                                            <label htmlFor="last_name" value="last_name" className='text-gray-400 text-sm'> Last Name * </label>
                                            {isLoading ? (
                                                <Skeleton variant="rectangular" sx={{ height: "48px" }}/>
                                            ):(
                                            <input
                                                type="text"
                                                id="last_name"
                                                name="last_name"
                                                placeholder="Lewis"
                                                value={data.last_name}
                                                autoComplete="family-name"
                                                onChange={(e) => handleChange('last_name', e.target.value)}
                                                required
                                            />   
                                            )}
        
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2 grow'>
                                        <label htmlFor="email" value="email" className='text-gray-400 text-sm'> Email Address * </label>
                                        {isLoading ? (
                                            <Skeleton variant="rectangular" sx={{ height: "48px" }}/>
                                        ):(
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="indy@indianajones.com"
                                            value={data.email}
                                            autoComplete="email"
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            required
                                        />   
                                        )}
        
                                    </div>
                                    <div className='flex flex-col gap-2 grow'>
                                        <label htmlFor="company_name" value="company_name" className='text-gray-400 text-sm'> Company Name </label>
                                        {isLoading ? (
                                            <Skeleton variant="rectangular" sx={{ height: "48px" }}/>
                                        ):(
                                        <input
                                            type="text"
                                            id="company_name"
                                            name="company_name"
                                            placeholder="Gopapple"
                                            value={data.company_name}
                                            onChange={(e) => handleChange('company_name', e.target.value)}
                                        />   
                                        )}
        
                                    </div>
        
                                    <div className='flex flex-col gap-2 grow'>
                                        <label htmlFor="job_title" value="job_title" className='text-gray-400 text-sm'> Job Title {isCompanyInfoRequired ? ('*') : ''}</label>
                                        {isLoading ? (
                                            <Skeleton variant="rectangular" sx={{ height: "48px" }}/>
                                        ):(
                                            <input
                                                id="job_title"
                                                type="text"
                                                name="job_title"
                                                placeholder="Director of Laughter Engineering"
                                                value={data.job_title}
                                                onChange={(e) => handleChange('job_title', e.target.value)}
                                                required={isCompanyInfoRequired}
                                            />
                                        )}
        
                                    </div>
        
                                    <div className='flex flex-col xl:flex-row gap-4 xl:gap-2 w-full'>
                                        <div className='flex flex-col gap-2 w-full xl:w-1/2'>
                                            <label htmlFor="number_of_employees" value="number_of_employees" className='text-gray-400 text-sm'> Number  of Employees in Company * </label>
                                            {isLoading ? (
                                                <Skeleton variant="rectangular" sx={{ height: "48px" }}/>
                                            ):(
                                                <select
                                                    id="number_of_employees"
                                                    name="number_of_employees"
                                                    value={data.number_of_employees}
                                                    onChange={(e) => handleChange('number_of_employees', e.target.value)}
                                                    required
                                                >
                                                    <option value="" disabled>Select Number of Employees</option>
                                                    <option value="1-10">1-10</option>
                                                    <option value="11-50">11-50</option>
                                                    <option value="51-100">51-100</option>
                                                    <option value="101-500">101-500</option>
                                                    <option value="500+">500+</option>
                                                </select>
                                            )}
        
                                        </div>
        
                                        <div className='flex flex-col gap-2 w-full xl:w-1/2'>
                                            <label htmlFor="referral" value="referral" className='text-gray-400 text-sm'> Referral Source *</label>
                                            {isLoading ? (
                                                <Skeleton variant="rectangular" sx={{ height: "48px" }}/>
                                            ):(
                                            <select
                                                id="referral"
                                                name="referral"
                                                value={data.referral}
                                                onChange={(e) => handleChange('referral', e.target.value)}
                                                required
                                            >
                                                <option value="" disabled>Select Referral Source</option>
                                                <option value="Google">Google</option>
                                                <option value="Social Media">Social Media</option>
                                                <option value="Friend or Colleague">Friend or Colleague</option>
                                                <option value="Event or Conference">Event or Conference</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            )}
        
                                        </div>
                                    </div>
                                    {isLoading ? (
                                        <Skeleton variant="rectangular" sx={{ height: "48px" }}/>
                                    ):(
                                        <PrimaryButton className="h-[48px]">Submit</PrimaryButton>
                                    )}
        
                                </div>
        
                        </form>
                    </div>
                    </>
                ),
                footer: (
                    <div className='website-footer flex flex-col gap-4 text-center p-8 bg-slate-600'>

                        <ApplicationName href={route('website.home')}/>

                        <div>
                            <a className='text-white underline' href='#privacy-policy' onClick={handlePrivacyPolicyModal}>Privacy Link</a>
                        </div>

                    </div>
                ),
            }}
            

            

 
        </WebLayout>
    );
}
