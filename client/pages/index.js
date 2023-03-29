import { useState } from "react"

const LandingPage =  ({ currentUser }) => {   
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
    return {};
   }
}

export default LandingPage;