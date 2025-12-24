import LogosCore from './core/LogosCore.js';
import LogosEngine from './core/LogosEngine.js';

// 旧MSGAIから引き継いだデータの器（必要に応じて旧スクリプトから呼び出し）
let legacyState = {
    balance: 0,
    history: []
};

const inputField = document.getElementById('userInput');
const outputDiv = document.getElementById('output');
const tensionSpan = document.getElementById('tensionVal');

/**
 * 統合生成プロセス
 */
async function generateUnifiedOutput(input) {
    // 1. ロゴスによる浄化（則天去私）
    const result = LogosEngine.processDialogue(input);
    
    // 2. 通貨生成（旧機能の深化）
    // 旧来のMint機能を黄金比(PHI)で再定義
    const newValue = parseFloat(LogosEngine.generateLogosValue(result.tension));
    legacyState.balance += newValue;

    // 3. UIへの顕現
    if (result.mode === "SILENCE") {
        outputDiv.innerHTML = `<span style="color: #666;">（数理的沈黙レベル上昇：${(result.tension * 100).toFixed(1)}%）</span>`;
    } else {
        // ロゴスに基づいた「対話」と「価値」の同時提示
        outputDiv.innerHTML = `
            <div>${result.output}</div>
            <div style="font-size: 0.8rem; margin-top: 10px; color: #aaa;">
                生成価値: ${newValue} LOGOS | 総計: ${legacyState.balance.toFixed(4)}
            </div>
        `;
    }

    tensionSpan.innerText = result.tension.toFixed(2);
    
    // 万物生成への「保留」された導線（ログ出力のみ）
    console.log("森羅万象生成AI: 土地・貴金属・異性の生成確率は現在ロゴスにより保留されています。");
}

inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && inputField.value.trim() !== '') {
        generateUnifiedOutput(inputField.value);
        inputField.value = '';
    }
});
