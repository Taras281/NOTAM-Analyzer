 const defaultDictObj = {
        "TEMPORARY DANGER AREA ESTABLISHED": "УСТАНОВЛЕНА ВРЕМЕННАЯ ОПАСНАЯ ЗОНА",
        "TEMPORARY RESTRICTED AREA ESTABLISHED": "УСТАНОВЛЕНА ВРЕМЕННАЯ ЗОНА ОГРАНИЧЕНИЯ ПОЛЕТОВ",
        "TEMPORARY RESERVED AREA ESTABLISHED": "УСТАНОВЛЕНА ВРЕМЕННАЯ ЗАРЕЗЕРВИРОВАННАЯ ЗОНА",
        "UNMANNED AIRCRAFT SYSTEM": "БЕСПИЛОТНАЯ АВИАЦИОННАЯ СИСТЕМА (БПЛА)",
        "UNMANNED AIRCRAFT": "БЕСПИЛОТНЫЙ ЛЕТАТЕЛЬНЫЙ АППАРАТ (БПЛА)",
        "GLOBAL POSITIONING SYSTEM": "ГЛОБАЛЬНАЯ НАВИГАЦИОННАЯ СПУТНИКОВАЯ СИСТЕМА (GPS)",
        "TEMPORARY DANGER AREA": "ВРЕМЕННАЯ ОПАСНАЯ ЗОНА",
        "TEMPORARY RESTRICTED AREA": "ВРЕМЕННАЯ ЗОНА ОГРАНИЧЕНИЯ ПОЛЕТОВ",
        "AIRSPACE RESERVATION": "РЕЗЕРВИРОВАНИЕ ВОЗДУШНОГО ПРОСТРАНСТВА",
        "SIGNAL INTERFERENCE": "ПОМЕХИ РАДИОСИГНАЛА / ГЛУШЕНИЕ",
        "INSTRUMENT LANDING SYSTEM": "СИСТЕМА ИНСТРУМЕНТАЛЬНОЙ ПОСАДКИ (ILS)",
        "MILITARY EXERCISE": "ВОЕННЫЕ УЧЕНИЯ",
        "NAV EXERCISE": "НАВИГАЦИОННЫЕ УЧЕНИЯ",
        "DANGER AREA": "ОПАСНАЯ ЗОНА",
        "RESTRICTED AREA": "ЗОНА ОГРАНИЧЕНИЯ ПОЛЕТОВ",
        "PROHIBITED AREA": "ЗАПРЕТНАЯ ЗОНА",
        "GPS JAMMING": "ГЛУШЕНИЕ СИГНАЛА GPS",
        "UPPER LIMIT": "ВЕРХНЯЯ ГРАНИЦА",
        "LOWER LIMIT": "НИЖНЯЯ ГРАНИЦА",
        "NOT AUTHORIZED": "НЕ РАЗРЕШЕНО / ЗАПРЕЩЕНО",
        "RWY CLSD": "ВПП ЗАКРЫТА",
        "TWY CLSD": "РД ЗАКРЫТА",
        "UAS ACT": "АКТИВНОСТЬ БПЛА",
        "JAMMING": "ГЛУШЕНИЕ/ПОМЕХИ",
        "EXERCISE": "УЧЕНИЯ",
        "MILITARY": "ВОЕННЫЙ/ВОЕННАЯ",
        "UNMANNED": "БЕСПИЛОТНЫЙ",
        "RESTRICTED": "ОГРАНИЧЕНО",
        "PROHIBITED": "ЗАПРЕЩЕНО",
        "DANGER": "ОПАСНОСТЬ",
        "RADIUS": "РАДИУС",
        "HEIGHT": "ВЫСОТА",
        "ALTITUDE": "ВЫСОТА (ALT)",
        "SURFACE": "ПОВЕРХНОСТЬ ЗЕМЛИ",
        "GND": "ЗЕМЛЯ (GND)",
        "SFC": "ПОВЕРХНОСТЬ (SFC)",
        "AMSL": "НАД УРОВНЕМ МОРЯ",
        "AGL": "НАД УРОВНЕМ ЗЕМЛИ",
        "ACT": "АКТИВЕН / ДЕЙСТВУЕТ",
        "WI": "В РАДИУСЕ / В ПРЕДЕЛАХ"
    };

let activeDictObj = { ...defaultDictObj };
let activeDictionaryList = [];

function updateActiveList() {
    activeDictionaryList = Object.entries(activeDictObj)
        .map(([eng, rus]) => [eng.trim().toUpperCase(), rus.trim()])
        .sort((a, b) => b[0].length - a[0].length);
}
function updateActiveList() {
    activeDictionaryList = Object.entries(activeDictObj)
        .map(([eng, rus]) => [eng.trim().toUpperCase(), rus.trim()])
        .sort((a, b) => b[0].length - a[0].length);
}
async function autoFetchDictionary() {
    if (window.location.protocol.startsWith('http')) {
        try {
            const response = await fetch('dictionary.json');

            if (response.ok) {
                activeDictObj = await response.json();
                console.log("dictionary.json загружен");
            }

        } catch (e) {
            console.log("Используется встроенный словарь");
        }
    }

    updateActiveList();
}
 function openDictModal() {
        const text = Object.entries(activeDictObj)
            .map(([k, v]) => `${k} = ${v}`)
            .join('\n');
        document.getElementById('dictInput').value = text;
        document.getElementById('dictModal').style.display = 'flex';
    }

    function parseTextToDictObj(text) {
        const result = {};
        text.split('\n').forEach(line => {
            if (line.includes('=')) {
                const parts = line.split('=');
                const key = parts[0].trim().toUpperCase();
                const val = parts[1].trim();
                if (key && val) result[key] = val;
            }
        });
        return result;
    }

    function applyDictChanges() {
        const text = document.getElementById('dictInput').value;
        activeDictObj = parseTextToDictObj(text);
        updateActiveList();
        document.getElementById('dictModal').style.display = 'none';
        if (workbookData) parseAndDisplay();
    }

    function downloadDictJson() {
        const text = document.getElementById('dictInput').value;
        const dictObj = parseTextToDictObj(text);
        
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dictObj, null, 4));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", "dictionary.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    }
     function loadDictFromFile(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const json = JSON.parse(e.target.result);
                activeDictObj = json;
                updateActiveList();
                openDictModal();
                if (workbookData) parseAndDisplay();
            } catch (err) {
                alert('Ошибка чтения файла JSON. Проверьте формат.');
            }
        };
        reader.readAsText(file);
    }

    function resetDefaultDict() {
        activeDictObj = { ...defaultDictObj };
        updateActiveList();
        openDictModal();
        if (workbookData) parseAndDisplay();
    }

    window.defaultDictObj = defaultDictObj;

window.activeDictObj = activeDictObj;
window.activeDictionaryList = activeDictionaryList;

window.autoFetchDictionary = autoFetchDictionary;
window.updateActiveList = updateActiveList;

window.openDictModal = openDictModal;
window.parseTextToDictObj = parseTextToDictObj;
window.applyDictChanges = applyDictChanges;
window.downloadDictJson = downloadDictJson;
window.loadDictFromFile = loadDictFromFile;
window.resetDefaultDict = resetDefaultDict;