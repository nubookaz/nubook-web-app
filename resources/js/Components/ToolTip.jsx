import CardContainer from '@/Components/CardContainer';
import { useState } from 'react';

function Tooltip({ text, links, children, customClassName }) {
    const [tooltipVisible, setTooltipVisible] = useState(false);

    return (
        <div className={customClassName} onMouseLeave={() => setTooltipVisible(false)}>

            <CardContainer>

                <div className="tooltip-content">
                    {children}
                </div>

            </CardContainer>
        </div>
    );
}

export default Tooltip;
