;var evt = (function(){
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