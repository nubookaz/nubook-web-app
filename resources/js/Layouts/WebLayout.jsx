



export default function WebLayout({ children, auth }) {

    return(
        <div className="min-h-screen">
            <div className='absolute z-50'>
                {children.surface}
            </div>

            <div className="bg-white relative w-full">
                {children.body}
            </div>

            <div>
                {children.footer}
            </div>
        </div>
    );


}
