// --------------------------------
// String.prototype   String方法扩展
// --------------------------------
(function($){if(!$)return;$.extend(String.prototype,{'toBoolean':function(){return(this=='false'||this==''||this=='0')?false:true;},'toNumber':function(){return(!isNaN(this))?Number(this):this.toString();},'toRealValue':function(){return(this=='true'||this=='false')?this.toBoolean():this.toNumber();},'trim':function(){return this.replace(/(^\s*)|(\s*$)/g,'');},'ltrim':function(){return this.replace(/(^\s*)/g,'');},'rtrim':function(){return this.replace(/(\s*$)/g,'');},'trimAll':function(){return this.replace(/\s/g,'');},'left':function(len){return this.substring(0,len);},'right':function(len){return(this.length<=len)?this.toString():this.substring(this.length-len,this.length);},'reverse':function(){return this.split('').reverse().join('');},'startWith':function(start,noCase){return!(noCase?this.toLowerCase().indexOf(start.toLowerCase()):this.indexOf(start));},'endWith':function(end,noCase){return noCase?(new RegExp(end.toLowerCase()+"$").test(this.toLowerCase().trim())):(new RegExp(end+"$").test(this.trim()));},'sliceAfter':function(str){return(this.indexOf(str)>=0)?this.substring(this.indexOf(str)+str.length,this.length):this.toString();},'sliceBefore':function(str){return(this.indexOf(str)>=0)?this.substring(0,this.indexOf(str)):this.toString();},'getByteLength':function(){return this.replace(/[^\x00-\xff]/ig,'xx').length;},'subByte':function(len,s){if(len<0||this.getByteLength()<=len){return this.toString();}var str=this;str=str.substr(0,len).replace(/([^\x00-\xff])/g,"\x241 ").substr(0,len).replace(/[^\x00-\xff]$/,"").replace(/([^\x00-\xff]) /g,"\x241");return str+(s||'');},'textToHtml':function(){return this.replace(/</ig,'&lt;').replace(/>/ig,'&gt;').replace(/\r\n/ig,'<br>').replace(/\n/ig,'<br>');},'htmlToText':function(){return this.replace(/<br>/ig,'\r\n');},'htmlEncode':function(){var text=this,re={'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'};for(i in re){text=text.replace(new RegExp(i,'g'),re[i]);}return text;},'htmlDecode':function(){var text=this,re={'&lt;':'<','&gt;':'>','&amp;':'&','&quot;':'"'};for(i in re){text=text.replace(new RegExp(i,'g'),re[i]);}return text;},'stripHtml':function(){return this.replace(/(<\/?[^>\/]*)\/?>/ig,'');},'stripScript':function(){return this.replace(/<script(.|\n)*\/script>\s*/ig,'').replace(/on[a-z]*?\s*?=".*?"/ig,'');},'replaceAll':function(os,ns){return this.replace(new RegExp(os,"gm"),ns);},'escapeReg':function(){return this.replace(new RegExp("([.*+?^=!:\x24{}()|[\\]\/\\\\])","g"),'\\\x241');},'addQueryValue':function(name,value){var url=this.getPathName();var param=this.getQueryJson();if(!param[name])param[name]=value;return url+'?'+$.param(param);},'getQueryValue':function(name){var reg=new RegExp("(^|&|\\?|#)"+name.escapeReg()+"=([^&]*)(&|\x24)","");var match=this.match(reg);return(match)?match[2]:'';},'getQueryJson':function(){if(this.indexOf('?')<0)return{};var query=this.substr(this.indexOf('?')+1),params=query.split('&'),len=params.length,result={},key,value,item,param;for(var i=0;i<len;i++){param=params[i].split('=');key=param[0];value=param[1];item=result[key];if('undefined'==typeof item){result[key]=value;}else if(Object.prototype.toString.call(item)=='[object Array]'){item.push(value);}else{result[key]=[item,value];}}return result;},'getDomain':function(){if(this.startWith('http://'))return this.split('/')[2];return'';},'getPathName':function(){return(this.lastIndexOf('?')==-1)?this.toString():this.substring(0,this.lastIndexOf('?'));},'getFilePath':function(){return this.substring(0,this.lastIndexOf('/')+1);},'getFileName':function(){return this.substring(this.lastIndexOf('/')+1);},'getFileExt':function(){return this.substring(this.lastIndexOf('.')+1);},'parseDate':function(){return(new Date()).parse(this.toString());},'parseJSON':function(){return(new Function("return "+this.toString()))();},'parseAttrJSON':function(){var d={},a=this.toString().split(';');for(var i=0;i<a.length;i++){if(a[i].trim()==''||a[i].indexOf(':')<1)continue;var item=a[i].sliceBefore(':').trim(),val=a[i].sliceAfter(':').trim();if(item!=''&&val!='')d[item.toCamelCase()]=val.toRealValue();}return d;},'_pad':function(width,ch,side){var str=[side?'':this,side?this:''];while(str[side].length<(width?width:0)&&(str[side]=str[1]+(ch||' ')+str[0]));return str[side];},'padLeft':function(width,ch){if(this.length>=width)return this.toString();return this._pad(width,ch,0);},'padRight':function(width,ch){if(this.length>=width)return this.toString();return this._pad(width,ch,1);},'toHalfWidth':function(){return this.replace(/[\uFF01-\uFF5E]/g,function(c){return String.fromCharCode(c.charCodeAt(0)-65248);}).replace(/\u3000/g," ");},'toCamelCase':function(){if(this.indexOf('-')<0&&this.indexOf('_')<0){return this.toString();}return this.replace(/[-_][^-_]/g,function(match){return match.charAt(1).toUpperCase();});},'format':function(){var result=this;if(arguments.length>0){var parameters=(arguments.length==1&&$.isArray(arguments[0]))?arguments[0]:$.makeArray(arguments);$.each(parameters,function(i,n){result=result.replace(new RegExp("\\{"+i+"\\}","g"),n);});}return result;},'substitute':function(data){if(data&&typeof(data)=='object'){return this.replace(/\{([^{}]+)\}/g,function(match,key){var value=data[key];return(value!==undefined)?''+value:'';});}else{return this.toString();}},'extractValues':function(pattern,options){var str=this.toString();options=options||{};var delimiters=options.delimiters||["{","}"];var lowercase=options.lowercase;var whitespace=options.whitespace;var special_chars_regex=/[\\\^\$\*\+\.\?\(\)]/g;var token_regex=new RegExp(delimiters[0]+"([^"+delimiters.join("")+"\t\r\n]+)"+delimiters[1],"g");var tokens=pattern.match(token_regex);var pattern_regex=new RegExp(pattern.replace(special_chars_regex,"\\$&").replace(token_regex,"(\.+)"));if(lowercase){str=str.toLowerCase();}if(whitespace){str=str.replace(/\s+/g,function(match){var whitespace_str="";for(var i=0;i<whitespace;i++){whitespace_str=whitespace_str+match.charAt(0);};return whitespace_str;});};var matches=str.match(pattern_regex);if(!matches){return null;}matches=matches.splice(1);var output={};for(var i=0;i<tokens.length;i++){output[tokens[i].replace(new RegExp(delimiters[0]+"|"+delimiters[1],"g"),"")]=matches[i];}return output;}});})(jQuery);
// --------------------------------
// Number.prototype   Number方法扩展
// --------------------------------
(function($){if(!$)return;$.extend(Number.prototype,{'comma':function(length){if(!length||length<1)length=3;source=(''+this).split(".");source[0]=source[0].replace(new RegExp('(\\d)(?=(\\d{'+length+'})+$)','ig'),"$1,");return source.join(".");},'randomInt':function(min,max){return Math.floor(Math.random()*(max-min+1)+min);},'padLeft':function(width,ch){return(''+this).padLeft(width,ch);},'padRight':function(width,ch){return(''+this).padRight(width,ch);}});})(jQuery);
// --------------------------------
// Array.prototype     Array方法扩展
// --------------------------------
(function($){if(!$)return;$.extend(Array.prototype,{'indexOf':function(item,it){for(var i=0;i<this.length;i++){if(item==((it)?this[i][it]:this[i]))return i;}return-1;},'remove':function(item,it){this.removeAt(this.indexOf(item,it));},'removeAt':function(idx){if(idx>=0&&idx<this.length){for(var i=idx;i<this.length-1;i++){this[i]=this[i+1];}this.length--;}},'removeEmpty':function(){var arr=[];for(var i=0;i<this.length;i++){if(this[i].trim()!=''){arr.push(this[i].trim());}}return arr;},'add':function(item){if(this.indexOf(item)>-1){return false;}else{this.push(item);return true;}},'swap':function(i,j){if(i<this.length&&j<this.length&&i!=j){var item=this[i];this[i]=this[j];this[j]=item;}},'filter':function(it,item){var arr=[];for(var i=0;i<this.length;i++){if(typeof(item)=='undefined'){arr.push(this[i][it]);}else if(this[i][it]==item){arr.push(this[i]);}}return arr;},'unique':function(){var a=[],o={},i,v,len=this.length;if(len<2)return this;for(i=0;i<len;i++){v=this[i];if(o[v]!==1){a.push(v);o[v]=1;}}return a;},'sortby':function(it,dt,od){var compareValues=function(v1,v2,dt,od){if(dt=='int'){v1=parseInt(v1);v2=parseInt(v2);}else if(dt=='float'){v1=parseFloat(v1);v2=parseFloat(v2);}var ret=0;if(v1<v2)ret=1;if(v1>v2)ret=-1;if(od=='desc'){ret=0-ret;}return ret;};var newdata=new Array();for(var i=0;i<this.length;i++){newdata[newdata.length]=this[i];}for(var i=0;i<newdata.length;i++){var minIdx=i;var minData=(it!='')?newdata[i][it]:newdata[i];for(var j=i+1;j<newdata.length;j++){var tmpData=(it!='')?newdata[j][it]:newdata[j];var cmp=compareValues(minData,tmpData,dt,od);if(cmp<0){minIdx=j;minData=tmpData;}}if(minIdx>i){var _child=newdata[minIdx];newdata[minIdx]=newdata[i];newdata[i]=_child;}}return newdata;}});})(jQuery);
// --------------------------------
// Date.prototype       Date方法扩展
// --------------------------------
(function($){if(!$)return;$.extend(Date.prototype,{'parse':function(time){if(typeof(time)=='string'){if(time.indexOf('GMT')>0||time.indexOf('gmt')>0||!isNaN(Date.parse(time))){return this.parseGMT(time);}else if(time.indexOf('UTC')>0||time.indexOf('utc')>0||time.indexOf(',')>0){return this.parseUTC(time);}else{return this.parseCommon(time);}}return new Date();},'parseGMT':function(time){this.setTime(Date.parse(time));return this;},'parseUTC':function(time){return(new Date(time));},'parseCommon':function(time){var d=time.split(/ |T/),d1=d.length>1?d[1].split(/[^\d]/):[0,0,0],d0=d[0].split(/[^\d]/);return new Date(d0[0]-0,d0[1]-1,d0[2]-0,d1[0]-0,d1[1]-0,d1[2]-0);},'dateAdd':function(type,val){var _y=this.getFullYear();var _m=this.getMonth();var _d=this.getDate();var _h=this.getHours();var _n=this.getMinutes();var _s=this.getSeconds();switch(type){case'y':this.setFullYear(_y+val);break;case'm':this.setMonth(_m+val);break;case'd':this.setDate(_d+val);break;case'h':this.setHours(_h+val);break;case'n':this.setMinutes(_n+val);break;case's':this.setSeconds(_s+val);break;}return this;},'format':function(format){if(isNaN(this))return'';var o={'m+':this.getMonth()+1,'d+':this.getDate(),'h+':this.getHours(),'n+':this.getMinutes(),'s+':this.getSeconds(),'S':this.getMilliseconds(),'W':["日","一","二","三","四","五","六"][this.getDay()],'q+':Math.floor((this.getMonth()+3)/3)};if(format.indexOf('am/pm')>=0){format=format.replace('am/pm',(o['h+']>=12)?'下午':'上午');if(o['h+']>=12)o['h+']-=12;}if(/(y+)/.test(format)){format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));}for(var k in o){if(new RegExp("("+k+")").test(format)){format=format.replace(RegExp.$1,RegExp.$1.length==1?o[k]:("00"+o[k]).substr((""+o[k]).length));}}return format;}});})(jQuery);
// --------------------------------
// jQuery extend - jquery.cookie.js
// --------------------------------
(function($){if(!$)return;$.cookie = function(name,value,options){if(typeof value!='undefined'){options=$.extend({},options);if(value===null){value='';options.expires=-1}var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000))}else{date=options.expires}expires='; expires='+date.toUTCString()}var path=options.path?'; path='+(options.path):'';var domain=options.domain?'; domain='+(options.domain):'';var secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('')}else{var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break}}}return cookieValue}};})(jQuery);
// --------------------------------
// jQuery extend - jquery.ajaxq-0.0.1.js
// --------------------------------
(function($){if(!$)return;$.ajaxq = function(queue,options){if(typeof document.ajaxq=="undefined")document.ajaxq={q:{},r:null};if(typeof document.ajaxq.q[queue]=="undefined")document.ajaxq.q[queue]=[];if(typeof options!="undefined"){var optionsCopy={};for(var o in options)optionsCopy[o]=options[o];options=optionsCopy;var originalCompleteCallback=options.complete;options.complete=function(request,status){document.ajaxq.q[queue].shift();document.ajaxq.r=null;if(originalCompleteCallback)originalCompleteCallback(request,status);if(document.ajaxq.q[queue].length>0)document.ajaxq.r=jQuery.ajax(document.ajaxq.q[queue][0])};document.ajaxq.q[queue].push(options);if(document.ajaxq.q[queue].length==1)document.ajaxq.r=YM.dataproxy.ajax(options)}else{if(document.ajaxq.r){document.ajaxq.r.abort();document.ajaxq.r=null}document.ajaxq.q[queue]=[]}};})(jQuery);
// --------------------------------
// jQuery extend      jQuery方法扩展
// --------------------------------
(function($){if(!$)return;$.extend($.browser,{'isIE6':($.browser.msie&&$.browser.version==6)?true:false,'IEMode':(function(){if($.browser.msie){if(document.documentMode){return document.documentMode;}if(document.compatMode&&document.compatMode=='CSS1Compat'){return 7;}return 5;}return 0;})(),'isIPad':(/iPad/i).test(navigator.userAgent),'language':(navigator.language||navigator.userLanguage||'').toLowerCase()});$.fn.tagName=function(){if(this.length==0)return'';if(this.length>1){var tagNames=[];this.each(function(i,el){tagNames.push(el.tagName.toLowerCase());});return tagNames;}else{return this[0].tagName.toLowerCase();}};$.fn.attrJSON=function(attr){return(this.attr(attr||'rel')||'').parseAttrJSON();};$.fn.bindJqueryUI=function(action,params){if(this.size()==0)return this;var elm=this;YM.load('jqueryui',function(){elm[action](params);});return this;};$.fn.bindYMUI=function(type,params,file){if(this.size()==0||!YM)return this;if(YM.ui&&YM.ui[type]){YM.ui[type](this,params);this.data(type+'-binded',true);}else{this.bindYMUIExtend(file||'ui',type,params);}return this;};$.fn.bindYMUIExtend=function(file,type,params){if(this.size()==0||!YM)return this;var elm=this;YM.load(file,function(){setTimeout(function(){if(!YM.ui[type])return;YM.ui[type](elm,params);elm.data(type+'-binded',true);},200);});return this;};})(jQuery);
// --------------------------------
// YM core:        YM.js基本方法定义
// --------------------------------
(function($){if(!$)return;if(!window.YM)window.YM={};YM.namespace=function(name,sep){var s=name.split(sep||'.'),d={},o=function(a,b,c){if(c<b.length){if(!a[b[c]]){a[b[c]]={};}d=a[b[c]];o(a[b[c]],b,c+1);}};o(window,s,0);return d;};YM.debugMode=false;YM.debugIndex=0;YM.debug=function(a,b){if(!this.debugMode)return;if(typeof(console)=='undefined'){YM.debug.log(((Date.prototype.format)?(new Date()).format('hh:nn:ss.S'):(++YM.debugIndex))+', '+a+' = '+b);}else{if(console&&console.log)console.log(((Date.prototype.format)?(new Date()).format('hh:nn:ss.S'):(++YM.debugIndex))+', '+a,'=',b);}};YM.debug.log=function(){this.createDOM();var p=[],v=$('#_ym_debuglog textarea').val();for(var i=0;i<arguments.length;i++){p.push(arguments[i]);}v+=(v==''?'':'\n')+p.join(' ');$('#_ym_debuglog textarea').val(v);};YM.debug.clear=function(){$('#_ym_debuglog textarea').val('');};YM.debug.createDOM=function(){if($('#_ym_debuglog').size()==0){var _html='<div id="_ym_debuglog" style="position:fixed;bottom:0;left:0;right:0;_position:absolute;_bottom:auto;_top:0;padding:5px 0 5px 5px;border:solid 5px #666;background:#eee;z-index:1000;"><textarea style="font-size:12px;line-height:16px;display:block;background:#eee;border:none;width:100%;height:80px;"></textarea><a style="text-decoration:none;display:block;height:80px;width:20px;text-align:center;line-height:16px;padding:5px 0;_padding:6px 0;background:#666;color:#fff;position:absolute;right:-5px;bottom:0;" href="#">关闭调试器</a></div>';$('body').append(_html);$('#_ym_debuglog a').click(function(){$(this).parent().remove();return false;});$('#_ym_debuglog textarea').focus(function(){this.select();});}};YM.load=function(service,action,params){if($.isArray(service)){var url=service.join(',');var urlsize=service.length;var status=YM.loader.checkFileLoader(url);if(status==urlsize+1){if(typeof(action)=='function')action();}else if(status>0){YM.loader.addExecute(url,action);}else if(status==0){YM.loader.addExecute(url,action);YM.loader.fileLoader[url]=1;YM.debug('开始加载JS',url);for(var i=0;i<urlsize;i++){YM.load(service[i],function(){YM.loader.fileLoader[url]++;if(YM.loader.fileLoader[url]==urlsize+1){YM.debug('完成加载JS',url);YM.loader.execute(url);}});}}}else if(YM.loader.serviceLibs[service]&&YM.loader.serviceLibs[service].requires){YM.load(YM.loader.serviceLibs[service].requires,function(){YM.load.run(service,action,params);});}else{YM.load.run(service,action,params);}};YM.load.version='';YM.load.add=function(key,data){if(YM.loader.serviceLibs[key])return;if(data.js&&(!data.js.startWith('http'))&&this.version){data.js=data.js.addQueryValue('v',this.version);}if(data.css&&(!data.css.startWith('http'))&&this.version){data.css=data.css.addQueryValue('v',this.version);}YM.loader.serviceLibs[key]=data;};YM.load.setPath=function(path){YM.loader.serviceBase=path;};YM.load.run=function(service,act,params){var action=(typeof(act)=='string')?(function(){try{var o=eval('YM.'+service);if(o&&o[act])o[act](params);}catch(e){}}):(act||function(){});if(YM.loader.checkService(service)){action();return;}var url=YM.loader.getServiceUrl(service);var status=YM.loader.checkFileLoader(url);if(status==2){action();}else if(status==1){YM.loader.addExecute(url,action);}else if(status==0){if($('script[src="'+url+'"]').size()>0){YM.loader.fileLoader[url]=2;action();}else{YM.loader.addExecute(url,action);YM.loader.addScript(service);}}else{YM.debug('加载异常',service);}};YM.loader={};YM.loader.fileLoader={};YM.loader.executeLoader={};YM.loader.serviceBase=(function(){return $('script:last').attr('src').sliceBefore('/js/')+'/';})();YM.loader.serviceLibs={};YM.loader.checkFullUrl=function(url){return(url.indexOf('/')==0||url.indexOf('http://')==0);};YM.loader.checkService=function(service){if(this.checkFullUrl(service))return false;try{if(service.indexOf('.')>0){var o=eval('YM.'+service);return(typeof(o)!='undefined');}return false;}catch(e){return false;}};YM.loader.checkFileLoader=function(url){return(url!='')?(this.fileLoader[url]||0):-1;};YM.loader.getServiceUrl=function(service){var url='';if(this.checkFullUrl(service)){url=service;}else if(this.serviceLibs[service]){url=(this.checkFullUrl(this.serviceLibs[service].js))?this.serviceLibs[service].js:(this.serviceBase+this.serviceLibs[service].js);}return url;};YM.loader.execute=function(url){if(this.executeLoader[url]){for(var i=0;i<this.executeLoader[url].length;i++){this.executeLoader[url][i]();}this.executeLoader[url]=null;}};YM.loader.addExecute=function(url,action){if(typeof(action)!='function')return;if(!this.executeLoader[url])this.executeLoader[url]=[];this.executeLoader[url].push(action);};YM.loader.addScript=function(service){var this_=this;if(this.checkFullUrl(service)){var url=service;this.getScript(url,function(){this_.fileLoader[url]=2;YM.debug('完成加载JS',url);YM.loader.execute(url);});}else if(this.serviceLibs[service]){if(this.serviceLibs[service].css){var url=(this.checkFullUrl(this.serviceLibs[service].css))?this.serviceLibs[service].css:(this.serviceBase+this.serviceLibs[service].css);if(!this.fileLoader[url]){$('head').append('<link rel="stylesheet" type="text\/css"  href="'+url+'" \/>');this.fileLoader[url]=1;YM.debug('开始加载CSS',url);}}if(this.serviceLibs[service].js){var url=(this.checkFullUrl(this.serviceLibs[service].js))?this.serviceLibs[service].js:(this.serviceBase+this.serviceLibs[service].js);this.getScript(url,function(){this_.fileLoader[url]=2;YM.debug('完成加载JS',url);YM.loader.execute(url);});}}};YM.loader.getScript=function(url,onSuccess,onError){this.getRemoteScript(url,onSuccess,onError);this.fileLoader[url]=1;YM.debug('开始加载JS',url);};YM.loader.getRemoteScript=function(url,param,onSuccess,onError){if($.isFunction(param)){onError=onSuccess;onSuccess=param;param={};}var head=document.getElementsByTagName("head")[0];var script=document.createElement("script");script.type='text/javascript';script.src=url;for(var item in param){if(item=='keepScriptTag'){script.keepScriptTag=true;}else{script.setAttribute(item,param[item]);}}script.onload=script.onreadystatechange=function(){if(!this.readyState||this.readyState=="loaded"||this.readyState=="complete"){if(onSuccess)onSuccess();script.onload=script.onreadystatechange=null;if(!script.keepScriptTag)head.removeChild(script);}};script.onerror=function(){if(onError)onError();};head.appendChild(script);};YM.timestat={};YM.timestat.libs={};YM.timestat.loadTime=(typeof(_ym_page_loadtime)=='number')?_ym_page_loadtime:new Date().getTime();YM.timestat.add=function(name){this.libs[name]=new Date().getTime()-this.loadTime;};YM.timestat.get=function(name){return this.libs[name]||0;};YM.lang={};YM.lang.language='zh-cn';YM.lang.text={};YM.lang.get=function(dataset,name){if(name){if(this.text[dataset]){return this.text[dataset][name]||'';}else{return'';}}else{return this.text[dataset]||null;}};YM.lang.set=function(dataset,name,value){if(!this.text[dataset]){this.text[dataset]={};}if(value){this.text[dataset][name]=value;}else{this.text[dataset]=name;}};YM.lang.extend=function(dataset,data){if(!this.text[dataset]){this.text[dataset]={};}$.extend(this.text[dataset],data);};})(jQuery);
// --------------------------------
// YM.json          JSON数据内容处理
// --------------------------------
(function($){if(!$||!window.YM)return;YM.namespace('YM.json');YM.json.parse=function(data){return(new Function("return "+data))();};YM.json.stringify=function(obj){var m={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},s={'array':function(x){var a=['['],b,f,i,l=x.length,v;for(i=0;i<l;i+=1){v=x[i];f=s[typeof v];if(f){v=f(v);if(typeof v=='string'){if(b){a[a.length]=','}a[a.length]=v;b=true}}}a[a.length]=']';return a.join('')},'boolean':function(x){return String(x)},'null':function(x){return'null'},'number':function(x){return isFinite(x)?String(x):'null'},'object':function(x){if(x){if(x instanceof Array){return s.array(x)}var a=['{'],b,f,i,v;for(i in x){v=x[i];f=s[typeof v];if(f){v=f(v);if(typeof v=='string'){if(b){a[a.length]=','}a.push(s.string(i),':',v);b=true}}}a[a.length]='}';return a.join('')}return'null'},'string':function(x){if(/["\\\x00-\x1f]/.test(x)){x=x.replace(/([\x00-\x1f\\"])/g,function(a,b){var c=m[b];if(c){return c}c=b.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16)})}return'\"'+x+'\"'}};return s.object(obj);};})(jQuery);
// --------------------------------
// YM.cookie         网站Cookie处理
// --------------------------------
(function($){if(!$||!window.YM)return;YM.namespace('YM.cookie');YM.cookie.getRootDomain=function(){var domain=document.domain;if(domain.indexOf('.')>0&&!YM.valid.isIP(domain)){var k=domain.split('.'),d1=k[k.length-1],d2=k[k.length-2],d3=k[k.length-3];domain=(d2=='com'||d2=='net')?(d3+'.'+d2+'.'+d1):(d2+'.'+d1);}return domain;};YM.cookie.get=function(name){var cname=name+'=';var dc=document.cookie;if(dc.length>0){begin=dc.indexOf(cname);if(begin!=-1){begin+=cname.length;end=dc.indexOf(';',begin);if(end==-1)end=dc.length;return unescape(dc.substring(begin,end));}}return'';};YM.cookie.del=function(name,root){var domain=(root)?('; domain='+this.getRootDomain()):'';document.cookie=name+'=; path=/'+domain+'; expires=Thu,01-Jan-70 00:00:01 GMT';};YM.cookie.set=function(name,value,expdate,root){var exp=new Date(),domain=(root)?('; domain='+this.getRootDomain()):'';if(typeof(expdate)=='null'||typeof(expdate)=='undefined'){expdate=365;}exp.setTime(exp.getTime()+(1000*60*60*24*expdate));document.cookie=name+'='+escape(value)+'; path=/'+domain+((expdate==0)?'':('; expires='+exp.toGMTString()));};})(jQuery);
// --------------------------------
// YM.valid         数据校验方法集合
// --------------------------------
(function($){if(!$||!window.YM)return;YM.namespace('YM.valid');YM.valid.isIP=function(str){var re=/^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;return re.test(str);};YM.valid.isUrl=function(str){return(new RegExp(/(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i).test(str.trim()));};YM.valid.isDate=function(str){var result=str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);if(result==null)return false;var d=new Date(result[1],result[3]-1,result[4]);return(d.getFullYear()==result[1]&&d.getMonth()+1==result[3]&&d.getDate()==result[4]);};YM.valid.isTime=function(str){var result=str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);if(result==null)return false;if(result[1]>24||result[3]>60||result[4]>60)return false;return true;};YM.valid.isDateTime=function(str){var result=str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);if(result==null)return false;var d=new Date(result[1],result[3]-1,result[4],result[5],result[6],result[7]);return(d.getFullYear()==result[1]&&(d.getMonth()+1)==result[3]&&d.getDate()==result[4]&&d.getHours()==result[5]&&d.getMinutes()==result[6]&&d.getSeconds()==result[7]);};YM.valid.isInteger=function(str){return(new RegExp(/^(-|\+)?\d+$/).test(str.trim()));};YM.valid.isPositiveInteger=function(str){return(new RegExp(/^\d+$/).test(str.trim()))&&parseInt(str)>0;};YM.valid.isNegativeInteger=function(str){return(new RegExp(/^-\d+$/).test(str.trim()));};YM.valid.isNumber=function(str){return!isNaN(str);};YM.valid.isEmail=function(str){return(new RegExp(/^([_a-zA-Z\d\-\.])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/).test(str.trim()));};YM.valid.isMobile=function(str){return(new RegExp(/^(13|14|15|17|18)\d{9}$/).test(str.trim()));};YM.valid.isPhone=function(str){return(new RegExp(/^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/).test(str.trim()));};YM.valid.isAreacode=function(str){return(new RegExp(/^0\d{2,3}$/).test(str.trim()));};YM.valid.isPostcode=function(str){return(new RegExp(/^\d{6}$/).test(str.trim()));};YM.valid.isLetters=function(str){return(new RegExp(/^[A-Za-z]+$/).test(str.trim()));};YM.valid.isDigits=function(str){return(new RegExp(/^[1-9][0-9]+$/).test(str.trim()));};YM.valid.isAlphanumeric=function(str){return(new RegExp(/^[a-zA-Z0-9]+$/).test(str.trim()));};YM.valid.isValidString=function(str){return(new RegExp(/^[a-zA-Z0-9\s.\-_]+$/).test(str.trim()));};YM.valid.isLowerCase=function(str){return(new RegExp(/^[a-z]+$/).test(str.trim()));};YM.valid.isUpperCase=function(str){return(new RegExp(/^[A-Z]+$/).test(str.trim()));};YM.valid.isChinese=function(str){return(new RegExp(/^[\u4e00-\u9fa5]+$/).test(str.trim()));};YM.valid.isIDCard=function(str){var r15=new RegExp(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/);var r18=new RegExp(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/);return(r15.test(str.trim())||r18.test(str.trim()));};YM.valid.isCardNo=function(str,cardType){var cards={"Visa":{lengths:"13,16",prefixes:"4",checkdigit:true},"MasterCard":{lengths:"16",prefixes:"51,52,53,54,55",checkdigit:true},"BankCard":{lengths:"16,17,19",prefixes:"3,4,5,6,9",checkdigit:false}};if(!cards[cardType])return false;var cardNo=str.replace(/[\s-]/g,"");var cardexp=/^[0-9]{13,19}$/;if(cardNo.length==0||!cardexp.exec(cardNo)){return false;}else{cardNo=cardNo.replace(/\D/g,"");var modTenValid=true;var prefixValid=false;var lengthValid=false;if(cards[cardType].checkdigit){var checksum=0,mychar="",j=1,calc;for(i=cardNo.length-1;i>=0;i--){calc=Number(cardNo.charAt(i))*j;if(calc>9){checksum=checksum+1;calc=calc-10;}checksum=checksum+calc;if(j==1){j=2}else{j=1};}if(checksum%10!=0)modTenValid=false;}if(cards[cardType].prefixes==''){prefixValid=true;}else{var prefix=cards[cardType].prefixes.split(",");for(i=0;i<prefix.length;i++){var exp=new RegExp("^"+prefix[i]);if(exp.test(cardNo))prefixValid=true;}}var lengths=cards[cardType].lengths.split(",");for(j=0;j<lengths.length;j++){if(cardNo.length==lengths[j])lengthValid=true;}if(!modTenValid||!prefixValid||!lengthValid){return false;}else{return true;}}};YM.valid.isLogName=function(str){return(YM.valid.isEmail(str)||YM.valid.isMobile(str));};YM.valid.isRealName=function(str){return/^[A-Za-z \u4E00-\u9FA5]+$/.test(str);};})(jQuery);
// --------------------------------
// YM.page          常用页面方法集合
// --------------------------------
(function($){if(!$||!window.YM)return;YM.namespace('YM.page');YM.page.setHomepage=function(){var url=document.location.href;if(url.match(/_fromid=[\w]*/)){url=url.replace(/_fromid=[\w]*/,'_fromid=userfavorite');}else{url+=((url.indexOf('?')>0)?'&':'?')+'_fromid=userfavorite';}if(document.all){document.body.style.behavior='url(#default#homepage)';document.body.setHomePage(url);}else if(window.sidebar){if(window.netscape){try{netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');}catch(e){alert('该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,\n然后将项 signed.applets.codebase_principal_support 值设为true');}}var prefs=Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBrance);prefs.setCharPref('browser.startup.homepage',url);}};YM.page.addFavor=function(u,t){var url=u||document.location.href,title=t||document.title;if(url.match(/_fromid=[\w]*/)){url=url.replace(/_fromid=[\w]*/,'_fromid=userfavorite');}else{url+=((url.indexOf('?')>0)?'&':'?')+'_fromid=userfavorite';}var ctrlStr=((navigator.userAgent.toLowerCase()).indexOf('mac')!=-1)?'Command/Cmd':'CTRL';if(document.all){window.external.AddFavorite(url,title);}else if(window.sidebar){window.sidebar.addPanel(title,url,'');}else{alert('您可以尝试通过快捷键'+ctrlStr+' + D 加入到收藏夹~');}};YM.page.refresh=function(url){var url=url||document.location.href.sliceBefore('#');document.location.href=url;};YM.page.setDomain=function(){var d=document.domain;if(d.indexOf('.')<0||YM.valid.isIP(d))return;var k=d.split('.'),d1=k[k.length-1],d2=k[k.length-2],d3=k[k.length-3];document.domain=(d2=='com'||d2=='net')?(d3+'.'+d2+'.'+d1):(d2+'.'+d1);};YM.page.keyHandler={};YM.page.keyHandler.events={};YM.page.keyHandler.keys={'ESC':27,'PAGEUP':33,'PAGEDOWN':34,'END':35,'HOME':36,'LEFT':37,'TOP':38,'RIGHT':39,'DOWN':40,'INSERT':45,'DELETE':46,'F1':112,'F2':113,'F3':114,'F4':115,'F5':116,'F6':117,'F7':118,'F8':119,'F9':120,'F10':121,'F11':122,'F12':123};YM.page.keyHandler.add=function(doc,key,eventItem,eventCallback){this.events[eventItem]=function(e){try{var code=e.which||e.keyCode||0;if(code==YM.page.keyHandler.keys[key]){eventCallback();}}catch(err){}};$(doc).bind('keydown',this.events[eventItem]);};YM.page.keyHandler.remove=function(doc,eventItem){$(doc).unbind('keydown',this.events[eventItem]);this.events[eventItem]=null;};YM.page.flash=function(pSwf,pBoxID,pW,pH,pVer,pSetup,pFlashvars,pParams,pAttr){YM.load('swfobject',function(){swfobject.embedSWF(pSwf,pBoxID,pW,pH,pVer,pSetup||false,pFlashvars||false,pParams||false,pAttr||false);});};YM.page.msgtip=function(source,content,param){var param=param||{};param.content=content;YM.load('util-msgtip',function(){new YM.util.msgtip($(source),param);});};YM.page.popbox=function(param){YM.load('util.popbox','show',param);};YM.page.popbox.close=function(){YM.load('util.popbox','close',null);};YM.page.alert=function(message,callback){if(YM.util&&YM.util.dialog&&YM.util.dialog.status){alert(message);if(callback)callback();return false;}else{var params=($.isPlainObject(message))?message:{message:message,callback:callback};YM.load('util.dialog','alert',params);}};YM.page.showSuccess=function(message,callback){var params=($.isPlainObject(message))?message:{message:message,callback:callback};params.type='success';YM.load('util.dialog','alert',params);};YM.page.showError=function(message,callback){var params=($.isPlainObject(message))?message:{message:message,callback:callback};params.type='error';YM.load('util.dialog','alert',params);};YM.page.confirm=function(message,callback,cancel){var params=($.isPlainObject(message))?message:{message:message,callback:callback,cancel:cancel};YM.load('util.dialog','confirm',params);};YM.page.prompt=function(message,callback){var params=($.isPlainObject(message))?message:{message:message,callback:callback};YM.load('util.dialog','prompt',params);};YM.page.showLoading=function(message){var params=($.isPlainObject(message))?message:{loadingText:message};YM.load('util.dialog','showLoading',params);};YM.page.hideLoading=function(){YM.load('util.dialog','close','');};YM.page.dialog=function(params){YM.load('util.dialog','open',params);};YM.page.dialog.pop=function(params){YM.load('util.dialog','pop',params);};YM.page.dialog.poptab=function(tabs,width,height){var params=tabs[0];$.extend(params,{tabs:tabs,width:width,height:height});YM.load('util.dialog','pop',params);};YM.page.dialog.show=function(params){YM.load('util.dialog','show',params);};YM.page.dialog.ajax=function(params){YM.load('util.dialog','ajax',params);};YM.page.dialog.form=function(frm,title,width,height){var frameId='frame'+(new Date()).getTime();var tmpl='<iframe id="{frameId}" name="{frameId}" src="about:blank" width="100%" height="100%" scrolling="auto" frameborder="0" marginheight="0" marginwidth="0"></iframe>';var params={};params.title=title;params.width=width;params.height=height;params.content=tmpl.substitute({frameId:frameId});params.callback=function(){frm.target=frameId;frm.submit();};YM.page.dialog(params);return false;};YM.page.closeDialog=function(){YM.load('util.dialog','close','');};YM.page.dialog.setContent=function(html){YM.load('util.dialog',function(){YM.util.dialog.setContent(html);YM.util.dialog.setAutoHeight();});};YM.page.dialog.setConfig=function(attr,value){YM.load('util.dialog',function(){YM.util.dialog[attr]=value;});};})(jQuery);
// --------------------------------
// YM.login         快速登录弹窗处理
// --------------------------------
(function($){if(!$||!window.YM){return}YM.namespace("YM.login");YM.login.servicePath="/";YM.login.serviceAPI={"login":"portal/toLogin.jspa","register":"inc/register.jsp","others":"portal/toNoMemberBuyLogin.jspa","headinfo":"top/jsonHeaderInfoWithCart.jspa?callback=?"};YM.login.setServicePath=function(path){this.servicePath=path};YM.login.loadTime=new Date().getTime();YM.login.headData={};YM.login.userData={};YM.login.getUserInfo=function(callback){this.addEvent(callback);this.loadUserInfo()};YM.login.loadUserInfo=function(callback){var callback=callback||function(){YM.login.exeEvents()};this.loadTime=new Date().getTime();$.getJSON(this.servicePath+this.serviceAPI.headinfo,function(data){YM.login.headData=data;YM.login.userData={};if(data.memberInfo){YM.login.userData=data.memberInfo;YM.login.userData.nickName=YM.login.userData.nickName||YM.login.userData.logName;YM.login.userData.isLogin=true}callback(YM.login.userData,YM.login.headData);if(YM.login.userData.isLogin){YM.login.clearEvents()}})};YM.login.checkUserStatus=function(){var m=(new Date().getTime()-this.loadTime)/60000;if(this.userData.isLogin&&m<5){return true}return false};YM.login.events=[];YM.login.addEvent=function(callback){if(callback){this.events.push(callback)}};YM.login.exeEvents=function(){for(var i=0;i<this.events.length;i++){this.events[i](this.userData,this.headData)}};YM.login.clearEvents=function(){this.events=[]};YM.login.pop=function(param,callback){if(!callback){callback=param;param={}}param.pagetype="pop";this.callback=function(){};if($.isFunction(callback)){this.callback=callback}else{if(typeof(callback)=="string"&&callback!=""){this.callback=function(){document.location.href=callback}}}if(this.checkUserStatus()){this.callback(this.userData,this.headData)}else{this.loadUserInfo(function(userData,headData){if(userData.isLogin){YM.login.callback(userData,headData)}else{YM.login.dialog(param)}})}return false};YM.login.dialog=function(param){if(this.servicePath!="/"){YM.page.setDomain();param.crossdomain=true}if(location.pathname=="/cart4/showCart.jspa"||location.pathname=="/cart2/showCart.jspa"){YM.page.dialog.poptab([{title:"登&nbsp;&nbsp;录",url:this.servicePath+this.serviceAPI.login+"?"+$.param(param)},{title:"快速注册",url:this.servicePath+this.serviceAPI.register+"?"+$.param(param)},{title:"快速购买",url:this.servicePath+this.serviceAPI.others+"?"+$.param(param)}],400,400)}else{YM.page.dialog.poptab([{title:"登&nbsp;&nbsp;录",url:this.servicePath+this.serviceAPI.login+"?"+$.param(param)},{title:"快速注册",url:this.servicePath+this.serviceAPI.register+"?"+$.param(param)}],400,400)}this.status=true;this.success=function(){YM.page.closeDialog();YM.login.addEvent(YM.login.callback);YM.login.status=false;YM.login.getUserInfo()}};YM.login.success=function(url){document.location.href=url};YM.login.status=false})(jQuery);
// --------------------------------
// YM.dataproxy     跨域数据代理服务
// --------------------------------
(function($){if(!$||!window.YM)return;YM.namespace('YM.dataproxy');YM.dataproxy.loaders=[];YM.dataproxy.add=function(callback){if(this.j$){callback(this.j$);return;}if(this.loaders.length==0){YM.page.setDomain();var url = "//www.yesmywine.com/inc/domainProxy.jsp?crossdomain=true&currentUrl="+document.location.href;$('body').append('<iframe name="dataProxy" id="dataProxy" src="'+url+'" width="0" height="0" style="display:none;"></iframe>');}this.loaders.push(callback);};YM.dataproxy.setJquery=function(j$){this.j$=j$;for(var i=0;i<this.loaders.length;i++){this.loaders[i](this.j$);}this.loaders=[];};YM.dataproxy.ajax=function(params){if(YM.login.servicePath=='/'){$.ajax(params);}else{this.add(function(j$){j$.ajax(params);});}};YM.dataproxy.get=function(url,params,success,type){if(YM.login.servicePath=='/'){$.get(url,params,success,type);}else{this.add(function(j$){j$.get(url,params,success,type);});}};YM.dataproxy.getJSON=function(url,params,success){if(YM.login.servicePath=='/'){$.getJSON(url,params,success);}else{this.add(function(j$){j$.getJSON(url,params,success);});}};YM.dataproxy.post=function(url,params,success,type){if(YM.login.servicePath=='/'){$.post(url,params,success,type);}else{this.add(function(j$){j$.post(url,params,success,type);});}};})(jQuery);
// --------------------------------
// YM init          页面设置和初始化
// --------------------------------
(function($) {
	if (!$ || !window.YM) return;
	// ----------------------------
	YM.load.version = '130425';
	YM.load.add('ui',				{ js:'js/ym/ym.ui.js' });
	YM.load.add('util-msgtip',		{ js:'js/ym/util/msgtip.js', css:'js/ym/util/msgtip.css' });
	YM.load.add('util.overlayer',	{ js:'js/ym/util/overlayer.js' });
	YM.load.add('util.popbox',		{ js:'js/ym/util/popbox.js', requires:'util.overlayer' });
	YM.load.add('util.dialog',		{ js:'js/ym/util/dialog.js', css:'js/ym/util/dialog.css', requires:'util.overlayer' });
	YM.load.add('lhgcalendar',		{ js:'js/lib/lhgcalendar/new.lhgcalendar.min.js' });
	YM.load.add('jqueryui',			{ js:'js/lib/jquery-ui-1.8.16.custom.min.js' });
	YM.load.add('swfobject',		{ js:'js/lib/swfobject.js' });
	// ----------------------------
	YM.page.init = function() {
		$('.e-loadmvc').bindYMUI('LoadMVC');
		$('.e-loadevt').bindYMUI('LoadElementEvent');
		YM.timestat.add('page-init');
		YM.debug('page', '开始初始化');
		// 解决IE6下默认不缓存背景图片的bug
		if ($.browser.isIE6) try { document.execCommand('BackgroundImageCache', false, true); } catch(e) {}
	};
	$(function() { YM.page.init(); });
	// ----------------------------
	YM.timestat.add('load-ym');
	YM.debug('ym.js', '加载完成');
})(jQuery);