const checklistData = [
    {
        id: 1,
        title: "비밀번호 관리",
        question: "사이트마다 다른 비밀번호를 사용하고 있다.",
        safeDescription: "안전한 비밀번호 관리 습관을 실천하고 있어요.",
        warningDescription: "같은 비밀번호를 반복해서 사용하고 있지는 않은지 확인해 보세요.",
        icon: "img/check-img/icon-lock.png"
    },
    {
        id: 2,
        title: "SNS 사용 습관",
        question: "SNS 개인정보 공개 범위를 확인하고 있다.",
        safeDescription: "SNS 개인정보 공개 범위를 잘 관리하고 있어요.",
        warningDescription: "위치나 생활 패턴이 과도하게 공개되지 않는지 확인해 보세요.",
        icon: "img/check-img/icon-share.png"
    },
    {
        id: 3,
        title: "개인정보 공개 범위",
        question: "필요한 정보만 공개하도록 설정하고 있다.",
        safeDescription: "개인정보 공개 범위를 적절하게 관리하고 있어요.",
        warningDescription: "불필요한 개인정보가 공개되어 있지는 않은지 확인해 보세요.",
        icon: "img/check-img/icon-eye.png"
    },
    {
        id: 4,
        title: "공공 Wi-Fi 사용",
        question: "공공 Wi-Fi에서는 로그인이나 결제를 피하고 있다.",
        safeDescription: "공공 네트워크를 안전하게 이용하고 있어요.",
        warningDescription: "공공 Wi-Fi에서는 로그인과 결제를 피하는 것이 좋아요.",
        icon: "img/check-img/icon-wifi.png"
    },
    {
        id: 5,
        title: "의심스러운 링크",
        question: "출처가 불분명한 문자나 이메일 링크를 바로 누르지 않는다.",
        safeDescription: "의심스러운 링크를 잘 구분하고 있어요.",
        warningDescription: "출처가 불분명한 링크는 바로 누르지 않는 것이 좋아요.",
        icon: "img/check-img/icon-link.png"
    },
    {
        id: 6,
        title: "계정 보안 설정",
        question: "중요한 계정에 2단계 인증을 설정해두었다.",
        safeDescription: "계정 보안 설정을 잘 활용하고 있어요.",
        warningDescription: "중요한 계정에는 2단계 인증을 설정해 보세요.",
        icon: "img/check-img/icon-gear.png"
    },
    {
        id: 7,
        title: "기기 관리 습관",
        question: "사용하지 않는 계정이나 앱을 주기적으로 정리한다.",
        safeDescription: "사용하지 않는 계정과 앱을 잘 정리하고 있어요.",
        warningDescription: "오래 사용하지 않은 계정이나 앱을 정리해 보세요.",
        icon: "img/check-img/icon-monitor.png"
    },
    {
        id: 8,
        title: "전체 점검",
        question: "개인정보 보호 설정을 주기적으로 확인하고 있다.",
        safeDescription: "개인정보 보호 습관을 꾸준히 실천하고 있어요.",
        warningDescription: "정기적으로 개인정보 보호 설정을 점검해 보세요.",
        icon: "img/check-img/icon-checklist.png"
    }
];

/* STATE */
let currentState = "ready";
let checkedItems = new Set();

/* DOM */
const checkSection = document.querySelector("#checkSection");
const questionList = document.querySelector("#questionList");
const resultGrid = document.querySelector("#resultGrid");
const warningGrid = document.querySelector("#warningGrid");
const resultSections = document.querySelectorAll(".result-section");

const startBtn = document.querySelector("#startBtn");
const resultBtn = document.querySelector("#resultBtn");
const retryBtn = document.querySelector("#retryBtn");

const heroLabel = document.querySelector("#heroLabel");
const heroTitle = document.querySelector("#heroTitle");
const heroDescription = document.querySelector("#heroDescription");

const checkSectionTitle = document.querySelector("#checkSectionTitle");
const checkSectionDescription = document.querySelector("#checkSectionDescription");

const scoreNumber = document.querySelector("#scoreNumber");
const scoreGrade = document.querySelector("#scoreGrade");
const scoreMessage = document.querySelector("#scoreMessage");
const scoreCircle = document.querySelector("#scoreCircle");

const safeCount = document.querySelector("#safeCount");
const warningCount = document.querySelector("#warningCount");
const totalCount = document.querySelector("#totalCount");

const summaryLabel1 = document.querySelector("#summaryLabel1");
const summaryLabel2 = document.querySelector("#summaryLabel2");

/* 체크리스트 */
function renderQuestionList() {
    questionList.innerHTML = checklistData.map(item => {
        const isChecked = checkedItems.has(item.id);
        const isDisabled = currentState === "result";

        return `
            <button
                type="button"
                class="check-answer-item ${isChecked ? "is-safe" : ""}"
                data-id="${item.id}"
                ${isDisabled ? "disabled" : ""}
            >
                <span class="check-answer-box">
                    ${isChecked ? "✓" : ""}
                </span>

                <span class="check-answer-text">
                    ${item.question}
                </span>
            </button>
        `;
    }).join("");

    if (currentState !== "checking") return;

    const checkButtons = document.querySelectorAll(".check-answer-item");

    checkButtons.forEach(button => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);

            if (checkedItems.has(id)) {
                checkedItems.delete(id);
            } else {
                checkedItems.add(id);
            }

            renderQuestionList();
            renderCheckingScore();
        });
    });
}

/* 진행 전 */
function setReadyState() {
    currentState = "ready";
    checkedItems.clear();

    heroLabel.textContent = "CHECK YOUR PRIVACY";

    heroTitle.innerHTML = `
        나의 개인정보 보호 습관을
        <span class="point">직접 확인해 보세요!</span>
    `;

    heroDescription.innerHTML = `
        평소 개인정보를 어떻게 관리하고 있는지<br>
        8개의 체크리스트를 통해 간단하게 점검해 보세요.
    `;

    startBtn.classList.remove("is-hidden");
    resultBtn.classList.remove("is-hidden");
    retryBtn.classList.add("is-hidden");

    checkSection.classList.remove("is-started");

    resultSections.forEach(section => {
        section.classList.remove("is-visible");
    });

    resultGrid.innerHTML = "";
    warningGrid.innerHTML = "";

    checkSectionTitle.textContent = "개인정보 보호 체크리스트";

    checkSectionDescription.innerHTML = `
        평소 실천하고 있는 개인정보 보호 습관을 체크해 주세요.
    `;

    renderReadyScore();
}

/* 체크리스트 시작 */
function startChecklist() {
    currentState = "checking";
    checkedItems.clear();

    checkSection.classList.add("is-started");

    checkSectionTitle.textContent = "개인정보 보호 체크리스트";

    checkSectionDescription.innerHTML = `
        평소 실천하고 있는 개인정보 보호 습관을 체크해 주세요.
    `;

    renderQuestionList();
    renderCheckingScore();

    setTimeout(() => {
        checkSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 50);
}

/* 진행 전 점수 */
function renderReadyScore() {
    const total = checklistData.length;

    scoreNumber.textContent = 0;
    scoreGrade.textContent = "READY";

    scoreMessage.innerHTML = `
        체크리스트를 시작하고<br>
        나의 개인정보 보호 습관을 확인해 보세요.
    `;

    summaryLabel1.textContent = "선택한 항목";
    summaryLabel2.textContent = "남은 항목";

    safeCount.textContent = "0개";
    warningCount.textContent = `${total}개`;
    totalCount.textContent = `${total}개`;

    resetCircle();
}

/* 진행 중 */
function renderCheckingScore() {
    const checked = checkedItems.size;
    const total = checklistData.length;
    const remaining = total - checked;

    scoreNumber.textContent = checked;
    scoreGrade.textContent = "CHECK";

    scoreMessage.innerHTML = `
        나의 개인정보 보호 습관을<br>
        확인하고 있어요.
    `;

    summaryLabel1.textContent = "선택한 항목";
    summaryLabel2.textContent = "남은 항목";

    safeCount.textContent = `${checked}개`;
    warningCount.textContent = `${remaining}개`;
    totalCount.textContent = `${total}개`;

    renderCircle(checked, total);
}

/* 결과 보기 */
function showResult() {
    if (currentState !== "checking") return;

    currentState = "result";

    renderQuestionList();
    renderResultScore();
    renderResultCards();
    renderWarningCards();

    resultSections.forEach(section => {
        section.classList.add("is-visible");
    });

    checkSectionTitle.textContent = "나의 개인정보 관리 점수";

    checkSectionDescription.innerHTML = `
        체크리스트 결과를 바탕으로
        현재 나의 개인정보 관리 상태를 종합적으로 분석했어요.
    `;

    heroLabel.textContent = "CHECKLIST COMPLETE";

    heroTitle.innerHTML = `
        체크리스트를
        <span class="point">완료했어요!</span>
    `;

    heroDescription.innerHTML = `
        지금까지의 답변을 바탕으로,<br>
        당신의 개인정보 관리 상태를 확인했어요.
    `;

    startBtn.classList.add("is-hidden");
    resultBtn.classList.add("is-hidden");
    retryBtn.classList.remove("is-hidden");

    const firstResultSection = document.querySelector(".check-result");

    setTimeout(() => {
        firstResultSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 200);
}

/* 결과 점수 */
function renderResultScore() {
    const score = checkedItems.size;
    const total = checklistData.length;
    const warning = total - score;

    scoreNumber.textContent = score;

    summaryLabel1.textContent = "안전한 항목";
    summaryLabel2.textContent = "주의가 필요한 항목";

    safeCount.textContent = `${score}개`;
    warningCount.textContent = `${warning}개`;
    totalCount.textContent = `${total}개`;

    let grade = "";
    let message = "";

    if (score >= 7) {
        grade = "SAFE";
        message = "개인정보 보호 습관을<br>아주 잘 실천하고 있어요!";
    } else if (score >= 5) {
        grade = "GOOD";
        message = "당신은 개인정보를<br>잘 관리하고 있는 편이에요!";
    } else if (score >= 3) {
        grade = "CAUTION";
        message = "개인정보 보호 습관을<br>조금 더 점검해 보세요!";
    } else {
        grade = "DANGER";
        message = "개인정보 보호 습관을<br>다시 확인할 필요가 있어요!";
    }

    scoreGrade.textContent = grade;
    scoreMessage.innerHTML = message;

    renderCircle(score, total);
}

/* 원형 그래프 */
function resetCircle() {
    const radius = 78;
    const circumference = 2 * Math.PI * radius;

    scoreCircle.style.strokeDasharray = circumference;
    scoreCircle.style.strokeDashoffset = circumference;
}

function renderCircle(score, total) {
    const radius = 78;
    const circumference = 2 * Math.PI * radius;
    const percent = score / total;

    scoreCircle.style.strokeDasharray = circumference;
    scoreCircle.style.strokeDashoffset = circumference;

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            scoreCircle.style.strokeDashoffset =
                circumference * (1 - percent);
        });
    });
}

/* 항목별 결과 */
function renderResultCards() {
    resultGrid.innerHTML = checklistData.map(item => {
        const isSafe = checkedItems.has(item.id);

        return `
            <article class="check-result-card">
                <div class="check-result-thumb">
                    <img
                        src="${item.icon}"
                        alt="${item.title} 아이콘"
                    >
                </div>

                <span class="check-result-status ${isSafe ? "is-safe" : "is-warning"}">
                    ${isSafe ? "안전" : "주의"}
                </span>

                <h3>${item.title}</h3>

                <p>
                    ${isSafe ? item.safeDescription : item.warningDescription}
                </p>
            </article>
        `;
    }).join("");
}

/* 주의 항목 */
function renderWarningCards() {
    const warningItems = checklistData.filter(
        item => !checkedItems.has(item.id)
    );

    if (warningItems.length === 0) {
        warningGrid.innerHTML = `
            <div class="check-warning-complete">
                <strong>
                    모든 항목을 안전하게 관리하고 있어요!
                </strong>

                <p>
                    지금의 개인정보 보호 습관을 계속 유지해 주세요.
                </p>
            </div>
        `;

        return;
    }

    warningGrid.innerHTML = warningItems.map(item => `
        <article class="check-warning-card">
            <div class="check-warning-thumb">
                <img
                    src="${item.icon}"
                    alt="${item.title} 아이콘"
                >
            </div>

            <div class="check-warning-content">
                <h3>${item.title}</h3>

                <p>${item.warningDescription}</p>

                <a href="guide.html" class="check-warning-link">
                    가이드 보기 →
                </a>
            </div>

            <span class="check-warning-badge">
                주의
            </span>
        </article>
    `).join("");
}

/* 다시 진행하기 */
function retryChecklist() {
    currentState = "checking";
    checkedItems.clear();

    resultSections.forEach(section => {
        section.classList.remove("is-visible");
    });

    resultGrid.innerHTML = "";
    warningGrid.innerHTML = "";

    resultBtn.classList.remove("is-hidden");
    retryBtn.classList.add("is-hidden");

    checkSectionTitle.textContent = "개인정보 보호 체크리스트";

    checkSectionDescription.innerHTML = `
        평소 실천하고 있는 개인정보 보호 습관을 체크해 주세요.
    `;

    heroLabel.textContent = "CHECK YOUR PRIVACY";

    heroTitle.innerHTML = `
        나의 개인정보 보호 습관을
        <span class="point">직접 확인해 보세요!</span>
    `;

    heroDescription.innerHTML = `
        평소 개인정보를 어떻게 관리하고 있는지<br>
        8개의 체크리스트를 통해 간단하게 점검해 보세요.
    `;

    renderQuestionList();
    renderCheckingScore();

    checkSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

/* EVENT */
startBtn.addEventListener("click", startChecklist);
resultBtn.addEventListener("click", showResult);
retryBtn.addEventListener("click", retryChecklist);

/* INIT */
function init() {
    setReadyState();
}

init();