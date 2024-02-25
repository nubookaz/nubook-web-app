import{r as p,j as s}from"./app-eefe6961.js";import"./index.es-6f9cfa5f.js";import"./index-d5199ec3.js";const V=({date:D,data:o,locationData:E,layoutStyle:$="landscape"})=>{let{latitude:v,longitude:w}=E||{};const[t,_]=p.useState(null),[L,y]=p.useState(!0),[W,F]=p.useState(null),S=window.OpenWeatherApi,b=new Date;p.useEffect(()=>{(async()=>{y(!0);const a=r=>r!=null&&r!=="";o&&o.weather&&typeof o.weather=="string"?C(o):a(v)&&a(w)&&O(v,w,D,S)})()},[v,w,o,D,S]);const C=e=>{try{const a=JSON.parse(e.weather);_(a)}catch(a){console.error("Error parsing weather data:",a),F("Error parsing weather data")}finally{y(!1)}},O=async(e,a,r,x)=>{try{let l;const N=new Date,T=new Date(r);if(T>N){const k=(T-N)/864e5,H=Math.floor(T.getTime()/1e3);k>=5?l=`https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${e}&lon=${a}&date=${r}&appid=${x}`:l=`https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${e}&lon=${a}&dt=${H}&appid=${x}`}else l=`https://api.openweathermap.org/data/2.5/weather?lat=${e}&lon=${a}&units=metric&appid=${x}`;const P=await(await fetch(l)).json();_(P)}catch(l){console.error("Error fetching weather data:",l),F("Error fetching weather data")}finally{y(!1)}};if(p.useEffect(()=>{(async()=>{if(t)try{const a=route("save.weather",{id:o.project_id,callSheetId:o.id});(await axios.post(a,{weatherData:t})).data.success}catch(a){console.error("Error posting weather data:",a)}})()},[t]),p.useEffect(()=>{const e=setTimeout(()=>{y(!1)},2e3);return()=>clearTimeout(e)},[]),!v&&!w)return s.jsx("div",{className:"flex justify-center items-center text-center w-full h-full p-6",children:"No weather data available. Please enter a valid address or zip code"});if(L)return s.jsx("div",{className:"flex justify-center items-center text-center w-full h-full p-6",children:"Loading..."});if(W)return s.jsx("div",{className:"flex justify-center items-center text-center w-full h-full p-6",children:"Error fetching weather data"});if(!t)return s.jsx("div",{className:"flex justify-center items-center text-center w-full h-full p-6",children:"No weather data available. Please enter a valid address or zip code"});let h,c,f,d,u,m,n,i;const j=e=>e*9/5+32,g=e=>(e-273.15)*9/5+32,I={200:"drizzle.svg",201:"thunderstorms-rain.svg",202:"thunderstorms-rain.svg",210:"light-thunderstorm.svg",211:"thunderstorms.svg",212:"thunderstorms.svg",221:"thunderstorms.svg",230:"drizzle.svg",231:"drizzle.svg",232:"drizzle.svg",300:"drizzle.svg",301:"drizzle.svg",302:"drizzle.svg",310:"drizzle.svg",311:"drizzle.svg",312:"drizzle.svg",313:"drizzle.svg",314:"drizzle.svg",321:"drizzle.svg",500:"partly-cloudy-day-rain.svg",501:"partly-cloudy-day-rain.svg",502:"partly-cloudy-day-rain.svg",503:"partly-cloudy-day-rain.svg",504:"partly-cloudy-day-rain.svg",511:"partly-cloudy-day-rain.svg",520:"partly-cloudy-day-rain.svg",521:"partly-cloudy-day-rain.svg",522:"partly-cloudy-day-rain.svg",531:"partly-cloudy-day-rain.svg",600:"snow.svg",601:"snow.svg",602:"snow.svg",611:"sleet.svg",612:"sleet.svg",613:"sleet.svg",615:"sleet.svg",616:"sleet.svg",620:"sleet.svg",621:"sleet.svg",622:"sleet.svg",701:"mist.svg",711:"smoke.svg",721:"haze.svg",731:"dust-wind.svg",741:"fog.svg",751:"sand.svg",761:"dust-wind.svg",762:"dust-wind.svg",771:"dust-wind.svg",781:"tornado.svg",800:"clear-day.svg",801:"partly-cloudy-day.svg",802:"partly-cloudy-day.svg",803:"partly-cloudy-day.svg",804:"partly-cloudy-day.svg"};let A="not-available.svg",z="not-available.svg";if(t.main&&t.weather&&t.weather.length>0){const{main:e,sys:a,dt:r,weather:x}=t;e&&e.temp&&(h=e.temp,c=j(h)),e&&e.temp_max&&(f=e.temp_max,d=j(f)),e&&e.temp_min&&(u=e.temp_min,m=j(u));const l=new Date(r*1e3);b<=l&&b.getTime()+8*24*60*60*1e3>=l.getTime()?(n=a&&a.sunset?new Date(a.sunset*1e3).toLocaleTimeString():"N/A",i=a&&a.sunrise?new Date(a.sunrise*1e3).toLocaleTimeString():"N/A"):(n=a&&a.sunset?new Date(a.sunset*1e3).toLocaleTimeString():"N/A",i=a&&a.sunrise?new Date(a.sunrise*1e3).toLocaleTimeString():"N/A");const N=x[0].id;A=I[N]||"not-available.svg",z=`/images/animated_weather_svg_icons/${A}`}else if(t.temperature){const{temperature:e,date:a}=t;e&&e.afternoon&&(h=e.afternoon,c=g(h)),e&&e.max&&(f=e.max,d=g(f)),e&&e.min&&(u=e.min,m=g(u)),n="N/A",i="N/A"}else if(t.data&&t.data.length>0){const e=t.data[0];e&&e.temp&&(h=e.temp,c=g(h)),e&&e.maxTemp&&(f=e.maxTemp,d=g(f)),e&&e.minTemp&&(u=e.minTemp,m=g(u)),e&&e.sunset?n=new Date(e.sunset*1e3).toLocaleTimeString():n="N/A",e&&e.sunrise?i=new Date(e.sunrise*1e3).toLocaleTimeString():i="N/A"}return s.jsx(s.Fragment,{children:$==="portrait"?s.jsxs("div",{className:"flex flex-col gap-4",children:[s.jsxs("div",{className:"flex flex-row gap-6 w-full h-full",children:[s.jsx("div",{className:"text-[4rem] text-center my-auto",children:s.jsx("img",{className:"w-full max-w-[8rem] mx-auto drop-shadow-xl",src:z})}),s.jsxs("div",{className:"h-full flex text-left flex-col my-auto",children:[s.jsxs("p",{className:"font-bold",children:["Temp: ",s.jsx("span",{className:"font-normal",children:c?c.toFixed(2)+"°F":"N/A"})]}),s.jsxs("p",{className:"font-bold",children:["High: ",s.jsx("span",{className:"font-normal",children:d?d.toFixed(2)+"°F":"N/A"})]}),s.jsxs("p",{className:"font-bold",children:["Low: ",s.jsx("span",{className:"font-normal",children:m?m.toFixed(2)+"°F":"N/A"})]})]})]}),s.jsxs("div",{className:"flex flex-col  w-full",children:[s.jsxs("div",{className:"flex flex-row gap-2 justify-center",children:[s.jsx("img",{className:"w-full max-w-[2rem] my-auto",src:"/images/animated_weather_svg_icons/sunrise.svg"}),s.jsxs("p",{className:"font-bold",children:["Sunrise: ",s.jsx("span",{className:"font-normal",children:i})]})]}),s.jsxs("div",{className:"flex flex-row gap-2 justify-center",children:[s.jsx("img",{className:"w-full max-w-[2rem] my-auto",src:"/images/animated_weather_svg_icons/sunset.svg"}),s.jsxs("p",{className:"font-bold",children:["Sunset: ",s.jsx("span",{className:"font-normal",children:n})]})]})]})]}):s.jsxs("div",{className:"flex flex-row gap-6 w-full h-full",children:[s.jsx("div",{className:"text-[4rem] text-center my-auto w-[40%]",children:s.jsx("img",{className:"w-full max-w-[8rem] mx-auto drop-shadow-xl",src:z})}),s.jsxs("div",{className:"w-[60%] h-full",children:[s.jsxs("p",{className:"font-bold",children:["Temp: ",s.jsx("span",{className:"font-normal",children:c?c.toFixed(2)+"°F":"N/A"})]}),s.jsxs("p",{className:"font-bold",children:["High: ",s.jsx("span",{className:"font-normal",children:d?d.toFixed(2)+"°F":"N/A"})]}),s.jsxs("p",{className:"font-bold",children:["Low: ",s.jsx("span",{className:"font-normal",children:m?m.toFixed(2)+"°F":"N/A"})]}),s.jsxs("div",{className:"flex flex-row gap-2",children:[s.jsx("img",{className:"w-full max-w-[2rem] my-auto",src:"/images/animated_weather_svg_icons/sunrise.svg"}),s.jsxs("p",{className:"font-bold my-auto",children:["Sunrise:",s.jsx("span",{className:"font-normal",children:i.slice(0,-6)+i.slice(-3)})]})]}),s.jsxs("div",{className:"flex flex-row gap-2",children:[s.jsx("img",{className:"w-full max-w-[2rem] my-auto",src:"/images/animated_weather_svg_icons/sunset.svg"}),s.jsxs("p",{className:"font-bold my-auto",children:["Sunset:",s.jsx("span",{className:"font-normal",children:n.slice(0,-6)+n.slice(-3)})]})]})]})]})})};export{V as default};
