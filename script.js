let capacity = 0;
let cache = [];
let hitCount = 0;
let missCount = 0;
// DOM elements (IMPORTANT)
const cacheDiv = document.getElementById("cache");
const hits = document.getElementById("hits");
const misses = document.getElementById("misses");
const message = document.getElementById("message");
const keyInput = document.getElementById("keyInput");
const valueInput = document.getElementById("valueInput");
const capacityInput = document.getElementById("capacityInput");


function setCapacity() {
    capacity = Number(capacityInput.value);
    cache = [];
    hitCount = missCount = 0;
    updateStats();
    render();
    message.innerText = "Capacity set to " + capacity;
}

function reset() {
    cache = [];
    hitCount = missCount = 0;
    updateStats();
    render();
    message.innerText = "Cache reset";
}

function put() {
    const key = keyInput.value;
    const value = valueInput.value;
    if (!key || !value) return;

    let index = cache.findIndex(i => i.key === key);

    if (index !== -1) {
        // HIT
        hitCount++;
        const item = cache.splice(index, 1)[0];
        cache.push(item);
        message.innerText = "HIT: Key already exists";
        render(key, "hit");
    } else {
        // MISS
        missCount++;
        if (cache.length === capacity) {
    const lru = cache[0]; // first element = LRU
    alert(
        "Cache is FULL!\n\n" +
        "Least Recently Used key: " + lru.key + "\n" +
        "Removing it to insert new data."
    );
    cache.shift();
}

        cache.push({ key, value });
        message.innerText = "MISS: New key added";
        render(key, "miss");
    }

    updateStats();
}

function get() {
    const key = keyInput.value;
    if (!key) return;

    let index = cache.findIndex(i => i.key === key);

    if (index !== -1) {
        // HIT
        hitCount++;
        const item = cache.splice(index, 1)[0];
        cache.push(item);
        message.innerText = "HIT: Key found";
        render(key, "hit");
    } else {
        // MISS
        missCount++;
        message.innerText = "MISS: Key not found";
        render(null, "miss");
    }

    updateStats();
}

function render(highlightKey = null, type = "") {
    cacheDiv.innerHTML = "";

    cache.forEach(item => {
        const div = document.createElement("div");
        div.className = "box";

        if (item.key === highlightKey) {
            div.classList.add(type);
        }

        div.innerHTML = item.key + "<br>" + item.value;
        cacheDiv.appendChild(div);
    });
}

function updateStats() {
    hits.innerText = hitCount;
    misses.innerText = missCount;
}
