/*
 * jquery.dragScroll v1.0.0
 * author 735126858@qq.com
 * https://github.com/YuTingtao/dragscroll.js
 */
;(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($){
    var methods = {
        init: function(options) {
            var defaults = {
                direction: null,
                throttleTime: 50,  // 节流时间
                onStart: function() {},
                onMove: function() {},
                onEnd: function() {},
				handle: null, // is or not
				selector: null // selectors
            };

            var opt = $.extend({}, defaults, options);

            return this.each(function() {
                var $this = $(this),
                    _dir = opt.direction,
                    _throttleTime = opt.throttleTime,
                    _onStart = opt.onStart,
                    _onMove = opt.onMove,
                    _onEnd = opt.onEnd,
					_handle = opt.handle,
					_selector = opt.selector;

                var left0, top0, x0, y0, flag = false;
                if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    // 移动端
                    $this.on('touchstart', function(e) {
                        var e = e.originalEvent.targetTouches[0];
                        flag = true;
                        x0 = e.clientX;
                        y0 = e.clientY;
                        left0 = $(this).parent().scrollLeft();
                        top0 = $(this).parent().scrollTop();
                        _onStart && _onStart.call(this, $this);

                        $this.on('touchmove', function(e) {
                            e.stopPropagation();
                            var e = e.originalEvent.targetTouches[0];
                            if (flag) {
                                var timeout = null;
                                if (timeout == null) {
                                    timeout = setTimeout(function() {
                                        var moveX = parseInt(e.clientX - x0);
                                        var moveY = parseInt(e.clientY - y0);
                                        if (_dir == 'scrollLeft') {
                                            $this.parent().scrollLeft(left0 - moveX);
                                        } else if (_dir == 'scrollTop') {
                                            $this.parent().scrollTop(top0 - moveY);
                                        } else {
                                            $this.parent().scrollLeft(left0 - moveX);
                                            $this.parent().scrollTop(top0 - moveY);
                                        }
                                        timeout = null;
                                    }, _throttleTime);
                                }
                                _onMove && _onMove.call(this, $this);
                            }
                        });
                        $this.on('touchend', function(e) {
                            if (flag) {
                                _onEnd && _onEnd.call(this, $this);
                            }
                            flag = false;
                            $this.off('touchmove touchend');
                        });
                    });
                } else {
                    // 鼠标按下
                    $this.on('mousedown', function(e) {
						
						// Default drag is possible
						var isDraggable = true;
						var objTarget = $(e.target);
						
						// Prevent dragging with unwanted selector
						if (_handle == 'is' && !objTarget.is(_selector)) isDraggable = false;
						
						// Prevent dragging with unwanted selector
						if (_handle == 'not' && objTarget.is(_selector)) isDraggable = false;
						
						// noDragScroll
						if (objTarget.is('.noDragScroll')) isDraggable = false;
						
						// Is is draggable?
						if (isDraggable) {
							
							e.preventDefault();
							var e = e || window.event;
							flag = true;
							x0 = e.clientX;
							y0 = e.clientY;
							left0 = $(this).parent().scrollLeft();
							top0 = $(this).parent().scrollTop();
							_onStart && _onStart.call(this, $this);

							// 鼠标移动
							$this.on('mousemove', function(e) {
								e.preventDefault();
								$this.css('cursor', 'move');
								var e = e || window.event;
								if (flag) {
									var timeout = null;
									if(timeout == null) {
										timeout = setTimeout(function() {
											var moveX = parseInt(e.clientX - x0);
											var moveY = parseInt(e.clientY - y0);
											if (_dir == 'scrollLeft') {
												$this.parent().scrollLeft(left0 - moveX);
											} else if (_dir == 'scrollTop') {
												$this.parent().scrollTop(top0 - moveY);
											} else {
												$this.parent().scrollLeft(left0 - moveX);
												$this.parent().scrollTop(top0 - moveY);
											}
											timeout = null;
										}, _throttleTime);
									}
									_onMove && _onMove.call(this, $this);
								}
							});

							// 鼠标松开或离开
							$this.on('mouseup mouseleave', function() {
								if (flag) {
									_onEnd && _onEnd.call(this, $this);
								}
								flag = false;
								$this.off('mousemove mouseup mouseleave');
								$this.css('cursor', 'default');
							});
						
						// Laurent: End of checking target
						}
                    });
                }
            });
        },
        destroy: function() {
            return $(this).each(function() {
                var $this = $(this);
                $this.off('mousedown mousemove mouseup mouseleave');
                $this.off('touchstart touchmove touchend')
            });
        }
    };

    $.fn.dragScroll = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('method ' + method + ' does not exist on jquery.dragscroll.js');
        }
    }
}));