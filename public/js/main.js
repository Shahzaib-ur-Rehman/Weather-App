const submitBtn=document.querySelector('#submitBtn');
const cityName=document.querySelector("#cityName");
const city_name=document.querySelector('#city_name');
const day=document.querySelector('#day');
const today_date=document.querySelector('#today_date');
const temp=document.querySelector('#temp');
const temp_status=document.querySelector('#temp_status');
const middle_layer=document.querySelector('#middle_layer');
const data_hide=document.querySelector('.data_hide');
const myDate=new Date();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNo=myDate.getMonth();
const dayNo=myDate.getDay();
day.innerText=days[dayNo];
today_date.innerText=`${myDate.getDate()} ${months[monthNo]}`;

const getInfo = async (event)=>{
    event.preventDefault();
    let cityValue=cityName.value;
    if(cityValue===""){
        alert('Please Write the Name Before You Search');
        // city_name.innerText=`Please Write the Name Before You Search`;
        data_hide.classList.add('data_hide');
        city_name.classList.add('data_hide');
    }else{
        try {
            const url=`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=5c20550f82fc28e975d12b2100ac4ca4`;
            const response= await fetch(url);
            const data=await response.json();
            const arrData=[data];
            city_name.innerHTML=`${arrData[0].name} ${arrData[0].sys.country}`;
            temp.innerText=`${arrData[0].main.temp}`;
            const tempratureMod=arrData[0].weather[0].main;
            if(tempratureMod=='Haze'){
                temp_status.innerHTML='<i class="fad fa-sun-haze"></i>'; 
            }else if (tempratureMod=='Clouds') {
                temp_status.innerHTML='<i class="fad fa-clouds"></i>';
            }
            else if (tempratureMod=='Clear') {
                temp_status.innerHTML='<i class="fas fa-sun" style="color:#dbbf21"></i>';
            }
            else{
                temp_status.innerHTML='<i class="fas fa-cloud-sun-rain">';
            }
            city_name.classList.remove('data_hide');
            data_hide.classList.remove('data_hide');
        } catch (error) {
            alert('Please Write the City Name Properly');
            data_hide.classList.add('data_hide');
            city_name.classList.add('data_hide');
        }

    }

}

submitBtn.addEventListener('click', getInfo);