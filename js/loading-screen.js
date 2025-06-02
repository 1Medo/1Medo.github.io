document.addEventListener('DOMContentLoaded', () => {
    // Add loading class to body
    document.body.classList.add('loading');

    // Load and initialize Lottie animation
    const animation = lottie.loadAnimation({
        container: document.querySelector('.lottie-container'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: 'animation.json'
    });

    // When animation completes, hide the loading screen
    animation.addEventListener('complete', () => {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.classList.add('hidden');
        document.body.classList.remove('loading');

        // Remove the loading screen from DOM after transition
        loadingScreen.addEventListener('transitionend', () => {
            loadingScreen.remove();
        }, { once: true });
    });
}); 