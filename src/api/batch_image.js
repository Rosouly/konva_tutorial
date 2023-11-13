import Konva from 'konva';

class ImageObject {
    // 默认宽高为500
    constructor(src, width = 500, height = 500, options = {}) {
        this.src = src;
        this.width = width;
        this.height = height;
        this.options = options;
    }

    async createKonvaImage() {
        let image = await this.loadImage(this.src);
        return new Konva.Image({
            image: image,
            width: this.width,
            height: this.height,
            ...this.options
        });
    }

    loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }
}

class ImageLayer {
    constructor(images) {
        this.images = images
    }

    async addToStage(stage) {
        let layer = new Konva.Layer();
        for (const imgObj of this.images) {
            let konvaImage = await imgObj.createKonvaImage();
            layer.add(konvaImage);
        }
        stage.add(layer);
    }
}

let imageInfo = [
    {
        image: "/src/assets/3.png",
        type: 1
    },
    {
        image: "/src/assets/1.png",
        type: 2
    },
    {
        image: "/src/assets/阴影.png",
        type: 3
    }
]

let changeImageInfo = [
    {
        image: "/src/assets/background.png",
    }
]

// 循环imageInfo

// 如果type = 1
let bottomImages = [];
// 如果type = 2
let replaceableImages = [];
// 如果type = 3
let overlayImages = [];

imageInfo.forEach(item => {
    let imageObject = new ImageObject(imageInfo.image);
    switch (item.type) {
        case 1:
            bottomImages.push(imageObject);
            break;
        case 2:
            replaceableImages.push(imageObject);
            break;
        case 3:
            overlayImages.push(imageObject);
            break;
        default:
            break;
    }
})

let bottomLayer = new ImageLayer(bottomImages);
let replaceableLayer = new ImageLayer(replaceableImages);
let overlayLayer = new ImageLayer(overlayImages);

async function BatchImage(image) {
    // 创建一个舞台
    const stage = new Konva.Stage({
        container: 'container', // 页面上的容器元素的ID
        width: 500,
        height: 500
    });

    // 遍历bottomLayer
    await bottomLayer.addToStage(stage);

    // 遍历replaceableLayer，并为第二个图像添加特定属性
    await replaceableLayer.addToStage(stage);

    
    let imageObject = new ImageObject(image);
    imageObject.options.globalCompositeOperation = "source-atop";
    imageObject.options.name = "target";

    // 将入参的图加入replaceableLayer中
    let konvaImage = await imageObject.createKonvaImage();
    let replaceableKonvaLayer = replaceableLayer.getKonvaLayer(); // 获取Konva层实例
    replaceableKonvaLayer.add(konvaImage);

    // 遍历overlayLayer，并为每个图像添加listening: false属性
    overlayImages.forEach(img => img.options.listening = false);
    await overlayLayer.addToStage(stage);
}

// 下载图片