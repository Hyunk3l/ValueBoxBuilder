/*!
 * ValueBoxBuilder - jQuery form plugin
 * http://www.appbox.it/valueboxbuilder-jquery-plugin
 *
 * Copyright 2011, Fabrizio Di Napoli
 * Licensed under GPL Version 2.
 *
 * Date: 15 Dec 2011
 */

(function($) {
      
 
  $.fn.ValueBox = function(source, destinatary) {
 
      var input_name = destinatary.replace(/[\#.]+/, "");
      var source = $(source);
      var destinatary = $(destinatary);
      
      /* security checking source and destinatary */
      if(source.val()=='' || destinatary==null){
          return false;        
      }
      
      /* checking commas presence */
      var words = source.val().split(/[\,;#]+/);
      
      /* array with all words */
      var existents_words = new Array();
      $.each($(":input[name='vbb_value_"+input_name+"[]']"), function(key, val){      
          existents_words.push(val.value);
      });
            
      /* creating new div */        
        var new_field = "";
                
        $.each(words, function(key, value){ 
            /* cleaning words */
            value = $.trim(value);
            value.replace(/[AZ-az]+/, "");
            if($.inArray(value, existents_words)>-1)
                return true;
            else
                existents_words.push(value);
                     
            new_field +="<div class=\"vbb_box\">";
            new_field +="<div class=\"vbb_del vbb_out\"></div>";
            if(source.find("option:selected").text()!=''){
               new_field += source.find("option:selected").text();
            }else{
               new_field += value; 
            }
            
            new_field +="<input type=\"hidden\" name=\"vbb_value_"+input_name+"[]\" value=\""+value+"\" />";
            new_field +="</div>"; 
        });
        
        destinatary.prepend(new_field);

        /* binding onmouseover */       
        $(".vbb_box").mouseover(function(){
            $(this).find(".vbb_del").attr("class", "vbb_del vbb_over");
        });
        
        /* binding onmouseout */
        $(".vbb_box").mouseout(function(){
            $(this).find(".vbb_del").attr("class", "vbb_del vbb_out");
        });
        
        /* binding delete */
        $(".vbb_del").click(function(){
            $(this).parent().remove();
        });
        
        /* deleting old contents */
        source.val("");
 
  };
 
})(jQuery);