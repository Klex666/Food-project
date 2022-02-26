function timer (id, deadline) {

   function getTimeRemaining(endtime) {
     const t = Date.parse(endtime) - Date.parse(new Date());

     const days = Math.floor( (t/(1000*60*60*24)) );
     const seconds = Math.floor( (t/1000) % 60 );
     const minutes = Math.floor( (t/1000/60) % 60 );
     const hours = Math.floor( (t/(1000*60*60) % 24) );

     return { 
        'total': t,
        'days': days,
        'seconds': seconds,
        'minutes': minutes,
        'hours': hours
     };
   }

   function correct(num) {
       if (num >= 0 && num < 10) {
           return '0' + num;
       } else {
           return num;
       }
   }

   function setClock(selector, endtime) {
       const timer = document.querySelector(selector),
             days = timer.querySelector('#days'),
             seconds = timer.querySelector('#seconds'),
             minutes = timer.querySelector('#minutes'),
             hours = timer.querySelector('#hours'),
             timeInterval = setInterval(updateClock, 1000);

    updateClock();

     function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = correct(t.days);
        hours.innerHTML = correct(t.hours);
        minutes.innerHTML = correct(t.minutes);
        seconds.innerHTML = correct(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
     }        
   }

   setClock(id, deadline);

}

export default timer;