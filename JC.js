(function(a){if(window.JC&&typeof JC.PATH!="undefined"){return}window.JC={PATH:"/js",compsDir:"/comps/",bizsDir:"/bizs/",pluginsDir:"/plugins/",debug:false,use:function(k){if(!k){return}var b=this,d=[],i=a.trim(k).split(/[\s]*?,[\s]*/),l=/\:\/\//,f=/(\\)\1|(\/)\2/g,g=/[\/\\]/,c=/^comps\./,j=/^Bizs\./,m=/^bizs\./,e=/^Plugins\./,h=/^plugins\./;i=JC._usePatch(i,"Form","AutoSelect");a.each(i,function(r,p){var o=!g.test(p),q,n=/^\//.test(p);if(o&&window.JC[p]){return}if(JC.FILE_MAP&&JC.FILE_MAP[p]){d.push(JC.FILE_MAP[p]);return}q=p;if(o){if(j.test(q)){q=printf("{0}{1}{2}/{2}.js",JC.PATH,JC.bizsDir,p.replace(j,""))}else{if(m.test(q)){q=printf("{0}{1}{2}.js",JC.PATH,JC.bizsDir,p.replace(m,""))}else{if(e.test(q)){q=printf("{0}{1}{2}/{2}.js",JC.PATH,JC.pluginsDir,p.replace(e,""))}else{if(h.test(q)){q=printf("{0}{1}{2}.js",JC.PATH,JC.pluginsDir,p.replace(h,""))}else{if(c.test(q)){q=printf("{0}{1}{2}.js",JC.PATH,JC.compsDir,p.replace(c,""))}else{q=printf("{0}{1}{2}/{2}.js",JC.PATH,JC.compsDir,p)}}}}}}!o&&!n&&(q=printf("{0}/{1}",JC.PATH,p));if(/\:\/\//.test(q)){q=q.split("://");q[1]=a.trim(q[1].replace(f,"$1$2"));q=q.join("://")}else{q=a.trim(q.replace(f,"$1$2"))}if(JC._USE_CACHE[q]){return}JC._USE_CACHE[q]=1;d.push(q)});JC.log(d);!JC.enableNginxStyle&&JC._writeNormalScript(d);JC.enableNginxStyle&&JC._writeNginxScript(d)},_usePatch:function(h,m,f){var e,d,c,b,g;for(e=0,d=h.length;e<d;e++){if((a.trim(h[e].toString())==m)){g=true;break}}g&&!JC[f]&&h.unshift(f);return h},log:function(){JC.debug&&window.console&&console.log(sliceArgs(arguments).join(" "))},pathPostfix:"",enableNginxStyle:false,nginxBasePath:"",FILE_MAP:null,_writeNginxScript:function(e){if(!JC.enableNginxStyle){return}for(var d=0,c=e.length,f=[],b=[];d<c;d++){JC.log(e[d].slice(0,JC.nginxBasePath.length).toLowerCase(),JC.nginxBasePath.toLowerCase());if(e[d].slice(0,JC.nginxBasePath.length).toLowerCase()==JC.nginxBasePath.toLowerCase()){f.push(e[d].slice(JC.nginxBasePath.length))}else{b.push(e[d])}}var g=JC.pathPostfix?"?v="+JC.pathPostfix:"";f.length&&document.write(printf('<script src="{0}??{1}{2}"><\/script>',JC.nginxBasePath,f.join(","),g));b.length&&JC._writeNormalScript(b)},_writeNormalScript:function(d){var f=JC.pathPostfix?"?v="+JC.pathPostfix:"";for(var c=0,b=d.length,e;c<b;c++){e=d[c];JC.pathPostfix&&(e=add_url_params(e,{v:JC.pathPostfix}));d[c]=printf('<script src="{0}"><\/script>',e)}d.length&&document.write(d.join(""))},_USE_CACHE:{}};window.UXC=window.JC;JC.PATH=script_path_f();/\/JQueryComps_dev\//i.test(location.href)&&!(/file\:/.test(location.href)||/\\/.test(location.href))&&(JC.PATH="/ignore/JQueryComps_dev/");window.Bizs=window.Bizs||{}}(jQuery));