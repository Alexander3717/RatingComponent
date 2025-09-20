const ratingForm = document.getElementById("ratingForm");
const ratingInfo = document.querySelector(".rating-thanks__rating");
const ratingButtons = document.querySelectorAll("input[name='rating']");
const submitButton = document.querySelector("button[type='submit']");
const ratingPrompt = document.querySelector(".rating-prompt");
const ratingThanks = document.querySelector(".rating-thanks");
let rating;

ratingButtons.forEach((button) =>
    button.addEventListener("change", () => (submitButton.disabled = false))
);

ratingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("submitted");
    rating = ratingForm.querySelector("input:checked").value;
    ratingInfo.textContent = `You selected ${rating} out of ${ratingButtons.length}`;
    transitionSequentially(ratingPrompt, ratingThanks);
});

function transitionSequentially(elementToHide, elementToShow) {
    elementToHide.style.opacity = 0;

    // wait for fade out to complete, then show the new element
    elementToHide.addEventListener(
        "transitionend",
        function fadeOutComplete(e) {
            console.log("I work!!!");
            if (e.propertyName === "opacity") {
                elementToHide.classList.add("hidden");
                elementToHide.removeEventListener(
                    "transitionend",
                    fadeOutComplete
                );

                // now fade in the new element
                elementToShow.style.opacity = 0;
                elementToShow.classList.remove("hidden");

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        elementToShow.style.opacity = 1;

                        elementToShow.addEventListener(
                            "transitionend",
                            function fadeInComplete(e) {
                                if (e.propertyName === "opacity") {
                                    elementToShow.removeEventListener(
                                        "transitionend",
                                        fadeInComplete
                                    );
                                }
                            }
                        );
                    });
                });
            }
        }
    );
}
