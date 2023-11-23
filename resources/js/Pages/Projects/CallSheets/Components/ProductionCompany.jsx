import CardContainer from '@/Components/Containers/CardContainer';


export default function ProductionCompany({ user, data }){

    
    if (!user || !user.production_company) {
        return <div>No production company data available</div>;
    }

    // const { street_address } = user.street_address;
    const { company_name } = user.production_company;

    return(

        <CardContainer className="" header="Production Company"  >
            <h2>{company_name}</h2>
            {/* <p>{street_address}</p> */}
        </CardContainer>

    );

}

