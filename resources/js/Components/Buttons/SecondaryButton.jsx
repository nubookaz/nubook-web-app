// SecondaryButton.jsx
function SecondaryButton({ children, onClick, className }) {
    return (
      <button
        className={`default-btn secondary-button button-transition ${className}`}
              onClick={onClick}
        >
            {children}
        </button>
    );
}

export default SecondaryButton;
