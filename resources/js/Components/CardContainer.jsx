// CardContainer.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

function CardContainer({ children, header, showButtonIcon, openPage, openToolkit }) {
    const handleButtonClick = () => {
        // Check conditions to decide whether to open a page or a toolkit
        if (openPage) {
            // Logic to open a page
            console.log('Opening a page...');
        } else if (openToolkit) {
            // Logic to open a toolkit
            console.log('Opening a toolkit...');
        }
    };

    return (
        <div className="card-container">
            {header && (
                <div className="card-header flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        {header && <h3 className="secondary-color">{header}</h3>}
                    </div>
                    {showButtonIcon && (
                        <div>
                            <button onClick={handleButtonClick} className="secondary-color">
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        </div>
                    )}
                </div>
            )}
            {children}
        </div>
    );
}

export default CardContainer;
