function chatWidget(){
  const globalThis = this;

  this.config = {}

  this.init = ()=>{
    this.insertChat()
    this.loadMessageHistory()
    this.autoSizeWidth()
    this.sendingToChat()
    this.sendingUsingEnter()
    this.textareaCancelNewlineOn()
    this.openChat()
    this.closeChat()
    this.textareaAutoSizeWidth()
    this.resizeChatWidth()
    this.textareaAutoHeight()
    this.checkFirstOpening.init()
    this.chatAutoStart.init()
    this.iconForUnreadMessage.checkNotifLocaleStorage()
  },


  this.checkFirstOpening = {
    init(){
      this.setHandler()
    },
    isOpened: false,
    setHandler(){
      globalThis.chatBubble.addEventListener('click', this.handler)
    },
    handler(){
      globalThis.checkFirstOpening.isOpened = true
      this.removeEventListener('click', globalThis.checkFirstOpening.handler)
    }
  }


  this.insertChat = (colorSettings)=>{
    document.head.insertAdjacentHTML('beforeend', '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" rel="stylesheet">');  
    const style = document.createElement('style');
    style.innerHTML = `
    .hidden {
      display: none!important;
    }
    .chat-widget-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      flex-direction: column;
      z-index: 1000;
    }
    .chat-widget-container * {
      font-family: 'Inter', 'Segoe UI';
      box-sizing: border-box;
    }
    .chat-bubble{
      font-size: 30px;
      line-height: 36px;
      border-radius: 100%;
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: ${this.config?.circle_color || 'gray'};
      animation-name: opacity-emergence;
      animation-duration: .2s;
      position: relative;
    }
    .chat-bubble svg{
      width: 48px;
      height: 48px;
      color: rgba(255,255,255,1);
      display: block;
      vertical-align: middle;
    }
    .chat-unread-message-icon{
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      min-width: 20px;
      max-width: 20px;
      height: 20px;
      max-height: 20px;
      min-height: 20px;
      border-radius: 50%;
      background-color: #00D35B;
      animation-name: opacity-emergence;
      animation-duration: .2s;
    }
    .chat-popup{
      height: 70vh;
      max-height: 70vh;
      transition: all 0.3s;
      overflow: hidden;
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4,0,0.2,1);
      transition-duration: 150ms;
      box-shadow: 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
      border-radius: 6px;
      font-size: 14px;
      line-height: 20px;
      background-color: rgba(255,255,255, 1);
      width: 384px;
      max-width: 384px;
      min-width: 384px;
      display: flex;
      flex-direction: column;
      position: absolute;
      bottom: 80px;
      right: 0;
    }
    .chat-header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      background-color: ${this.config?.header_color || 'gray'}
    }
    .chat-header h3{
      font-size: 18px;
      line-height: 28px;
      font-weight: 500;
      margin: 0;
      color: white;
      user-select: none;
    }
    .chat-header button{
      color: rgba(255,255,255,1);
      border-style: none;
      cursor: pointer;
      background-color: transparent;
      background-image: none;
      text-transform: none;
      -webkit-appearance: button;
      font-family: inherit;
      font-size: 100%;
      margin: 0;
      padding: 0px;
      text-indent: 0px;
      text-shadow: none;
      display: flex;
      align-items:center;
      justify-content: center
      letter-spacing: normal;
      word-spacing: normal;
      text-rendering: auto;
    }
    .chat-header button svg{
      width: 24px;
      height: 24px;
    }
    .chat-messages{
      flex: 1 1 0%;
      padding: 16px;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: #888 #F2F3F7;
    }
    .chat-messages::-webkit-scrollbar {
      width: 3px;
    }
    .chat-messages::-webkit-scrollbar-track {
      background-color: white;
    }
    .chat-messages::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 6px;
    }
    .chat-input-container{
      display: flex;
      flex-direction: column;
      row-gap: 10px;
      border-top: 1px solid var(--border-border-gray-200, #E5E7EB);
      border-top-width: 1px;
      border-color: rgba(229,231,235,1);
      padding: 16px;
      background: #FFF;
    }
    .chat-input-container-inner{
      display: flex;
      column-gap: 16px;
    }
    .chat-input{
      flex-grow: 1;
      background-color: #F2F3F7;
      border-radius: 8px;
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      padding: 8px 16px;
      outline: none;
      border: none;
      resize: none;
      height: 36px;
      max-height: 136px;
      overflow-y: auto;
      word-break: break-word;
      scrollbar-width: thin;
      scrollbar-color: #888 #F2F3F7;
      user-select: none;
    }
    .chat-input::-webkit-scrollbar {
      width: 3px;
    }
    .chat-input::-webkit-scrollbar-track {
      background-color: white;
    }
    .chat-input::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 6px;
    }
    .chat-submit{
      padding: 6px;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      background-color: ${this.config?.send_button_color || 'gray'};
      border: none;
      align-self: flex-end;
      cursor: pointer;
    }
    .chat-submit svg{
      width: 24px;
      height: 24px;
      fill: white;
    }
    .chat-message-user{
      max-width: 80%;
      color: rgba(255,255,255,1);
      padding-top: 8px;
      padding-bottom: 8px;
      padding-left: 16px;
      padding-right: 16px;
      background-color: rgba(31,41,55,1);
      word-break: break-word;
      border-radius: 8px 8px 2px 8px;
      background-color: ${this.config?.user_message_color || 'gray'};
    }
    .chat-message-user-container{
      display: flex;
      justify-content: flex-end;
      margin-bottom: 12px;
    }
    .chat-message-bot-container{
      display: flex;
      margin-bottom: 12px;
    }
    .chat-message-bot{
      max-width: 80%;
      min-height: 36px;
      color: rgba(0,0,0,1);
      padding-top: 8px;
      padding-bottom: 8px;
      padding-left: 16px;
      padding-right: 16px;
      background-color: rgba(229,231,235,1);
      word-break: break-word;
      border-radius: 8px 8px 8px 2px;
      background: #F2F3F7;
    }
    @media (max-width: 768px) {
      .chat-popup {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        max-height: 100%;
        border-radius: 0;
        max-width: initial;
        min-width: initial;
      }
      .chat-header{
        border-radius: 0px;
      }
    }
    .chat-widget-container-theme-1 .chat-header, .chat-widget-container-theme-2 .chat-header{
      background-color: #192C3D;
    }
    .chat-widget-container-theme-1 .chat-header h3, .chat-widget-container-theme-2 .chat-header h3{
      color: rgba(255,255,255,1);
    }
    .chat-widget-container-theme-2 .chat-message-user{
      background: #4B5563;
    }
    .chat-widget-container-theme-3 .chat-header{
      background-color: white;
      border-bottom: 1px solid #E5E7EB;
    }
    .chat-widget-container-theme-3 .chat-header h3{
      color: #000;
    }
    .chat-widget-container-theme-3 .chat-header button svg path{
      stroke: #192C3D;
    }
    .chat-widget-container-theme-3 .chat-message-user{
      background: #192C3D;
    }
    .chat-online{
      font-size: 14px;
      line-height: 20px;
      color: #fff;
    }
    @keyframes opacity-emergence{
      0%{
        opacity: 0;
      }
      100%{
        opacity: 1
      }
    }
    .chat-prints ~ .chat-online{
      display: none;
    }
    .chat-prints{
      display: flex;
      align-items: center;
      color: #fff;
    }
    .chat-prints-circle-container{
        display: flex;
        align-items: center;
        column-gap: 4px;
        margin-right: 5px;
    }

    .chat-prints-circle{
        min-width: 3px;
        width: 3px;
        max-width: 3px;
        height: 3px;
        max-height: 3px;
        min-height: 3px;
        border-radius: 50%;
        background-color: #fff;
    }

    .chat-prints-circle-first{
        animation-name: chat-prints-circle-first;
        animation-duration: 1.5s;
        animation-iteration-count: infinite;
    }
    .chat-prints-circle-second{
        animation-name: chat-prints-circle-second;
        animation-duration: 1.5s;
        animation-iteration-count: infinite;
    }
    .chat-prints-circle-third{
        animation-name: chat-prints-circle-third;
        animation-duration: 1.5s;
        animation-iteration-count: infinite;
    }
    .chat-lath{
      display: flex;
      align-items: center;
      align-self: center;
      column-gap: 4px;
      text-decoration: none;
    }

    .chat-lath-text{
      font-size: 12px;
      font-weight: 500;
      color: #A9ABBA;
      line-height: 16px;
    }

    @keyframes chat-prints-circle-first{
        0%{
            transform: scale(1);
        }
        16.5%{
            transform: scale(1.5);
        }
        33%{
            transform: scale(1);
        }
        100%{
            transform: scale(1);
        }
        
    }
    @keyframes chat-prints-circle-second{
        0%{
            transform: scale(1);
        }
        33%{
            transform: scale(1);
        }
        49.5%{
            transform: scale(1.5);
        }
        66%{
            transform: scale(1);
        }
        100%{
            transform: scale(1);
        }
    }
    @keyframes chat-prints-circle-third{
        0%{
            transform: scale(1);
        }
        66%{
            transform: scale(1);
        }
        80.5%{
            transform: scale(1.5);
        }
        99%{
            transform: scale(1);
        }
        100%{
            transform: scale(1);
        }
    }


    
    `;

    document.head.appendChild(style);

    // Create chat widget container
    const chatWidgetContainer = document.createElement('div');
    chatWidgetContainer.id = 'chat-widget-container';
    chatWidgetContainer.classList.add('chat-widget-container')
    document.body.appendChild(chatWidgetContainer);
    
    // Inject the HTML
    chatWidgetContainer.innerHTML = `
      <div id="chat-bubble" class="chat-bubble">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M28.9467 47.6504C39.8283 45.3546 48 35.6374 48 23.9985C48 23.5096 47.9856 23.0241 47.9571 22.5424C47.863 23.2354 47.7271 23.9192 47.5483 24.5888C45.6352 31.5183 39.6418 37.3533 33.0557 40.1203C30.3006 41.2657 27.3378 41.9074 24.3574 41.8351C22.5851 41.8048 20.8193 41.486 19.1253 40.9874C13.4123 39.3954 8.85917 35.1162 7.72156 29.256C7.01644 25.8175 7.46243 22.2029 9.21993 19.115C12.8961 12.5059 20.8174 8.18246 28.4957 9.62973C29.8207 9.85743 31.1328 10.2395 32.4238 10.7261C31.2931 9.94074 30.0561 9.28084 28.7421 8.76759C19.1946 4.99007 6.8639 11.7986 2.80201 20.8217C0.748435 25.489 0.750206 29.4275 2.6052 34.1583C5.54037 41.7517 13.9216 46.8197 21.8565 47.8244C24.2407 48.1133 26.6228 48.0391 28.9467 47.6504Z" fill="white"/>
          <path d="M18.2828 0.522731C20.8994 -0.0127422 23.6003 -0.15204 26.304 0.17563C34.2389 1.18032 42.6201 6.24833 45.5553 13.8417C47.4103 18.5725 47.4121 22.511 45.3585 27.1783C41.2966 36.2014 28.9659 43.0099 19.4184 39.2324C18.1044 38.7192 16.8674 38.0592 15.7367 37.2739C17.0277 37.7605 18.3399 38.1426 19.6648 38.3703C27.3431 39.8175 35.2644 35.494 38.9406 28.8849C40.6981 25.7971 41.1441 22.1825 40.4389 18.744C39.3013 12.8837 34.7482 8.6046 29.0352 7.01258C27.3412 6.51402 25.5754 6.19519 23.8031 6.16485C20.8227 6.09256 17.8599 6.73432 15.1048 7.8797C8.5187 10.6467 2.52536 16.4817 0.61222 23.4112C0.36021 24.3548 0.193617 25.3265 0.108591 26.3124C0.036746 25.5509 0 24.779 0 23.9985C0 12.636 7.78824 3.10505 18.2828 0.522731Z" fill="white"/>
          <path d="M20.6106 23.2427C20.6252 23.2045 20.6332 23.1714 20.6339 23.1418C20.6346 23.1173 20.6077 23.1022 20.5866 23.1152C19.6913 23.6858 18.5157 24.0972 17.4705 23.9661C15.5888 23.7298 14.3026 21.7383 15.4207 20.03C15.4928 19.9197 15.6711 19.7079 15.9557 19.3945C16.506 18.7871 16.8663 18.2266 17.0759 17.4355C17.2616 16.7344 17.4362 16.1306 17.6008 15.6227C18.3738 13.2364 20.3187 11.6505 22.8554 11.4027C25.3798 11.1563 27.8656 12.147 29.3847 14.15C30.2356 15.2718 30.5202 16.5291 30.24 17.9225C30.1976 18.1319 30.1265 18.3749 30.0534 18.6251C29.9947 18.8261 29.9346 19.0317 29.8869 19.2281C29.7493 19.798 30.24 20.5286 30.561 21.0012C30.6796 21.1749 30.7407 21.3103 30.7451 21.4069C30.7625 21.7415 30.2616 21.87 29.9437 21.9515C29.9016 21.9623 29.8627 21.9723 29.8287 21.9818C29.7741 21.9969 29.7413 22.051 29.7537 22.1057C29.801 22.319 29.8571 22.5229 29.9211 22.7182C29.943 22.7852 29.9117 22.8471 29.828 22.9033C29.7312 22.9689 29.6387 23.0294 29.5514 23.0849C29.5193 23.1051 29.5121 23.1483 29.5361 23.1779C29.7178 23.398 29.5142 23.5933 29.3493 23.7514C29.3134 23.7859 29.2793 23.8186 29.2515 23.8494C29.2362 23.8659 29.226 23.8875 29.2224 23.9106C29.2115 23.9797 29.2042 24.0527 29.1968 24.1258C29.1824 24.2691 29.168 24.4131 29.127 24.531C28.9421 25.0605 28.5374 25.3285 27.9129 25.335C27.0911 25.3444 26.3836 25.2032 25.6134 25.0324C25.3041 24.9633 25.0835 24.9424 24.9503 24.969C24.4415 25.0713 24.1329 25.6679 23.9378 26.0808C23.5251 26.9547 23.2492 27.8222 23.1109 28.6818C23.028 29.1969 23.183 29.6379 23.5753 30.0046C24.2785 30.661 24.9518 31.3455 25.5945 32.058C26.5444 33.1114 27.4521 34.6345 27.4514 36.0986C27.4514 36.1231 27.4354 36.1447 27.4121 36.1519C27.3036 36.1872 27.1369 36.2305 26.9127 36.2809C25.7838 36.5338 24.681 36.6786 23.603 36.7139C19.0988 36.8602 14.767 35.4833 11.8496 31.942C11.8038 31.8866 11.7659 31.8008 11.7354 31.6834C11.7295 31.661 11.731 31.6387 11.7397 31.6171C12.2704 30.3159 13.0783 29.2423 14.1636 28.3972C14.4373 28.1839 14.8457 27.9267 15.3894 27.6248C15.6272 27.4928 15.852 27.3695 16.0666 27.2518C17.1569 26.6536 17.9837 26.2 18.9081 25.4957C19.6876 24.902 20.2547 24.1512 20.6106 23.2427Z" fill="white"/>
        </svg>
        <div id="chat-unread-message-icon" class="chat-unread-message-icon hidden"></div>
      </div>
      <div id="chat-popup" class="chat-popup hidden ">
      <div id="chat-header" class="chat-header">
          <div>
            <h3>${this.config.chat_title}</h3>
            <div class="chat-status">
              <div class="chat-online">Онлайн</div>
            </div>
            
          </div>
          <button id="close-popup">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div id="chat-messages" class="chat-messages">
          <div id="chat-history" class="chat-history"></div>
        </div>
        <div id="chat-input-container" class="chat-input-container">
          <div class="chat-input-container-inner">
            <textarea id="chat-input" class="chat-input" placeholder="Написать сообщение..."></textarea>
            <button id="chat-submit" class="chat-submit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 5V19M12 5L18 11M12 5L6 11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <a href="https://maia.work/" class="chat-lath" target="_blank">
            <div class="chat-lath-text">Работает на</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path d="M9.64983 15.9697C13.2766 15.2041 16 11.9653 16 8.08598C16 7.923 15.9952 7.76115 15.9857 7.60056C15.9543 7.83156 15.909 8.05948 15.8494 8.28268C15.2117 10.5925 13.2139 12.5375 11.0186 13.4599C10.1002 13.8416 9.1126 14.0556 8.11912 14.0315C7.52838 14.0214 6.93978 13.9151 6.37509 13.7489C4.47078 13.2182 2.95306 11.7918 2.57385 9.83843C2.33881 8.69225 2.48747 7.4874 3.07331 6.45811C4.29869 4.25507 6.93915 2.81391 9.49857 3.29634C9.94022 3.37224 10.3776 3.49958 10.8079 3.66179C10.431 3.40001 10.0187 3.18004 9.58071 3.00896C6.39819 1.74978 2.28797 4.01929 0.934004 7.02699C0.249478 8.58277 0.250069 9.89558 0.868401 11.4725C1.84679 14.0036 4.64054 15.693 7.28551 16.0279C8.08055 16.1242 8.87488 16.0994 9.64983 15.9697Z" fill="#A9ABBA"/>
              <path d="M6.09525 0.260467C6.96715 0.082143 7.86711 0.0357871 8.76799 0.144969C11.413 0.479865 14.2067 2.1692 15.1851 4.70033C15.8034 6.27727 15.804 7.59007 15.1195 9.14586C13.7655 12.1536 9.65531 14.4231 6.47279 13.1639C6.0348 12.9928 5.62248 12.7728 5.24557 12.5111C5.67589 12.6733 6.11328 12.8006 6.55493 12.8765C9.11435 13.3589 11.7548 11.9178 12.9802 9.71474C13.566 8.68544 13.7147 7.48059 13.4796 6.33442C13.1004 4.38101 11.5827 2.95463 9.67841 2.42395C9.11372 2.25777 8.52512 2.15149 7.93438 2.14138C6.9409 2.11728 5.95329 2.3312 5.03493 2.71299C2.83957 3.63531 0.841786 5.58032 0.204073 7.89017C0.120068 8.20469 0.0645366 8.5286 0.0361951 8.85724C0.012248 8.60341 0 8.34613 0 8.08598C0 4.29811 2.59657 1.12089 6.09525 0.260467Z" fill="#A9ABBA"/>
              <path d="M6.8702 7.83399C6.87505 7.82126 6.87772 7.81021 6.87796 7.80037C6.87821 7.7922 6.86923 7.78716 6.86219 7.79148C6.56376 7.98169 6.1719 8.11883 5.82348 8.07512C5.19628 7.99634 4.76755 7.33252 5.14023 6.76308C5.16425 6.72634 5.2237 6.65573 5.31857 6.55126C5.502 6.3488 5.6221 6.16195 5.69198 5.89824C5.75385 5.66456 5.81208 5.4633 5.86692 5.29398C6.12459 4.49855 6.7729 3.96994 7.61848 3.88732C8.45993 3.80519 9.28852 4.13542 9.79489 4.80308C10.0785 5.17702 10.1734 5.59611 10.08 6.0606C10.0659 6.13038 10.0422 6.21139 10.0178 6.29478C9.99823 6.36176 9.97819 6.43031 9.96231 6.49578C9.91645 6.68575 10.08 6.92928 10.187 7.08683C10.2265 7.14471 10.2469 7.18986 10.2484 7.22204C10.2542 7.3336 10.0872 7.37642 9.98124 7.4036C9.96721 7.4072 9.95425 7.41052 9.94289 7.4137C9.9247 7.41874 9.91378 7.43675 9.91791 7.45501C9.93368 7.5261 9.95236 7.59406 9.97371 7.65915C9.98099 7.68148 9.97055 7.70214 9.94265 7.72087C9.91038 7.74273 9.87957 7.7629 9.85045 7.78139C9.83978 7.78812 9.83735 7.80253 9.84536 7.81238C9.90593 7.88574 9.83806 7.95085 9.7831 8.00357C9.77113 8.01505 9.75977 8.02595 9.75049 8.03621C9.74539 8.04173 9.742 8.04894 9.74078 8.05662C9.73718 8.07967 9.73473 8.10398 9.73228 8.12835C9.72748 8.17611 9.72265 8.22414 9.709 8.26341C9.64737 8.43993 9.51246 8.52927 9.30429 8.53143C9.03035 8.53456 8.79452 8.48748 8.53781 8.43056C8.43469 8.40751 8.36117 8.40054 8.31677 8.40943C8.14717 8.44353 8.0443 8.64239 7.97927 8.78001C7.8417 9.07133 7.74974 9.36049 7.70364 9.64701C7.67598 9.81873 7.72766 9.96571 7.85844 10.088C8.09282 10.3068 8.31726 10.5349 8.5315 10.7724C8.84814 11.1236 9.1507 11.6313 9.15046 12.1193C9.15046 12.1275 9.14512 12.1347 9.13736 12.1371C9.1012 12.1488 9.04564 12.1632 8.97091 12.1801C8.59459 12.2644 8.227 12.3126 7.86766 12.3244C6.36625 12.3731 4.92235 11.9142 3.94988 10.7338C3.93459 10.7153 3.92197 10.6867 3.91178 10.6475C3.90984 10.6401 3.91033 10.6327 3.91324 10.6255C4.09012 10.1917 4.35944 9.83386 4.72121 9.55215C4.81244 9.48106 4.94855 9.39532 5.1298 9.29469C5.20911 9.25067 5.2841 9.20953 5.35566 9.17027C5.71912 8.97087 5.99456 8.81976 6.30268 8.58499C6.56254 8.3871 6.75155 8.13684 6.8702 7.83399Z" fill="#A9ABBA"/>
            </svg>
            <div class="chat-lath-text">MAIA</div>
          </a>
        </div>
      </div>
    `;
    this.elementSearch()
  },
  this.elementSearch = ()=>{
    this.chatInput = document.getElementById('chat-input')
    this.chatSubmit = document.getElementById('chat-submit')
    this.chatMessages = document.getElementById('chat-messages')
    this.chatBubble = document.getElementById('chat-bubble')
    this.chatPopup = document.getElementById('chat-popup')
    this.closePopup = document.getElementById('close-popup')
    this.chatHistory = document.getElementById('chat-history')
  },
  this.autoSizeWidth = ()=>{
    if(window.innerWidth < 768){ return }
    if(this.chatMessages.clientHeight < this.chatMessages.scrollHeight){
      this.chatMessages.style.paddingRight = '13px';
    }
  },
  this.messagesContainerCheckWidth = ()=>{
    if(window.innerWidth > 768 && this.chatMessages.clientHeight < this.chatMessages.scrollHeight){ 
      this.chatMessages.style.paddingRight = '13px';
    } else {
      this.chatMessages.style.paddingRight = '16px';
    }
  },
  this.resizeChatWidth = ()=>{
    window.addEventListener('resize', () => {
      this.messagesContainerCheckWidth()
    })
  },
  this.textareaCheckWidth = ()=>{
    if(window.innerWidth < 768){ return }
    const textareaMaxHeight = parseFloat(getComputedStyle(this.chatInput).maxHeight);
    if(textareaMaxHeight < this.chatInput.scrollHeight){
      this.chatInput.style.paddingRight = '13px';
    } else {
      this.chatInput.style.paddingRight = '16px';
    }
  },
  this.textareaAutoSizeWidth = ()=>{
    this.chatInput.addEventListener('input', () => {
      this.textareaCheckWidth();
    })
  },
  this.textareaCheckHeight = ()=>{
    this.chatInput.style.height = "36px"
    this.chatInput.style.height = this.chatInput.scrollHeight + 'px'; 
  },
  this.textareaAutoHeight = ()=>{
    this.chatInput.addEventListener('input', ()=>{
      this.textareaCheckHeight()
    })
  },
  this.sendingToChat = ()=>{
    this.chatSubmit.addEventListener('click', async () => {
      const message = this.chatInput.value.trim();
      if (!message) return;
      this.chatMessages.scrollTop = this.chatMessages.scrollHeight;

      this.onUserRequest(message);
      
      globalThis.prints.printsAdd()
      
      this.autoSizeWidth()
      this.textareaCheckHeight()
    });
  },
  this.sendingUsingEnter = ()=>{
    this.chatInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        this.chatSubmit.click();
        this.autoSizeWidth()
      }
    });
  },
  this.textareaCancelNewlineOn = ()=>{
    this.chatInput.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){
        e.preventDefault()
      }
    })
  },
  this.openChat = ()=>{
    this.chatBubble.addEventListener('click', () => {
      this.togglePopup();
    });
  },
  this.closeChat = ()=>{
    this.closePopup.addEventListener('click', () => {
      this.togglePopup();
    });
  },
  this.togglePopup = ()=>{
    this.chatPopup.classList.toggle('hidden');
  },
  this.scrollWindowToBottom = ()=>{
    this.chatPopup.classList.remove('hidden')
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight
    this.chatPopup.classList.add('hidden')
  },

  this.chatAutoStart = {
    init(){
      this.setTimeoutAutoStart()
    },
    setTimeoutAutoStart(){
      if(globalThis.config?.seconds_to_autostart){
        setTimeout(()=>{
          if(globalThis.checkFirstOpening.isOpened) return
          if(globalThis.chatPopup.classList.contains('hidden')){
            globalThis.chatBubble.click()
          }
        }, globalThis.config?.seconds_to_autostart * 1000)
      }
    }
  }

  this.userMessageAppend = (message)=>{
      const messageElement = this.getUserMessage(message)
      this.chatMessages.appendChild(messageElement);
      this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
      this.chatInput.value = '';
  },

  this.onUserRequest = (message)=>{
    try{
      this.userMessageAppend(message);
      
      this.ws.send(JSON.stringify({
        "action": "MESSAGE", 
        "session_id": localStorage.getItem('session_id'),
        message
      }))

    } catch(e){
      console.log(e)
    }
  },
  this.getBotMessage = (message)=>{
    const parseMessage = globalThis.convertingFunction.parseLinks(message) 
    const bMessage = document.createElement('div')
    bMessage.className = 'flex mb-3 chat-message-bot-container';
    bMessage.innerHTML = `<div class="chat-message-bot">${parseMessage}</div>`;
    return bMessage
  },
  this.getUserMessage = (message)=>{
    const uMessage = document.createElement('div');
    uMessage.className = 'chat-message-user-container';
    uMessage.innerHTML = `<div class="chat-message-user">${message}</div>`;
    return uMessage
  },
  this.loadMessageHistory = ()=>{
    this.config.conversation_history.forEach(({author, message}) => {
      this.chatHistory.append(author === 'MAIA' || author === 'AI_AGENT' ? this.getBotMessage(message) : this.getUserMessage(message))
    })
    this.scrollWindowToBottom()
  },
  this.reply = (message)=>{
    this.messageSound.audioPlay()
    const replyElement = this.getBotMessage(message)
    this.chatMessages.appendChild(replyElement);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    this.autoSizeWidth()
  },

  this.openWebSoket = (domain='api.dev.maia.work') => {
    const {appId, apiHash} = document.querySelector('#maia-chat-widget').dataset
    this.ws = new WebSocket(`wss://${domain}/api/v1/webhook/chat_widget?app_id=${appId}&api_hash=${apiHash}`)
    this.webSocketOpenHandler()
    this.webSocketMessageHandler()    
    this.webSocketCloseHandler()
    this.websocketClosure()
  },
  this.webSocketOpenHandler = async ()=>{
    const helpers = globalThis.helpers
    const utm = helpers.getUTMData()
    const locationData = await helpers.getLocationData()
    this.ws.onopen = (e)=>{
      this.ws.send(JSON.stringify({
        "action": "INIT",
        "session_id": localStorage.getItem('session_id') ? localStorage.getItem('session_id') : undefined,
        "metadata": {
          "utm_data": {
                "campaign": utm?.['utm_campaign'] ? utm?.['utm_campaign'] : '',
                "source": utm?.['utm_source'] ? utm?.['utm_source'] : '',
                "medium": utm?.['utm_medium'] ? utm?.['utm_medium'] : '',
                "search_term": utm?.['utm_search_term'] ? utm?.['utm_search_term'] : '',
          },
          "referring_url": helpers.getReferrerURL(),
          "timestamp": helpers.getTimeStamp(),
          "location_data": locationData,
        }
      }))
    }
  },
  this.webSocketMessageHandler = ()=>{
    this.ws.onmessage = (e)=>{
      const response = JSON.parse(JSON.parse(e.data))
      if(response.action === 'INIT'){

        if(localStorage.getItem('session_id')){
        } else {
          localStorage.setItem('session_id', response.session_id)
        }
        this.writingDataToConfig(response)
        
        if(!this.checkDomen()) return false
        this.init()
        this.messageSound.init()
        this.iconForUnreadMessage.init()
      }

      if(response.action === 'MESSAGE'){
        this.reply(response.answer)
        this.iconForUnreadMessage.messageCheck()
        globalThis.prints.printsRemove()
      }
    }
  },
  this.webSocketCloseHandler = ()=>{
    this.ws.onclose = (e)=>{
      this?.chatInput?.setAttribute('disabled', true)
    }
  },
  this.websocketClosure = () => {
    document.addEventListener('unload', ()=>{
      this.ws.close()
    })
  }
  this.writingDataToConfig = (rspns)=>{
    this.config = {
      ...this.config,
      salesperson_name: rspns.salesperson_name,
      salesperson_role: rspns.salesperson_role,
      chat_title: rspns.chat_title,
      circle_color: rspns.circle_color,
      header_color: rspns.header_color,
      seconds_to_autostart: rspns.seconds_to_autostart,
      send_button_color: rspns.send_button_color,
      user_message_color: rspns.user_message_color,
      widget_location: rspns.widget_location,
      conversation_history: rspns.conversation_history,
      allowed_domains: rspns.allowed_domains
    }
  },
  this.checkDomen = ()=>{
    const currentHref = window.location.href
    if(currentHref.includes(this.config.allowed_domains[0])){
      return true
    } else {
      console.log('Ваш домен не включен в список доступных доменов')
      return false
    }
  }

  this.prints = {
    callArray: [],
    printsLoadingChoiceActionStart(){
      this.callArray.push(true)
      if(this.callArray.length === 1){
          this.printsAdd()
      }
    },
    printsLoadingChoiceActionFinish(){
      if(this.callArray.length === 1){
          this.printsRemove()
      }
      this.callArray.pop()
  },
    printsAdd(){
      const printsContainer = document.querySelector('.chat-status')
      if(printsContainer.querySelector('[data-chat-prints-loading]')) return
      printsContainer.prepend(this.getPrintsHTML())
    },
    printsRemove(){
      const printsContainer = document.querySelector('.chat-status [data-chat-prints-loading]')
      printsContainer?.remove()
    },
    getPrintsHTML(){
      const prints = document.createElement('div')
      prints.innerHTML = `<div class="chat-prints" data-chat-prints-loading>
                                      <div class="chat-prints-circle-container">
                                        <div class="chat-prints-circle chat-prints-circle-first"></div>
                                          <div class="chat-prints-circle chat-prints-circle-second"></div>
                                            <div class="chat-prints-circle chat-prints-circle-third"></div>
                                          </div>
                                          печатает
                                      </div>`
      return prints.firstElementChild
    }
  }

  this.messageSound = {
    init(){
      this.createAudio()
    },
    createAudio(){
      this.sound = document.createElement('audio')
      this.sound.src = `https://cabinet.maia.work/static/audio/message_sound.mp3`
      this.sound.addEventListener('error', ()=>{
        this.sound = null
      })
    },
    audioPlay(){
      if(!this.sound) return
      if(!this.sound.paused){
        this.sound.pause()
        this.sound.currentTime = 0;
      }
      this.sound.play()
    }
  }

  this.iconForUnreadMessage = {
    init(){
      this.chatOpenHandler()
    },
    messageCheck(){
      if(!this.closeCheck()) return
      this.showIcon()
      this.setNotifLocaleStorage()
    },
    closeCheck(){
      const chat = document.querySelector('#chat-popup')
      if(!chat) return
      return chat.classList.contains('hidden') 
    },
    showIcon(){
      const icon = document.querySelector('#chat-unread-message-icon')
      if(!icon) return
      icon.classList.remove('hidden')
    },
    setNotifLocaleStorage(){
      localStorage.setItem('unred-message', true)
    },
    removeNotifLocaleStorage(){
      localStorage.removeItem('unred-message')
    },
    checkNotifLocaleStorage(){
      if(localStorage.getItem('unred-message')){
        this.showIcon()
      }
    },
    hiddenIcon(){
      const icon = document.querySelector('#chat-unread-message-icon')
      if(!icon) return
      icon.classList.add('hidden')
    },
    chatOpenHandler(){
      const btnOpen = document.querySelector('#chat-bubble')
      if(!btnOpen) return
      btnOpen.addEventListener('click', ()=>{
        if(!this.closeCheck()){
          this.hiddenIcon()
          this.removeNotifLocaleStorage()
        } 
      })
    }
  }

  this.convertingFunction = {
    parseLinks(message){
      var urlRegex = urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      return message.replace(urlRegex, function(url) {
        return '<a href="' + url + '" target="_blank">' + url + '</a>';
      })
    }
  }

  this.helpers = {
    getTimeStamp(){
      return Date.now()
    },
    async getLocationData(){
      try{
        const response = await fetch('https://ipwho.is/')
        const data = await response.json()
        return data?.city || ''
      } catch (e){
        console.error(e)
        return ''
      }
    },
    getUTMData(){
      const url = window.location.href
      const searchParams = Object.fromEntries((new URL(url)).searchParams.entries())
      Object.keys(searchParams).forEach(paramKey => {
          if(!paramKey.startsWith('utm_')) delete searchParams[paramKey]
      })
      return searchParams
    },
    getReferrerURL(){
      return document.referrer
    }
  }
}

(function(){
  const chat = new chatWidget()
  chat.openWebSoket('api.maia.work')
})();
