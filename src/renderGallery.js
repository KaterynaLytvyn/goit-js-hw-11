export function renderGallery(container, pictures) {
    const markup = pictures.map(
        ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                <b>Likes</b><br> ${likes}
                </p>
                <p class="info-item">
                <b>Views</b><br> ${views}
                </p>
                <p class="info-item">
                <b>Comments</b><br> ${comments}
                </p>
                <p class="info-item">
                <b>Downloads</b><br> ${downloads}
                </p>
            </div>
        </div>
        `,).join('');

    container.insertAdjacentHTML('beforeend', markup)
}