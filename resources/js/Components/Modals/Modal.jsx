import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default function Modal({ 
    
    children, 
    className, 
    dialogPanelClass, 
    childrenClassName, 
    show = false, 
    closeable = true, 
    showCloseButton = false, 
    onClose 

}) {
    
    const close = () => {
        if (closeable) {
            onClose();
        }
    };
    
    const containerClass = `fixed inset-0 flex overflow-y-auto p-6 items-center z-50 transform transition-all backdrop-blur-md ${className}`;

     return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className={containerClass}
                onClose={close}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-gray-500/50" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel
                        className={`bg-white rounded-2xl overflow-hidden shadow-xl transform transition-all sm:mx-auto relative ${dialogPanelClass}`}
                    >
                        {showCloseButton ? (
                            <FontAwesomeIcon onClick={close} className='cursor-pointer pb-10 text-3xl text-red-500 absolute right-2 top-2 z-50' icon={faCircleXmark}></FontAwesomeIcon>
                        ):null}
                        <div className={`${childrenClassName} overflow-scroll h-full`}>
                            {children}
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}
