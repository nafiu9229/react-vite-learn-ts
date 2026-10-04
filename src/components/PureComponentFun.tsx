import { useState } from 'react';
let count: number = 0;
function PureComponentFun() {
    const [pushUps, setPushUps] = useState({
        title: 'pushups',
        countP: 10
    });

    const [customer, setCustomer] = useState({
        name: 'Mohammed Shazain',
        address: {
            city: 'Dharmapuri',
            zipCode: 636705
        }
    })

    const updatePushups = () => {
        // const exe ={
        //     title: pushUps.title,
        //     countP: 11
        // }

        const exe = {
            ...pushUps,
            countP: pushUps.countP + 1
        }
        setPushUps(exe);

        /**
         *  setPushUps(current => ({
            ...current,
            countP: current.countP + 1
        }));
         */

        /**
         * To update the nested object 
         * customer make the shallow copy but 
         setCustomer({
            ...customer,
            address: { ...customer.address, zipCode: 636701 }
         })
         */
    }

    console.log('Message called: ' , {count});    
    count++;
    return (
        <>
            {/* //When the StrictMode is enable in development react renders each component twice so it comes 2,4,6 */}
            <div>Count {count}</div>        
            my pushUps count: {pushUps.countP}
            <button onClick={ () => { updatePushups() } }>Do pushups</button>
        </>
    )

    
}

export default PureComponentFun