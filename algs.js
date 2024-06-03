document.addEventListener("DOMContentLoaded", () => {
    let a = document.getElementsByClassName("main-add-field")[0];
    alert(a)
    a.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            document.getElementsByClassName("add-button")[0].click();
        }
    });
    updateStatistic();
});

    function add(qualifiedName, value) {
        let name = document.getElementsByClassName("main-add-field")[0].value;
        if (name !== "") {
            let newCell = document.createElement('div');
            newCell.className = "cell";
            let newProduct = document.createElement('article');
            newProduct.className = "row";
            let newProductName = document.createElement('span');
            newProductName.className = "product-name";
            newProductName.innerHTML = name;
            newProductName.setAttribute("onclick", "showField(this)");
            let buttonBlock = document.createElement('span');
            buttonBlock.className = "edit-buttons";
            let buttonMinus = document.createElement('button');
            buttonMinus.className = "minus-button";
            buttonMinus.disabled = true;
            buttonMinus.setAttribute("data-tooltip", "Відняти 1");
            buttonMinus.innerHTML = "–";
            buttonMinus.setAttribute("onclick", "minus(this)");
            let productAmount = document.createElement('span');
            productAmount.className = "product-amount";
            productAmount.innerHTML = "1";
            let buttonPlus = document.createElement('button');
            buttonPlus.className = "plus-button";
            buttonPlus.setAttribute("data-tooltip", "Додати 1");
            buttonPlus.innerHTML = "+";
            buttonPlus.setAttribute("onclick", "plus(this)");
            let statusButton = document.createElement('button');
            statusButton.className = "status-button";
            statusButton.setAttribute("data-tooltip", "Позначити як куплений");
            statusButton.innerHTML = "Куплено";
            statusButton.setAttribute("onclick", "buy(this)");
            let deleteButton = document.createElement('button');
            deleteButton.className = "delete-button";
            deleteButton.setAttribute("data-tooltip", "Видалити");
            deleteButton.innerHTML = "×";
            deleteButton.setAttribute("onclick", "deleteProduct(this)");

            buttonBlock.append(buttonMinus);
            buttonBlock.append(" ");
            buttonBlock.append(productAmount);
            buttonBlock.append(" ");
            buttonBlock.append(buttonPlus);
            newProduct.append(newProductName);
            newProduct.append(buttonBlock);
            newProduct.append(statusButton);
            newProduct.append(deleteButton);
            newCell.append(newProduct);
            document.body.getElementsByClassName("products-table")[0].append(newCell);
            document.getElementsByClassName("main-add-field")[0].value = "";
        }
        document.getElementsByClassName("main-add-field")[0].focus();
        updateStatistic();
    }

    function showField(s) {
        if (s.parentNode.className === "row") {
            let field = document.createElement("input");
            field.value = s.innerHTML;
            field.addEventListener('blur', function () {
                if (field.value !== "") {
                    s.innerHTML = field.value;
                    s.hidden = false;
                    field.hidden = true;
                } else {
                    field.focus();
                }
            });
            s.before(field);
            s.hidden = true;
            field.focus();
        }
        updateStatistic();
    }

    function deleteProduct(s) {
        s.parentNode.parentNode.parentNode.removeChild(s.parentNode.parentNode);
        updateStatistic();
    }

    function buy(s) {
        if (s.parentNode.className === "row") {
            s.parentNode.className = "row-extra";
            s.innerHTML = "Не куплено";
            s.setAttribute("data-tooltip", "Позначити як некуплений");
        } else if (s.parentNode.className === "row-extra") {
            s.parentNode.className = "row";
            s.innerHTML = "Куплено";
            s.setAttribute("data-tooltip", "Позначити як куплений");
        }
        updateStatistic();
    }

    function minus(s) {
        if (s.nextElementSibling.innerHTML !== "1") {
            s.nextElementSibling.innerHTML = parseInt(s.nextElementSibling.innerHTML) - parseInt("1");
        }
        if (s.nextElementSibling.innerHTML === "1") {
            s.disabled = true;
        }
        updateStatistic();
    }

    function plus(s) {
        if (s.previousElementSibling.innerHTML === "1") {
            s.previousElementSibling.previousElementSibling.disabled = false;
        }
        s.previousElementSibling.innerHTML = parseInt(s.previousElementSibling.innerHTML) + parseInt("1");
        updateStatistic();
    }

    function updateStatistic() {
        document.body.getElementsByClassName("not-bought cell")[0].innerHTML="";
        document.body.getElementsByClassName("bought cell")[0].innerHTML="";
        for (let cell of document.getElementsByClassName("products-table")[0].children) {
            if(cell.className === "cell" && cell.firstElementChild.className!=="main-add-field"){
                let row = cell.firstElementChild;
                let productLabel = document.createElement("span");
                productLabel.className = "product-item";
                let productName =  document.createElement("span");
                productName.className = "product-item-name";
                productName.innerHTML = row.firstElementChild.innerHTML;
                let productAmount =  document.createElement("span");
                productAmount.className = "amount";
                productAmount.innerHTML = row.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.innerHTML;
                productLabel.append(productName);
                productLabel.append(" ");
                productLabel.append(productAmount);
                //alert(productName);
                if(row.className === "row"){
                    document.body.getElementsByClassName("not-bought cell")[0].append(" ");
                    document.body.getElementsByClassName("not-bought cell")[0].append(productLabel);
                }
                if(row.className === "row-extra"){
                    document.body.getElementsByClassName("bought cell")[0].append(" ");
                    document.body.getElementsByClassName("bought cell")[0].append(productLabel);
                }
            }
        }
    }
