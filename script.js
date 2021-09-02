/// spinner function start

const spin = param => {
    document.getElementById('spinner').style.display = param;
}

///search book function start 
const searchBooks = () => {
    const input = document.getElementById('input');
    const inputText = input.value;
    if (input.value === '') {
        document.getElementById('totalSearch').innerText = `Please Search Something`;
        document.getElementById('cardContainer').textContent = '';
    } else {
        spin('block');
        document.getElementById('cardContainer').textContent = '';
        document.getElementById('totalSearch').innerText = '';
        input.value = '';
        const url = `http://openlibrary.org/search.json?q=${inputText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayResult(data.docs));
    }

}

///display function start 
const displayResult = allData => {
        document.getElementById('totalSearch').innerText = `${allData.length} search result founds`
        const cardContainer = document.getElementById('cardContainer');
        cardContainer.textContent = '';
        if (allData.length === 0) {
            document.getElementById('totalSearch').innerText = `No result for invalid Search`;
            spin('none');
        } else {
            // for each loop start
            allData.forEach(data => {
                // creating card div start
                const div = document.createElement('div');
                div.classList.add('col-md-4');
                div.innerHTML = `
            <div class="card p-2 m-3">
                <img style="height: 15rem;" class="img-fluid" src="https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg">
                <h3>${data.title}</h3>
                <p class="p-0 m-0"><span class="fw-bold">Author:</span> ${data.author_name}</p>
                <p class="p-0 m-0"><span class="fw-bold">Publisher:</span> ${data.publisher}</p>
                <p class="p-0 m-0"><span class="fw-bold">First publish :</span> ${data.first_publish_year}</p>
            </div>
            `
                    // creating card div end
                cardContainer.appendChild(div);
            });
            // for each loop end
            spin('none');

        }

    }
    /// card display function end