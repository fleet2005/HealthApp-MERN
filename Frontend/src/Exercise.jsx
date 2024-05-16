import { useState, useEffect } from "react";

function Exercise() {
    const [activity, setActivity] = useState("");
    const [weight, setWeight]  = useState("");
    const [duration, setDuration] = useState("");
    const baseurl = "https://api.api-ninjas.com/v1/caloriesburned?activity=";

    function logger(event) {
        event.preventDefault();
        setActivity(document.getElementById("activity").value);
        setWeight(document.getElementById("weight").value * 2.204723);
        setDuration(document.getElementById("duration").value);
    } const procesenv = "9TsKEzz3CChMbFgGXz1zCw==h3RFyCSTbbdzLSIP";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const finalurl = `${baseurl}${activity}&weight=${weight}&duration=${duration}`;
                console.log(finalurl);
                const headers = new Headers();
                headers.append('X-Api-Key', procesenv);

                const response = await fetch(finalurl, { headers });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log("Data:", data);
                if (data && data.length > 0) {
                    document.getElementById("replace1").innerText = data[0].total_calories + " " + "Calories";
                } else {
                    document.getElementById("replace1").innerText = "No data available";
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                document.getElementById("replace1").innerText = "";
            }
        };

        fetchData();
    }, [activity, weight, duration]);
      

    return (
        <div id="ex" style={{backgroundColor: "purple" , color:"white" ,  outlineStyle: "solid", outlineColor:"GREEn", outlineOffset:"2px"}}>
        <br/>
        <h1>EXERCISE CALORIES BURNED</h1>
        <br></br>
        <form onSubmit={logger}>
            <input style={{ padding: '0.5rem', marginBottom: '1rem', border: '1px solid #ced4da', borderRadius: '3px', marginRight: "35px", textAlign:"center"}} id="activity" placeholder="Exercise/Activity" required/> 
            <input style={{ padding: '0.5rem', marginBottom: '1rem', border: '1px solid #ced4da', borderRadius: '3px', textAlign:"center"}} id="weight" placeholder="Weight (only number)"/><br /> <br/>
            <input style={{ padding: '0.5rem', marginBottom: '1rem', border: '1px solid #ced4da', borderRadius: '3px', textAlign:"center"}} id="duration" placeholder="Duration(only number)"/><br /> <br />
            <button style={{ padding: '0.5rem', marginBottom: '1rem', border: '1px solid #ced4da', borderRadius: '3px', textAlign:"center"}} type="submit">Fetch</button><br />
            <div id="replace1"></div><br />
        </form>
        </div>
    );
}

export default Exercise;
