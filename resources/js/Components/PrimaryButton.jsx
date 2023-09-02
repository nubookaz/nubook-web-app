// PrimaryButton.jsx
function PrimaryButton({ children, onClick }) {
    return (
        <button
            className="default-btn primary-button button-transition"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default PrimaryButton;
