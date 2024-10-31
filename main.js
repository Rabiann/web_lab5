// changing contents of block 4 and block 5
function swapping_contents() {
    for (let i = 0; i < 2; i++) {
        const block4 = document.getElementsByClassName("side1")[i];
        const block5 = document.getElementsByClassName("side2")[i];
        const t = [...block4.childNodes];
        block4.replaceChildren(...block5.childNodes);
        block5.replaceChildren(...t);

    }
}

// find area of triangle and append it to the end of block3
function calculate_triangle_area() {
    let h = 10
    let b = 20

    const area = 1 / 2  * (b * h);

    const block3 = document.getElementsByClassName("main");
    for (const block of block3) {
        const to_add = document.createElement("p")
        to_add.textContent = "Triangle area=" + area;
        block.appendChild(to_add)
    }
}

for (const elem of document.getElementsByClassName("myform")) {
    elem.addEventListener("submit", (e) => {
        const data = new FormData(e.target);
        let min = 100;
        let n = 0;
        
        for (let i = 1; i < 11; i++) {
            const p = data.get("n"+ i);
            if (p < min) {
                min = p;
                n = 1;
            }

            else if (p == min) {
                n++;
            }
        }

        alert(n);
        document.cookie = "value=" + n;
    })
}

window.addEventListener("load", (e) => {
    if (!localStorage.getItem('color')) {
        const color = prompt("Enter hex for main content text color:");
        if (color) {
            localStorage.setItem('color', color);
        }
    }

    const color = localStorage.getItem('color');
    if (color) {
        const mains = document.getElementsByClassName('main');
        [...mains].forEach(main => main.style.color = "#" + color)
    }
})

swapping_contents();
calculate_triangle_area();

localStorage.removeItem("list");

const blocks = ["header", "side", "side1", "side2", "main", "footer"];
for (let block of blocks) {
    const elems = document.getElementsByClassName(block);
    for (const main of elems) {
        main.addEventListener("dblclick", (e) => {
            const form = document.createElement("form");
            form.setAttribute("onsubmit", "return false");
            const input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("name", "list");
            const submit = document.createElement("input");
            submit.setAttribute("type", "submit");
            submit.setAttribute("value", "submit");
            form.appendChild(input);
            form.appendChild(submit);
            main.replaceChildren(form);
            form.addEventListener("submit", (e) => {
                const data = new FormData(e.target);
                const txt = data.get("list");
                if (!localStorage.getItem("list")) {
                    localStorage.setItem("list", "");
                }
                let list = localStorage.getItem("list");

                list += txt + "\n";
                
                const ul = document.createElement("ul");

                const a = list.split("\n");
                for (const element of a.slice(0, -1)) {
                    const li = document.createElement("li");
                    li.textContent = element;
                    ul.appendChild(li);
                }

                main.replaceChildren(ul);
                localStorage.setItem("list", list);
            })
        });
    }
}


if (document.cookie) {
    const value = document.cookie.split('=')[1];
    alert("Calculated value: " + value + "\nAfter pressing OK cookie value will be deleted.");
    document.cookie += ";max-age=0"
    alert("Value deleted. After pressing OK page will be reloaded.");
    location.reload();
}