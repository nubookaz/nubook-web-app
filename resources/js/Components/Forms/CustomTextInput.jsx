function CustomTextInput({ placeholder, icon }) {
    return (
        <div className="relative">
            <input
                type="text"
                placeholder={placeholder}
                className="custom-input"
            />
            <span className="custom-icon inset-y-0 flex items-center">
                {icon}
            </span>
        </div>
    );
}

export default CustomTextInput;
