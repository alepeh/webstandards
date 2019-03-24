import {html} from 'lit-html';

export default function spinner() {
    return html`
        <style>
        .center {
            margin: auto;
            width: 50%;
            top: 50%;
            left: 50%;
          }
        .lds-ring {
            display: inline-block;
            position: relative;
            width: 64px;
            height: 64px;
          }
          .lds-ring div {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: 51px;
            height: 51px;
            margin: 6px;
            border: 6px solid #818181;
            border-radius: 50%;
            animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: #818181 transparent transparent transparent;
          }
          .lds-ring div:nth-child(1) {
            animation-delay: -0.45s;
          }
          .lds-ring div:nth-child(2) {
            animation-delay: -0.3s;
          }
          .lds-ring div:nth-child(3) {
            animation-delay: -0.15s;
          }
          @keyframes lds-ring {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }          
        </style>
        <div class="lds-ring center"><div></div><div></div><div></div><div></div></div>
        `;
}