function bypassLink() {
    var link = document.getElementById('linkInput').value;
    var apiUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent("https://apinknha.vercel.app/api/bypass?url=" + encodeURIComponent(link))}`;
    var resultDiv = document.getElementById('result');
    var copyButton = document.getElementById('copyButton');
    var copyMessage = document.getElementById('copyMessage');
    var loadingMessage = document.getElementById('loadingMessage');
    var loadingSvg = document.querySelector('.loading-svg');
    var resultContainer = document.getElementById('result-container');

    resultDiv.innerHTML = '';
    copyButton.style.display = 'none';
    copyMessage.innerHTML = '';
    loadingMessage.style.display = 'block';  // Hiển thị loading message
    loadingSvg.style.display = 'inline-block'; // Hiển thị SVG loader

    if (link === '') {
        resultDiv.innerHTML = '<p class="error">Please enter a URL.</p>';
        loadingMessage.style.display = 'none';  // Ẩn loading message
        loadingSvg.style.display = 'none';  // Ẩn SVG loader
        return;
    }

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data from the API');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Log toàn bộ dữ liệu để kiểm tra

        if (data && data.key) {
            resultDiv.innerHTML = `<p><strong>Bypassed URL:</strong> <span id="bypassedKey">${data.key}</span></p>`;
            copyButton.style.display = 'inline-block';
            resultContainer.style.display = 'block'; // Hiển thị khung kết quả
        } else {
            resultDiv.innerHTML = '<p class="error">Error: No key found in response.</p>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = `<p class="error">An error occurred: ${error.message}</p>`;
    })
    .finally(() => {
        loadingMessage.style.display = 'none';  // Ẩn loading message
        loadingSvg.style.display = 'none';  // Ẩn SVG loader
    });
}

function copyKey() {
    var key = document.getElementById('bypassedKey').innerText;
    navigator.clipboard.writeText(key).then(function() {
        var copyMessage = document.getElementById('copyMessage');
        copyMessage.innerText = 'Key copied to clipboard!';
    }).catch(function(error) {
        console.error('Error copying text: ', error);
    });
}

function toggleMode() {
    var body = document.body;
    var toggleButton = document.getElementById('toggleMode');

    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        toggleButton.innerText = 'Switch to Dark Mode';
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        toggleButton.innerText = 'Switch to Light Mode';
    }
}
