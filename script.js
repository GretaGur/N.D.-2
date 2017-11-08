class Table {
    constructor(data, id, dropdownFilterTitle, recordsPerPage) {
        this.data = data;
        this.id = id;
        this.dropdownFilterTitle = dropdownFilterTitle;
        this.recordsPerPage = recordsPerPage;
        this.headerTitles = '';
        this.sortColumnDesc = false;
        this.sortedData = '';
        this.filteredData = '';
        this.searchInput = '';
        this.currentPage = 1;
        this.pageData = this.data;
        this.lastUsedFilter = '';
        this.printHeaders(data);
        this.changePage(this.pageData);
    }

    printHeaders(data) {
        let table = document.getElementById(this.id);
        let rowElement = document.createElement("tr");
        let headerTitles = Object.keys(data[0]);
        headerTitles.forEach(function (row) {
            let th = document.createElement("th");
            let thText = document.createTextNode(row);
            th.appendChild(thText);
            rowElement.appendChild(th);
        }, this);
        table.appendChild(rowElement);
        this.headerTitles = headerTitles;
    }

    printRows(data, headerTitles) {
        let table = document.getElementById(this.id);
        data.forEach((row) => {
            let rowElement = document.createElement("tr");
            headerTitles.forEach((title) => {
                let td = document.createElement("td");
                if (row[title]) {
                    let thText = document.createTextNode(row[title]);
                    td.appendChild(thText);
                }
                rowElement.appendChild(td);
            }, this);
            table.appendChild(rowElement);
        }, this);

        if (this.searchInput) {
            this.searchInput.value = "";
            this.searchInput = "";
        }
    }

    sortColumns(event) {
        if (event.target.tagName == "TH") {
            let sortTitle = event.target.innerText;
            if (this.lastSortTitle == sortTitle) {
                this.sortColumnDesc = !this.sortColumnDesc;
            } else {
                this.sortColumnDesc = false;
            }
            this.lastSortTitle = sortTitle;

            let sortDesc = this.sortColumnDesc;
            let data;

            this.filteredData ? data = this.filteredData : data = this.data;
            this.sortedData = this.comparison(data, sortTitle, sortDesc);
            let deleted = this.deleteTable();
            this.lastUsedFilter = "sortColumns";
            deleted ? this.changePage(this.sortedData) : "";
        }
    }

    comparison(data, sortTitle, sortDesc) {
        data = data.sort(compare);
        return data;
        function compare(a, b) {
            let nameA;
            let nameB;
            if (a[sortTitle]) {
                (typeof a[sortTitle] === 'number') ? nameA = a[sortTitle] : nameA = a[sortTitle].toLowerCase();
            } else {
                nameA = "";
            }
            if (b[sortTitle]) {
                (typeof b[sortTitle] === 'number') ? nameB = b[sortTitle] : nameB = b[sortTitle].toLowerCase();
            } else {
                nameB = "";
            }
            if (nameA < nameB) {
                return sortDesc ? 1 : -1;
            }
            if (nameA > nameB) {
                return sortDesc ? -1 : 1;
            }
            return 0;
        }
    }

    deleteTable() {
        let table = document.getElementById(this.id);
        while (table.children.length > 1) {
            table.removeChild(table.children[1]);
        }
        return true;
    }

    dropdownFilter(event) {
        let selected = document.getElementById(event.target.id).value;
        let data;
        (this.sortedData && !this.filteredData) ? data = this.sortedData : data = this.data;
        if (selected) {
            this.filteredData = data.filter(obj => obj[this.dropdownFilterTitle] === selected);
        } else {
            this.filteredData = data;
        }
        let deleted = this.deleteTable();
        this.lastUsedFilter = "dropdownFilter";
        deleted ? this.changePage(this.filteredData) : "";
    }

    searchFilter(event) {
        this.searchInput = document.getElementById(event.target.id);
        let filter = input.value.toUpperCase();
        let table = document.getElementById(this.id);
        let tr = table.getElementsByTagName("tr");
        for (let i = 0; i < tr.length; i++) {
            let td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    prevPage() {
        let data = this.whichData();
        if (this.currentPage > 1) {
            this.currentPage--;
            this.changePage(data);
        }
    }

    nextPage() {
        let data = this.whichData();
        if (this.currentPage < this.numPages(data)) {
            this.currentPage++;
            this.changePage(data);
        }
    }
    whichData() {
        if (this.lastUsedFilter == "sortColumns") {
            return this.sortedData;
        } else if (this.lastUsedFilter == "dropdownFilter") {
            return this.filteredData;
        } else {
            return this.data;
        }
    }

    changePage(data) {
        let page = this.currentPage;
        let btnNext = document.getElementById("btnNext");
        let btnPrev = document.getElementById("btnPrev");
        let pageSpan = document.getElementById("page");

        (page < 1) ? page = 1 : "";
        (page > this.numPages(data)) ? page = this.numPages(data) : "";

        this.pageData = [];

        for (let i = (page - 1) * this.recordsPerPage; i < (page * this.recordsPerPage) && i < data.length; i++) {
            this.pageData.push(data[i]);
        }
        pageSpan.innerHTML = page + "/" + this.numPages(data);

        (page == 1) ? btnPrev.style.visibility = "hidden" : btnPrev.style.visibility = "visible";
        (page == this.numPages(data)) ? btnNext.style.visibility = "hidden" : btnNext.style.visibility = "visible";

        this.deleteTable();
        this.printRows(this.pageData, this.headerTitles)
    }

    numPages(data) {
        return Math.ceil(data.length / this.recordsPerPage);
    }
}

if ((typeof data !== 'undefined') && data && (data.length > 0)) {
    let table = new Table(this.data, "result", "gender", 100);

    document.getElementById("result").onclick = (event) => {
        table.sortColumns(event);
    };
    document.getElementById("dropdown").onchange = (event) => {
        table.dropdownFilter(event);
    };
    document.getElementById("input").onkeyup = (event) => {
        table.searchFilter(event);
    };
    document.getElementById("btnPrev").onclick = () => {
        table.prevPage();
    };
    document.getElementById("btnNext").onclick = () => {
        table.nextPage();
    };
} else {
    alert("No data!");
}