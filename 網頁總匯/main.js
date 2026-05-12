class An_Viewer {
    constructor() {
        this.scenes = {
            init: document.querySelector('#scene-init'),
            gallery: document.querySelector('#scene-gallery'),
            // TEST_EMPTY_SCENE: register the empty feature scene here.
            empty: document.querySelector('#scene-empty')
        };
        this.featureScenes = {
            gallery: {
                setup: () => this.setupGalleryEvents()
            },
            // TEST_EMPTY_SCENE: replace this no-op setup when the scene gets real behavior.
            empty: {
                setup: () => {}
            }
        };
        this.menu = document.querySelector('.menu');
        this.menuButtons = document.querySelectorAll('.menu-btn[data-scene]');
        this.images = [
            "images/An1.png", "images/An2.png", "images/An3.png", "images/An4.png",
            "images/An5.png", "images/An6.png", "images/An7.png", "images/An8.png"
        ];
        this.currentIndex = 0;
        this.currentState = 'LOADING';

        this.init();
    }

    init() {
        this.setMenuVisible(false);
        this.setupMenuEvents();
        setTimeout(() => this.transitionTo('READY'), 3000);
    }

    transitionTo(newState) {
        console.log(`State: ${this.currentState} -> ${newState}`);
        this.currentState = newState;

        switch (newState) {
            case 'READY':
                this.renderReadyButton();
                break;
            case 'GALLERY':
                this.switchToFeatureScene('gallery');
                break;
        }
    }

    renderReadyButton() {
        const content = document.querySelector('#contentArea');
        content.innerHTML = '<button class="btn-start">戳戳</button>';
        const btn = content.querySelector('.btn-start');

        btn.style.opacity = '0';
        btn.onclick = () => this.transitionTo('GALLERY');
        setTimeout(() => btn.style.opacity = '1', 50);
    }

    setupMenuEvents() {
        const menuToggle = this.menu.querySelector('.menu-toggle');

        menuToggle.onmouseenter = () => this.openMenuList();
        menuToggle.onfocus = () => this.openMenuList();
        menuToggle.onclick = () => this.closeMenuList();
        this.menu.onmouseleave = () => {
            this.menu.classList.remove('is-open');
            this.menu.classList.remove('is-collapsed');
        };

        this.menuButtons.forEach((button) => {
            button.onclick = () => {
                this.closeMenuList();
                this.switchToFeatureScene(button.dataset.scene);
            };
        });
    }

    openMenuList() {
        this.menu.classList.remove('is-collapsed');
        this.menu.classList.add('is-open');
    }

    closeMenuList() {
        this.menu.classList.remove('is-open');
        this.menu.classList.add('is-collapsed');
        document.activeElement.blur();
    }

    setMenuVisible(isVisible) {
        this.menu.hidden = !isVisible;
    }

    setActiveMenu(sceneName) {
        this.menuButtons.forEach((button) => {
            button.classList.toggle('is-active', button.dataset.scene === sceneName);
        });
    }

    hideScenes() {
        Object.values(this.scenes).forEach((scene) => {
            scene.style.display = 'none';
            scene.style.opacity = '0';
        });
    }

    switchToFeatureScene(sceneName) {
        const targetScene = this.scenes[sceneName];
        const featureScene = this.featureScenes[sceneName];
        if (!targetScene || !featureScene) return;

        const isLeavingInit = this.scenes.init.style.display !== 'none';
        this.scenes.init.style.transition = 'opacity 0.8s ease';
        this.scenes.init.style.opacity = '0';

        setTimeout(() => {
            this.hideScenes();
            targetScene.style.display = 'flex';
            this.setMenuVisible(true);
            this.setActiveMenu(sceneName);
            featureScene.setup();

            setTimeout(() => targetScene.style.opacity = '1', 50);
        }, isLeavingInit ? 800 : 0);
    }

    setupGalleryEvents() {
        const img = document.querySelector('.main_image');
        const next = document.querySelector('.next-btn');
        const prev = document.querySelector('.prev-btn');
        if (!img || !next || !prev) return;

        next.onclick = () => this.changeImage(1);
        prev.onclick = () => this.changeImage(-1);
    }

    changeImage(step) {
        this.currentIndex = (this.currentIndex + step + this.images.length) % this.images.length;
        const img = document.querySelector('.main_image');

        img.style.opacity = '0';
        setTimeout(() => {
            img.src = this.images[this.currentIndex];
            img.style.opacity = '1';
        }, 400);
    }
}

const app = new An_Viewer();
