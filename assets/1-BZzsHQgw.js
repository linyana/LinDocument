const t=`# 自定义迭代器

## 什么是迭代

> 最简单的迭代就是循环例如：

\`\`\`javascript
for (let i = 0; i <= 5; i++) {
	console.log(i);
}
\`\`\`

> 循环是迭代的基础，因为循环可以指定循环的次数和每次循环需要执行的内容。

## 可迭代协议

> 可迭代协议允许 JavaScript 对象定义或定制它们的迭代行为。

### iterator 方法

> 要成为可迭代对象，这个对象必须实现 iterator 方法。这意味着这个对象（或者它原型链上的某个对象）必须有一个键为 iterator 的属性，可通过常量 Symbol.iterator 访问该属性。

| 属性              | 值                                                     |
| ----------------- | ------------------------------------------------------ |
| [Symbol.iterator] | 一个无参数的函数，其返回值为一个符合迭代器协议的对象。 |

### next()

> 迭代器使用 next()方法来遍历可迭代对象，每次成功调用 next()时都会返回一个 IteratorResult 对象，其中包含了迭代器返回的下一个值。

> next()返回的 IteratorResult 包含了两个属性：done，value。

| 属性  | 类型    | 值                                         |
| ----- | ------- | ------------------------------------------ |
| value | any     | 可迭代对象的下一个值，没有的话为 undefined |
| done  | boolean | 用来判断是否进行下一次 next()              |

\`\`\`javascript
let arr = ["1", "2"];
// 利用iterator接口生成迭代器对象
let iter = arr[Symbol.iterator]();
console.log(iter); // Object [Array Iterator] {}
// 开始迭代
console.log(iter.next()); //{ value: '1', done: false }
console.log(iter.next()); //{ value: '2', done: false }
//超出数组的长度，为空指针，done属性为 true
console.log(iter.next()); //{ value: undefined, done: true }
console.log(iter.next()); //{ value: undefined, done: true }
\`\`\`

> 这里我们可以看到在 done 为 true 之后，每次调用 next()就一直返回同样的值了。

### 两个不同的迭代器之间会相互影响吗

> 答案是不会，不同的迭代器之间没有联系，他们会独立地遍历可迭代对象。

\`\`\`javascript
let arr = ["1", "2"];
let iter1 = arr[Symbol.iterator]();
let iter2 = arr[Symbol.iterator]();
// 开始迭代
console.log(iter1.next()); //{ value: '1', done: false }
console.log(iter2.next()); //{ value: '1', done: false }
console.log(iter1.next()); //{ value: '2', done: false }
console.log(iter2.next()); //{ value: '2', done: false }
\`\`\`

### 如果在迭代过程中添加新的遍历对象会进行遍历吗

> 会的，如果可迭代对象在迭代期间被修改了，那么迭代器的迭代过程也会进行相应的改变。

\`\`\`javascript
let arr = ["1", "2"];
let iter = arr[Symbol.iterator]();
//开始迭代
console.log(iter.next()); //{ value:'1', done:false }
console.log(iter.next()); //{ value:'2', done:false }
arr.push("3");
console.log(iter.next());
\`\`\`

> 这里需要注意，如果在 push3 之前再执行一次 next()的话 done 会变为 ture,这会导致之后的输出都是{ value: undefined, done: true }，从而无法迭代出 3。

## 自定义迭代器的实现

\`\`\`javascript
class Counter {
	constructor(limit) {
		this.limit = limit;
	}
	[Symbol.iterator]() {
		let count = 1,
			limit = this.limit;
		return {
			next() {
				if (count <= limit) {
					return {
						done: false,
						value: count++,
					};
				} else {
					return {
						done: true,
						value: undefined,
					};
				}
			},
			return() {
				console.log("Exit early");
				return { done: "true" };
			},
		};
	}
}
\`\`\`
`;export{t as default};
