### evt

```
var evt = (function(){
	var _this = {}, handlers = {}, _cid = 1;

	_this.off = function(ele, type, capture){
		if(!ele || !ele._cid || !handlers[ele._cid]) return _this;

		if(type){
			ele.removeEventListener(type, handlers[ele._cid][type], capture);
			delete handlers[ele._cid][type];
		}else{
			for(var type in handlers[ele._cid]){
				_this.off(ele, type, capture);
			}
		}

		return _this;
	}

	_this.on = function(ele, type, listener, capture, once){
		var cid = ele._cid || (ele._cid = _cid++);

		if(!handlers[cid]) handlers[cid] = {};
		handlers[cid][type] = function(e){
			listener(e);
			once && _this.off(ele, type, capture);
		};
		ele.addEventListener(type, handlers[cid][type], capture);

		return _this;
	}

	_this.one = function(ele, type, listener, capture){
		return _this.on(ele, type, listener, capture, true);
	}

	_this.fire = function(ele, type, eventType){
		var evt = document.createEvent(eventType || 'Events');

		evt.initEvent(type, true, true);
		ele.dispatchEvent(evt);

		return _this;
	}

	return _this;
})();
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
		var p = document.querySelector('p'),
			btn = document.querySelector('button'),
			i = 1;

		evt.on(p, 'hello', function(){

			p.innerHTML = 'hello, evt!'+(i++);

		}).one(p, 'hi', function(e){

			console.log('hi, evt!', e);

		}).on(btn, 'click', function(e){

			console.log(e)
			if(i > 3) evt.off(p, 'hello')
			evt.fire(p, 'hello').fire(p, 'hi')

		});
	</script>
</body>
</html>
```