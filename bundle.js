(()=>{"use strict";window.main={setChildrenDisabled:function(e,t){const n=e.children;for(let e of n)e.disabled=t}},(()=>{const e=document.querySelector("main");let t;const n=function(n){t=n.cloneNode(!0),e.insertAdjacentElement("afterbegin",t),document.addEventListener("keydown",r),document.addEventListener("click",i)},o=function(){t.remove(),document.removeEventListener("keydown",r),document.removeEventListener("click",i)},r=function(e){e.preventDefault(),"Escape"===e.key&&o()},i=function(e){e.preventDefault(),o()},c=document.querySelector("#success").content.querySelector(".success"),s=document.querySelector("#error").content.querySelector(".error");window.message={showSuccess:function(){n(c)},showError:function(e){window.card.hide(),n(s);const t=document.querySelector(".error__button"),r=document.querySelector(".error__message");t.addEventListener("click",(function(e){e.preventDefault(),o()})),r.textContent=e}}})(),(()=>{const e="https://21.javascript.pages.academy/keksobooking/data",t="https://21.javascript.pages.academy/keksobooking",n=function(e,t){const n=new XMLHttpRequest;return n.responseType="json",n.addEventListener("load",(function(){200===n.status?e(n.response):t(`Ошибка загрузки. Статус ответа: ${n.status} ${n.statusText}`)})),n.addEventListener("error",(function(){t("Произошла ошибка соединения")})),n.addEventListener("timeout",(function(){t(`Запрос не успел выполниться за ${n.timeout} мс`)})),n.timeout=1e4,n};window.server={load:function(t,o){const r=n(t,o);r.open("GET",e),r.send()},upload:function(e,o,r){const i=n(o,r);i.open("POST",t),i.send(e)}}})(),(()=>{const e=document.querySelector(".map").querySelector(".map__pin--main"),t=function(t,n){e.style.left=t-31+"px",e.style.top=n-84+"px"},n=function(){return{x:e.offsetLeft+31,y:e.offsetTop+84}};e.addEventListener("mousedown",(function(o){o.preventDefault(),0===o.button&&window.mode.switchOnActive();const r=o.clientX,i=o.clientY,c=n();let s=!1;const u=function(e){e.preventDefault();const n=e.clientX-r,o=e.clientY-i;let u=c.x+n,a=c.y+o;u=u<0?0:u,u=u>1200?1200:u,a=a<130?130:a,a=a>630?630:a,t(u,a),window.form.setAddress(u,a),s=!0},a=function(n){if(n.preventDefault(),!s){const n=function(o){o.preventDefault(),t(c.x,c.y),window.form.setAddress(c.x,c.y),e.removeEventListener("click",n)};e.addEventListener("click",n)}document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",a)};document.addEventListener("mousemove",u),document.addEventListener("mouseup",a)})),e.addEventListener("click",(function(e){e.preventDefault(),window.mode.switchOnActive()}));const o=function(t){if(t.preventDefault(),"Enter"===t.key){const t=n();window.mode.switchOnActive(),window.form.setAddress(t.x,t.y),e.removeEventListener("keydown",o)}};e.addEventListener("keydown",o),window.mainPin={setCenterPosition:function(){e.style.left="570px",e.style.top="375px"},getCenterPosition:function(){return{x:570+e.offsetWidth/2,y:375+e.offsetHeight/2}}}})(),(()=>{const e=document.querySelector("#pin").content.querySelector(".map__pin");window.pin={create:function(t){const n=e.cloneNode(!0),o=n.querySelector("img");return n.style.left=`${t.location.x}px`,n.style.top=`${t.location.y}px`,n.style.transform="translate(-50%, -100%)",o.src=t.author.avatar,o.alt=t.offer.title,n}}})(),(()=>{const e={palace:"Дворец",flat:"Квартира",house:"Дом",bungalow:"Бунгало"},t=document.querySelector(".map"),n=document.querySelector("#card").content.querySelector(".map__card"),o=t.querySelector(".map__filters-container"),r=function(e){e.classList.add("hidden")},i=function(e,t){e.textContent=t,t||r(e)},c=function(){const e=t.querySelector(".map__card");e&&(e.remove(),document.removeEventListener("keydown",s),window.map.unactivatePin())},s=function(e){"Escape"===e.key&&c()};window.card={show:function(u){t.insertBefore(function(t){const o=n.cloneNode(!0);i(o.querySelector(".popup__title"),t.offer.title),i(o.querySelector(".popup__text--address"),t.offer.address);const s=t.offer.price?`${t.offer.price}₽/ночь`:"";i(o.querySelector(".popup__text--price"),s);const u=t.offer.type?e[t.offer.type]:"";i(o.querySelector(".popup__type"),u);const a=t.offer.rooms&&t.offer.guests?`${function(e){const t=e%10,n=e%100;return 1===t&&11!==n?`${e} комната`:t>=2&&t<=4&&(n<10||n>=20)?`${e} комнаты`:`${e} комнат`}(t.offer.rooms)} для ${d=t.offer.guests,1==d%10&&11!=d%100?`${d} гостя`:`${d} гостей`}`:"";var d;i(o.querySelector(".popup__text--capacity"),a);const l=t.offer.checkin&&t.offer.checkout?`Заезд после ${t.offer.checkin}, выезд до ${t.offer.checkout}`:"";i(o.querySelector(".popup__text--time"),l);const f=o.querySelector(".popup__features"),p=f.querySelectorAll(".popup__feature");if(Array.isArray(t.offer.features)&&t.offer.features.length>0){for(let e of p)e.remove();const e=document.createDocumentFragment();for(let n=0;n<t.offer.features.length;n++){const o=document.createElement("li"),r=t.offer.features[n];o.classList.add("popup__feature",`popup__feature--${r}`),e.appendChild(o)}f.appendChild(e)}else r(f);i(o.querySelector(".popup__description"),t.offer.description);const m=o.querySelector(".popup__photos"),w=m.querySelector(".popup__photo");if(Array.isArray(t.offer.photos)&&t.offer.photos.length>0){w.remove();const e=document.createDocumentFragment();for(let n=0;n<t.offer.photos.length;n++){const o=w.cloneNode(!0),r=t.offer.photos[n];o.src=r,e.appendChild(o)}m.appendChild(e)}else r(m);const y=o.querySelector(".popup__avatar");return y.src=t.author.avatar,t.author.avatar||r(y),o.querySelector(".popup__close").addEventListener("click",(function(){c()})),o}(u),o),document.addEventListener("keydown",s)},hide:c}})(),(()=>{const e=document.querySelector(".ad-form"),t=e.querySelector("#title"),n=e.querySelector("#address"),o=e.querySelector("#price"),r=e.querySelector("#type"),i=e.querySelector("#timein"),c=e.querySelector("#timeout"),s=e.querySelector("#room_number"),u=e.querySelector("#capacity");t.addEventListener("input",(function(){const e=t.value.length;e<t.getAttribute("minlength")?t.setCustomValidity(`Минимальная длина заголовка ${t.getAttribute("minlength")} симв. Осталось ввести еще ${t.getAttribute("minlength")-e} симв.`):t.setCustomValidity(""),t.reportValidity()}));const a=function(){let e;e="bungalow"===r.value?0:"flat"===r.value?1e3:"house"===r.value?5e3:1e4,o.min=e,o.placeholder=e},d=function(){let e="";e=o.validity.valueMissing?"Укажите цену":o.validity.rangeOverflow?`Максимальная цена за ночь ${o.getAttribute("max")} руб.`:o.validity.rangeUnderflow?`Минимальная цена за ночь ${o.getAttribute("min")} руб.`:"",o.setCustomValidity(e),o.reportValidity()};a(),r.addEventListener("change",(function(){a(),d()})),o.addEventListener("input",(function(){d()})),i.addEventListener("change",(function(){c.value=i.value})),c.addEventListener("change",(function(){i.value=c.value}));const l=function(e,t){const n=Number(e.value),o=Number(t.value);return 100===n&&0!==o||100!==n&&0===o?"Сто комнат - не для гостей":n<o?"Количество гостей не может превышать количество комнат":""};s.addEventListener("change",(function(){s.setCustomValidity(""),u.setCustomValidity("");const e=l(s,u);s.setCustomValidity(e),s.reportValidity()})),u.setCustomValidity(l(s,u)),u.addEventListener("change",(function(){s.setCustomValidity(""),u.setCustomValidity("");const e=l(s,u);u.setCustomValidity(e),u.reportValidity()})),e.querySelector(".ad-form__reset").addEventListener("click",(function(t){t.preventDefault(),e.reset(),window.mode.switchOffActive()}));const f=function(e,t){n.value=`${Math.round(e)}, ${Math.round(t)}`};e.addEventListener("submit",(function(t){t.preventDefault(),window.server.upload(new FormData(e),p,m)}));const p=function(){window.mode.switchOffActive(),window.images.reset(),window.message.showSuccess(),u.setCustomValidity(l(s,u))},m=function(e){window.message.showError(e)};window.form={enable:function(){e.classList.remove("ad-form--disabled"),window.main.setChildrenDisabled(e,!1)},disable:function(){e.reset(),e.classList.add("ad-form--disabled"),window.main.setChildrenDisabled(e,!0);const t=window.mainPin.getCenterPosition();f(t.x,t.y)},setAddress:f}})(),(()=>{const e=document.querySelector(".map"),t=e.querySelector(".map__pins");let n=[];const o=function(){const e=t.querySelectorAll(".map__pin:not(.map__pin--main)");for(let t of e)t.remove()},r=function(){const e=t.querySelector(".map__pin--active");e&&e.classList.remove("map__pin--active")};t.addEventListener("click",(function(e){r();const t=e.target.closest(".map__pin:not(.map__pin--main)");if(!t)return;window.card.hide(),t.classList.add("map__pin--active");const o=t.dataset.index;window.card.show(n[o])})),window.map={disable:function(){e.classList.add("map--faded"),o()},enable:function(){e.classList.remove("map--faded")},hidePins:o,showPins:function(e){n=e.filter((function(e){return e.offer}));const o=Math.min(n.length,5),r=document.createDocumentFragment();for(let e=0;e<o;e++){const t=n[e],o=window.pin.create(t);o.dataset.index=e,r.appendChild(o)}t.appendChild(r)},unactivatePin:r}})(),(()=>{let e=!1;const t=function(){window.card.hide(),window.mainPin.setCenterPosition(),window.form.disable(),window.map.disable(),window.filter.disable(),window.images.reset(),e=!1};window.addEventListener("load",(function(){t()}));let n=[];const o=function(e){n=e,window.map.showPins(n),window.filter.enable()},r=function(e){const t=document.createElement("div");t.style.position="fixed",t.style.top=0,t.style.left=0,t.style.width="100%",t.style.padding="15px",t.style.fontWeight=700,t.style.fontSize="18px",t.style.textAlign="center",t.style.color="#ffffff",t.style.backgroundColor="#ff5635",t.style.boxShadow="0 0 20px 0 #ff6547",t.style.zIndex=2,t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)};window.mode={switchOnActive:function(){e||(window.form.enable(),window.map.enable(),window.server.load(o,r),e=!0)},switchOffActive:t,onSuccess:o,onError:r,getLoadedOffers:function(){return n}}})(),window.debounce=function(e){let t=null;return function(...n){t&&window.clearTimeout(t),t=window.setTimeout((function(){e(...n)}),500)}},(()=>{const e=document.querySelector(".map__filters"),t=e.querySelector("#housing-type"),n=e.querySelector("#housing-price"),o=e.querySelector("#housing-rooms"),r=e.querySelector("#housing-guests"),i=e.querySelector("#housing-features"),c=function(e){return e.filter((function(e){return function(e){return"any"===t.value||e.offer.type===t.value}(e)&&function(e){return"any"===n.value||function(e){return e.offer.price>=1e4&&e.offer.price<=5e4?"middle":e.offer.price<1e4?"low":e.offer.price>5e4?"high":"any"}(e)===n.value}(e)&&function(e){return"any"===o.value||String(e.offer.rooms)===o.value}(e)&&function(e){return"any"===r.value||String(e.offer.guests)===r.value}(e)&&function(e){const t=i.querySelectorAll("input:checked");if(0===t.length)return!0;for(let n of t)if(!e.offer.features.includes(n.value))return!1;return!0}(e)}))};e.addEventListener("change",window.debounce((function(){const e=c(window.mode.getLoadedOffers());window.card.hide(),window.map.hidePins(),window.map.showPins(e)}))),window.filter={disable:function(){e.reset(),window.main.setChildrenDisabled(e,!0)},enable:function(){window.main.setChildrenDisabled(e,!1)}}})(),(()=>{const e=["jpg","jpeg","png"],t=document.querySelector(".ad-form__field input[type=file]"),n=document.querySelector(".ad-form-header__preview img"),o=document.querySelector(".ad-form__upload input[type=file]"),r=document.querySelector(".ad-form__photo"),i=function(t,n,o){t.addEventListener("change",(function(){const r=t.files[0],i=r.name.toLowerCase();if(e.some((function(e){return i.endsWith(e)}))){const e=new FileReader;e.addEventListener("load",(function(){n(o,e)})),e.readAsDataURL(r)}}))};i(t,(function(e,t){e.src=t.result}),n),i(o,(function(e,t){e.style.background=`url(${t.result}) center / cover no-repeat`}),r),window.images={reset:function(){n.src="img/muffin-grey.svg",r.style.background="#e4e4de"}}})()})();