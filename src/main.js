let allCards = [];
const cardList = document.getElementById("card-list");
const tabList = document.getElementById("tablist");
const counter = document.querySelector(".values data");
const labelColorMap = {"bug": "high", "help wanted": "medium", "enhancement": "green", "documentation": "purple", "good first issue": "pink"};

async function loadCards() {
    allCards = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(json => json.data);
    renderCards(allCards);
}

function renderCards(cards) {
    const fragment = document.createDocumentFragment();
    counter.textContent = `${cards.length} Issues`;
    for (const card of cards) {
        const li = document.createElement('li');
        const cardStatus = card.status;
        const cardPriority = card.priority;
        li.innerHTML = `
                        <article class="card" data-status="${cardStatus}">
                            <div class="card-content">
                                <header>
                                    <img src="./assets/${cardStatus}.png" alt="${cardStatus} marker">
                                    <p class="hl hl-${cardPriority}">${cardPriority}</p>
                                </header>
                                <h2>${card.title}</h2>
                                <p>${card.description}</p>

                                <ul>
                                    ${createLabels(card.labels)}
                                </ul>
                            </div>

                            <hr>

                            <footer>
                                <p>#${card.id} by ${card.author}</p>
                                ${createDate(card.createdAt)}
                            </footer>
                        </article>
        `;
        fragment.append(li);
        
    }
    cardList.innerHTML = '';
    cardList.append(fragment);
}

function createDate(dateString) {
    const date = new Date(dateString);
    return `<time datetime="${dateString}">${date.toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"})}</time>`;
}

function createLabels(labels) {
    let lis = '';
    for (const label of labels) {
        lis += `<li class="hl hl-${labelColorMap[label]}"><img src="./assets/${labelColorMap[label]}.svg" alt="">${label}</li>`;
    }
    return lis;
}

tabList.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (btn == null) return;

    for (const button of tabList.children) {
        button.setAttribute("aria-selected", button == btn ? "true" : "false");
    }

    const status = btn.dataset.filter;
    renderCards(status == "all" ? allCards : allCards.filter(card.status == status));
});

loadCards();
