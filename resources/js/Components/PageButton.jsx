import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PageButton({ icon, onClick }) {
    return (
        <button className="page-button" onClick={onClick}>
            <FontAwesomeIcon icon={icon} />
        </button>
    );
}

export default PageButton;