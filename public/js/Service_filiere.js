$.ajaxSetup({ beforeSend: function(xhr, type) { if (!type.crossDomain) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));} },});
charger();
// Chargement de la page des Filieres
function charger(){
    $.get("load_filieres", { },function(response){ 
        $("#rows").text('');var data = $.parseJSON(response);
        $.each(data,function(i,value){ $("#rows").append("<tr id="+data[i].id+"><td>"+data[i].nom+"</td><td>"+data[i].abreviation+"</td><td><button onclick='supprimer_fil("+data[i].id+")'class='btn btn-circle btn-mn btn-danger' value='delete'><span class='fa fa-trash'></span></button></td></tr>");});
        $('#datatables-example').DataTable();
    });
}
// Ajouter une filiere
function ajouter_fil(){
    $(".cssload-container").css("display","block");  
    $.post("fil_store",{nom:$("#content").find("input[name='nom']").val(), abreviation:$("#content").find("input[name='ab']").val() },
        function(response){ 
            if(response = '1'){ $("#msg").css('color','green');$("#msg").fadeIn(4000);$("#msg").html('Opération éffectuer.');$("#msg").fadeOut(4000);}
            else{ $("#msg").css('color','red');$("#msg").fadeIn(4000);$("#msg").html('Opération échouée.');$("#msg").fadeOut(4000);}
            });
    $(".cssload-container").css("display","none");           
}
// Supprimer une filiere
function supprimer_fil(x){
    if (confirm("Voulez-vous supprimer cette filiére ?")) {
        $.post( "fil_delete", {  id:x }, function(response){ if(response = '1'){ $("#"+x).hide(); }else{ alert('Opération échouée.'); }});
    }
}