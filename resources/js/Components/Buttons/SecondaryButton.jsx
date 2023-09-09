// SecondaryButton.jsx
function SecondaryButton({ children, onClick }) {
    return (
        <button
            className="default-btn secondary-button button-transition"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default SecondaryButton;
