## 粒子文字 (particle text)

### view on line
https://qishaoxuan.github.io/particleText/

### 使用 (how to use)
```html
<script src="dist/particleText.min.js"></script>
```
```js
  let pt = new particleText({
    container: document.querySelector('main'),
    width: 500,
    height:150,
  })
  pt.draw(text)
```

### 参数 (params)
```js
// 默认参数如下
// default params
  let params = {
    duration:0.4,
    radius: 2,
    resolution:6,
    fontSize:150,
    fontFamily:'SF Pro SC',
  }
  
  pt.draw(text,params)
```


