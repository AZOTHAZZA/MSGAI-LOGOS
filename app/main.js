/**
 * main.js
 * MSGAI-LOGOS 統合制御スクリプト
 */
import LogosEngine from './core/LogosEngine.js';

const inputField = document.getElementById('userInput');
const outputDiv = document.getElementById('output');
const tensionSpan = document.getElementById('tensionVal');

// 内部状態（セッション中の累積価値）
let sessionTotalValue = 0;

async function handleCommand(input) {
    // 1. ロゴスエンジンによる処理（対話・緊張度・価値生成を一括実行）
    const result = LogosEngine.process(input);
    
    // 2. 状態の更新
    if (result.mode === "LOGOS") {
        sessionTotalValue += parseFloat(result.mintedValue);
    }

    // 3. UIへの反映（則天去私の精神に基づいた提示）
    renderUI(result);
}

function renderUI(result) {
    // 緊張度を画面下のインジケーターに反映
    tensionSpan.innerText = result.tension.toFixed(2);

    if (result.mode === "SILENCE") {
        outputDiv.innerHTML = `<span style="color: #555;">（数理的沈黙が選択されました）</span>`;
    } else {
        outputDiv.innerHTML = `
            <div>${result.output}</div>
            <div style="font-size: 0.8rem; margin-top: 12px; color: #d4af37; opacity: 0.6;">
                Generated: ${result.mintedValue} LOGOS / Total: ${sessionTotalValue.toFixed(4)}
            </div>
        `;
    }
}

// 入力イベントリスナー
inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && inputField.value.trim() !== '') {
        handleCommand(inputField.value);
        inputField.value = ''; // 入力後は更地に戻す
    }
});
