// my-widget.js
class ImpulseProducts extends HTMLElement {
  numberOfPhases = {
    ONE: { title: "1 Fase", description: "una fase" },
    TWO: { title: "2 Fases", description: "dos fases" },
  };

  style = /* html */ `<style>

        .btn {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          outline: 0;
          border: unset;
        }

        .btn_degradado {
            border-radius: 0.75rem;
            padding: 0.9rem 1.25rem;
            background: linear-gradient(270deg, rgba(128, 54, 255, 0.94) 0%, #00EAF1 100%);
            color: #000;
            font-size: 1.35rem;
            font-weight: 700;
            line-height: 1.5;
        }

        .btn_degradado:hover, .btn_degradado:active, .btn_degradado:focus, .btn_degradado:focus-within, .btn_degradado:focus-visible {
            color: #fff !important;
        }
    </style >`;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.selection = this.getAttribute("selection") || "";
    this.selectedProduct = null;
    this.baseUrl = "https://app-trader.impulseworld.pro";

    this.activeModal = this.activeModal.bind(this);
    this.partner = this.getAttribute("partner") || "";
    this.pixel = this.getAttribute("fbpixel") || "";
  }

  connectedCallback() {
    this.render();
    this.fetchData();
  }

  async fetchData() {
    try {
      const myHeaders = new Headers();
      myHeaders.append("user_id", "1");
      myHeaders.append("user_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const url = new URL(this.baseUrl + "/bff/customer/products");
      url.searchParams.append("selection", this.selection);
      const response = await fetch(url, requestOptions);
      const { data } = await response.json();
      this.getProducts(data.items);
      this.updateView();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  getProductById(productId) {
    return this.products.find((product) => product.productId === productId);
  }

  getProducts(products) {
    const data = products.map(
      ({
        pKey,
        challengeId,
        price,
        balance,
        status,
        name,
        label,
        description,
        points,
        createdAt,
        updatedAt,
        duration,
        netProfit,
        absoluteDrawdown,
        maxDailyDrawdown,
        daysOperating,
        extensionDays,
        fase,
        mt4Group,
        leverage,
        challengeTypeId,
        startDatetime,
        endDatetime,
        nextChallengeId,
        hasExtension,
        hasSwing,
        nextChallengeDuration,
        preSalePrice,
        preSaleEndDatetime,
        isTournament,
        challengeTypeDescription,
        challengeTypeLabel,
        code,
        icon,
        hasRepeat,
        impulseChallengeTypeDescription,
        impulseChallengeTypeLabel,
        impulseChallengeTypeId,
        impulseCode,
        impulseImage,
        modality,
        productId,
      }) => ({
        title: name,
        description,
        challengeTypeDescription,
        price,
        impulseCode,
        balance,
        modality,
        netProfit,
        hasSwing,
        productId,
      })
    );

    this.products = data;
  }

  numberInDigital(amount) {
    const numberInK = amount / 1000;
    if (numberInK < 1000) {
      return `${numberInK.toFixed(0)}K`;
    }
    return `${(numberInK / 1000).toFixed(0)} M`;
  }

  formatProductName(productName){
    switch(productName){
      case "Impulse One 12":
        return "One 12";
      case "Impulse One 15":
        return "One 15";
      case "Impulse One 18":
        return "One 18";
      default:
        return productName;
    }
  }

  currencyFormat(amount) {
    return new Intl.NumberFormat("es-US", {
      style: "currency",
      currency: "USD",
    })
      .format(amount)
      .split(".")[0] + ",00";
  }

  activeModal(event) {
    const productId = event.target.getAttribute("data-id");
    this.selectedProduct = this.getProductById(productId);
    const modal = this.shadowRoot.querySelector("impulse-modal");
    modal.removeAttribute("hidden");
    modal.setAttribute("challenge", JSON.stringify(this.selectedProduct));
  }

  updateView() {
    this.shadowRoot.innerHTML = /* html */ `
    ${this.style}
        <impulse-modal hidden partner="${this.partner}" fbpixel="${this.pixel}"></impulse-modal>
            <main>
                <section>
                ${this.products
        ? this.products
          .map(
            (product) => /* html */ `
                    
                            <button 
                                data-id="${product.productId}"
                                class="btn btn_degradado cta-btn">Unirme al torneo</button>`
          )
          .join("")
        : `<p>No se encontraron productos</p>`
      }
            </section>
        </main>
    `;
    const buttonsBuy = this.shadowRoot.querySelectorAll("button[data-id]");
    buttonsBuy.forEach((btn) =>
      btn.addEventListener("click", this.activeModal)
    );
  }

  render() {
    // Render inicial
    this.shadowRoot.innerHTML = /* html */ `
            <style>
                .loader {
                    width: 100%;
                    height: 51px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .loader svg {
                    width: 175px;
                    height: 46px;
                    animation: myAnim 1s ease 0s 10 normal forwards;
                }
                @keyframes myAnim {
                0% {
                    animation-timing-function: ease-out;
                    transform: scale(1);
                    transform-origin: center center;
                }

                10% {
                    animation-timing-function: ease-in;
                    transform: scale(0.91);
                }

                17% {
                    animation-timing-function: ease-out;
                    transform: scale(0.98);
                }

                33% {
                    animation-timing-function: ease-in;
                    transform: scale(0.87);
                }

                45% {
                    animation-timing-function: ease-out;
                    transform: scale(1);
                }
            }      
            </style>
            <div class="loader">
                <svg width="175" height="46" viewBox="0 0 175 46" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <rect width="175" height="46" fill="url(#pattern0_7619_28772)"/>
                <defs>
                <pattern id="pattern0_7619_28772" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0_7619_28772" transform="matrix(0.00166667 0 0 0.00634058 0 -0.00407609)"/>
                </pattern>
                <image id="image0_7619_28772" width="600" height="159" xlink:href="data:image/png;base64,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"/>
                </defs>
                </svg>
            </div>
        `;
  }
}

class ModalChallenge extends HTMLElement {
  numberOfPhases = {
    ONE: { title: "1 Fase", description: "una fase" },
    TWO: { title: "2 Fases", description: "dos fases" },
  };

  style = /* html */ `
      <style>
        dialog {
          width: 523px;
          height: Hug (483px)px;
          padding: 10px 20px 20px 20px;
          gap: 0px;
          border-radius: 20px;
          opacity: 0px;
          border: none;
          position: fixed;
          inset: 0;
          margin: auto;
          animation: show-modal .3s .1s both;
          background-color: #061130;
          color:white;
        }
        dialog[open]::backdrop{
          animation: show-backdrop .3s forwards;
        }
        dialog.closing {
          animation: hide-modal .2s forwards;
        }
        dialog.closing::backdrop {
          animation: hide-backdrop .2s .2s both;
        }
        dialog::backdrop{
          background-color: rgba(0, 0, 0, 60%);
        }
        @keyframes show-modal{
          0%{
            transform: translateY(-20%);
            opacity:0;
          }
          100%{
            transform: translateY(0%);
            opacity: 1;
          }
        }
        @keyframes hide-modal{
          100% {
            transform: translateY(-20%);
            opacity: 0;
            }
        }
        @keyframes show-backdrop{
          0%{
            opacity: 0;
          }
          100%{
            opacity: 1;
          }
        }
        @keyframes hide-backdrop{
          100%{
            opacity: 0;
          }
        }
        
        dialog container {
          display: flex;
          flex-direction: column;
          gap: 16px
        }
        dialog container .close {
          display: flex;
          align-self: flex-end;
          cursor: pointer;
        }
        dialog container .text {
          color: var(--Azul-2, white);
          /* Paragraph M semibold */
          font-family: Poppins;
          font-size: 16px;
          font-style: normal;
          font-weight: 600;
          line-height: 24px; /* 150% */
          margin-top: 16px;
        }
        dialog container .title {
          color: var(--Color-botones, #007CFF);
          /* H5 Heading bold */
          font-family: Poppins;
          font-size: 28px;
          font-style: normal;
          font-weight: 700;
          line-height: 36px; /* 128.571% */
          text-align: center;
        }
        dialog container .column {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        dialog container .row {
          display: flex;
          justify-content: center;
          gap: 16px;
        }
        dialog container .phases,
        dialog container .type,
        dialog container .profit,
        dialog container .balance {
          color: var(--Azul-2, white);
          /* Paragraph M bold */
          font-family: Poppins;
          font-size: 16px;
          font-style: normal;
          font-weight: 700;
          line-height: 24px; /* 150% */
          width: 40%;
          text-align: center;
        }
        dialog form {
          display: flex;
          flex-wrap: wrap;
          gap: 13px;
          justify-content: space-between;
        }
        dialog form .control {
          width: 48%;
        }
        dialog form input,
        dialog form select {
          width: -webkit-fill-available;
          height: 44px;
          gap: 12px;
          border-radius: 12px;
          background: #FFFFFF;
          border: 1px solid #D9DBE3;
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          text-align: center;
        }
        dialog form .buttons {
          margin-top: 16px;
          width: 100%;
          display: flex;
          justify-content: flex-end;
          gap: 20px;
        }
        .btn{
          cursor: pointer;
          padding: 8px 25px;
          border-radius: 12px;
          vertical-align: middle;
          outline: none;
          border: none;
          user-select: none;
          transition: .3s;
        }
        .btn:focus {
          color: #fff;
          background-color: #0b5ed7;
          border-color: #0a58ca;
          box-shadow: 0 0 0 .25rem rgba(49, 132, 253, .5);
        }
        dialog form .buttons .secondary {
          height: 44px;
          background: none;
          color: white;
          text-align: center;
          font-variant-numeric: lining-nums tabular-nums;
          font-feature-settings: 'liga' off;
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          letter-spacing: 0.14px;
          text-decoration-line: underline;
        }
        dialog form .buttons .primary {
          height: 44px;
          background: #007CFF;
          color: #FFF;
          text-align: center;
          font-variant-numeric: lining-nums tabular-nums;
          font-feature-settings: 'liga' off;
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          text-transform: uppercase;
        }
        dialog form .buttons .primary:hover{
          background: #0b5ed7; 
        }
  
        @media(max-width: 750px){
          dialog form{
            flex-direction: column;
          }
          dialog form .control{
            width: 100%;
          }
          dialog form .buttons{
            flex-direction: column;
            align-items: center;
            gap: 8px;
          }
          
        }
        @media(max-width: 570px){
          dialog{
            margin: auto 4px;
          }
        }
      </style>
  `;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.countryValues = [];
    this.baseUrl = "https://app-trader.impulseworld.pro";
    this.partner = this.getAttribute("partner") || "";

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.pixel = this.getAttribute("fbpixel") || "";
    this.addFacebookPixel(this.pixel);
  }

  addFacebookPixel(pixel) {
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );
    fbq("init", pixel);
    fbq("track", "PageView");
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["hidden", "challenge"];
  }
  attributeChangedCallback(name) {
    switch (name) {
      case "hidden":
        break;
      case "challenge":
        this.openModal();
        break;
    }
  }

  async openModal() {
    fbq("track", "AddToCart");
    const challenge = JSON.parse(this.getAttribute("challenge"));
    if (!this.countryValues.length) {
      const response = await fetch(this.baseUrl + "/api/geo/v1/countries");
      const { data } = await response.json();
      const countries = data.items;
      this.countryValues = countries.map((country) => {
        return {
          value: country.countryId,
          label: country.name,
        };
      });
    }

    const dialog = this.shadowRoot.querySelector("dialog");
    dialog.classList.remove("closing");
    // // create country selector
    const countrySelector = document.createElement("select");
    countrySelector.id = "country-selector";
    countrySelector.name = "country";
    countrySelector.innerHTML = this.countryValues
      .map(
        (country) =>
          `<option value="${country.value}">${country.label}</option>`
      )
      .join("");
    dialog.querySelector("#country-selector-container").innerHTML = null;
    dialog.querySelector("#country-selector-container").append(countrySelector);

    dialog.querySelector("#productType").innerHTML =
      challenge.challengeTypeDescription;

    if (challenge.modality) {
      dialog.querySelector(".phases").innerHTML =
        this.numberOfPhases[challenge.modality]?.title;
    }

    if (challenge.netProfit > 0) {
      dialog.querySelector(".profit").innerHTML =
        challenge.netProfit + "% profit";
    }

    if (challenge.hasSwing) {
      dialog.querySelector(".type").innerHTML = challenge.hasSwing
        ? "Swing"
        : "Regular";
    }

    dialog.querySelector(
      ".balance"
    ).innerHTML = `${challenge.balance.toLocaleString("en-US")} USD`;

    dialog.showModal();
    this.formSubmit();
  }

  formSubmit() {
    const form = this.shadowRoot.querySelector("form");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const challenge = JSON.parse(this.getAttribute("challenge"));
      const name = form.querySelector("#name").value;
      const lastname = form.querySelector("#lastname").value;
      const email = form.querySelector("#email").value;
      const country = form.querySelector("#country-selector").value;
      const url = new URL(this.baseUrl + "/challenge/configure/guest");
      url.searchParams.append("firstName", name);
      url.searchParams.append("lastName", lastname);
      url.searchParams.append("email", email);
      url.searchParams.append("country", country);
      url.searchParams.append("challengeTypeCode", challenge.impulseCode);
      url.searchParams.append("challengeBalance", challenge.balance);
      url.searchParams.append("isSwing", challenge.hasSwing);
      url.searchParams.append("productId", challenge.productId);
      url.searchParams.append("partner", this.partner);
      url.searchParams.append("pixel", this.pixel);

      fbq("track", "CompleteRegistration");

      const a = document.createElement("a");
      a.href = url.toString();
      a.target = "_blank";
      a.click();
    });
  }

  closeModal() {
    const dialog = this.shadowRoot.querySelector("dialog");
    dialog.classList.add("closing");
    setTimeout(() => {
      dialog.close();
    }, 500);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
      ${this.style}
      <dialog close id="modal">
          <container>
              <span id="close-modal" class="close">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <mask id="mask0_8632_24948" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                          width="24" height="24">
                          <rect width="24" height="24" fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_8632_24948)">
                          <path
                              d="M12.0005 13.0538L6.92737 18.1269C6.78892 18.2654 6.61489 18.3362 6.40527 18.3394C6.19567 18.3426 6.01844 18.2718 5.87357 18.1269C5.72869 17.982 5.65625 17.8064 5.65625 17.6C5.65625 17.3936 5.72869 17.218 5.87357 17.0731L10.9466 12L5.87357 6.9269C5.73511 6.78845 5.66427 6.61442 5.66107 6.4048C5.65786 6.1952 5.72869 6.01797 5.87357 5.8731C6.01844 5.72822 6.19407 5.65578 6.40047 5.65578C6.60687 5.65578 6.78251 5.72822 6.92737 5.8731L12.0005 10.9462L17.0736 5.8731C17.212 5.73464 17.3861 5.6638 17.5957 5.6606C17.8053 5.65739 17.9825 5.72822 18.1274 5.8731C18.2723 6.01797 18.3447 6.1936 18.3447 6.4C18.3447 6.6064 18.2723 6.78203 18.1274 6.9269L13.0543 12L18.1274 17.0731C18.2658 17.2116 18.3367 17.3856 18.3399 17.5952C18.3431 17.8048 18.2723 17.982 18.1274 18.1269C17.9825 18.2718 17.8069 18.3442 17.6005 18.3442C17.3941 18.3442 17.2184 18.2718 17.0736 18.1269L12.0005 13.0538Z"
                              fill="black" />
                      </g>
                  </svg>
              </span>
              <span class="text">Estos son los detalles del desafío que elegiste:</span>
              <span id="productType" class="title">Classic 6</span>
              <div class="column">
                  <div class="row">
                      <span class="phases"></span>
                      <span>|</span>
                      <span class="type"></span>
                  </div>
                  <div class="row">
                      <span class="profit"></span>
                      <span>|</span>
                      <span class="balance"></span>
                  </div>
              </div>
              <span class="text">Ingresa tus datos para continuar con tu compra</span>
              <form id="user-info">
                  <div class="control">
                      <input id="name" name="firstName" type="text" placeholder="Nombre" required>
                  </div>
                  <div class="control">
                      <input id="lastname" name="lastname" type="text" placeholder="Apellido" required>
                  </div>
                  <div class="control">
                      <input id="email" name="email" type="email" placeholder="Email" required>
                  </div>
                  <div class="control" id="country-selector-container"></div>
                  <div class="buttons">
                      <button id="btn-back" class="btn secondary" type="button">Regresar</button>
                      <button class="btn primary" type="submit">Continuar</button>
                  </div>
              </form>
          </container>
        </dialog>
      `;
    const btnCloseModal = this.shadowRoot.querySelector("#close-modal");
    btnCloseModal.addEventListener("click", this.closeModal);
    const btnBack = this.shadowRoot.querySelector("#btn-back");
    btnBack.addEventListener("click", this.closeModal);
  }
}

window.customElements.define("impulse-modal", ModalChallenge);

window.customElements.define("impulse-products", ImpulseProducts);
