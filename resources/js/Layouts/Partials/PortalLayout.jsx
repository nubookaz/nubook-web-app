
import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProfilePicture from '@/Pages/Profile/ProfilePicture';

import { Link } from '@inertiajs/react';
import Surface from './Surface';
import ActionDrawer from '@/Components/Drawer/ActionDrawer';  


export default function PortalLayout({  
  
  children,
  breadcrumbs,
  project,
  callSheet,
  user,
  roles,
  actionClass
  
}) {

    const [fadeIn, setFadeIn] = useState(false);
    const [fadeInDelay, setFadeInDelay] = useState(false);
 
    useEffect(() => {
        setFadeIn(true); 
        setFadeInDelay(true);  
 
    }, []);

  
    const renderBreadcrumbs = () => {
      if (!breadcrumbs || !Array.isArray(breadcrumbs)) {
          return null;
      }

      return (
          <>
              {breadcrumbs.map((breadcrumb, index) => (
                  <span key={index} className={`text-slate-500 flex ${breadcrumb.className || ''}`}>
                      {index !== 0 && <span className="mx-2 my-auto text-slate-300"> &gt; </span>} {/* Separator */}
                      {breadcrumb.url 
                          ? <Link href={breadcrumb.url} className={`text-slate-300 hover:text-slate-500 duration-500 transition-all hover:underline text-xl ${breadcrumb.className || ''}`}>{breadcrumb.label}</Link>
                          : <span className={`text-xl text-gray-500 font-bold ${breadcrumb.className || ''}`}>{breadcrumb.label}</span>}
                  </span>
              ))}
          </>
      );
    };



    const hasToolbar = children && children.toolbar;
    const hasBody = children && children.body;
    const hasAction = children && children.action;

  
 
    return (

      <AuthenticatedLayout project={project}>
        {{


          portal: (
              <>
                <div className='absolute z-50'>
                    <Surface user={user} project={project} callSheet={callSheet} roles={roles}/>
                    {hasAction && (
                      <ActionDrawer>
                          {children.action}
                      </ActionDrawer>
                    )}
                </div>

                <div className="w-full h-full pt-[1.5rem] pb-[1.5rem] pl-[7rem] pr-[1.75rem] max-w-[120rem] mx-auto flex flex-col gap-4">
                    <div id='portal-header' className='w-full flex flex-row justify-between'>
                        <div className={`fade-in h-full my-auto flex items-center ${fadeIn ? 'opacity-1' : 'opacity-0'}`} >
                            {renderBreadcrumbs()}
                        </div>
                        <div className='flex flex-row gap-8 items-center'>
                            <FontAwesomeIcon className='text-xl text-slate-300' icon={faBell}></FontAwesomeIcon>
                            <ProfilePicture href={route('profile.settings')} alt="User's Profile" className="h-[3rem] w-[3rem]" />
                        </div>
                    </div>
                    <div id='portal-body' className='flex flex-col gap-4 h-full w-full '>
                        {hasToolbar && (
                          <div className='w-full h-full max-h-[2.5rem] max-w-[80%] mx-auto'>
                            {children.toolbar}
                          </div>
                        )}
                        {hasBody && (
                          <div className={`fade-in-delay h-full ${fadeInDelay ? 'opacity-1' : 'opacity-0'}`}>
                              {children.body}
                          </div>
                        )}
                    </div>
                </div>
              </>
                    

          ),

        }}
      </AuthenticatedLayout>  

    );
  }
 