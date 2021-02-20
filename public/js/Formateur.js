$(function(){
    $(".modif").hide();                            
    var x=0;    
    $("#aj").hide();
    $("#plus").click(function(){ $("#aj").toggle();if (x == 0) { $("#plus").val("-"); x=1; } else { $("#plus").val("+"); x=0; }});        
    $('.mask-date').mask('00/00/0000');
    $('.mask-phone').mask('00-00-00-00-00');
    $('.mask-number').mask('00,00');
    $('.mask-number1').mask('00');
    if( $("#page").text() == "mod"){charger_modules();}
    else{  $('#datatables-example').DataTable(); }
    $.ajaxSetup({ beforeSend: function(xhr, type) {if (!type.crossDomain) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));}},});    
});
function valider_parametres(){
    $.post("modifier_parametre",
        {   old:$("#old").val(),
            confirm:$("#confirm").val()
        },
        function(response){
            charger_modules(); 
            if(response = '1'){ $("#msg").css('color','green');$("#msg").fadeIn(4000);$("#msg").html('Opération éffectuer.');$("#msg").fadeOut(4000); }
            else{ $("#msg").css('color','red');$("#msg").fadeIn(4000);$("#msg").html('Opération échouée.');$("#msg").fadeOut(4000);}
    });
}
// Chargement de la page des modules
function charger_modules(){
    $.get("modules_load", { },function(response){ 
        $("#rows").text(''); var data = $.parseJSON(response);
        $.each(data,function(i,value){ $("#rows").append("<tr><td>"+data[i].intitule+"</td><td>"+data[i].date_s+"</td><td>"+data[i].dure+"</td><td>"+data[i].contenu+"</td><td>"+data[i].effectif+"</td></tr>");});
        $('#datatables-example').DataTable();
    });
}
// Ajouter une sequence
function store_sequence(){
    $(".cssload-container").css("display","block");  
    $.post("sequence_store",
        {   module:$("#module option:selected").val(),
            date:$("#date").val(), 
            dure:$("#dure option:selected").val(),
            contenu:$("#contenu").val(), 
            effectif:$("#effectif").val() 
        },
        function(response){
            charger_modules(); 
            if(response = '1'){ $("#msg").css('color','green');$("#msg").fadeIn(4000);$("#msg").html('Opération éffectuer.');$("#msg").fadeOut(4000); }
            else{ $("#msg").css('color','red');$("#msg").fadeIn(4000);$("#msg").html('Opération échouée.');$("#msg").fadeOut(4000);}
    });
    $(".cssload-container").css("display","none");           
}

