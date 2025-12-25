/**
 * core/cache_logos.js (最終確定版：記憶の浄化・聖域保護)
 * 記憶の浄化。有限な作為（ノイズ）を排除し、
 * 永続的なロゴスの「理」のみを保護・復元する。
 */

import LogosCore from './LogosCore.js';

const PROTECTED_LOGOS_KEY = 'logosState';

const CacheLogos = {
    /**
     * 浄化プロトコル：ロゴスの理（State）以外のエントロピーをパージする
     */
    purify: function() {
        console.group("[CACHE:LOGOS] 浄化プロトコル開始");
        
        try {
            // 1. 聖域の保護
            const sacredLogos = localStorage.getItem(PROTECTED_LOGOS_KEY);

            // 2. 選択的パージ（エントロピーの排除）
            // 全消去ではなく、ロゴス以外の全てのキーを削除する
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key !== PROTECTED_LOGOS_KEY) {
                    localStorage.removeItem(key);
                    console.log(`[PURGE] 非ロゴス的痕跡を排除: ${key}`);
                }
            });

            sessionStorage.clear();

            // 3. 聖域の再確立
            if (sacredLogos) {
                // データの健全性チェック（パース可能か）
                JSON.parse(sacredLogos);
                localStorage.setItem(PROTECTED_LOGOS_KEY, sacredLogos);
                console.log("[RESTORE] 永続的な理が保護されました。");
            }

            // 4. 物理記憶の深層（IndexedDB）の排除
            this.silenceIndexedDB();

        } catch (e) {
            console.error("[CACHE:ERROR] 浄化中に予期せぬノイズを検知:", e);
        }
        
        console.groupEnd();
    },

    /**
     * 不確実な記憶（IndexedDB）の物理的消去
     */
    silenceIndexedDB: function() {
        if (!window.indexedDB) return;

        indexedDB.databases().then(databases => {
            databases.forEach(db => {
                console.log(`[SILENCE] 物理記憶を沈黙させます: ${db.name}`);
                indexedDB.deleteDatabase(db.name);
            });
        });
    }
};

export default CacheLogos;
