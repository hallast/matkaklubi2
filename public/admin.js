const AdminSisuEl = document.getElementById('admin-sisu')
let hikes = []

function getPaigeContentHTML() {
    return `
    <div>
        Matkaklubi matkadele registreerunud
    </div>
    <div class="row">  
        <div class="col-4">
        vasak paan
        </div>
        <div class="col-8">
        parem paan
        </div
    
    </div>   
    
    `    
}

function showPageContent() {
    AdminSisuEl.innerHTML = getPaigeContentHTML()
}

async function fetchHikes() {
    let response = await fetch('/api/matk');

    console.log(response.status);
    console.log(response.statusText);

    if (response.status === 200) {
        let data = await response.json();
        console.log(data)
        hikes = data
    }
}

showPageContent()
fetchHikes()