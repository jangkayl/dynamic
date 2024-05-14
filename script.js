document.addEventListener("DOMContentLoaded", function () {
	var daysElement = document.getElementById("days").querySelector(".number");
	var hoursElement = document.getElementById("hours").querySelector(".number");
	var minutesElement = document
		.getElementById("minutes")
		.querySelector(".number");
	var secondsElement = document
		.getElementById("seconds")
		.querySelector(".number");

	var targetDate = new Date("2024-06-01T00:00:00").getTime();

	var countdownInterval = setInterval(function () {
		var now = new Date().getTime();
		var distance = targetDate - now;

		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor(
			(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		daysElement.textContent = days < 10 ? "0" + days : days;
		hoursElement.textContent = hours < 10 ? "0" + hours : hours;
		minutesElement.textContent = minutes < 10 ? "0" + minutes : minutes;
		secondsElement.textContent = seconds < 10 ? "0" + seconds : seconds;

		if (distance < 0) {
			clearInterval(countdownInterval);
			daysElement.textContent = "00";
			hoursElement.textContent = "00";
			minutesElement.textContent = "00";
			secondsElement.textContent = "00";
		}
	}, 1000);
});

// CAROUSEL

const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
	addAnimation();
}

function addAnimation() {
	scrollers.forEach((scroller) => {
		// add data-animated="true" to every `.scroller` on the page
		scroller.setAttribute("data-animated", true);

		// Make an array from the elements within `.scroller-inner`
		const scrollerInner = scroller.querySelector(".scroller__inner");
		const scrollerContent = Array.from(scrollerInner.children);

		// For each item in the array, clone it
		// add aria-hidden to it
		// add it into the `.scroller-inner`
		scrollerContent.forEach((item) => {
			const duplicatedItem = item.cloneNode(true);
			duplicatedItem.setAttribute("aria-hidden", true);
			scrollerInner.appendChild(duplicatedItem);
		});
	});
}

const carousel = document.querySelector(".carousel"),
	arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
	isDragging = false,
	prevPageX,
	prevScrollLeft,
	positionDiff;

const imageUrls = [
	"items/item-1.png",
	"items/item-2.png",
	"items/item-3.png",
	"items/item-4.png",
	"items/item-5.png",
];

imageUrls.forEach((imageUrl) => {
	const img = document.createElement("img");
	img.src = imageUrl;
	img.alt = "img";
	img.draggable = false;
	carousel.appendChild(img);
});

const firstImg = carousel.querySelectorAll("img")[0];

const showHideIcons = () => {
	let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
	arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
	arrowIcons[1].style.display =
		carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
	icon.addEventListener("click", () => {
		let firstImgWidth = firstImg.clientWidth + 14;
		carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
		setTimeout(() => showHideIcons(), 60);
	});
});

const autoSlide = () => {
	if (
		carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 ||
		carousel.scrollLeft <= 0
	)
		return;

	positionDiff = Math.abs(positionDiff);
	let firstImgWidth = firstImg.clientWidth + 14;
	let valDifference = firstImgWidth - positionDiff;

	if (carousel.scrollLeft > prevScrollLeft) {
		return (carousel.scrollLeft +=
			positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
	}
	carousel.scrollLeft -=
		positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};

const dragStart = (e) => {
	isDragStart = true;
	prevPageX = e.pageX || e.touches[0].pageX;
	prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
	if (!isDragStart) return;
	e.preventDefault();
	isDragging = true;
	carousel.classList.add("dragging");
	positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
	carousel.scrollLeft = prevScrollLeft - positionDiff;
	showHideIcons();
};

const dragStop = () => {
	isDragStart = false;
	carousel.classList.remove("dragging");

	if (!isDragging) return;
	isDragging = false;
	autoSlide();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

// MODAL

const modal = document.getElementById("myModal");
const submitButton = document.querySelector("#submit button");
const firstNameInput = document.querySelector('input[name="name"]');
const lastNameInput = document.querySelectorAll('input[name="name"]')[1];
const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');

submitButton.addEventListener("click", function (event) {
	event.preventDefault();

	if (
		firstNameInput.value &&
		lastNameInput.value &&
		emailInput.value &&
		messageInput.value
	) {
		modal.style.display = "block";
	} else {
		alert("Please fill out all fields.");
	}
});

const closeBtn = document.querySelector(".close");

closeBtn.addEventListener("click", function () {
	modal.style.display = "none";
});

window.addEventListener("click", function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
});
