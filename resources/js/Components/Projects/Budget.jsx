
export default function Budget({
    projects
}){

    const totalBudget = projects.reduce((total, projects) => {
    // Check if project has a budget, and if so, add it to the total
    if (projects.projectBudget) {
        return total + parseFloat(projects.projectBudget); // Assuming project.budget is a string
    } else {
        return total;
    }
    }, 0);


    function formatCurrency(amount) {
    // Use toLocaleString with currency style for formatting
    return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD', // Change to your desired currency code
        minimumFractionDigits: 2,
    });
    }
    
    // Assuming totalBudget is a number representing the total budget
    const formattedBudget = formatCurrency(totalBudget);

    return (
        <div className='flex flex-row gap-4'>
            <div className='graph'>

            </div>
            <div className='text-center my-auto'>
                <h3 className='font-normal'>Current Budget</h3>
                <span className='block text-[2.1rem] mt-2 font-bold primary-green-color'>{formattedBudget}</span>
            </div>    
        </div>
    );

}

