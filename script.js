window.addEventListener('load', function load() {
	const content = document.querySelector('.container');
	content.classList.remove('hidden');

	const loader = document.querySelector('.loader');
	loader.style.display = 'none';
});

const accessKey = 'f0yW89CgIZRr8Th4Zpfc8j5s_smJZCL4nESqxLc92J4';
const imageElement = document.getElementById('image');
const photographerElement = document.getElementById('photographer');
const likeButton = document.getElementById('like-btn');
const likeCountElement = document.getElementById('like-count');

let likeCount = parseInt(localStorage.getItem('likeCount')) || 0;
likeCountElement.textContent = likeCount;

let viewedImages = JSON.parse(localStorage.getItem('viewedImages')) || [];
let currentImageIndex = viewedImages.length - 1;

async function getRandomImage() {
	try {
		const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`);
		const data = await response.json();

		const imageUrl = data.urls.regular;
		const photographerName = data.user.name;

		imageElement.src = imageUrl;
		photographerElement.textContent = `Photographer: ${photographerName}`;

		viewedImages.push({ imageUrl, photographerName, liked: false });
		currentImageIndex = viewedImages.length - 1;
	} catch (error) {
		console.error('Error fetching random image:', error);
	}
}

getRandomImage();

likeButton.addEventListener('click', () => {
	if (!viewedImages[currentImageIndex].liked) {
		likeCount++;
		viewedImages[currentImageIndex].liked = true;
		likeButton.textContent = 'Unlike';
	} else {
		likeCount--;
		viewedImages[currentImageIndex].liked = false;
		likeButton.textContent = 'Like';
	}

	likeCountElement.textContent = likeCount;
	localStorage.setItem('likeCount', likeCount);
});
