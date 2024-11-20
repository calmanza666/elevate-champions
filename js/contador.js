function contador(fecha, elemento, abrevia=false){
    const [dia, mes, anio, hora, minutos] = fecha.split(/[/ :]/);
    const timestamp = new Date(`${anio}-${mes}-${dia}T${hora}:${minutos}`).getTime();
    var countDownDate = new Date(timestamp).getTime();
    var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    if(abrevia) {
        document.getElementById(elemento).innerHTML = '<div class=col-3><div class="item_count text-center dias"><h3>'+days+'</h3><p>Días</div></div><div class=col-3><div class="item_count text-center horas"><h3>'+hours+'</h3><p>Hrs</div></div><div class=col-3><div class="item_count text-center minutos"><h3>'+minutes+'</h3><p>Min</div></div><div class=col-3><div class="item_count text-center segundos"><h3>'+seconds+'</h3><p>Seg</div></div>';
    }else{
        document.getElementById(elemento).innerHTML = '<div class=col-3><div class="item_count text-center dias"><h3>'+days+'</h3><p>Días</div></div><div class=col-3><div class="item_count text-center horas"><h3>'+hours+'</h3><p>Horas</div></div><div class=col-3><div class="item_count text-center minutos"><h3>'+minutes+'</h3><p>Minutos</div></div><div class=col-3><div class="item_count text-center segundos"><h3>'+seconds+'</h3><p>Segundos</div></div>';
    }
    
    if (distance < 0) {
        clearInterval(x);
        //document.getElementById("reloj_torneo").innerHTML = "EXPIRED";
    }
    }, 1000);
}
