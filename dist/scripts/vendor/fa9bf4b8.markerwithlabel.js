function inherits(a,b){function c(){}c.prototype=b.prototype,a.superClass_=b.prototype,a.prototype=new c,a.prototype.constructor=a}function MarkerLabel_(a,b,c){this.marker_=a,this.handCursorURL_=a.handCursorURL,this.labelDiv_=document.createElement("div"),this.labelDiv_.style.cssText="position: absolute; overflow: hidden;",this.eventDiv_=document.createElement("div"),this.eventDiv_.style.cssText=this.labelDiv_.style.cssText,this.eventDiv_.setAttribute("onselectstart","return false;"),this.eventDiv_.setAttribute("ondragstart","return false;"),this.crossDiv_=MarkerLabel_.getSharedCross(b)}function MarkerWithLabel(a){a=a||{},a.labelContent=a.labelContent||"",a.labelAnchor=a.labelAnchor||new google.maps.Point(0,0),a.labelClass=a.labelClass||"markerLabels",a.labelStyle=a.labelStyle||{},a.labelInBackground=a.labelInBackground||!1,"undefined"==typeof a.labelVisible&&(a.labelVisible=!0),"undefined"==typeof a.raiseOnDrag&&(a.raiseOnDrag=!0),"undefined"==typeof a.clickable&&(a.clickable=!0),"undefined"==typeof a.draggable&&(a.draggable=!1),"undefined"==typeof a.optimized&&(a.optimized=!1),a.crossImage=a.crossImage||"http"+("https:"===document.location.protocol?"s":"")+"://maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png",a.handCursor=a.handCursor||"http"+("https:"===document.location.protocol?"s":"")+"://maps.gstatic.com/intl/en_us/mapfiles/closedhand_8_8.cur",a.optimized=!1,this.label=new MarkerLabel_(this,a.crossImage,a.handCursor),google.maps.Marker.apply(this,arguments)}inherits(MarkerLabel_,google.maps.OverlayView),MarkerLabel_.getSharedCross=function(a){var b;return"undefined"==typeof MarkerLabel_.getSharedCross.crossDiv&&(b=document.createElement("img"),b.style.cssText="position: absolute; z-index: 1000002; display: none;",b.style.marginLeft="-8px",b.style.marginTop="-9px",b.src=a,MarkerLabel_.getSharedCross.crossDiv=b),MarkerLabel_.getSharedCross.crossDiv},MarkerLabel_.prototype.onAdd=function(){var a,b,c,d,e,f,g,h=this,i=!1,j=!1,k=20,l="url("+this.handCursorURL_+")",m=function(a){a.preventDefault&&a.preventDefault(),a.cancelBubble=!0,a.stopPropagation&&a.stopPropagation()},n=function(){h.marker_.setAnimation(null)};this.getPanes().overlayImage.appendChild(this.labelDiv_),this.getPanes().overlayMouseTarget.appendChild(this.eventDiv_),"undefined"==typeof MarkerLabel_.getSharedCross.processed&&(this.getPanes().overlayImage.appendChild(this.crossDiv_),MarkerLabel_.getSharedCross.processed=!0),this.listeners_=[google.maps.event.addDomListener(this.eventDiv_,"mouseover",function(a){(h.marker_.getDraggable()||h.marker_.getClickable())&&(this.style.cursor="pointer",google.maps.event.trigger(h.marker_,"mouseover",a))}),google.maps.event.addDomListener(this.eventDiv_,"mouseout",function(a){!h.marker_.getDraggable()&&!h.marker_.getClickable()||j||(this.style.cursor=h.marker_.getCursor(),google.maps.event.trigger(h.marker_,"mouseout",a))}),google.maps.event.addDomListener(this.eventDiv_,"mousedown",function(a){j=!1,h.marker_.getDraggable()&&(i=!0,this.style.cursor=l),(h.marker_.getDraggable()||h.marker_.getClickable())&&(google.maps.event.trigger(h.marker_,"mousedown",a),m(a))}),google.maps.event.addDomListener(document,"mouseup",function(b){var c;if(i&&(i=!1,h.eventDiv_.style.cursor="pointer",google.maps.event.trigger(h.marker_,"mouseup",b)),j){if(e){c=h.getProjection().fromLatLngToDivPixel(h.marker_.getPosition()),c.y+=k,h.marker_.setPosition(h.getProjection().fromDivPixelToLatLng(c));try{h.marker_.setAnimation(google.maps.Animation.BOUNCE),setTimeout(n,1406)}catch(f){}}h.crossDiv_.style.display="none",h.marker_.setZIndex(a),d=!0,j=!1,b.latLng=h.marker_.getPosition(),google.maps.event.trigger(h.marker_,"dragend",b)}}),google.maps.event.addListener(h.marker_.getMap(),"mousemove",function(d){var l;i&&(j?(d.latLng=new google.maps.LatLng(d.latLng.lat()-b,d.latLng.lng()-c),l=h.getProjection().fromLatLngToDivPixel(d.latLng),e&&(h.crossDiv_.style.left=l.x+"px",h.crossDiv_.style.top=l.y+"px",h.crossDiv_.style.display="",l.y-=k),h.marker_.setPosition(h.getProjection().fromDivPixelToLatLng(l)),e&&(h.eventDiv_.style.top=l.y+k+"px"),google.maps.event.trigger(h.marker_,"drag",d)):(b=d.latLng.lat()-h.marker_.getPosition().lat(),c=d.latLng.lng()-h.marker_.getPosition().lng(),a=h.marker_.getZIndex(),f=h.marker_.getPosition(),g=h.marker_.getMap().getCenter(),e=h.marker_.get("raiseOnDrag"),j=!0,h.marker_.setZIndex(1e6),d.latLng=h.marker_.getPosition(),google.maps.event.trigger(h.marker_,"dragstart",d)))}),google.maps.event.addDomListener(document,"keydown",function(a){j&&27===a.keyCode&&(e=!1,h.marker_.setPosition(f),h.marker_.getMap().setCenter(g),google.maps.event.trigger(document,"mouseup",a))}),google.maps.event.addDomListener(this.eventDiv_,"click",function(a){(h.marker_.getDraggable()||h.marker_.getClickable())&&(d?d=!1:(google.maps.event.trigger(h.marker_,"click",a),m(a)))}),google.maps.event.addDomListener(this.eventDiv_,"dblclick",function(a){(h.marker_.getDraggable()||h.marker_.getClickable())&&(google.maps.event.trigger(h.marker_,"dblclick",a),m(a))}),google.maps.event.addListener(this.marker_,"dragstart",function(a){j||(e=this.get("raiseOnDrag"))}),google.maps.event.addListener(this.marker_,"drag",function(a){j||e&&(h.setPosition(k),h.labelDiv_.style.zIndex=1e6+(this.get("labelInBackground")?-1:1))}),google.maps.event.addListener(this.marker_,"dragend",function(a){j||e&&h.setPosition(0)}),google.maps.event.addListener(this.marker_,"position_changed",function(){h.setPosition()}),google.maps.event.addListener(this.marker_,"zindex_changed",function(){h.setZIndex()}),google.maps.event.addListener(this.marker_,"visible_changed",function(){h.setVisible()}),google.maps.event.addListener(this.marker_,"labelvisible_changed",function(){h.setVisible()}),google.maps.event.addListener(this.marker_,"title_changed",function(){h.setTitle()}),google.maps.event.addListener(this.marker_,"labelcontent_changed",function(){h.setContent()}),google.maps.event.addListener(this.marker_,"labelanchor_changed",function(){h.setAnchor()}),google.maps.event.addListener(this.marker_,"labelclass_changed",function(){h.setStyles()}),google.maps.event.addListener(this.marker_,"labelstyle_changed",function(){h.setStyles()})]},MarkerLabel_.prototype.onRemove=function(){var a;for(this.labelDiv_.parentNode.removeChild(this.labelDiv_),this.eventDiv_.parentNode.removeChild(this.eventDiv_),a=0;a<this.listeners_.length;a++)google.maps.event.removeListener(this.listeners_[a])},MarkerLabel_.prototype.draw=function(){this.setContent(),this.setTitle(),this.setStyles()},MarkerLabel_.prototype.setContent=function(){var a=this.marker_.get("labelContent");"undefined"==typeof a.nodeType?(this.labelDiv_.innerHTML=a,this.eventDiv_.innerHTML=this.labelDiv_.innerHTML):(this.labelDiv_.innerHTML="",this.labelDiv_.appendChild(a),a=a.cloneNode(!0),this.eventDiv_.appendChild(a))},MarkerLabel_.prototype.setTitle=function(){this.eventDiv_.title=this.marker_.getTitle()||""},MarkerLabel_.prototype.setStyles=function(){var a,b;this.labelDiv_.className=this.marker_.get("labelClass"),this.eventDiv_.className=this.labelDiv_.className,this.labelDiv_.style.cssText="",this.eventDiv_.style.cssText="",b=this.marker_.get("labelStyle");for(a in b)b.hasOwnProperty(a)&&(this.labelDiv_.style[a]=b[a],this.eventDiv_.style[a]=b[a]);this.setMandatoryStyles()},MarkerLabel_.prototype.setMandatoryStyles=function(){this.labelDiv_.style.position="absolute",this.labelDiv_.style.overflow="hidden","undefined"!=typeof this.labelDiv_.style.opacity&&""!==this.labelDiv_.style.opacity&&(this.labelDiv_.style.MsFilter='"progid:DXImageTransform.Microsoft.Alpha(opacity='+100*this.labelDiv_.style.opacity+')"',this.labelDiv_.style.filter="alpha(opacity="+100*this.labelDiv_.style.opacity+")"),this.eventDiv_.style.position=this.labelDiv_.style.position,this.eventDiv_.style.overflow=this.labelDiv_.style.overflow,this.eventDiv_.style.opacity=.01,this.eventDiv_.style.MsFilter='"progid:DXImageTransform.Microsoft.Alpha(opacity=1)"',this.eventDiv_.style.filter="alpha(opacity=1)",this.setAnchor(),this.setPosition(),this.setVisible()},MarkerLabel_.prototype.setAnchor=function(){var a=this.marker_.get("labelAnchor");this.labelDiv_.style.marginLeft=-a.x+"px",this.labelDiv_.style.marginTop=-a.y+"px",this.eventDiv_.style.marginLeft=-a.x+"px",this.eventDiv_.style.marginTop=-a.y+"px"},MarkerLabel_.prototype.setPosition=function(a){var b=this.getProjection().fromLatLngToDivPixel(this.marker_.getPosition());"undefined"==typeof a&&(a=0),this.labelDiv_.style.left=Math.round(b.x)+"px",this.labelDiv_.style.top=Math.round(b.y-a)+"px",this.eventDiv_.style.left=this.labelDiv_.style.left,this.eventDiv_.style.top=this.labelDiv_.style.top,this.setZIndex()},MarkerLabel_.prototype.setZIndex=function(){var a=this.marker_.get("labelInBackground")?-1:1;"undefined"==typeof this.marker_.getZIndex()?(this.labelDiv_.style.zIndex=parseInt(this.labelDiv_.style.top,10)+a,this.eventDiv_.style.zIndex=this.labelDiv_.style.zIndex):(this.labelDiv_.style.zIndex=this.marker_.getZIndex()+a,this.eventDiv_.style.zIndex=this.labelDiv_.style.zIndex)},MarkerLabel_.prototype.setVisible=function(){this.marker_.get("labelVisible")?this.labelDiv_.style.display=this.marker_.getVisible()?"block":"none":this.labelDiv_.style.display="none",this.eventDiv_.style.display=this.labelDiv_.style.display},inherits(MarkerWithLabel,google.maps.Marker),MarkerWithLabel.prototype.setMap=function(a){google.maps.Marker.prototype.setMap.apply(this,arguments),this.label.setMap(a)};