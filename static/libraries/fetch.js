async function fillSelect(selectName, url) {
    await fetch(url)
    .then(response => response.json())
    .then(data => {
        let select = document.querySelector(`select[name="${selectName}"]`);
        data.forEach(item => {
            let option = document.createElement('option');
            option.value = item;
            option.innerHTML = item;
            option.className = "option";
            select.appendChild(option);
        })
        // console.log(select);
    })
    // console.log('done');
}
// console.log('loaded');