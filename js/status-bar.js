const batteryObject = {
    batteryIsCharging: false,
    batteryCharged: ""
};

const navigator = window.navigator;
const clock = document.querySelector("span#clock");
const batteryStatusValue = document.querySelector(
    ".status-bar__column:last-child span"
);
const batteryStatusIcon = document.querySelector(
    ".status-bar__column:last-child i"
);

const batteryChargeIcon = document.querySelector(
    ".status-bar__column:last-child i:last-child"
);

function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    clock.innerText = `${hours}:${minutes}`;
}

function updateBatteryStatus() {
    const battery = navigator.getBattery().then(function(battery) {
        batteryObject.batteryCharged = `${battery.level * 100}%`;

        if (Number(battery.level * 100) >= 100) {
            batteryStatusIcon.classList.add("fa-battery-full");
            batteryStatusIcon.classList.remove(
                "fa-battery-three-quarters",
                "fa-battery-quarter",
                "fa-battery-empty",
                "fa-battery-half"
            );
        } else if (
            Number(battery.level * 100) > 50 &&
            Number(battery.level * 100) <= 100
        ) {
            batteryStatusIcon.classList.add("fa-battery-three-quarters");
            batteryStatusIcon.classList.remove(
                "fa-battery-full",
                "fa-battery-quarter",
                "fa-battery-empty",
                "fa-battery-half"
            );
        } else if (
            Number(battery.level * 100) < 50 &&
            Number(battery.level * 100) >= 10
        ) {
            batteryStatusIcon.classList.add("fa-battery-quarter");
            batteryStatusIcon.classList.remove(
                "fa-battery-full",
                "fa-battery-three-quarters",
                "fa-battery-empty",
                "fa-battery-half"
            );
        } else if (Number(battery.level * 100) < 5) {
            batteryStatusIcon.classList.add("fa-battery-empty");
            batteryStatusIcon.classList.remove(
                "fa-battery-full",
                "fa-battery-three-quarters",
                "fa-battery-quarter",
                "fa-battery-half"
            );
        } else {
            batteryStatusIcon.classList.add("fa-battery-half");
            batteryStatusIcon.classList.remove(
                "fa-battery-full",
                "fa-battery-three-quarters",
                "fa-battery-quarter",
                "fa-battery-empty"
            );
        }
        batteryStatusValue.innerText = batteryObject.batteryCharged;
        batteryIsCharging = battery.charging;

        battery.addEventListener("chargingchange", function() {
            batteryIsCharging = battery.charging;
        });
        if (batteryIsCharging == true) {
            batteryChargeIcon.classList.add("fa-bolt-lightning");
        } else {
            batteryChargeIcon.classList.remove("fa-bolt-lightning");
        }
    });
}
getClock();
updateBatteryStatus();
setInterval(getClock, 1000);
setInterval(updateBatteryStatus, 1000);
