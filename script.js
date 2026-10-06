(function(){
  // ===== Countdown: 25 April 2028 00:00 WIB =====
  var target=new Date('2028-04-25T00:00:00+07:00').getTime();
  var el={d:document.getElementById('days'),h:document.getElementById('hours'),m:document.getElementById('minutes'),s:document.getElementById('seconds')};
  function pad(n,l){return String(n).padStart(l,'0')}
  function tick(){
    var t=Math.max(0,target-Date.now());
    el.d.textContent=pad(Math.floor(t/864e5),3);
    el.h.textContent=pad(Math.floor(t%864e5/36e5),2);
    el.m.textContent=pad(Math.floor(t%36e5/6e4),2);
    el.s.textContent=pad(Math.floor(t%6e4/1e3),2);
  }
  tick();setInterval(tick,1000);

  // ===== Musik latar: autoplay, loop selamanya =====
  var a=document.getElementById('bgm'),splash=document.getElementById('splash');
  a.loop=true;a.volume=0.85;
  function hideSplash(){splash.classList.add('hide');setTimeout(function(){splash.style.display='none'},700)}
  function play(){
    var p=a.play();
    if(p&&p.then){p.then(function(){hideSplash()}).catch(function(){})}
  }
  // 1) coba autoplay langsung
  play();
  // 2) browser memblokir suara sebelum interaksi: ketukan pertama (di mana saja) memulai musik
  ['click','touchend','keydown','pointerdown','scroll'].forEach(function(ev){
    window.addEventListener(ev,function once(){
      if(a.paused)play();else hideSplash();
      if(!a.paused)window.removeEventListener(ev,once);
    },{passive:true});
  });
  document.getElementById('enter').addEventListener('click',play);
  // 3) tidak pernah berhenti: nyalakan lagi bila terjeda/selesai/kembali ke tab
  a.addEventListener('ended',function(){a.currentTime=0;a.play()});
  a.addEventListener('pause',function(){if(!document.hidden)setTimeout(function(){a.play().catch(function(){})},150)});
  document.addEventListener('visibilitychange',function(){if(!document.hidden&&a.paused)play()});
  setInterval(function(){if(a.paused&&splash.classList.contains('hide'))a.play().catch(function(){})},3000);
})();
