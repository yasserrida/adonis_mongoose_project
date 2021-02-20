jQuery(document).ready(function($){
    $.ajaxSetup({ beforeSend: function(xhr, type) { if (!type.crossDomain) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));} },});
    if( $(".page").text() == '1'){ notes(); } else{ if($(".page").text() == '2') { cours(); } else{  if($(".page").text() == '3') {  } else {load($("#id").val()); } } } 
});
// chargement de la page
function load(x){
    $.post("/api/get_user", {  id:x },
    function(data){ 
        $('#nom').val(data.name); $('.nom').css('display','block'); $('#nom').css('display','block'); 
        $('#prenom').val(data.prenom); $('.prenom').css('display','block'); $('#prenom').css('display','block'); 
        $('#adress').val(data.adress); $('.adress').css('display','block'); $('#adress').css('display','block');
        $('#tele').val(data.tele); $('.tele').css('display','block'); $('#tele').css('display','block'); 
        $('#date_n').val(data.date_n); $('.date_n').css('display','block'); $('#date_n').css('display','block'); 
        $('#lieu_n').val(data.lieu_n); $('.lieu_n').css('display','block'); $('#lieu_n').css('display','block');
        $('#email').val(data.email); $('.email').css('display','block'); $('#email').css('display','block'); 
        $('#sexe').val('Femme'); $('.sexe').css('display','block'); $('#sexe').css('display','block'); 
        if(data.sexe == 'H'){ $('#sexe').val('Homme'); }
    });
}
// chargement des cours
function cours(){
    $.post("get_cours", { },
    function(response){ 
        var data = $.parseJSON(response);        
        $.each(data,function(i,value){ $('#rows').append("<tr><td>"+data[i].intitule+"</td><td>"+data[i].type+"</td><td><a href='uploads/"+data[i].pdf_file+" '  target='_blank'>"+data[i].nom+"</a></td></tr>");});
    $('#datatables-example').DataTable();        
    });
}
// chargement des notes
function notes(){
    $.post("get_notes", {  },
    function(response){ 
        var data = $.parseJSON(response);
        $.each(data,function(i,value){ $('#rows').append("<tr><td>"+data[i].intitule+"</td><td>"+data[i].num+"</td><td>"+data[i].note+"</td></tr>");});
    $('#datatables-example').DataTable();        
    });
}
// Modifier les paramatéres
function parametre(){
    $.post("change_parametres", {  
        anncien : $('#anncien').val(),
        new : $('#new').val(),
        confirm : $('#confirm').val()
        },
        function(response){ 
            if(response = '1'){ $(".msg").fadeIn(4000);$(".msg").html('Opération éffectuer.');$(".msg").fadeOut(4000);$(".msg").css('color','green');}
            else{ $(".msg").fadeIn(4000);$(".msg").html('Opération échouée.');$(".msg").fadeOut(4000);$(".msg").css('color','red');}        
        }
    );
}