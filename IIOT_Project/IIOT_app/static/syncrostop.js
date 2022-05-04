var stopDIV = "stopdiv";
var stopBUTTON = "stopbutton";
var stopSPAN = "stopspan";
var stopP = "stopp";
var stopA = "stopa";

var stopdefaults = {
    title: "Machine Halt",
    catagories: [{
            name: "STOP",
            value: 30,
            color: "#ff6384",
        },
        {
            name: "EMERGENCY",
            value: 15,
            color: "#ff9f40",
        },
        {
            name: "BREAKDOWN",
            value: 7,
            color: "red",
        },
        {
            name: "POWERGONE",
            value: 2,
            color: "blue",
        },
        {
            name: "JCO",
            value: 25,
            color: "black",
        },
        {
            name: "PREVENTIVE MAIN",
            value: 14,
            color: "#maroon",
        },
    ],
};

window.addEventListener("load", function() {
    initStopSteppedProgress();
});

function initStopSteppedProgress() {
    [].forEach.call(
        document.querySelectorAll("[stop-stepped-bar]"),
        function(steppedProgress, index) {
            if (steppedProgress) {
                var valueTotal = 0;
                var data;
                if (steppedProgress.getAttribute("stop-stepped-bar")) {
                    data = JSON.parse(steppedProgress.getAttribute("stop-stepped-bar"));
                } else {
                    data = stopdefaults;
                }

                //#region: Markup

                var title = createElementWithClass(stopP, "syncro-card-title");
                title.textContent = data.title;

                var step = createElementWithClass(stopDIV, "syncro-progress-stepped");

                var row = createElementWithClass(stopDIV, "syncro-row");

                data.catagories.forEach(function(catagory, i) {
                    valueTotal += catagory.value;
                });

                data.catagories.forEach(function(catagory, i) {
                    stepItem = createElementWithClass(
                        stopDIV,
                        "syncro-progress-stepped-item"
                    );
                    stepItem.setAttribute(
                        "data-id",
                        "progress-stepped-item-" + index + "-" + i
                    );
                    stepItem.textContent = catagory.value;
                    stepItem.style.width = (catagory.value / valueTotal) * 100 + "%";
                    stepItem.style.backgroundColor = catagory.color;

                    step.appendChild(stepItem);

                    var dot = createElementWithClass(stopSPAN, "syncro-dot");
                    dot.style.backgroundColor = catagory.color;

                    var category = createElementWithClass(stopSPAN, "syncro-category-name");
                    category.textContent = catagory.name;

                    var btn = createElementWithClass(stopBUTTON, "syncro-btn");
                    btn.setAttribute(
                        "data-target",
                        "progress-stepped-item-" + index + "-" + i
                    );
                    btn.appendChild(dot);
                    btn.appendChild(category);

                    var col = createElementWithClass(stopDIV, "syncro-col-auto");
                    col.appendChild(btn);

                    row.appendChild(col);
                });

                var cardBody = createElementWithClass(stopDIV, "syncro-card-body");
                cardBody.appendChild(title);
                cardBody.appendChild(step);
                cardBody.appendChild(row);

                var card = createElementWithClass(stopDIV, "syncro-card");
                card.appendChild(cardBody);

                var markup = createElementWithClass(stopDIV);
                markup.appendChild(card);

                steppedProgress.innerHTML = markup.innerHTML;

                //#endregion: Markup

                //#region:
                [].forEach.call(
                    steppedProgress.querySelectorAll(".syncro-progress-stepped-item"),
                    function(el) {
                        el.addEventListener("mouseenter", (e) => {
                            toggleActive(e, el);
                        });
                        el.addEventListener("mouseleave", (e) => {
                            toggleActive(e, el);
                        });
                    }
                );
                [].forEach.call(
                    steppedProgress.querySelectorAll(".syncro-btn"),
                    function(el) {
                        el.addEventListener("click", function() {
                            const dataID = el.getAttribute("data-target");
                            var targetElm = document.querySelector(
                                '[data-id="' + dataID + '"]'
                            );

                            if (targetElm.classList.contains("active")) {
                                targetElm.classList.remove("active");
                            } else {
                                [].forEach.call(
                                    steppedProgress.querySelectorAll(
                                        ".syncro-progress-stepped-item"
                                    ),
                                    function(el) {
                                        el.classList.remove("active");
                                    }
                                );
                                targetElm.classList.add("active");
                            }
                        });
                    }
                );
                //#endregion
            }
        }
    );
}

function toggleActive(e, el) {
    if (e.type === "mouseenter") {
        if (!el.classList.contains("active")) {
            el.classList.add("active");
        }
    } else if (e.type === "mouseleave") {
        if (el.classList.contains("active")) {
            el.classList.remove("active");
        }
    }
}

function createElementWithClass(element, className = "") {
    var ele = document.createElement(element);
    if (className) {
        var classList = className.split(" ");
        classList.forEach(function(value, index) {
            ele.classList.add(value);
        });
    }
    return ele;
}

var actkm = [];
var expkm = [];
/*data_url = "/about/powercnt"*/

async function getData3() {
    const response = await fetch(data_url);
    const data = await response.json();
    const {
        ActualKM,
        ExpecKM
    } = data;
    actkm = parseInt(ActualKM);
    expkm = parseInt(ExpecKM);
    updateprchart();
}

function updateprchart() {
    stopdefaults.catagories[0].value = actkm;
    stopdefaults.catagories[1].value = expkm;
    initStopSteppedProgress();
}

/*setInterval(getData3,1000);*/