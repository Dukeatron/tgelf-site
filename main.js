async function getNews() {
    try {
        const response = await fetch('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=Dkc5g1hCLpuuk7Xd00AP84bhLWGYvh9J');
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        console.log(data.results);

        const output = document.getElementById('output');
        output.innerHTML = ''; // Clear the previous content

        for (let i = 0; i < data.results.length; i++) {
            const media = data.results[i]['media'];

            // Check if media is defined and not an empty array
            if (media && media.length > 0) {
                const mediaMetadata = media[0]['media-metadata'];

                // Check if media-metadata is defined and not an empty array
                if (mediaMetadata && mediaMetadata.length > 2) {
                    output.innerHTML += `
                        <div class="card">
                            <div class="card-body">
                                <img src="${mediaMetadata[2].url}" class="card-img-top" alt="${mediaMetadata[0].caption}" title="${mediaMetadata[0].caption}"><br>
                                <h2 class="card-title">${data.results[i].title}</h2>
                                <div class="card-text">
                                    <p>${data.results[i].abstract}</p>
                                </div>
                            </div>
                        </div>
                        <br>
                    `;
                } else {
                    console.log('Media metadata not found for this article.');
                }
            } else {
                console.log('Media not found for this article.');
            }
        }

        document.getElementById('copyright').innerHTML = data.copyright;
    } catch (error) {
        console.error('Error:', error);
    }
}

getNews();
