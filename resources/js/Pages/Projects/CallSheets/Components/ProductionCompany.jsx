import CardContainer from '@/Components/Containers/CardContainer';


export default function ProductionCompany({ user, className }){

    const getPrimaryProductionCompanyName = (user) => {
        if (!user || !user.production_companies || !user.primary_production_company_id) {
            return null; // or some default value like 'Not available'
        }
    
        const primaryCompany = user.production_companies.find(company => 
            company.id === user.primary_production_company_id
        );
    
        return primaryCompany ? primaryCompany.company_name : null; // or a default value
    };
    
    const primaryCompanyName = getPrimaryProductionCompanyName(user);
    
    
     return(

        <CardContainer className={`${className}`} header="Production Company"  >
   
            {primaryCompanyName ? (
                <h2 className='text-2xl text-slate-500'>{primaryCompanyName}</h2>
            ) : (
                <div className='text-center my-auto px-8 text-slate-300'>Assign a Production Company (Optional) </div>
            )}

        </CardContainer>

    );

}

