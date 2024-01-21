import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function SlideUpModal({
    show = false,
    onClose,
    className = '',
    dialogPanelClass = '',
    childrenClassName = '',
    showCloseButton = true,
    children,
    closeable = true
}) {
    const [isDisplayed, setIsDisplayed] = useState(false);

    useEffect(() => {
        if (show) {
            setIsDisplayed(true);
        } else if (isDisplayed) {
            // Delay the closing of the modal to allow for a smooth transition
            const timer = setTimeout(() => setIsDisplayed(false), 300);
            return () => clearTimeout(timer);
        }
    }, [show, isDisplayed]);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape' && closeable) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [closeable, onClose]);

    const handleCloseModal = () => {
        onClose();
    };

    if (!isDisplayed) {
        return null;
    }

    const modalClass = show
        ? 'translate-y-0 opacity-100'
        : 'translate-y-[60rem] opacity-0';
    const backdropClass = show
        ? 'opacity-100'
        : 'opacity-0';

    return (
        <div className={`fixed inset-0 flex overflow-y-auto p-6 items-end z-50 ${className}`}>
            <div 
                className={`fixed inset-0 bg-gray-500/50 backdrop-blur-sm transition-opacity duration-300 ${backdropClass}`} 
                onClick={closeable ? handleCloseModal : undefined} 
            />
            <div className={`transform transition-all rounded-xl mx-auto bg-white duration-300 ${modalClass} ${dialogPanelClass}`}>
                {showCloseButton && (
                    <FontAwesomeIcon
                        onClick={handleCloseModal}
                        icon={faCircleXmark}
                        className="cursor-pointer text-3xl text-red-500 absolute right-2 top-2 z-50"
                    />
                )}
                <div className={`overflow-scroll h-full pt-[3rem] px-8 ${childrenClassName}`}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default SlideUpModal;
