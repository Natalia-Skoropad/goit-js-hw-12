import{a as y,S as b,i as c}from"./assets/vendor-2NRXftFG.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const i={form:document.querySelector(".form"),input:document.querySelector(".form-input"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".js-btn-load"),loader:document.querySelector(".loader")},L="https://pixabay.com/api/",w="51833962-a1f170a3ab3673d4610a8ef06";async function f(o,e){const s={key:w,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e},{data:a}=await y.get(L,{params:s});return a}//!======================================================
let S=new b(".gallery a",{captionsData:"alt",captionDelay:250});//!======================================================
function v({webformatURL:o,largeImageURL:e,tags:s,likes:a,views:t,comments:r,downloads:l}){return`
  <li class="gallery-item">
    <a href="${e}">
      <img src="${o}" alt="${s}" loading="lazy" />
    </a>
    <div class="info">
      <p><b>Likes</b><br>${a}</p>
      <p><b>Views</b><br>${t}</p>
      <p><b>Comments</b><br>${r}</p>
      <p><b>Downloads</b><br>${l}</p>
    </div>
  </li>`}function m(o){const e=o.map(v).join("");i.gallery.insertAdjacentHTML("beforeend",e),S.refresh()}function M(){i.gallery.innerHTML=""}//!======================================================
function p(){i.loadMoreBtn.classList.add("hidden")}function P(){i.loadMoreBtn.classList.remove("hidden")}//!======================================================
function h(){i.loader.classList.add("hidden"),i.loader.setAttribute("aria-hidden","true")}function g(){i.loader.classList.remove("hidden"),i.loader.setAttribute("aria-hidden","false")}//!======================================================
const B=15;let n=1,u=0,d="";i.form.addEventListener("submit",E);i.loadMoreBtn.addEventListener("click",q);//!======================================================
async function E(o){if(o.preventDefault(),d=i.input.value.trim(),!d){c.warning({title:"Warning",message:"Please enter a search term.",position:"topRight",timeout:5e3});return}n=1,M(),p(),g();try{const e=await f(d,n);if(!e.hits||e.hits.length===0){c.error({title:"",message:"Sorry, there are no images matching<br />your search query. Please try again!",position:"topRight",timeout:5e3});return}m(e.hits),u=Math.ceil(e.totalHits/B),n<u&&P()}catch(e){c.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight",timeout:5e3}),console.error(e)}finally{h()}}//!======================================================
async function q(){n+=1,g();try{const o=await f(d,n);m(o.hits);const{height:e}=i.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*3,behavior:"smooth"}),n>=u&&(p(),c.info({title:"",message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:5e3}))}catch(o){c.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight",timeout:5e3}),console.error(o)}finally{h()}}
//# sourceMappingURL=index.js.map
