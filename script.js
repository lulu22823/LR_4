
function isValidName(text) {
    if (!text || text.trim() === "") return false;
    return /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s.'-]+$/.test(text.trim());
}

function isValidTitle(text) {
    if (!text || text.trim() === "") return false;
    return true;
}

// Перевірка цілого додатного числа (для року або номіналу)
function isValidYearOrNum(input, min = 1, max = 2026) {
    if (input === null || input.trim() === "") return false;
    if (!/^\d+$/.test(input.trim())) return false;
    let num = Number(input.trim());
    return num >= min && num <= max;
}


function createBook(title, author, year, isRead) {
    return {
        title: title,
        author: author,
        year: year,
        isRead: isRead,
        bookInfo() {
            let info = `Назва: ${this.title}, Автор: ${this.author}, Рік видання: ${this.year}, Прочитана: ${this.isRead ? "Так" : "Ні"}`;
            console.log(info);
            return info;
        },
        markAsRead() {
            this.isRead = true;
        }
    };
}

let library = [
    createBook("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 1997, true),
    createBook("The Hobbit", "J.R.R. Tolkien", 1937, false),
    createBook("1984", "George Orwell", 1949, true)
];

function displayLibrary(targetElementId) {
    console.log("--- Список книг у бібліотеці ---");
    let htmlOutput = "<ul>";
    library.forEach(book => {
        let text = book.bookInfo();
        htmlOutput += `<li>${text}</li>`;
    });
    htmlOutput += "</ul>";

    if (targetElementId) {
        document.getElementById(targetElementId).innerHTML = htmlOutput;
    }
}


function task1() {
    document.getElementById("myButton").addEventListener("click", function() {
        let book = {
            title: "Harry Potter and the Sorcerer's Stone",
            author: "J.K. Rowling",
            year: 1997,
            isRead: true,
            bookInfo() {
                let msg = `Назва: ${this.title}, Автор: ${this.author}, Рік видання: ${this.year}, Прочитана: ${this.isRead ? "Так" : "Ні"}`;
                console.log(msg);
                return msg;
            }
        };

        let firstCall = book.bookInfo();
        
        book.isRead = !book.isRead;
        let secondCall = book.bookInfo();

        document.getElementById("myButton_output").innerHTML = `
            <p><b>До зміни:</b> ${firstCall}</p>
            <p><b>Після зміни (!book.isRead):</b> ${secondCall}</p>
        `;
    });
}


let gatsbyAdded = false;

function task2() {
    document.getElementById("myButton2").addEventListener("click", function() {
        let output = document.getElementById("myButton_output2");
        output.innerHTML = "<p><b>Початкова бібліотека:</b></p><div id='lib_before'></div>";
        displayLibrary("lib_before");

        if (!gatsbyAdded) {
            library.push(createBook("The Great Gatsby", "F. Scott Fitzgerald", 1925, false));
            gatsbyAdded = true;
        }

        output.innerHTML += "<p><b>Після додавання 'The Great Gatsby' (push):</b></p><div id='lib_after'></div>";
        displayLibrary("lib_after");
    });
}


function task3() {
    document.getElementById("myButton3").addEventListener("click", function() {
        library.sort((a, b) => a.year - b.year);
        console.log("Відсортовані книги за роком видання:", library);

        let unreadBooks = library.filter(book => !book.isRead);
        console.log("Непрочитані книги:", unreadBooks);

        let tolkienBook = library.find(book => book.author === "J.R.R. Tolkien");
        console.log("Книга Толкіна:", tolkienBook);

        let html = "<p><b>1. Відсортовані за роком:</b></p><ul>";
        library.forEach(b => html += `<li>${b.year} — ${b.title} (${b.author})</li>`);
        html += "</ul>";

        html += "<p><b>2. Непрочитані книги (filter):</b></p><ul>";
        unreadBooks.forEach(b => html += `<li>${b.title} (${b.author})</li>`);
        html += "</ul>";

        html += `<p><b>3. Знайдена книга Толкіна (find):</b> ${tolkienBook ? tolkienBook.title + " (" + tolkienBook.year + ")" : "Не знайдено"}</p>`;

        document.getElementById("myButton_output3").innerHTML = html;
    });
}


function addBookToLibrary() {
    let title = prompt("Введіть назву книги:");
    if (title === null) return;
    if (!isValidTitle(title)) {
        alert("Помилка: назва книги не може бути порожньою!");
        return;
    }

    let author = prompt("Введіть автора книги (тільки літери):");
    if (author === null) return;
    if (!isValidName(author)) {
        alert("Помилка: ім'я автора має містити лише літери (без цифр)!");
        return;
    }

    let yearInput = prompt("Введіть рік видання книги (число від 1000 до 2026):");
    if (yearInput === null) return;
    if (!isValidYearOrNum(yearInput, 1000, 2026)) {
        alert("Помилка: введіть коректний числовий рік видання (від 1000 до 2026 без букв)!");
        return;
    }

    let year = Number(yearInput.trim());
    let isRead = confirm("Чи прочитана книга? (ОК - Так, Відміна - Ні)");

    library.push(createBook(title.trim(), author.trim(), year, isRead));
    alert("Книгу успішно додано!");
    displayLibrary("myButton_output4");
}

function task4() {
    document.getElementById("myButton4").addEventListener("click", function() {
        addBookToLibrary();
    });
}



function calculateAverageYear() {
    if (library.length === 0) return 0;
    let totalYears = 0;
    library.forEach(book => {
        totalYears += book.year;
    });
    return Math.round(totalYears / library.length);
}

function task5() {
    document.getElementById("myButton5").addEventListener("click", function() {
        let unreadBook = library.find(book => !book.isRead);
        let statusMsg = "";

        if (unreadBook) {
            unreadBook.markAsRead();
            statusMsg = `Книгу "<b>${unreadBook.title}</b>" позначено як прочитану за допомогою методу <code>markAsRead()</code>!`;
        } else {
            statusMsg = "Усі книги в бібліотеці вже позначені як прочитані!";
        }

        let avgYear = calculateAverageYear();
        console.log("Середній рік видання всіх книг:", avgYear);

        document.getElementById("myButton_output5").innerHTML = `
            <p>${statusMsg}</p>
            <p><b>Середній рік видання книг (calculateAverageYear):</b> ${avgYear} р.</p>
            <div id="lib_task5"></div>
        `;
        displayLibrary("lib_task5");
    });
}



function createStamp(country, year, denomination, theme, isExchanged) {
    return {
        country: country,
        year: year,
        denomination: denomination,
        theme: theme,
        isExchanged: isExchanged,
        stampInfo() {
            let info = `Країна: ${this.country}, Рік: ${this.year}, Номінал: ${this.denomination} грн, Тема: ${this.theme}, Обміняна: ${this.isExchanged ? "Так" : "Ні"}`;
            console.log(info);
            return info;
        },
        markAsExchanged() {
            this.isExchanged = true;
        }
    };
}

let stampCollection = [
    createStamp("Україна", 2022, 23, "Корабель", false),
    createStamp("Велика Британія", 1840, 150, "Чорний пенні", true),
    createStamp("Польща", 1995, 10, "Архітектура", false)
];

function task6() {
    function renderStamps() {
        stampCollection.sort((a, b) => a.year - b.year);
        console.log("Відсортовані марки за роком:", stampCollection);

        let availableStamps = stampCollection.filter(s => !s.isExchanged);
        console.log("Необміняні марки:", availableStamps);

        let uaStamp = stampCollection.find(s => s.country === "Україна");
        console.log("Знайдена марка України:", uaStamp);

        let totalYears = 0;
        stampCollection.forEach(s => totalYears += s.year);
        let avgYear = Math.round(totalYears / stampCollection.length);

        let html = "<p><b>Усі марки (відсортовані за роком):</b></p><ul>";
        stampCollection.forEach(s => html += `<li>${s.stampInfo()}</li>`);
        html += "</ul>";

        html += "<p><b>Необміняні марки (filter):</b></p><ul>";
        availableStamps.forEach(s => html += `<li>${s.country} - ${s.theme} (${s.year} р.)</li>`);
        html += "</ul>";

        html += `<p><b>Пошук марки України (find):</b> ${uaStamp ? uaStamp.theme + " (" + uaStamp.year + " р., номінал " + uaStamp.denomination + " грн)" : "Не знайдено"}</p>`;
        html += `<p><b>Середній рік випуску марок:</b> ${avgYear} р.</p>`;

        document.getElementById("myButton_output6").innerHTML = html;
    }

    document.getElementById("myButton6").addEventListener("click", renderStamps);

    document.getElementById("myButton6_add").addEventListener("click", function() {
        let country = prompt("Введіть країну марки (тільки літери):");
        if (country === null) return;
        if (!isValidName(country)) {
            alert("Помилка: назва країни має містити лише літери без цифр!");
            return;
        }

        let yearInput = prompt("Введіть рік випуску марки (число від 1800 до 2026):");
        if (yearInput === null) return;
        if (!isValidYearOrNum(yearInput, 1800, 2026)) {
            alert("Помилка: введіть коректний числовий рік (1800 - 2026 без літер)!");
            return;
        }

        let denomInput = prompt("Введіть номінал марки (ціле число більше 0):");
        if (denomInput === null) return;
        if (!isValidYearOrNum(denomInput, 1, 100000)) {
            alert("Помилка: номінал має бути додатним числом без літер!");
            return;
        }

        let theme = prompt("Введіть тему марки (тільки літери):");
        if (theme === null) return;
        if (!isValidName(theme)) {
            alert("Помилка: тема має містити лише літери без цифр!");
            return;
        }

        let isExchanged = confirm("Чи була марка обміняна? (ОК - Так, Відміна - Ні)");

        stampCollection.push(createStamp(country.trim(), Number(yearInput), Number(denomInput), theme.trim(), isExchanged));
        alert("Марку успішно додано до колекції!");
        renderStamps();
    });
}


task1();
task2();
task3();
task4();
task5();
task6();