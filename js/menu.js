const menu = document.getElementById("menu");

const modal = document.getElementById("modal");
const modalBackground = document.querySelector(".modal-background");
const modalClose = document.getElementById("modal-close");

const modalImage = document.getElementById("modal-image");
const modalName = document.getElementById("modal-name");
const modalKorean = document.getElementById("modal-korean");
const modalDescription = document.getElementById("modal-description");
const modalIngredients = document.getElementById("modal-ingredients");
const modalMethod = document.getElementById("modal-method");


// 카테고리 순서
const categoryOrder = [
    "CLASSIC",
    "SIGNATURE"
];


// 메뉴 생성
function renderMenu() {

    menu.innerHTML = "";

    categoryOrder.forEach(category => {

        const categoryCocktails =
            cocktails.filter(cocktail =>
                cocktail.category === category
            );

        if (categoryCocktails.length === 0) {
            return;
        }


        // 카테고리
        const section = document.createElement("section");
        section.className = "category";


        // 카테고리 제목
        const categoryTitle = document.createElement("div");
        categoryTitle.className = "category-title";

        const icon = category === "CLASSIC"
            ? "🍸"
            : "✨";

        categoryTitle.innerHTML = `
            <span>${icon}</span>
            <span>${category}</span>
        `;

        section.appendChild(categoryTitle);


        // 칵테일 카드
        categoryCocktails.forEach(cocktail => {

            const card = document.createElement("button");

            card.className = "cocktail-card";

            card.innerHTML = `
                <img
                    class="cocktail-image"
                    src="${cocktail.image}"
                    alt="${cocktail.name}"
                >

                <div class="cocktail-info">

                    <h2 class="cocktail-name">
                        ${cocktail.name}
                    </h2>

                    <div class="cocktail-korean">
                        ${cocktail.koreanName}
                    </div>

                    <div class="ingredients">
                        ${cocktail.ingredientsText}
                    </div>

                </div>
            `;


            // 클릭하면 상세 정보 표시
            card.addEventListener("click", () => {
                openModal(cocktail);
            });


            section.appendChild(card);

        });


        menu.appendChild(section);

    });

}


// 상세 정보 표시
function openModal(cocktail) {

    modalImage.src = cocktail.image;
    modalImage.alt = cocktail.name;

    modalName.textContent = cocktail.name;
    modalKorean.textContent = cocktail.koreanName;

    modalDescription.textContent =
        cocktail.description;


    // 재료
    modalIngredients.innerHTML = "";

    cocktail.ingredients.forEach(ingredient => {

        const item = document.createElement("div");

        item.className = "ingredient-row";

        item.innerHTML = `
            <span>${ingredient.name}</span>
            <span>${ingredient.amount}</span>
        `;

        modalIngredients.appendChild(item);

    });


    // 제조법
    modalMethod.innerHTML = "";

    cocktail.method.forEach(step => {

        const item = document.createElement("li");

        item.textContent = step;

        modalMethod.appendChild(item);

    });


    modal.classList.add("show");

    // 모달이 열렸을 때 배경 스크롤 방지
    document.body.classList.add("modal-open");
}


// 상세 정보 닫기
function closeModal() {

    modal.classList.remove("show");

    document.body.classList.remove("modal-open");
}


// 닫기 버튼
modalClose.addEventListener("click", closeModal);


// 배경 클릭
modalBackground.addEventListener("click", closeModal);


// ESC 키
document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeModal();
    }

});


// 메뉴 실행
renderMenu();
