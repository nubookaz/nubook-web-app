import{u as c,r,j as m,d as u}from"./app-eefe6961.js";function I({className:o,href:s}){const{user:e,fetchUserData:n}=c();r.useEffect(()=>{n()},[]);const l=10;r.useEffect(()=>{const g=setInterval(()=>{localStorage.setItem("imageIndex",a()),setLastUpdateTimestamp(Date.now())},216e5);return()=>clearInterval(g)},[]);const a=()=>Math.floor(Math.random()*l)+1;let t=localStorage.getItem("imageIndex");t||(t=a(),localStorage.setItem("imageIndex",t));const i=`/images/profile_images/profile_image_${t}.svg`,d=e!=null&&e.profile_image?`/storage/user1/avatars/${e.profile_image}`:i;return m.jsx(u,{href:s,className:`${o} rounded-full border-2 border-solid border-rose-400`,style:{backgroundImage:`url(${d})`,backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundColor:"white"}})}export{I as default};