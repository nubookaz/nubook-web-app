import CardContainer from '@/Components/Containers/CardContainer';
import { useState } from 'react';

function Tooltip({ text, links, children, customClassName }) {
    const [tooltipVisible, setTooltipVisible] = useState(false);

    return (
        <div className={customClassName} onMouseLeave={() => setTooltipVisible(false)}>
            <div className="tooltip tooltip-content">
                {children}
            </div>
        </div>
    );
}

export default Tooltip;
