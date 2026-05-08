class An_Viewer {
    constructor() {
        this.scenes = {
            init: document.querySelector('#scene-init'),
            gallery: document.querySelector('#scene-gallery')
        };
        this.images = [
            "images/An1.png", "images/An2.png", "images/An3.png", "images/An4.png",
            "images/An5.png", "images/An6.png", "images/An7.png", "images/An8.png"
        ];
        this.currentIndex = 0;
        this.currentState = 'LOADING'; // 初始狀態

        this.init();
    }

    init() {
        setTimeout(() => this.transitionTo('READY'), 3000);
    }
    
    transitionTo(newState) {
        console.log(`狀態切換: ${this.currentState} -> ${newState}`);
        this.currentState = newState;
        switch (newState) {
            case 'READY':
                this.renderReadyButton();
                break;
            case 'GALLERY':
                this.switchToGalleryScene();
                break;
        }
    }
    renderReadyButton() {
        const content = document.querySelector('#contentArea');
        content.innerHTML='<button class="btn-start">戳戳</button>';
        const btn = content.querySelector('.btn-start');

        btn.style.opacity = '0';
        btn.onclick = () => this.transitionTo('GALLERY');
        setTimeout(() => btn.style.opacity = '1', 50);
    }

    // 場景切換動畫
    switchToGalleryScene() {
        this.scenes.init.style.transition = 'opacity 0.8s ease';
        this.scenes.init.style.opacity = '0';

        setTimeout(() => {
            this.scenes.init.style.display = 'none';
            this.scenes.gallery.style.display = 'flex';
            this.setupGalleryEvents(); // 綁定畫廊按鈕
            setTimeout(() => this.scenes.gallery.style.opacity = '1', 50);
        }, 800);
    }

    // 畫廊邏輯
    setupGalleryEvents() {
        const img = document.querySelector('.main_image');
        const next = document.querySelector('.next-btn');
        const prev = document.querySelector('.prev-btn');

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