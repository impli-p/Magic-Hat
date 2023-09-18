document.addEventListener("DOMContentLoaded", function(event) {
    var file = document.getElementById("file");
    
    var outputs_container = document.getElementById("outputs_container");

    var button = document.getElementById("button");

    var number = document.getElementById("number");

    var names = [];

    file.addEventListener("change", function(event) {
        if (file.files) {
            let list = file.files[0];
            if (list) {
                list.text()
                .then((text) => {
                    names = text.split("\n");
                    number.setAttribute("max", names.length);
                    button.removeAttribute("disabled");
                })
                .catch((e) => console.error(e));
            }
        }
    })


    
    number.addEventListener("change", function(event) {
        outputs_container.innerHTML = "<div class=\"output\"><span id=\"output_1\">&nbsp;</span></div>";
        if (number.value > 1) {
            for (let i = 1; i < number.value; i++) {
                outputs_container.innerHTML += "<div><span class=\"and\">and</span></div><div class=\"output\"><span id=\"output_" + (i + 1) + "\">&nbsp;</span></div>"
            }
        }
    })

    button.addEventListener("click", function(event) {
        let outputs = document.getElementsByClassName("output");
        let values = [];
        let range = names.length;

        let last_index = Math.floor(Math.random() * range);
        values.push(names[last_index]);

        if (number.value > 1) {
            names_remaining = JSON.parse(JSON.stringify(names));
            for (let i = 1; i < number.value; i++) {
                range -= 1;
                names_remaining.splice(last_index, 1);
                last_index = Math.floor(Math.random() * range);
                values.push(names_remaining[last_index]);
            }
        }

        for (let j = 0; j < outputs.length; j++) {
            outputs[j].textContent = values[j];
        }
    })
});