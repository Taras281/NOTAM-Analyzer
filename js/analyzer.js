function analyzeNOTAM(text) {

    return {
        type: analyzeType(text),
        gps: analyzeGPS(text),
        uas: analyzeUAS(text),
        altitude: analyzeAltitude(text),
        validity: analyzeValidity(text),
        danger: analyzeDanger(text)
    };

}
function analyzeType(text) {

    const upper = text.toUpperCase();

    if (upper.includes("MILITARY"))
        return "Military";

    if (upper.includes("EXERCISE"))
        return "Exercise";

    if (upper.includes("GPS"))
        return "Navigation";

    if (upper.includes("RWY"))
        return "Runway";

    if (upper.includes("TWY"))
        return "Taxiway";

    return "General";

}

function analyzeGPS(text) {

    const upper = text.toUpperCase();

    return upper.includes("GPS") ||
           upper.includes("GNSS") ||
           upper.includes("JAMMING");
}

function analyzeUAS(text) {

    const upper = text.toUpperCase();

    return upper.includes("UAS") ||
           upper.includes("UAV") ||
           upper.includes("DRONE") ||
           upper.includes("UNMANNED");
}

function analyzeAltitude(text) {
    return "";
}

function analyzeValidity(text) {
    return "";
}

function analyzeDanger(text) {
    return "";
}