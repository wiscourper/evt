### evt

```
var evt = (function(){
	var _this = {};
	var _cid = 1;
	var handlers = {};

	_this.off = function(type, ele, capture){
		if(!ele || !ele._cid || !handlers[ele._cid] || !handlers[ele._cid][type]) return;
		if(type){
			var e = ele.removeEventListener(type, handlers[ele._cid][type], capture);
			delete handlers[ele._cid][type];
		}else{
			for(var tp in handlers[ele._cid]){
				_this.off(tp, ele, capture);
			}
		}
	}

	_this.on = function(type, ele, listener, capture, once){
		var cid = ele._cid || (ele._cid = _cid++);
		if(!handlers[cid]) handlers[cid] = {};
		handlers[cid][type] = function(e){
			listener(e);
			once && _this.off(type, ele, capture);
		};
		ele.addEventListener(type, handlers[cid][type], capture);
	}

	_this.one = function(type, ele, listener, capture){
		_this.on(type, ele, listener, capture, true);
	}

	_this.fire = function(type, ele){
		var evt = document.createEvent('Events');
		evt.initEvent(type, true, true);
		ele.dispatchEvent(evt);
	}

	return _this;
})()
```

### demo
```
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<p>hello, evt!</p>
	<button>button</button>
	<script type="text/javascript" src="evt.js"></script>
	<script type="text/javascript">
		var p = document.querySelector('p');
		var btn = document.querySelector('button');
		var i = 1;

		evt.on('hello', p, function(){
			p.innerHTML = 'hello, evt!'+(i++);
		})

		evt.one('hi', p, function(e){
			console.log('hi, evt!', e);
		})

		evt.on('click', btn, function(e){
			console.log(e)
			if(i > 3) evt.off('hello', p)
			evt.fire('hello', p)
			evt.fire('hi', p)
		})
	</script>
</body>
</html>
```