/* Global Variables */
const APIkey = '72e50c7cdc759c0c8a5fea3cc99a0c4a&units=imperial';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();




const makeCall = async function(zip){

    const res = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${APIkey}`);
    const text = await res.json()
    
    try{
        const lat = text.lat;
        const lon = text.lon;
        console.log(lat,lon)
        const res2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`);
        const text2 = await res2.json()
        
        console.log(text2.main.temp-273.15)
        return text2.main.temp;
            
    }
    catch(error){
        console.log(error);
    }

}





const postData = async ( url = '', data = {})=>{
    
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  });

    try {
      const newData = await response.json();
      
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};


const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees °F';
    document.getElementById('content').innerHTML = allData.feel;
    document.getElementById("date").innerHTML =allData.date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }





const getInput = async function(){
    console.log('clicked');
    const zip = document.querySelector('#zip').value
    
      if (zip){
          tmp = await makeCall(zip)
          const feelings = document.querySelector('#feelings').value
          const newData = {date:d,temp:tmp,feel:feelings};
          postData('/add',newData);
          retrieveData('/all');
          
      }
  
}


const button = document.querySelector('button');

button.addEventListener('click', event => getInput(),false);

