import { useEffect } from "react";

//Add a Hide Joke button//

function Joke() {
    const datafetch = async () => {
        const url = "https://api.api-ninjas.com/v1/dadjokes?";
        const headers = new Headers();
        headers.append('X-Api-Key', '9TsKEzz3CChMbFgGXz1zCw==h3RFyCSTbbdzLSIP');
        const response = await fetch(url, { headers });
        const data = await response.json();
        document.getElementById("text").innerText = data[0].joke;
       };

    useEffect(() => {
        datafetch();
    },[]);

    return (
        <div id="replace">
            <button onClick={datafetch}>Fetch a Joke</button>
            <div id="text"></div>
        </div>
    );
}

export default Joke;
