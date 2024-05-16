import { useEffect, useState } from "react";

////THE ISSUE OF RENDERING TWICE WAS BECAUSE OF REACT STRICT MODE IN MAIN.JSX////


//for fetching.jsx//
//had to use useEffect because of asynchronity reason (main usage of useEffect)
    //first the logger uses setUrl(useState) to update the url, but remember that useState is also an asnychronus function
    //so just directly using the updated url from setUrl for fetching api won't work as intended because Url updating would itself 
    //a take lot of time, so async happens. We want to execute the code only after url updates, so we use an useEffect hook with the
    //url as a parameter, so that after the url gets updated by the setUrl(useState) asynchronously, the useEffect runs due to [url] dependency

function Samplepractice() {
    
    const [url,setUrl] = useState()  

    useEffect(()=>
    {   
        setUrl("https://api.calorieninjas.com/v1/nutrition?query= 1 lb carrots") 
          },[url])

    useEffect(()=>
    {   
        setUrl("https://api.calorieninjas.com/v1/nutrition?query= 2 lb carrots") 
          },[])

          //[url] means first render(initial) + everytime url changes

          //output will be 318.5 in the 1st render because second useeffect will override the first useeffect in the 1st render
          //so after 318.5 output the url is changed, which triggers a rerender
          //159.3 will be output in the second render as the dependency array (only 1st useeffect) contains url, and url of 1lb will
          //be passed on to the consolelogging useeffect

          //before a rerender every hook in the previous render completes first. Rendering is in batch. 
          //After every hook dependent on the current render executes the next render happens (if-so-needed)
          
          
    
    useEffect(() => {
        async function fetchdata() {
            const apikey = '9TsKEzz3CChMbFgGXz1zCw==HKXpvuurHq3SWmcT';
            try {
                const headers = new Headers();
                headers.append('X-Api-Key', apikey);
                const response = await fetch(url, { headers });
                const data = await response.json();
                console.log(data.items[0].calories);
            } catch (error) {
                console.log(error);
            }
        }

        fetchdata();
    }, [url]);

   

    return null;
}

export default Samplepractice;
