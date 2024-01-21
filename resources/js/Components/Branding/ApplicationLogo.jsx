import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

function ApplicationLogo({

    className

}) {
    return (
        <div className={`${className} application-logo`}>
            <FontAwesomeIcon icon={faPaperclip} className="logo-icon" />
        </div>
    );
}

export default ApplicationLogo;