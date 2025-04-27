class Calisan {
    constructor(ad) {
        this.ad = ad;
    }
}

class Gorev {
    constructor(ad, calisan) {
        this.ad = ad;
        this.calisan = calisan;
        this.durum = "Başlanmadı"; // Başlangıç durumu
    }

    ilerlemeKaydet() {
        if (this.durum === "Başlanmadı") {
            this.durum = "Devam Ediyor";
        } else if (this.durum === "Devam Ediyor") {
            this.durum = "Tamamlandı";
        }
    }
}

class Proje {
    constructor(ad, baslangic, bitis) {
        this.ad = ad;
        this.baslangic = baslangic;
        this.bitis = bitis;
        this.gorevler = [];
    }

    gorevEkle(gorev) {
        this.gorevler.push(gorev);
    }
}

// Verileri saklamak için diziler
let projeler = [];

function createProject() {
    const name = document.getElementById('projectName').value;
    const start = document.getElementById('startDate').value;
    const end = document.getElementById('endDate').value;

    if (name && start && end) {
        const proje = new Proje(name, start, end);
        projeler.push(proje);
        updateProjectSelect();
        displayProjects();
        clearProjectForm();
    } else {
        alert("Lütfen tüm alanları doldurun!");
    }
}

function addTask() {
    const taskName = document.getElementById('taskName').value;
    const employeeName = document.getElementById('employeeName').value;
    const projectIndex = document.getElementById('projectSelect').value;

    if (taskName && employeeName && projectIndex !== "") {
        const calisan = new Calisan(employeeName);
        const gorev = new Gorev(taskName, calisan);
        projeler[projectIndex].gorevEkle(gorev);
        displayProjects();
        clearTaskForm();
    } else {
        alert("Lütfen tüm alanları doldurun!");
    }
}

function updateProjectSelect() {
    const select = document.getElementById('projectSelect');
    select.innerHTML = "";
    projeler.forEach((proje, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = proje.ad;
        select.appendChild(option);
    });
}

function displayProjects() {
    const projectsDiv = document.getElementById('projectsList');
    projectsDiv.innerHTML = "";

    projeler.forEach((proje, projeIndex) => {
        const projectCard = document.createElement('div');
        projectCard.className = "project-card";
        projectCard.innerHTML = `<h3>${proje.ad}</h3>
                                 <p>Başlangıç: ${proje.baslangic} - Bitiş: ${proje.bitis}</p>`;

        proje.gorevler.forEach((gorev, gorevIndex) => {
            const taskDiv = document.createElement('div');
            taskDiv.className = "task";
            taskDiv.innerHTML = `<strong>${gorev.ad}</strong> - ${gorev.calisan.ad} - Durum: ${gorev.durum}
            <button onclick="updateTask(${projeIndex}, ${gorevIndex})">İlerleme Kaydet</button>`;
            projectCard.appendChild(taskDiv);
        });

        projectsDiv.appendChild(projectCard);
    });
}

function updateTask(projeIndex, gorevIndex) {
    const gorev = projeler[projeIndex].gorevler[gorevIndex];
    gorev.ilerlemeKaydet();
    displayProjects();
}

function clearProjectForm() {
    document.getElementById('projectName').value = "";
    document.getElementById('startDate').value = "";
    document.getElementById('endDate').value = "";
}

function clearTaskForm() {
    document.getElementById('taskName').value = "";
    document.getElementById('employeeName').value = "";
}

