/**
 * app/handler.js (LOGOS統合版)
 * 意志の伝達。UI上の操作をロゴスの作為へと変換する。
 */
import LogosEngine from '../core/LogosEngine.js';
import Finance from '../core/external_finance_logos.js';
import { CurrencyAct } from '../core/currency.js';

export function connectEventHandlers(Foundation, UI) {
    console.log("[HANDLER:LOGOS] 意志の結合を開始...");

    // -----------------------------------------------------------
    // 1. 対話・知性・自動鋳造 (The Logos Process)
    // -----------------------------------------------------------
    const dialogueButton = document.getElementById('dialogue_button');
    const dialogueInput = document.getElementById('dialogue_input');

    if (dialogueButton && dialogueInput) {
        dialogueButton.addEventListener('click', async () => {
            const prompt = dialogueInput.value.trim();
            if (!prompt) return;

            UI.displayDialogue('INFO', `入力監査中: "${prompt}"`);

            // 知性エンジンによる判定
            const audit = LogosEngine.process(prompt);
            
            // 判定結果に基づき、通貨(LOGOS)を自動鋳造
            const state = Foundation.getCurrentState();
            const mintResult = CurrencyAct.mint(
                state.accounts[state.active_user],
                'LOGOS',
                audit.purity,
                audit.entropy
            );

            // 状態更新とUI反映
            UI.displayDialogue('SUCCESS', audit.report);
            UI.updateUI(Foundation.getCurrentState(), audit.report);
            dialogueInput.value = '';
        });
    }

    // -----------------------------------------------------------
    // 2. 内部送金 (Internal Transfer)
    // -----------------------------------------------------------
    const transferButton = document.getElementById('transfer_internal_button');
    if (transferButton) {
        transferButton.addEventListener('click', () => {
            const state = Foundation.getCurrentState();
            const toUser = document.getElementById('transfer_to_user').value;
            const currency = document.getElementById('transfer_currency').value;
            const amount = parseFloat(document.getElementById('transfer_amount').value);

            const result = Finance.transferInternal(state.active_user, toUser, currency, amount);
            
            if (result.success) {
                UI.displayDialogue('SUCCESS', result.message);
                UI.updateUI(Foundation.getCurrentState(), "資産移動完了");
            } else {
                UI.displayDialogue('ERROR', result.reason);
            }
        });
    }

    // -----------------------------------------------------------
    // 3. 口座初期化 (Reset)
    // -----------------------------------------------------------
    const deleteButton = document.getElementById('delete_accounts_button');
    if (deleteButton) {
        deleteButton.addEventListener('click', () => {
            if (confirm("全ての記憶（口座）を消去し、静寂へ戻りますか？")) {
                const msg = Foundation.deleteAccounts();
                UI.updateUI(Foundation.getCurrentState(), msg);
                UI.displayDialogue('WARNING', "全記録が消去されました。");
            }
        });
    }

    // -----------------------------------------------------------
    // 4. ユーザー切り替え
    // -----------------------------------------------------------
    const userSelect = document.getElementById('active_user_select');
    if (userSelect) {
        userSelect.addEventListener('change', (e) => {
            Foundation.setActiveUser(e.target.value);
            UI.updateUI(Foundation.getCurrentState(), `統治対象を ${e.target.value} に変更。`);
        });
    }

    console.log("[HANDLER:LOGOS] 全ての神経接続が完了しました。");
}
