$(function(){
    $(".cssload-container").css("display","none");               
    $(".modif").hide();                        
    var x=0;    
    $("#aj").hide();
    $("#plus").click(function(){
        $("#aj").toggle();  
        $("#modif").hide();                  
        if (x == 0) { $("#plus").val("-"); x=1; }
        else { $("#plus").val("+"); x=0; }
    });        
    $('.mask-date').mask('00/00/0000');
    $('.mask-phone').mask('00-00-00-00-00');
    $('.mask-number').mask('000');
    $('.mask-number2').mask('00,00');
    $('.mask-number1').mask('00');
});
// Supprimer utilisateur
function delete_user(x){
    $.ajaxSetup({ beforeSend: function(xhr, type) { if (!type.crossDomain) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));} },});    
    if (confirm("Voulez-vous supprimer ce formateur ?")) {
        $.post( "user_delete",  {  id:x } , function(response){ if(response = '1'){ $("#"+x).hide(); } else{ alert('Opération échouée.');}});
    }
}
// Modifier les paramétres du service
function valider_parametres(){
    $.ajaxSetup({ beforeSend: function(xhr, type) { if (!type.crossDomain) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));} },});
    $(".cssload-container").css("display","block");
    $.post("parametre_update",
        {   cin:$("#cin").val(), 
            name:$("#name").val(), 
            prenom:$("#prenom").val(), 
            email:$("#email").val(),             
            tele:$("#tele").val(), 
            sexe:$("#sexe option:selected").val(),
            last:$("#last").val(), 
            new:$("#new").val()            
        },
        function(response){ 
            if(response = '1'){ $("#msg").fadeIn(4000);$("#msg").html('Opération éffectuer.');$("#msg").fadeOut(4000);$("#msg").css('color','green');                             }
            else{ $("#msg").fadeIn(4000);$("#msg").html('Opération échouée.');$("#msg").fadeOut(4000);$("#msg").css('color','red');}
        });
    $(".cssload-container").css("display","none");
}