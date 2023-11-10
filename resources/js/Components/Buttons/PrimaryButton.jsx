// PrimaryButton.jsx
function PrimaryButton({ children, onClick, className }) {

    const classes = `default-btn primary-button button-transition ${className}`;

    return (
        <button
            className={classes}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default PrimaryButton;
