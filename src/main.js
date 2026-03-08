let allCards = [];
const cardList = document.getElementById("card-list");
const tabList = document.getElementById("tablist");
const counter = document.querySelector(".values data");
const labelColorMap = {"bug": "high", "help wanted": "medium", "enhancement": "green", "documentation": "purple", "good first issue": "pink"};
const modal = document.getElementById("modal");

async function loadCards() {
    await new Promise(resolve => setTimeout(resolve, 500));
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
                        <article class="card" data-id="${card.id}" data-status="${cardStatus}">
                            <div class="card-container">
                                <div class="card-content">
                                    <header>
                                        <img src="./assets/${cardStatus}.png" alt="${cardStatus} marker">
                                        <p class="hl hl-${cardPriority}">${cardPriority}</p>
                                    </header>
                                    <h2>${card.title}</h2>
                                    <p>${card.description}</p>

                                    <ul class="hl-container">
                                        ${createLabels(card.labels)}
                                    </ul>
                                </div>

                                <hr>

                                <footer>
                                    <p>#${card.id} by ${card.author}</p>
                                    ${createDate(card.createdAt)}
                                </footer>
                            </div>
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
    renderCards(status == "all" ? allCards : allCards.filter(card => card.status == status));
});

cardList.addEventListener('click', async(e) => {
    const card = e.target.closest(".card");
    if (card == null) return;

    modal.innerHTML = '<div class="loader"></div>';
    modal.showModal();

    const data = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${card.dataset.id * 1}`).then(res => res.json()).then(json => json.data);
    const priority = allCards[data.id - 1].priority;
    modal.innerHTML = `
                    <article>
                        <header>
                            <h2>${data.title}</h2>
                            <div class="modal-status">
                                <p data-status="${data.status}">${data.status}</p>
                                <ul>
                                    <li>Opened by ${data.author.replace("_", " ")}</li>
                                    <li>${createDate(data.createdAt)}</li>
                                </ul>
                            </div>
                        </header>
                        <ul class="hl-container">
                            ${createLabels(data.labels)}
                        </ul>
                        <p class="description">${data.description}</p>

                        <dl class="meta">
                            <div>
                                <dt>Assignee</dt>
                                <dd class="meta-title">${data.assignee.replace("_", " ")}</dd>
                            </div>
                            <div>
                                <dt>Priority</dt>
                                <dd class="meta-priority" data-priority="${priority}">${priority}</dd>
                            </div>
                        </dl>
                        <div class="button-container">
                            <button commandfor="modal" command="close">Close</button>
                        </div>
                    </article>
                `;

});

loadCards();

