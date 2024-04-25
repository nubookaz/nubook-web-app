

import { useAuth } from '@/Components/Contexts/AuthContext';
import { useProfile } from '@/Components/Contexts/UserProfileContext';

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
  roles,
  actionClass
  
}) {
    const { userData } = useAuth();
    const { darkModeSetting } = useProfile();

    const breadcrumbTextColor = darkModeSetting === 'light' ? 'text-slate-500' : 'text-white';
    const breadcrumbSeparatorColor = darkModeSetting === 'light' ? 'text-slate-400' : 'text-slate-300';
    const breadcrumbLinkHoverColor = darkModeSetting === 'light' ? 'hover:text-slate-600' : 'hover:text-white';

    
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
            <span key={index} className={`flex ${breadcrumb.className || ''} ${breadcrumbTextColor}`}>
              {index !== 0 && <span className={`mx-2 my-auto ${breadcrumbSeparatorColor}`}> &gt; </span>} {/* Separator */}
              {breadcrumb.url 
                  ? <Link href={breadcrumb.url} className={`hover:text-slate-500 duration-500 transition-all hover:underline text-xl ${breadcrumb.className || ''} ${breadcrumbLinkHoverColor}`}>{breadcrumb.label}</Link>
                  : <span className={`text-xl font-bold ${breadcrumb.className || ''} ${breadcrumbTextColor}`}>{breadcrumb.label}</span>}
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
                    <Surface user={userData} project={project} callSheet={callSheet} roles={roles}/>
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
                        {hasToolbar && (
                          <div className='h-full mx-auto'>
                            {children.toolbar}
                          </div>
                        )}
                        <div className='flex flex-row gap-8 items-center'>
                            <FontAwesomeIcon className='text-xl text-slate-300' icon={faBell}></FontAwesomeIcon>
                            <ProfilePicture href={route('profile.settings')} alt="User's Profile" className="h-[3rem] w-[3rem]" />
                        </div>
                    </div>
                    <div id='portal-body' className='flex flex-col gap-4 h-full w-full '>

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
 