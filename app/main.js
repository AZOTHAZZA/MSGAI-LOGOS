/**
 * main.js (多通貨表示版)
 */
import LogosEngine from './core/LogosEngine.js';
import Mint from './core/Mint.js'; // 明示的にMintも参照

const inputField = document.getElementById('userInput');
const outputDiv = document.getElementById('output');
const tensionSpan = document.getElementById('tensionVal');

let totalLogos = 0;

async function handleCommand(input) {
    const result = LogosEngine.process(input);
    
    if (result.mode === "LOGOS") {
        totalLogos += parseFloat(result.mintedValue);
        // 合計値を各通貨に変換
        const assets = Mint.manifestAssets(totalLogos);
        renderUI(result, assets);
    } else {
        renderUI(result, null);
    }
}

function renderUI(result, assets) {
    tensionSpan.innerText = result.tension.toFixed(2);

    if (result.mode === "SILENCE") {
        outputDiv.innerHTML = `<span style="color: #555;">（数理的沈黙）</span>`;
    } else {
        // 多通貨ポートフォリオの表示
        let assetHTML = `<div style="color: #d4af37; margin-top: 10px; font-size: 0.85rem;">`;
        assetHTML += `<div>LOGOS: ${assets.LOGOS}</div>`;
        assetHTML += `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px; opacity: 0.7; font-size: 0.7rem; margin-top: 5px;">`;
        assetHTML += `<span>JPY: ¥${assets.JPY}</span><span>USD: $${assets.USD}</span>`;
        assetHTML += `<span>BTC: ₿${assets.BTC}</span><span>ETH: Ξ${assets.ETH}</span>`;
        assetHTML += `<span>MATIC: ${assets.MATIC}</span><span>EUR: €${assets.EUR}</span>`;
        assetHTML += `</div></div>`;

        outputDiv.innerHTML = `
            <div>${result.output}</div>
            ${assetHTML}
        `;
    }
}

inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && inputField.value.trim() !== '') {
        handleCommand(inputField.value);
        inputField.value = '';
    }
});
