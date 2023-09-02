import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

function ApplicationLogo() {
    return (
        <div className="application-logo">
            <FontAwesomeIcon icon={faPaperclip} className="logo-icon" />
        </div>
    );
}

export default ApplicationLogo;