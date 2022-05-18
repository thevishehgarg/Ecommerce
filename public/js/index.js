const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}
if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

let prod_js = '{ "products" : [' +
'{ "ci1":"Black Combo"},' +
'{ "firstName":"Anna"},' +
'{ "firstName":"Peter"} ]}';
const obj = JSON.parse(prod_js);

document.getElementById("ci1").innerHTML =
obj.products[0].ci1;