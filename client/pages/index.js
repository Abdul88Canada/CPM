import { useState } from "react"

const LandingPage =  ({ currentUser }) => {   

    const [index, setIndex] = useState(0);

    return (
        currentUser ? (
            <div>
                Welcome, {currentUser.userName}!
            </div>
        ) 
            : <h1>You are signed out</h1>
    )
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
   if(!currentUser) {
    return {}
   } 
   else {
    //const { data } = await client.get('/api/units/properties');
    return {/*properties: data*/};
   }
}

export default LandingPage;