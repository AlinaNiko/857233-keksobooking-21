(()=>{"use strict";window.main={setChildrenDisabled:(e,t)=>{const o=e.children;Array.from(o).forEach((e=>{e.disabled=t}))}},(()=>{const e=document.querySelector("main");let t;const o=o=>{t=o.cloneNode(!0),e.insertAdjacentElement("afterbegin",t),document.addEventListener("keydown",r),document.addEventListener("click",s)},n=()=>{t.remove(),document.removeEventListener("keydown",r),document.removeEventListener("click",s)},r=e=>{e.preventDefault(),"Escape"===e.key&&n()},s=e=>{e.preventDefault(),n()},i=document.querySelector("#success").content.querySelector(".success"),a=document.querySelector("#error").content.querySelector(".error");window.message={showSuccess:()=>{o(i)},showError:e=>{window.card.hide(),o(a);const t=document.querySelector(".error__button"),r=document.querySelector(".error__message");t.addEventListener("click",(e=>{e.preventDefault(),n()})),r.textContent=e}}})(),(()=>{const e="https://21.javascript.pages.academy/keksobooking/data",t="https://21.javascript.pages.academy/keksobooking",o=(e,t)=>{const o=new XMLHttpRequest;return o.responseType="json",o.addEventListener("load",(()=>{200===o.status?e(o.response):t(`Ошибка загрузки. Статус ответа: ${o.status} ${o.statusText}`)})),o.addEventListener("error",(()=>{t("Произошла ошибка соединения")})),o.addEventListener("timeout",(()=>{t(`Запрос не успел выполниться за ${o.timeout} мс`)})),o.timeout=1e4,o};window.server={load:(t,n)=>{const r=o(t,n);r.open("GET",e),r.send()},upload:(e,n,r)=>{const s=o(n,r);s.open("POST",t),s.send(e)}}})(),(()=>{const e=document.querySelector(".map").querySelector(".map__pin--main"),t=(t,o)=>{e.style.left=t-31+"px",e.style.top=o-84+"px"},o=()=>({x:e.offsetLeft+31,y:e.offsetTop+84});e.addEventListener("mousedown",(n=>{n.preventDefault(),0===n.button&&window.mode.switchOnActive();const r=n.clientX,s=n.clientY,i=o();let a=!1;const d=e=>{e.preventDefault();const o=e.clientX-r,n=e.clientY-s;let d=i.x+o,c=i.y+n;d=d<0?0:d,d=d>1200?1200:d,c=c<130?130:c,c=c>630?630:c,t(d,c),window.form.setAddress(d,c),a=!0},c=o=>{if(o.preventDefault(),!a){const o=n=>{n.preventDefault(),t(i.x,i.y),window.form.setAddress(i.x,i.y),e.removeEventListener("click",o)};e.addEventListener("click",o)}document.removeEventListener("mousemove",d),document.removeEventListener("mouseup",c)};document.addEventListener("mousemove",d),document.addEventListener("mouseup",c)}));const n=t=>{if(t.preventDefault(),"Enter"===t.key){const t=o();window.mode.switchOnActive(),window.form.setAddress(t.x,t.y),e.removeEventListener("keydown",n)}};e.addEventListener("keydown",n),window.mainPin={setCenterPosition:()=>{e.style.left="570px",e.style.top="375px"},getCenterPosition:()=>({x:570+e.offsetWidth/2,y:375+e.offsetHeight/2})}})(),(()=>{const e=document.querySelector("#pin").content.querySelector(".map__pin");window.pin={create:t=>{const o=e.cloneNode(!0),n=o.querySelector("img");return o.style.left=`${t.location.x}px`,o.style.top=`${t.location.y}px`,o.style.transform="translate(-50%, -100%)",n.src=t.author.avatar,n.alt=t.offer.title,o}}})(),(()=>{const e={palace:"Дворец",flat:"Квартира",house:"Дом",bungalow:"Бунгало"},t=document.querySelector(".map"),o=document.querySelector("#card").content.querySelector(".map__card"),n=o.querySelector(".popup__photo"),r=o.querySelector(".popup__feature"),s=t.querySelector(".map__filters-container"),i=e=>{e.classList.add("hidden")},a=(e,t)=>{e.textContent=t,t||i(e)},d=()=>{const e=t.querySelector(".map__card");e&&(e.remove(),document.removeEventListener("keydown",c),window.map.unactivatePin())},c=e=>{"Escape"===e.key&&d()};window.card={show:l=>{t.insertBefore((t=>{const s=o.cloneNode(!0);a(s.querySelector(".popup__title"),t.offer.title),a(s.querySelector(".popup__text--address"),t.offer.address);const c=t.offer.price?`${t.offer.price}₽/ночь`:"";a(s.querySelector(".popup__text--price"),c);const l=t.offer.type?e[t.offer.type]:"";a(s.querySelector(".popup__type"),l);const u=t.offer.rooms&&t.offer.guests?`${(e=>{const t=e%10,o=e%100;return 1===t&&11!==o?`${e} комната`:t>=2&&t<=4&&(o<10||o>=20)?`${e} комнаты`:`${e} комнат`})(t.offer.rooms)} для ${p=t.offer.guests,1==p%10&&11!=p%100?`${p} гостя`:`${p} гостей`}`:"";var p;a(s.querySelector(".popup__text--capacity"),u);const m=t.offer.checkin&&t.offer.checkout?`Заезд после ${t.offer.checkin}, выезд до ${t.offer.checkout}`:"";a(s.querySelector(".popup__text--time"),m);const f=s.querySelector(".popup__features");if(Array.isArray(t.offer.features)&&t.offer.features.length>0){f.innerHTML="";const e=document.createDocumentFragment();t.offer.features.forEach((t=>{const o=r.cloneNode(!0);o.className=`popup__feature popup__feature--${t}`,e.appendChild(o)})),f.appendChild(e)}else i(f);a(s.querySelector(".popup__description"),t.offer.description);const w=s.querySelector(".popup__photos");if(Array.isArray(t.offer.photos)&&t.offer.photos.length>0){w.innerHTML="";const e=document.createDocumentFragment();t.offer.photos.forEach((t=>{const o=n.cloneNode(!0);o.src=t,e.appendChild(o)})),w.appendChild(e)}else i(w);const y=s.querySelector(".popup__avatar");return y.src=t.author.avatar,t.author.avatar||i(y),s.querySelector(".popup__close").addEventListener("click",(()=>{d()})),s})(l),s),document.addEventListener("keydown",c)},hide:d}})(),(()=>{const e=document.querySelector(".ad-form"),t=e.querySelector("#title"),o=e.querySelector("#address"),n=e.querySelector("#price"),r=e.querySelector("#type"),s=e.querySelector("#timein"),i=e.querySelector("#timeout"),a=e.querySelector("#room_number"),d=e.querySelector("#capacity");t.addEventListener("input",(()=>{const e=t.value.length;e<t.getAttribute("minlength")?t.setCustomValidity(`Минимальная длина заголовка ${t.getAttribute("minlength")} симв. Осталось ввести еще ${t.getAttribute("minlength")-e} симв.`):t.setCustomValidity(""),t.reportValidity()}));const c=()=>{let e;e="bungalow"===r.value?0:"flat"===r.value?1e3:"house"===r.value?5e3:1e4,n.min=e,n.placeholder=e},l=()=>{let e="";e=n.validity.valueMissing?"Укажите цену":n.validity.rangeOverflow?`Максимальная цена за ночь ${n.getAttribute("max")} руб.`:n.validity.rangeUnderflow?`Минимальная цена за ночь ${n.getAttribute("min")} руб.`:"",n.setCustomValidity(e),n.reportValidity()};c(),r.addEventListener("change",(()=>{c(),l()})),n.addEventListener("input",(()=>{l()})),s.addEventListener("change",(()=>{i.value=s.value})),i.addEventListener("change",(()=>{s.value=i.value}));const u=(e,t)=>{const o=Number(e.value),n=Number(t.value);return 100===o&&0!==n||100!==o&&0===n?"Сто комнат - не для гостей":o<n?"Количество гостей не может превышать количество комнат":""};a.addEventListener("change",(()=>{a.setCustomValidity(""),d.setCustomValidity("");const e=u(a,d);a.setCustomValidity(e),a.reportValidity()})),d.setCustomValidity(u(a,d)),d.addEventListener("change",(()=>{a.setCustomValidity(""),d.setCustomValidity("");const e=u(a,d);d.setCustomValidity(e),d.reportValidity()})),e.querySelector(".ad-form__reset").addEventListener("click",(t=>{t.preventDefault(),e.reset(),window.mode.switchOffActive()}));const p=(e,t)=>{o.value=`${Math.round(e)}, ${Math.round(t)}`};e.addEventListener("submit",(t=>{t.preventDefault(),window.server.upload(new FormData(e),m,f)}));const m=()=>{window.mode.switchOffActive(),window.images.reset(),window.message.showSuccess(),d.setCustomValidity(u(a,d))},f=e=>{window.message.showError(e)};window.form={enable:()=>{e.classList.remove("ad-form--disabled"),window.main.setChildrenDisabled(e,!1)},disable:()=>{e.reset(),e.classList.add("ad-form--disabled"),window.main.setChildrenDisabled(e,!0);const t=window.mainPin.getCenterPosition();p(t.x,t.y)},setAddress:p}})(),(()=>{const e=document.querySelector(".map"),t=e.querySelector(".map__pins");let o=[];const n=()=>{t.querySelectorAll(".map__pin:not(.map__pin--main)").forEach((e=>{e.remove()}))},r=()=>{const e=t.querySelector(".map__pin--active");e&&e.classList.remove("map__pin--active")};t.addEventListener("click",(e=>{r();const t=e.target.closest(".map__pin:not(.map__pin--main)");if(!t)return;window.card.hide(),t.classList.add("map__pin--active");const n=t.dataset.index;window.card.show(o[n])})),window.map={disable:()=>{e.classList.add("map--faded"),n()},enable:()=>{e.classList.remove("map--faded")},hidePins:n,showPins:e=>{o=e.filter((e=>e.offer));const n=Math.min(o.length,5),r=document.createDocumentFragment();for(let e=0;e<n;e++){const t=o[e],n=window.pin.create(t);n.dataset.index=e,r.appendChild(n)}t.appendChild(r)},unactivatePin:r}})(),(()=>{let e=!1;const t=()=>{window.card.hide(),window.mainPin.setCenterPosition(),window.form.disable(),window.map.disable(),window.filter.disable(),window.images.reset(),e=!1};window.addEventListener("load",(()=>{t()}));let o=[];const n=e=>{o=e,window.map.showPins(o),window.filter.enable()},r=e=>{const t=document.createElement("div");t.style.position="fixed",t.style.top=0,t.style.left=0,t.style.width="100%",t.style.padding="15px",t.style.fontWeight=700,t.style.fontSize="18px",t.style.textAlign="center",t.style.color="#ffffff",t.style.backgroundColor="#ff5635",t.style.boxShadow="0 0 20px 0 #ff6547",t.style.zIndex=2,t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)};window.mode={switchOnActive:()=>{e||(window.form.enable(),window.map.enable(),window.server.load(n,r),e=!0)},switchOffActive:t,onSuccess:n,onError:r,getLoadedOffers:()=>o}})(),window.debounce=e=>{let t=null;return(...o)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),500)}},(()=>{const e=document.querySelector(".map__filters"),t=e.querySelector("#housing-type"),o=e.querySelector("#housing-price"),n=e.querySelector("#housing-rooms"),r=e.querySelector("#housing-guests"),s=e.querySelector("#housing-features"),i=e=>{const i=s.querySelectorAll("input:checked"),a=Array.from(i);return e.filter((e=>(e=>"any"===t.value||e.offer.type===t.value)(e)&&(e=>"any"===o.value||(e=>e.offer.price>=1e4&&e.offer.price<=5e4?"middle":e.offer.price<1e4?"low":e.offer.price>5e4?"high":"any")(e)===o.value)(e)&&(e=>"any"===n.value||String(e.offer.rooms)===n.value)(e)&&(e=>"any"===r.value||String(e.offer.guests)===r.value)(e)&&((e,t)=>t.every((t=>e.offer.features.includes(t.value))))(e,a)))};e.addEventListener("change",window.debounce((()=>{const e=i(window.mode.getLoadedOffers());window.card.hide(),window.map.hidePins(),window.map.showPins(e)}))),window.filter={disable:()=>{e.reset(),window.main.setChildrenDisabled(e,!0)},enable:()=>{window.main.setChildrenDisabled(e,!1)}}})(),(()=>{const e=["jpg","jpeg","png"],t=document.querySelector(".ad-form__field input[type=file]"),o=document.querySelector(".ad-form-header__preview img"),n=document.querySelector(".ad-form__upload input[type=file]"),r=document.querySelector(".ad-form__photo"),s=(t,o,n)=>{t.addEventListener("change",(()=>{const r=t.files[0],s=r.name.toLowerCase();if(e.some((e=>s.endsWith(e)))){const e=new FileReader;e.addEventListener("load",(()=>o(n,e))),e.readAsDataURL(r)}}))};s(t,((e,t)=>{e.src=t.result}),o),s(n,((e,t)=>{e.style.background=`url(${t.result}) center / cover no-repeat`}),r),window.images={reset:()=>{o.src="img/muffin-grey.svg",r.style.background="#e4e4de"}}})()})();