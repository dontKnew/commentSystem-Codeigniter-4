$(document).ready(function(){
    // add comment
    $("#submit").click(function(){
      let comment = $("#comment").val();
      if(comment==''){
          $.notify("comment input is required", "error");         
          return false;
      }
      $.ajax({
          type:"POST",
          url:"http://localhost:8080/",
          data:{"comment":comment},
          success:function(response){
              if(response.status == 'OK'){
                  $("#commentSection").html('');
                  getComment();
                  $("#comment").val('');
                  $.notify("Comment has been Added", "success");         
              }else {
                  $.notify("Error : "+response.status, "warning");         
              }
          },
          errror:function(){
              console.warn("something wrong");
              $.notify("Something wrong", "error");         
          }
      });
    });

    //   get comments
    function getComment(){
      $.ajax({
          type:"GET",
          url:"http://localhost:8080/getComment",
          success:function(response){
              // console.warn(response);
              for(i=0; i < response.data.length; i++) {
                  document.getElementById('commentSection').innerHTML += 
                  '<div class="comment-body form-control my-1">\
                      <div class="d-flex">\
                          <img  src="https://th.bing.com/th/id/OIP.1gKc5uC3sZvJC_98dfC9ogHaHa?pid=ImgDet&rs=1" class="rounded-circle mx-2" width="50px" alt="profile">\
                          <div>\
                              <strong>Sajid Ali </strong>'+
                              '<small> - ' + response.data[i].created_at + ' </small> <br>\
                              <span> ' + response.data[i].comment + '  </span>\
                          </div>\
                      </div>\
                      <small style="margin-left:65px" class="text-primary"> \
                          <span> Like </span> \
                          <span id="replyComment" class="cursor-pointer" data-commentid= "' + response.data[i].id+ '"> Reply </span>\
                      </small> \
                      <div class="my-1" id="replyComments' + response.data[i].id+ '"></div>\
                      <div style="margin-left:60px" class="d-flex justify-content-start visually-hidden" id="showReplyBox' + response.data[i].id+ '">\
                          <input type="text" id="commentReply' + response.data[i].id+ '" class="form-control mx-2" placeholder="Write a reply..."> \
                          <input type="button" id="submitReply" value="Post" data-commentid= "' + response.data[i].id+ '" class="btn btn-warning">\
                      </div>\
                  </div>';
              }       
          },
          errror:function(){
              console.warn("something wrong");
          }
      })  
    };
    getComment();

    
  //   get comments replies
    $(document).on("click", '#replyComment', function(evt){
          let id = $(this).attr('data-commentid');
          if($("#showReplyBox"+id).hasClass('visually-hidden')){
              $("#showReplyBox"+id).removeClass("visually-hidden");
              $.ajax({
              type:"GET",
              url:"http://localhost:8080/getCommentReply/"+id,
              success:function(response){
                  for(i=0; i < response.data.length; i++) {
                      document.getElementById('replyComments'+id).innerHTML += 
                      '<div class="d-flex my-1" style="margin-left:65px" id="singleReplyComment"'+id+'">\
                          <img  src="https://th.bing.com/th/id/OIP.1gKc5uC3sZvJC_98dfC9ogHaHa?pid=ImgDet&rs=1" class="rounded-circle mx-2" width="50px"  height="50px" alt="profile">\
                          <div>\
                              <strong> Hello </strong> \
                              <small> - ' + response.data[i].created_at + ' </small> <br>\
                              <span> ' + response.data[i].comment + ' </span>\
                          </div>\
                          </div>\
                      </div>';
                      }       
                      return true;
                  },
                  errror:function(){
                      console.warn("something wrong");
                  }
              })
          }else {
              $("#showReplyBox"+id).addClass("visually-hidden");
              $("#replyComments"+id).html('');
          }
            
    });
  
    // add Reply comment
    $(document).on("click", '#submitReply', function(evt){
        let replyid = $(this).attr('data-commentid');
        let comment = $("#commentReply"+ replyid).val();
      $("#replyComments"+replyid).html('');
      if(comment==''){
          $.notify("comment input is required", "error");         
          return false;
      }
      if(replyid==''){
          $.notify("comment id does not defined", "error");         
          return false;
      }
      $.ajax({
          type:"POST",
          url:"http://localhost:8080/addCommentReply",
          data:{"comment":comment, "reply_id":replyid},
          success:function(response){
              if(response.status == 'OK'){
                  $("#commentReply"+replyid).val('');
                  // get Replies
                  $.ajax({
                      type:"GET",
                      url:"http://localhost:8080/getCommentReply/"+replyid,
                      success:function(response){
                          for(i=0; i < response.data.length; i++) {
                              document.getElementById('replyComments'+replyid).innerHTML += 
                              '<div class="d-flex my-1" style="margin-left:65px" id="singleReplyComment"'+replyid+'">\
                                  <img  src="https://th.bing.com/th/id/OIP.1gKc5uC3sZvJC_98dfC9ogHaHa?pid=ImgDet&rs=1" class="rounded-circle mx-2" width="50px"  height="50px" alt="profile">\
                                  <div>\
                                      <strong> Hello </strong> \
                                      <small>- ' + response.data[i].created_at + ' </small> <br>\
                                      <span> ' + response.data[i].comment + ' </span>\
                                  </div>\
                                  </div>\
                              </div>';
                              }       
                              return true;
                          },
                          errror:function(){
                              console.warn("something wrong");
                          }
                      })
                  $.notify("Replied comment added", "success");         
              }else {
                  $.notify("Error : "+response.status, "warning");         
              }
          },
          errror:function(){
              console.warn("something wrong");
              $.notify("Something wrong", "error");         
          }
      });
    });
  })
