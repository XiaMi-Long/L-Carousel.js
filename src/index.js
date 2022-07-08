/*
 * @Descripttion:
 * @version:
 * @Author: wwy
 * @Date: 2022-07-07 15:19:29
 * @LastEditors: wwy
 * @LastEditTime: 2022-07-08 16:43:46
 */

import "./index.css";

const { log, warn } = console;

class Lcarousel {
  // 轮播容器dom
  container = null;
  // 图片容器dom
  pictureContainer = null;
  // list-item dom
  listItemContainer = null;
  // 配置
  config = {};
  // 图片数量
  imgLength = 0;
  // 一个图片的长度
  imgElementWidth = 0;
  // 每个图片的位置
  position = [];

  constructor({ width = "100%", height = "100%", intervalTime = 4000 }) {
    this.config = {
      width,
      height,
      intervalTime,
    };
    this.initElement();
    this.startLoop();
  }

  /* 初始化element和配置 */
  initElement() {
    this.container = document.getElementById("l-carousel-container");
    if (this.container === null) {
      warn("not found container-dom");
    }

    this.container.style.width = this.config.width;
    this.container.style.height = this.config.height;

    // 获取图片容器
    const pictureContainer =
      this.container.getElementsByClassName("l-carousel-picture");
    if (pictureContainer === null) {
      throw new Error("not found l-carousel-picture");
    }
    this.pictureContainer = pictureContainer[0];

    // 获取容器的长度
    const containerWidth = this.container.clientWidth;

    // 获取一个图片的高度
    this.imgElementWidth = containerWidth;

    // 获取图片数量
    const imgList = this.container.getElementsByTagName("img");
    if (imgList.length === 0) {
      throw new Error("The number of pictures is 0!");
    }
    this.imgLength = imgList.length;

    // 计算图片容器长度
    this.pictureContainer.style.width = this.imgLength * containerWidth + "px";

    // 分配图片item长度
    const listItem = this.container.getElementsByClassName("list-item");
    if (listItem === null) {
      throw new Error("not found list-item class");
    }
    this.listItemContainer = Array.from(listItem);
    this.listItemContainer.forEach((item, index) => {
      item.style.width = containerWidth + "px";
      // 计算每个图片的位置
      if (index === 0) {
        this.position.push("0px");
      } else if (index === this.listItemContainer.length - 1) {
        this.position.push(`-${this.imgElementWidth}px`);
      } else {
        // 计算图片正常位置
        this.position.push(`${this.imgElementWidth * index}px`);
      }
      item.style.transform = `translateX(${this.position[index]})`;
    });

    console.log(this.position);
  }

  /* 启动定时任务开始循环 */
  startLoop() {
    let count = 0;
    let handle = () => {
      const length = this.listItemContainer.length;

      // 处理两个2以下的方案
      if (length < 3) {
        for (let i = 0; i < length; i++) {
          const element = this.listItemContainer[i];

          if (element.style.zIndex === "-1") {
            element.style.zIndex = "";
          }

          // 单独计算第一张的行为
          if (i === count) {
            element.style.transform = `translateX(${
              this.position[this.position.length - 1]
            })`;
            continue;
          }

          element.style.zIndex = -1;
          element.style.transition = `none`;
          element.style.transform = `translateX(${this.imgElementWidth}px)`;
          setTimeout(() => {
            element.style.transition = `all 1s`;
            element.style.transform = `translateX(${this.position[0]})`;
          }, 24);
        }
      } else {
        for (let i = 0; i < length; i++) {
          const element = this.listItemContainer[i];

          if (element.style.zIndex === "-1") {
            element.style.zIndex = "";
          }

          // 单独计算第一张的行为
          if (i === count) {
            element.style.transform = `translateX(${
              this.position[this.position.length - 1]
            })`;
            continue;
          }

          let width = this.getTransFormPx(
            this.listItemContainer[i].style.transform
          );
          // 计算他们最多可移动的距离, 2是因为有2个地方是必须有的
          let maxWidth = this.imgElementWidth * (this.imgLength - 2);
          if (width !== null) {
            width = parseInt(width[0], 10);
            if (width > 0) {
              width -= this.imgElementWidth;
            } else {
              width = maxWidth;
            }
          }
          if (width === maxWidth) {
            element.style.zIndex = -1;
          }
          element.style.transform = `translateX(${width}px)`;
        }
      }

      count++;
      if (count === length) {
        count = 0;
      }

      setTimeout(handle, this.config.intervalTime);
    };

    setTimeout(handle, this.config.intervalTime);
  }

  getTransFormPx(str) {
    return str.match(/[-0-9]+px/g);
  }
}

const lcarousel = new Lcarousel({});
