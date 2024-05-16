import React, { useEffect, useState } from 'react';

function Fetching() {
    const [url, setUrl] = useState(null);
    const [inputFields, setInputFields] = useState([{ name: '', weight: '' }]);

    // spread operator for listing down all the elements and adding few new elements without append statement
    //eg) const new valuearray = [...oldarray, 4,5]

    function logger(event) {
        event.preventDefault();
        const base_url = "https://api.calorieninjas.com/v1/nutrition?query=";
        const query = inputFields.map(item => `${item.weight} ${item.name}`).join(', ');
        setUrl(base_url + query);
    }

    //event is what triggers a function, we pass it as a parameter to a function so that we 
    //can use the event parameter to use event.target.value which basically is event.target
    //(refers to the exact element which triggers,in this case that particular button)+value

    const handleInputChange = (index, event) => {
        const values = [...inputFields];
        if (event.target.name === "name") {
            values[index].name = event.target.value;
        } else {
            values[index].weight = event.target.value;
        }
        setInputFields(values);
    }; const processenv = '9TsKEzz3CChMbFgGXz1zCw==HKXpvuurHq3SWmcT';
    

    const handleAddFields = () => {
        setInputFields([...inputFields, { name: '', weight: '' }]);
    };

    const handleRemoveFields = index => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const headers = new Headers();
                headers.append('X-Api-Key', processenv);
                const response = await fetch(url, { headers });
                const data = await response.json();
                console.log(data);
                const repl = document.getElementById('replace');
                repl.innerText = ""; 
                data.items.forEach(item => {
                    const para = document.createElement('p');
                    para.innerText = `Item Name: ${item.name}, Calories: ${item.calories}, Fats: ${item.fat_total_g}`;
                    repl.appendChild(para);
                });
            } catch (error) {
                console.log(error);
            }
        }

        if (url) {
            fetchData();
        }
    }, [url]);

    return (
        <div id="fetching" style={{backgroundColor: "purple" , color:"white" ,  outlineStyle: "solid", outlineColor:"RED", outlineOffset:"2px"}}>
            <br />
            <form onSubmit={logger}>
                <label> Calories Gained Through Eating</label> <br /><br />  
                {inputFields.map((inputField, index) => (
                    <div key={index}>
                        <input  style={{ textAlign:"center", padding: '0.5rem', marginBottom: '1rem', border: '1px solid #ced4da', borderRadius: '3px', marginRight: "35px", marginLeft:"40px"}}
                            type="text"
                            name="name"
                            placeholder= "Item-Name"
                            value={inputField.name}
                            onChange={event => handleInputChange(index, event)}
                        />
                        <input  style={{ textAlign:"center", padding: '0.5rem', marginBottom: '1rem', border: '1px solid #ced4da', borderRadius: '3px', marginRight: "35px"}}
                            type="text"
                            name="weight"
                            placeholder='Quantity'
                            value={inputField.weight}
                            onChange={event => handleInputChange(index, event)}
                        />
                        <button style={{padding: '0.5rem', marginBottom: '1rem', border: '1px solid #ced4da', borderRadius: '3px'}} type="button" onClick={() => handleRemoveFields(index)}>Remove</button>
                    </div>
                ))} <br />  
                <button type="button" style={{padding: '0.5rem', marginBottom: '1rem', border: '1px solid #ced4da', borderRadius: '3px',marginRight: "25px",marginLeft:"-15px"}} onClick={() => handleAddFields()}>Add-Item</button>
                <br />  <br />
                <button type="submit" style={{padding: '0.5rem', marginBottom: '1rem', border: '1px solid #ced4da', borderRadius: '3px'}}>Submit</button>
                <br /><br />
            </form>

            <div id="replace"></div>
        </div>
    );
}

export default Fetching;
