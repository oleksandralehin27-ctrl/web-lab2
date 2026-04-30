const items = [
    {
        id: 1,
        name: "Еспресо",
        price: 40,
        category: "Кава",
        calories: 15,
        image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1200&auto=format&fit=crop",
        description: "Класична міцна кава"
    },

    {
        id: 2,
        name: "Капучино",
        price: 65,
        category: "Кава",
        calories: 120,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
        description: "Кава з молочною пінкою"
    },

    {
        id: 3,
        name: "Лате",
        price: 75,
        category: "Кава",
        calories: 180,
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1200&auto=format&fit=crop",
        description: "Ніжна кава з молоком"
    },

    {
        id: 4,
        name: "Чізкейк",
        price: 90,
        category: "Десерти",
        calories: 320,
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1200&auto=format&fit=crop",
        description: "Сирний десерт"
    },

    {
        id: 5,
        name: "Чай",
        price: 50,
        category: "Чай",
        calories: 10,
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1200&auto=format&fit=crop",
        description: "Ароматний чай"
    },

    {
        id: 6,
        name: "Сніданок",
        price: 140,
        category: "Сніданки",
        calories: 450,
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1200&auto=format&fit=crop",
        description: "Смачний ранковий сет"
    }
];

function renderCards(data) {

    const container = document.getElementById("cards-container");

    container.innerHTML = "";

    data.forEach(item => {

        const col = document.createElement("div");

        col.className = "col-12 col-md-6 col-lg-4";

        col.innerHTML = `
            <div class="card h-100 shadow">

                <img src="${item.image}"
                     class="card-img-top"
                     alt="${item.name}">

                <div class="card-body d-flex flex-column">

                    <h5 class="card-title">
                        ${item.name}
                    </h5>

                    <p class="card-text">
                        ${item.description}
                    </p>

                    <p>
                        🔥 ${item.calories} ккал
                    </p>

                    <div class="mt-auto">

                        <p class="fw-bold">
                            ${item.price} грн
                        </p>

                        <span class="badge bg-dark">
                            ${item.category}
                        </span>

                    </div>

                </div>

            </div>
        `;

        container.appendChild(col);
    });

    console.table(data);

    console.log("Відрендерено карток:", data.length);
}

const categories = [
    "Усі",
    ...new Set(items.map(item => item.category))
];

const controls = document.getElementById("controls");

categories.forEach(cat => {

    const btn = document.createElement("button");

    btn.className =
        "btn btn-outline-dark me-2 mb-2";

    btn.textContent = cat;

    btn.addEventListener("click", () => {

        const filtered =
            cat === "Усі"
            ? items
            : items.filter(item =>
                item.category === cat);

        renderCards(filtered);

        localStorage.setItem(
            "selectedCategory",
            cat
        );

        console.log("Фільтр:", cat);
    });

    controls.appendChild(btn);
});

function applyTheme(theme) {

    if (theme === "dark") {

        document.body.setAttribute(
            "data-bs-theme",
            "dark"
        );

        document.getElementById(
            "themeToggle"
        ).textContent = "Світла тема";

    } else {

        document.body.removeAttribute(
            "data-bs-theme"
        );

        document.getElementById(
            "themeToggle"
        ).textContent = "Темна тема";
    }
}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const savedTheme =
            localStorage.getItem("theme")
            || "light";

        applyTheme(savedTheme);

        const savedCategory =
            localStorage.getItem(
                "selectedCategory"
            );

        if (
            savedCategory &&
            savedCategory !== "Усі"
        ) {

            const filtered =
                items.filter(item =>
                    item.category === savedCategory
                );

            renderCards(filtered);

        } else {

            renderCards(items);
        }

        console.log("localStorage:", {
            theme: localStorage.getItem("theme"),
            category: localStorage.getItem("selectedCategory")
        });
    }
);

document.getElementById(
    "themeToggle"
).addEventListener(
    "click",
    () => {

        const current =
            localStorage.getItem("theme")
            || "light";

        const next =
            current === "light"
            ? "dark"
            : "light";

        localStorage.setItem(
            "theme",
            next
        );

        applyTheme(next);

        console.log(
            "Тема змінена на:",
            next
        );
    }
);